import { InputError, parseArguments, readDocument, runCli } from './common';
import { collectEvidenceWarnings } from '../model/evidence.ts';
import { auditSources, mergeEvidenceDiagnostics } from './evidence.ts';

runCli(async () => {
  const args = parseArguments(process.argv.slice(2), ['--repo-root'], ['--strict-sources']);
  const help = '用法：node validate.mjs input.diagram.json [--repo-root path] [--strict-sources]\n校验结构、引用和导航；来源核验只读检查整个文档的文件、行号、摘要和 Git 修订，不证明描述语义。';
  if (args.flags.has('--help')) { console.log(help); return; }
  if (!args.input) throw new InputError(help);
  const repoRoot = args.values.get('--repo-root');
  if (repoRoot !== undefined && !repoRoot.trim()) throw new InputError('--repo-root 不能为空。');
  const strict = args.flags.has('--strict-sources');
  if (strict && !repoRoot) throw new InputError('--strict-sources 必须同时指定 --repo-root。');
  const { document, diagnostics: structuralDiagnostics } = await readDocument(args.input);
  const sourceAudit = repoRoot ? await auditSources(document, { repoRoot, strict }) : undefined;
  const diagnostics = mergeEvidenceDiagnostics(structuralDiagnostics, collectEvidenceWarnings(document), sourceAudit?.diagnostics ?? []);
  const sourceFailures = diagnostics.filter(item => item.code.startsWith('SOURCE_')).length;
  const valid = !diagnostics.some(item => item.severity === 'error');
  console.log(JSON.stringify({
    valid, id: document.id, diagnostics,
    checks: {
      structure: { performed: true, passed: true },
      sources: { performed: sourceAudit !== undefined, ...(sourceAudit ? { passed: sourceFailures === 0, scope: 'whole-document' } : {}) },
    },
    failures: { sources: sourceFailures },
    ...(sourceAudit ? { sourceAudit } : {}),
  }, null, 2));
  if (!valid) process.exitCode = 2;
});
