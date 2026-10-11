import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { type TestContext } from 'node:test';

const cli = resolve('src/cli/validate.ts');
const run = (args: string[]) => spawnSync(process.execPath, ['--import', 'tsx', cli, ...args], { encoding: 'utf8', windowsHide: true, timeout: 15000 });

async function fixture(t: TestContext, sources?: unknown[]) {
  const directory = await mkdtemp(join(tmpdir(), 'system-flow-evidence-cli-'));
  t.after(async () => {
    assert.equal(dirname(directory).toLowerCase(), resolve(tmpdir()).toLowerCase());
    await rm(directory, { recursive: true, force: true });
  });
  const input = join(directory, '图 数据.json');
  await writeFile(input, JSON.stringify({
    schemaVersion: '2.0', id: 'cli', title: '来源', view: { kind: 'overview', direction: 'RIGHT', theme: 'light' },
    nodes: [{ id: 'n', kind: 'process', label: '模块', evidenceStatus: 'confirmed', ...(sources ? { sources } : {}) }],
    edges: [], groups: [],
  }));
  return { directory, input };
}

test('validate strict sources requires repo-root and returns argument exit code 2', async t => {
  const { input } = await fixture(t);
  const result = run([input, '--strict-sources']);
  assert.equal(result.status, 2); assert.match(result.stderr, /--repo-root/);
});

test('validate warns about missing confirmed sources without claiming source checks ran', async t => {
  const { input } = await fixture(t);
  const result = run([input]); assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.valid, true); assert.equal(report.checks.structure.passed, true);
  assert.equal(report.checks.sources.performed, false);
  assert.equal(report.diagnostics.filter((item: any) => item.code === 'SOURCE_MISSING').length, 1);
});

test('validate strict audit reports JSON source failures once and exits 2', async t => {
  const { directory, input } = await fixture(t);
  const result = run([input, '--repo-root', directory, '--strict-sources']);
  assert.equal(result.status, 2, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.valid, false); assert.equal(report.checks.sources.performed, true); assert.equal(report.checks.sources.passed, false);
  assert.equal(report.diagnostics.filter((item: any) => item.code === 'SOURCE_MISSING').length, 1);
  assert.equal(report.failures.sources, 1); assert.equal(report.sourceAudit.valid, false);
});

test('validate default audit keeps warnings compatible while reporting the source check failure', async t => {
  const { directory, input } = await fixture(t, [{ path: 'missing.ts', line: 1 }]);
  const result = run([input, '--repo-root', directory]); assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.valid, true); assert.equal(report.checks.sources.performed, true); assert.equal(report.checks.sources.passed, false);
  assert.ok(report.failures.sources >= 1); assert.equal(report.sourceAudit.checked[0].matched, false);
  assert.ok(!JSON.stringify(report).includes('"verified":true'));
});
