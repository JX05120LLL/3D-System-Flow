import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { atomicWrite, checkOutput, InputError, parseArguments, readDocument, requireExtension, runCli } from './common';
export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
async function main() {
  const args = parseArguments(process.argv.slice(2), ['--output','--renderer'], ['--overwrite']);
  const help = '用法：node generate.mjs input.diagram.json --output output.html [--renderer 2d|3d] [--overwrite]\n默认 2d；仅需 Node.js 24；生成完成后仍需浏览器视觉检查。';
  if (args.flags.has('--help')) { console.log(help); return; }
  if (!args.input || !args.values.has('--output')) throw new InputError(help);
  const renderer = args.values.get('--renderer') ?? '2d';
  if (renderer !== '2d' && renderer !== '3d') throw new InputError('--renderer 必须是 2d 或 3d。');
  const output = resolve(args.values.get('--output')!); const overwrite = args.flags.has('--overwrite');
  requireExtension(output, ['.html', '.htm']);
  await checkOutput(output, overwrite, args.input);
  const { document: doc, diagnostics } = await readDocument(args.input);
  const assets = resolve(dirname(fileURLToPath(import.meta.url)), '../assets');
  const files = renderer === '3d' ? ['spatial-template.html','spatial.css','spatial.js'] : ['template.html','viewer.css','viewer.js'];
  const [template, css, js] = (await Promise.all(files.map(file => readFile(resolve(assets, file), 'utf8')))).map(content => content.replace(/\r\n?/g, '\n'));
  const license = renderer === '3d' ? await readFile(resolve(assets,'../references/licenses/three.txt'),'utf8') : '';
  const nodes = [...doc.nodes, ...(renderer === '3d' ? doc.spatial?.interiors?.flatMap(interior=>interior.nodes) ?? [] : [])];
  const values: Record<string, string> = { TITLE: escapeHtml(doc.title), CSS: css, JS: js.replace(/<\/script/gi, '<\\/script'), DATA: JSON.stringify(doc).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029'), SUMMARY: `<ul>${nodes.map(n => `<li>${escapeHtml(n.label)}${n.summary ? `：${escapeHtml(n.summary)}` : ''}</li>`).join('')}</ul>`, LICENSE:license };
  const html = template.replace(/__(TITLE|CSS|JS|DATA|SUMMARY|LICENSE)__/g, (_, key: string) => values[key]);
  await atomicWrite(output, html, overwrite);
  console.log(JSON.stringify({ output, renderer, bytes: Buffer.byteLength(html), diagnostics, status: 'assembled; browser validation required' }));
}
runCli(main);
