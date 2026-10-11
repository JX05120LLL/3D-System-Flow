import { cp, mkdir, mkdtemp, readFile, writeFile, stat, realpath, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve, join, relative, isAbsolute, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFile, execFileSync } from 'node:child_process';
import { promisify } from 'node:util';
const execute = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temp = await mkdtemp(join(tmpdir(), 'system-flow-package-'));
const skill = join(temp, 'system-flow'); const cwd = join(temp, '仓库外 工作目录');
const artifacts = join(root, 'artifacts/package');
const steps = [];
async function run(label, executable, args, expected = 0) {
  const started = performance.now(); let result;
  try { result = { status: 0, ...await execute(executable, args, { cwd, encoding: 'utf8', timeout: 180000, maxBuffer: 4 * 1024 * 1024 }) }; }
  catch (error) { result = { status: error.code, stdout: error.stdout ?? '', stderr: error.stderr ?? error.message }; }
  steps.push({ label, executable, args, expected, ...result, milliseconds: Math.round(performance.now() - started) });
  if (result.status !== expected) throw new Error(`${label}: exit ${result.status}; expected ${expected}\n${result.stderr}\n${result.stdout}`);
  return result;
}
let passed = false;
try {
  await mkdir(cwd); await mkdir(artifacts, { recursive: true });
  await cp(join(root, 'system-flow'), skill, { recursive: true, filter: path => !path.split(/[\\/]/).some(part => part === 'node_modules' || part === '__pycache__') });
  const input = join(cwd, '请求 流程.json'); const html = join(cwd, '请求 流程.html');
  const model = { schemaVersion: '2.0', id: 'package-check', title: '独立安装验证', view: { kind: 'flow', direction: 'DOWN', theme: 'light' }, groups: [], nodes: [{ id: 'start', kind: 'start', label: '收到请求' }, { id: 'gate', kind: 'decision', label: '校验通过？' }, { id: 'done', kind: 'end', label: '返回结果' }, { id: 'error', kind: 'end', label: '返回错误' }], edges: [{ id: 'e1', source: 'start', target: 'gate', kind: 'control', directed: true }, { id: 'e2', source: 'gate', target: 'done', kind: 'control', directed: true, label: '通过' }, { id: 'e3', source: 'gate', target: 'error', kind: 'exception', directed: true, label: '不通过' }] };
  await writeFile(input, JSON.stringify(model, null, 2));
  if (existsSync(join(skill, 'node_modules'))) throw new Error('复制时意外包含了 node_modules。');
  await run('validate before npm install', process.execPath, [join(skill, 'scripts/validate.mjs'), input]);
  await run('generate before npm install', process.execPath, [join(skill, 'scripts/generate.mjs'), input, '--output', html]);
  const spatialInputs = [];
  for (const fixture of ['microservices-spatial', 'document-pipeline-spatial']) {
    const source = join(cwd, `${fixture}.diagram.json`); const output = join(cwd, `${fixture}-3d.html`);
    // Only copy authored input data; generation must use the copied Skill runtime.
    await cp(join(skill, 'examples', `${fixture}.diagram.json`), source);
    await run(`validate ${fixture} before npm install`, process.execPath, [join(skill, 'scripts/validate.mjs'), source]);
    await run(`generate ${fixture} 3D before npm install`, process.execPath, [join(skill, 'scripts/generate.mjs'), source, '--renderer', '3d', '--output', output]);
    spatialInputs.push({ name: fixture, source, output });
  }
  const oldSpatialHtml = join(cwd, '旧图 三维.html');
  await run('generate old graph without spatial as 3D before npm install', process.execPath, [join(skill, 'scripts/generate.mjs'), input, '--renderer', '3d', '--output', oldSpatialHtml]);
  spatialInputs.push({ name: 'old-without-spatial', source: input, output: oldSpatialHtml });
  const spatial2dHtml = join(cwd, '空间数据 二维.html');
  await run('generate spatial input as 2D before npm install', process.execPath, [join(skill, 'scripts/generate.mjs'), spatialInputs[0].source, '--renderer', '2d', '--output', spatial2dHtml]);
  for (const format of ['svg', 'png', 'jpg']) {
    const output = join(cwd, `unsupported-3d.${format}`);
    const rejected = await run(`3D ${format} export gives explicit unsupported diagnostic before Playwright install`, process.execPath, [join(skill, 'scripts/export.mjs'), oldSpatialHtml, '--format', format, '--output', output], 2);
    if (!/3D|三维/.test(rejected.stderr + rejected.stdout) || !/2d/.test(rejected.stderr + rejected.stdout) || existsSync(output)) throw new Error('3D 导出拒绝缺少转换说明，或写入了输出文件。');
  }
  await run('export refuses missing local Playwright', process.execPath, [join(skill, 'scripts/export.mjs'), html, '--format', 'svg', '--output', join(cwd, 'before-install.svg')], 1);
  let npm = process.env.npm_execpath;
  if (!npm) npm = process.platform === 'win32' ? join(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js') : await realpath(execFileSync('which', ['npm'], { encoding: 'utf8' }).trim());
  await run('npm ci using copied skill lockfile', process.execPath, [npm, 'ci', '--prefix', skill, '--no-audit', '--no-fund']);
  const packageVersion = JSON.parse(await readFile(join(skill, 'node_modules/playwright/package.json'), 'utf8')).version;
  const browserCheck = join(cwd, 'check-copied-3d.mjs'); const browserReport = join(cwd, '3d-browser-report.json');
  await writeFile(browserCheck, `
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const { chromium } = await import(${JSON.stringify(pathToFileURL(join(skill, 'node_modules/playwright/index.mjs')).href)});
const fixtures = ${JSON.stringify(spatialInputs)};
const browser = await chromium.launch({ headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const reports = [];
try {
  for (const fixture of fixtures) {
    const document = JSON.parse(await readFile(fixture.source, 'utf8'));
    const context = await browser.newContext({ offline: true, reducedMotion: 'reduce' });
    const page = await context.newPage(); const network = [], errors = [];
    page.on('request', request => { if (/^https?:/i.test(request.url())) network.push(request.url()); });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(pathToFileURL(fixture.output).href);
    await page.waitForFunction(() => typeof window.__sandboxPrototype?.state === 'function');
    const state = () => page.evaluate(() => window.__sandboxPrototype.state());
    const nodes = [...document.nodes, ...(document.spatial?.interiors ?? []).flatMap(interior => interior.nodes)];
    const initial = await state(); assert.deepEqual([...initial.objectIds].sort(), nodes.map(node => node.id).sort());
    assert.equal(await page.locator('html').getAttribute('data-renderer'), 'webgl');
    assert.equal(initial.demo.stepsTotal, document.spatial?.scenarios?.[0]?.steps.length ?? 0);
    assert.equal(await page.locator('#demo-dock').isVisible(), !!document.spatial?.scenarios?.length);
    const interior = document.spatial?.interiors?.find(item => item.nodes.some(node => !node.id.includes('/'))) ?? document.spatial?.interiors?.[0];
    if (interior) {
      const node = interior.nodes.find(item => !item.id.includes('/')) ?? interior.nodes[0];
      await page.locator('#explore-toggle').click(); await page.locator('#node-select').selectOption(node.id);
      const selected = await state(); assert.equal(selected.selectedId, node.id); assert.ok(selected.openModules.includes(interior.owner));
      assert.ok((await page.locator('#context-title').textContent()).includes(node.label));
      await page.locator('#more-details').click(); assert.ok((await page.locator('#context-details').textContent()).includes(node.details ?? ''));
      await page.keyboard.press('Escape'); assert.deepEqual((await state()).openModules, []);
    }
    if (document.spatial?.scenarios?.length) {
      const scenario = document.spatial.scenarios[0];
      await page.locator('#demo-step').click(); const stepped = await state();
      assert.equal(stepped.demo.stepId, scenario.steps[0].id); assert.equal(stepped.selectedId, scenario.steps[0].focusId);
      await page.locator('#demo-reset').click(); assert.equal((await state()).demo.index, -1);
    }
    assert.deepEqual(network, []); assert.deepEqual(errors, []);
    reports.push({ fixture: fixture.name, renderer: 'webgl', objects: initial.objectIds.length, scenarios: document.spatial?.scenarios?.length ?? 0, offlineFileUrl: true, network, errors });
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(${JSON.stringify(browserReport)}, JSON.stringify(reports, null, 2));
console.log(JSON.stringify(reports));
`, 'utf8');
  await run('copied Skill 3D HTML runs offline via file URL with local Playwright', process.execPath, [browserCheck]);
  const spatialBrowserResults = JSON.parse(await readFile(browserReport, 'utf8'));
  for (const format of ['svg', 'png', 'jpg']) {
    const path = join(cwd, `请求 流程.${format}`);
    await run(`export ${format} from outside repository`, process.execPath, [join(skill, 'scripts/export.mjs'), html, '--format', format, '--output', path, ...(format === 'svg' ? [] : ['--scale', '1'])]);
    const bytes = await readFile(path);
    if (format === 'png' && bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('PNG 格式错误。');
    if (format === 'jpg' && bytes.subarray(0, 3).toString('hex') !== 'ffd8ff') throw new Error('JPEG 格式错误。');
    if (format === 'svg' && (!bytes.toString().includes('不通过') || /<script|<foreignObject/.test(bytes.toString()))) throw new Error('SVG 缺少完整条件或包含脚本。');
    await cp(path, join(artifacts, `standalone.${format}`));
  }
  const spatialSvg = join(cwd, '空间数据 二维.svg');
  await run('export 2D root graph from input with spatial metadata', process.execPath, [join(skill, 'scripts/export.mjs'), spatial2dHtml, '--format', 'svg', '--output', spatialSvg]);
  const spatialModel = JSON.parse(await readFile(spatialInputs[0].source, 'utf8')); const spatialSvgText = await readFile(spatialSvg, 'utf8');
  if (!spatialModel.nodes.every(node => spatialSvgText.includes(`data-node-id="${node.id}"`))) throw new Error('空间数据的二维静态导出遗漏根节点。');
  await cp(spatialSvg, join(artifacts, 'spatial-root.svg'));
  for (const fixture of spatialInputs) {
    await cp(fixture.output, join(artifacts, `${fixture.name}-3d.html`));
    await cp(fixture.source, join(artifacts, `${fixture.name}.diagram.json`));
  }
  await cp(html, join(artifacts, 'standalone.html')); await cp(input, join(artifacts, 'standalone.diagram.json'));
  const report = { status: 'passed', node: process.version, platform: process.platform, temp, copiedSkill: skill, cwd, playwright: packageVersion, htmlBytes: (await stat(html)).size, repositoryDependenciesUsed: false, repositorySourceOrPrototypeCopied: false, spatialBrowserResults, browser: 'installed Chromium cache; shared OS browser cache is permitted', steps };
  await writeFile(join(artifacts, 'report.json'), JSON.stringify(report, null, 2));
  passed = true;
  console.log(JSON.stringify({ status: report.status, report: join(artifacts, 'report.json'), htmlBytes: report.htmlBytes, playwright: packageVersion, steps: steps.length }));
} catch (error) {
  await mkdir(artifacts, { recursive: true });
  await writeFile(join(artifacts, 'report.json'), JSON.stringify({ status: 'failed', temp, error: error.message, steps }, null, 2));
  console.error(error.message); process.exitCode = 1;
} finally {
  if (passed) {
    // Only remove the exact directory created above, after checking its resolved containment.
    const actual = await realpath(temp); const base = await realpath(tmpdir()); const child = relative(base, actual);
    if (!child || child.startsWith('..') || isAbsolute(child) || !basename(actual).startsWith('system-flow-package-')) throw new Error(`拒绝删除未核实的临时路径：${actual}`);
    await rm(actual, { recursive: true });
  }
}
