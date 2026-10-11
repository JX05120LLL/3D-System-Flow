import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { atomicWrite, checkOutput, InputError, parseArguments, readDocument, requireExtension, runCli } from './common';
import { buildNavigation } from '../model/navigation';
import { auditSources, mergeEvidenceDiagnostics } from './evidence';
export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
async function main() {
  const args = parseArguments(process.argv.slice(2), ['--output','--renderer','--view','--repo-root'], ['--overwrite','--strict-sources']);
  const help = '用法：node generate.mjs input.diagram.json --output output.html [--renderer 2d|3d] [--view id] [--repo-root path] [--strict-sources] [--overwrite]\n默认 2d；来源核验只读检查整个图集；生成完成后仍需浏览器视觉检查。';
  if (args.flags.has('--help')) { console.log(help); return; }
  if (!args.input || !args.values.has('--output')) throw new InputError(help);
  for (const option of ['--view','--repo-root']) {
    if (args.values.has(option) && !args.values.get(option)!.trim()) throw new InputError(`${option} 不能为空。`);
  }
  if (args.flags.has('--strict-sources') && !args.values.has('--repo-root')) throw new InputError('--strict-sources 需要 --repo-root。');
  const renderer = args.values.get('--renderer') ?? '2d';
  if (renderer !== '2d' && renderer !== '3d') throw new InputError('--renderer 必须是 2d 或 3d。');
  const output = resolve(args.values.get('--output')!); const overwrite = args.flags.has('--overwrite');
  requireExtension(output, ['.html', '.htm']);
  await checkOutput(output, overwrite, args.input);
  const { document, diagnostics: modelDiagnostics } = await readDocument(args.input);
  const audit = args.values.has('--repo-root') ? await auditSources(document, { repoRoot: args.values.get('--repo-root')!, strict: args.flags.has('--strict-sources') }) : undefined;
  const diagnostics = mergeEvidenceDiagnostics(modelDiagnostics, audit?.diagnostics ?? []);
  if (audit && !audit.valid) throw new InputError(JSON.stringify({ valid: false, diagnostics, sources: audit }));
  const selectedView = args.values.get('--view');
  const doc = selectedView !== undefined && selectedView !== document.id ? buildNavigation(document).getView(selectedView) : document;
  if (!doc) throw new InputError(`VIEW_NOT_FOUND：未知视图 ${selectedView}。`);
  const assets = resolve(dirname(fileURLToPath(import.meta.url)), '../assets');
  const files = renderer === '3d' ? ['spatial-template.html','spatial.css','spatial.js'] : ['template.html','viewer.css','viewer.js'];
  const [template, css, js] = (await Promise.all(files.map(file => readFile(resolve(assets, file), 'utf8')))).map(content => content.replace(/\r\n?/g, '\n'));
  const license = renderer === '3d' ? await readFile(resolve(assets,'../references/licenses/three.txt'),'utf8') : '';
  const summarizedViews = renderer === '3d' ? [...buildNavigation(doc).views.values()] : [doc];
  const nodes = summarizedViews.flatMap(view => [...view.nodes, ...(renderer === '3d' ? view.spatial?.interiors?.flatMap(interior=>interior.nodes) ?? [] : [])]);
  const values: Record<string, string> = { TITLE: escapeHtml(doc.title), CSS: css, JS: js.replace(/<\/script/gi, '<\\/script'), DATA: JSON.stringify(doc).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029'), SUMMARY: `<ul>${nodes.map(n => `<li>${escapeHtml(n.label)}${n.summary ? `：${escapeHtml(n.summary)}` : ''}</li>`).join('')}</ul>`, LICENSE:license };
  const html = template.replace(/__(TITLE|CSS|JS|DATA|SUMMARY|LICENSE)__/g, (_, key: string) => values[key]);
  await atomicWrite(output, html, overwrite);
  console.log(JSON.stringify({ output, renderer, ...(selectedView !== undefined ? { viewId: selectedView } : {}), bytes: Buffer.byteLength(html), diagnostics, ...(audit ? { sources: { ...audit, passed: audit.diagnostics.length === 0 } } : {}), status: 'assembled; browser validation required' }));
}
runCli(main);
