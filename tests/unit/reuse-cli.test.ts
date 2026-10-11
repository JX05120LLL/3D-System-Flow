import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const base = (id: string, label: string): any => ({
  schemaVersion: '2.0', id, title: label,
  view: { kind: 'overview', direction: 'RIGHT', theme: 'dark' },
  nodes: [{ id: 'service', kind: 'process', label }], edges: [], groups: [],
});
const run = (args: string[]) => spawnSync(process.execPath, [resolve('system-flow/scripts/generate.mjs'), ...args], { encoding: 'utf8', timeout: 15000 });

test('generate --view extracts an independent 2D child without mutating the collection', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'system-flow 视图 '));
  const input = join(directory, '模型.json'), output = join(directory, '内部.html');
  const document = base('system', '总览');
  const child = base('details', '内部组件');
  document.navigation = { views: [{ parentId: 'system', ownerId: 'service', document: child }] };
  const original = JSON.stringify(document);
  await writeFile(input, original);
  const result = run([input, '--view', 'details', '--renderer', '2d', '--output', output]);
  assert.equal(result.status, 0, result.stderr);
  const html = await readFile(output, 'utf8');
  const embedded = JSON.parse(html.match(/<script id="blueprint-data" type="application\/json">([\s\S]*?)<\/script>/)![1]!);
  assert.deepEqual(embedded, child);
  assert.equal(await readFile(input, 'utf8'), original);
});

test('unknown view refuses before overwriting existing output', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'system-flow invalid-view '));
  const input = join(directory, 'model.json'), output = join(directory, 'existing.html');
  await writeFile(input, JSON.stringify(base('system', '总览')));
  await writeFile(output, 'keep existing HTML');
  const result = run([input, '--view', 'missing', '--output', output, '--overwrite']);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /VIEW_NOT_FOUND/);
  assert.equal(await readFile(output, 'utf8'), 'keep existing HTML');
});

test('explicit empty view or source root is rejected without replacing HTML', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'system-flow empty-option '));
  const input = join(directory, 'model.json'), output = join(directory, 'existing.html');
  await writeFile(input, JSON.stringify(base('system', '总览')));
  for (const option of ['--view', '--repo-root']) {
    await writeFile(output, 'keep existing HTML');
    const result = run([input, option, '', '--output', output, '--overwrite']);
    assert.equal(result.status, 2, `${option}: ${result.stderr}`);
    assert.equal(await readFile(output, 'utf8'), 'keep existing HTML');
  }
});

test('strict source failure in any child refuses before replacing HTML', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'system-flow source-failure '));
  const input = join(directory, 'model.json'), output = join(directory, 'existing.html');
  const document = base('system', '总览'), child = base('details', '内部');
  child.nodes[0].evidenceStatus = 'confirmed';
  child.nodes[0].sources = [{ path: 'missing.ts', line: 999 }];
  document.navigation = { views: [{ parentId: 'system', ownerId: 'service', document: child }] };
  await writeFile(input, JSON.stringify(document));
  await writeFile(output, 'keep existing HTML');
  const result = run([input, '--repo-root', directory, '--strict-sources', '--view', 'system', '--output', output, '--overwrite']);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /SOURCE_.*MISSING|SOURCE_.*NOT_FOUND/);
  assert.equal(await readFile(output, 'utf8'), 'keep existing HTML');
});
