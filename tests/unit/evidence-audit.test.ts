import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, open, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test, { type TestContext } from 'node:test';
import type { DiagramDocument } from '../../src/model/types.ts';
import * as evidence from '../../src/cli/evidence.ts';
const contents = 'first\r\nsecond\r\n';
const hash = createHash('sha256').update(contents).digest('hex');
const relative = 'src/入口 文件.ts';

function git(root: string, ...args: string[]): string {
  const result = spawnSync('git', ['-C', root, ...args], { encoding: 'utf8', windowsHide: true, timeout: 10000, env: { ...process.env, GIT_OPTIONAL_LOCKS: '0' } });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}

async function fixture(t: TestContext) {
  const directory = await mkdtemp(join(tmpdir(), 'system-flow-evidence-'));
  t.after(async () => {
    assert.equal(dirname(directory).toLowerCase(), resolve(tmpdir()).toLowerCase());
    await rm(directory, { recursive: true, force: true });
  });
  const root = join(directory, 'repo');
  await mkdir(join(root, 'src'), { recursive: true });
  await writeFile(join(root, relative), contents);
  git(root, 'init', '--quiet'); git(root, 'add', '--all');
  git(root, '-c', 'user.name=Evidence fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '--quiet', '-m', 'fixture');
  const commit = git(root, 'rev-parse', 'HEAD');
  const document: DiagramDocument = {
    schemaVersion: '2.0', id: 'root', title: '来源',
    view: { kind: 'overview', direction: 'RIGHT', theme: 'light' }, groups: [], edges: [],
    nodes: [{ id: 'owner', kind: 'process', label: '模块', evidenceStatus: 'confirmed', sources: [{ path: relative, line: 2, sha256: hash }] }],
  };
  return { root, directory, commit, document };
}

test('audit resolves Chinese and space paths, accepts backslashes and records actual content hashes without source text', async t => {
  const { root, commit, document } = await fixture(t);
  document.nodes[0]!.sources![0]!.path = 'src\\入口 文件.ts';
  document.sourceRevision = { commit, dirty: false };
  const result = await evidence.auditSources(document, { repoRoot: root, strict: true });
  assert.equal(result.valid, true); assert.deepEqual(result.diagnostics, []);
  assert.equal(result.repository.commit, commit); assert.equal(result.repository.dirty, false);
  assert.equal(result.checked[0]?.sha256, hash); assert.equal(result.checked[0]?.sha256Matches, true);
  assert.equal(result.checked[0]?.matched, true); assert.equal(result.checked[0]?.line, 2);
  assert.ok(!JSON.stringify(result).includes('first'));
});

test('missing confirmed evidence warns by default and becomes an error under strict source checks', async t => {
  const { root, document } = await fixture(t); delete document.nodes[0]!.sources;
  const warning = await evidence.auditSources(document, { repoRoot: root });
  assert.equal(warning.valid, true); assert.ok(warning.diagnostics.some(item => item.code === 'SOURCE_MISSING' && item.severity === 'warning'));
  const strict = await evidence.auditSources(document, { repoRoot: root, strict: true });
  assert.equal(strict.valid, false); assert.ok(strict.diagnostics.some(item => item.code === 'SOURCE_MISSING' && item.severity === 'error'));
});

test('missing files and non-file references have concrete diagnostics and unmatched check records', async t => {
  const { root, document } = await fixture(t);
  document.nodes[0]!.sources = [{ path: 'absent.ts' }, { path: 'src' }];
  const result = await evidence.auditSources(document, { repoRoot: root });
  assert.ok(result.diagnostics.some(item => item.code === 'SOURCE_FILE_MISSING' && item.path === '/nodes/0/sources/0/path'));
  assert.ok(result.diagnostics.some(item => item.code === 'SOURCE_NOT_FILE'));
  assert.ok(result.checked.every(item => !item.matched));
});

test('source line checks reject zero, fractional, empty-file and past-end lines including the trailing newline', async t => {
  const { root, document } = await fixture(t);
  await writeFile(join(root, 'empty.ts'), '');
  document.nodes[0]!.sources = [0, 1.5, 3].map(line => ({ path: relative, line, sha256: hash }));
  document.nodes[0]!.sources.push({ path: 'empty.ts', line: 1 });
  const result = await evidence.auditSources(document, { repoRoot: root, strict: true });
  assert.equal(result.valid, false);
  assert.equal(result.diagnostics.filter(item => item.code === 'SOURCE_LINE_INVALID').length, 4);
});

test('audit rejects traversal, absolute paths, drive-relative paths and Windows alternate streams', async t => {
  const { root, document } = await fixture(t);
  document.nodes[0]!.sources = ['../outside.ts', '..\\outside.ts', '/outside.ts', 'C:\\outside.ts', 'C:outside.ts', 'src/入口 文件.ts:secret', '\\\\server\\secret'].map(path => ({ path }));
  const result = await evidence.auditSources(document, { repoRoot: root, strict: true });
  assert.equal(result.valid, false);
  assert.equal(result.diagnostics.filter(item => item.code === 'SOURCE_PATH_UNSAFE').length, 7);
  assert.ok(result.checked.every(item => !item.matched));
});

test('realpath prevents a directory symlink or Windows junction from reading outside the repository', async t => {
  const { root, directory, document } = await fixture(t);
  const outside = join(directory, 'outside'); await mkdir(outside); await writeFile(join(outside, 'secret.ts'), 'outside source');
  await symlink(outside, join(root, 'escape'), process.platform === 'win32' ? 'junction' : 'dir');
  document.nodes[0]!.sources = [{ path: 'escape/secret.ts' }];
  const result = await evidence.auditSources(document, { repoRoot: root, strict: true });
  assert.equal(result.valid, false); assert.ok(result.diagnostics.some(item => item.code === 'SOURCE_PATH_OUTSIDE'));
  assert.equal(result.checked[0]?.sha256, undefined); assert.ok(!JSON.stringify(result).includes('outside source'));
});

test('changed file hashes and root plus child source revisions reveal drift', async t => {
  const { root, commit, document } = await fixture(t);
  await writeFile(join(root, relative), `${contents}changed\n`);
  document.sourceRevision = { commit: '0'.repeat(40), dirty: false };
  document.navigation = { views: [{ parentId: 'root', ownerId: 'owner', document: { ...document, id: 'child', sourceRevision: { commit, dirty: false } } }] };
  const result = await evidence.auditSources(document, { repoRoot: root, strict: true });
  assert.equal(result.valid, false); assert.equal(result.checked[0]?.sha256Matches, false);
  assert.ok(result.diagnostics.some(item => item.code === 'SOURCE_HASH_MISMATCH'));
  assert.ok(result.diagnostics.some(item => item.code === 'SOURCE_REVISION_MISMATCH' && item.path === '/sourceRevision/commit'));
  assert.ok(result.diagnostics.some(item => item.code === 'SOURCE_DIRTY_MISMATCH' && item.path === '/navigation/views/0/document/sourceRevision/dirty'));
});

test('dirty confirmed sources require hashes even when HEAD revision still matches', async t => {
  const { root, commit, document } = await fixture(t);
  await writeFile(join(root, relative), `${contents}changed\n`);
  delete document.nodes[0]!.sources![0]!.sha256; document.sourceRevision = { commit, dirty: true };
  const result = await evidence.auditSources(document, { repoRoot: root });
  assert.equal(result.valid, true); assert.equal(result.repository.dirty, true);
  assert.ok(result.diagnostics.some(item => item.code === 'SOURCE_HASH_UNPINNED' && item.path === '/nodes/0/sources/0/sha256'));
});

test('a Git failure is reported instead of inventing a repository revision', async t => {
  const { directory, document } = await fixture(t);
  const root = join(directory, 'plain'); await mkdir(root); await writeFile(join(root, 'file.ts'), contents);
  document.nodes[0]!.sources = [{ path: 'file.ts', line: 1, sha256: hash }];
  document.sourceRevision = { commit: '0'.repeat(40) };
  const result = await evidence.auditSources(document, { repoRoot: root });
  assert.ok(result.diagnostics.some(item => item.code === 'SOURCE_GIT_UNAVAILABLE' && item.message.length > 20));
  assert.equal(result.repository.commit, undefined); assert.equal(result.checked[0]?.matched, true);
});

test('strict file evidence in a plain document directory does not require a declared Git revision', async t => {
  const { directory, document } = await fixture(t);
  const root = join(directory, 'plain-documents'); await mkdir(root); await writeFile(join(root, '来源 文档.md'), contents);
  document.nodes[0]!.sources = [{ path: '来源 文档.md', line: 2, sha256: hash }];
  const result = await evidence.auditSources(document, { repoRoot: root, strict: true });
  assert.equal(result.valid, true); assert.deepEqual(result.diagnostics, []);
  assert.equal(result.repository.commit, undefined); assert.equal(result.repository.dirty, undefined);
  assert.equal(result.checked[0]?.matched, true);
});

test('an explicit source root nested inside Git cannot silently borrow its parent revision', async t => {
  const { root, document } = await fixture(t);
  document.nodes[0]!.sources = [{ path: '入口 文件.ts', sha256: hash }];
  const result = await evidence.auditSources(document, { repoRoot: join(root, 'src'), strict: true });
  assert.equal(result.valid, false); assert.ok(result.diagnostics.some(item => item.code === 'SOURCE_GIT_ROOT_MISMATCH'));
  assert.equal(result.repository.commit, undefined);
});

test('oversized files are diagnosed before reading their contents', async t => {
  const { root, document } = await fixture(t);
  const file = await open(join(root, 'large.ts'), 'w');
  try { await file.truncate(8 * 1024 * 1024 + 1); } finally { await file.close(); }
  document.nodes[0]!.sources = [{ path: 'large.ts' }];
  const result = await evidence.auditSources(document, { repoRoot: root, strict: true });
  assert.equal(result.valid, false); assert.ok(result.diagnostics.some(item => item.code === 'SOURCE_FILE_SIZE_LIMIT' && item.message.includes('8 MiB')));
  assert.equal(result.checked[0]?.sha256, undefined);
});

test('static descriptions without sources remain valid in strict mode without requiring a Git checkout', async t => {
  const { directory, document } = await fixture(t); delete document.nodes[0]!.evidenceStatus; delete document.nodes[0]!.sources;
  const root = join(directory, 'description'); await mkdir(root);
  const result = await evidence.auditSources(document, { repoRoot: root, strict: true });
  assert.equal(result.valid, true); assert.deepEqual(result.diagnostics, []); assert.deepEqual(result.checked, []);
});
