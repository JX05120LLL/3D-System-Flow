import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const diagram = JSON.parse(await readFile(join(root, '../../tests/fixtures/traditional-microservices.diagram.json'), 'utf8'));
const result = await build({
  absWorkingDir: root, entryPoints: ['src/main.ts'], bundle: true,
  format: 'iife', platform: 'browser', target: 'es2022', minify: true,
  legalComments: 'eof', write: false, define: { __DIAGRAM__: JSON.stringify(diagram) },
});
const [template, css, license] = await Promise.all([
  readFile(join(root, 'src/template.html'), 'utf8'),
  readFile(join(root, 'src/style.css'), 'utf8'),
  readFile(join(root, 'node_modules/three/LICENSE'), 'utf8'),
]);
const html = template.replace('__CSS__', () => css)
  .replace('__JS__', () => result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script'))
  .replace('__LICENSE__', () => license);
await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(join(root, 'dist/index.html'), html);
console.log(`Built self-contained 3D sandbox (${Buffer.byteLength(html)} bytes).`);
