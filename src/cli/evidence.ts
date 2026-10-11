import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { open, realpath, stat } from 'node:fs/promises';
import { isAbsolute, relative, resolve, sep, win32 } from 'node:path';
import { promisify } from 'node:util';
import { collectEvidenceEntries, collectEvidenceWarnings } from '../model/evidence.ts';
import type { Diagnostic, DiagramDocument } from '../model/types.ts';

const execute = promisify(execFile);
const MAX_SOURCE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_SOURCE_BYTES = 64 * 1024 * 1024;

export interface SourceCheck {
  path: string;
  line?: number;
  diagnosticPath: string;
  sha256?: string;
  sha256Matches?: boolean;
  matched: boolean;
}

export interface SourceAuditResult {
  valid: boolean;
  diagnostics: Diagnostic[];
  repository: { root: string; commit?: string; dirty?: boolean };
  checked: SourceCheck[];
}

/** Merge structural and source diagnostics while retaining the strongest severity. */
export function mergeEvidenceDiagnostics(...groups: Diagnostic[][]): Diagnostic[] {
  const merged = new Map<string, Diagnostic>();
  for (const item of groups.flat()) {
    const key = `${item.code}\0${item.path}`;
    const previous = merged.get(key);
    if (!previous || previous.severity === 'warning' && item.severity === 'error') merged.set(key, item);
  }
  return [...merged.values()];
}

function within(root: string, target: string): boolean {
  const difference = relative(root, target);
  return difference === '' || !isAbsolute(difference) && difference !== '..' && !difference.startsWith(`..${sep}`);
}

function safeRelativePath(path: string): string | undefined {
  const normalized = path.replaceAll('\\', '/');
  if (!normalized.trim() || normalized.includes('\0') || normalized.includes(':') ||
      isAbsolute(normalized) || win32.isAbsolute(path) || normalized.split('/').includes('..')) return undefined;
  return normalized;
}

function errorMessage(error: unknown): string {
  const failure = error as { code?: string | number; message?: string; stderr?: string };
  return `${failure.code !== undefined ? `${failure.code}: ` : ''}${(failure.stderr?.trim() || failure.message || String(error)).slice(0, 700)}`;
}

type FileInspection = { sha256: string; lines?: number; textError?: string } | { code: string; message: string };

/** Checks working-copy references only; matching paths/hashes do not prove the described semantics. */
export async function auditSources(document: DiagramDocument, options: { repoRoot: string; strict?: boolean }): Promise<SourceAuditResult> {
  const diagnostics = collectEvidenceWarnings(document).map(item => ({ ...item, severity: options.strict ? 'error' as const : 'warning' as const }));
  const repository: SourceAuditResult['repository'] = { root: resolve(options.repoRoot) };
  const checked: SourceCheck[] = [];
  const add = (code: string, path: string, ids: string[], message: string) => {
    diagnostics.push({ code, path, ids, message, severity: options.strict ? 'error' : 'warning' });
  };
  const result = (): SourceAuditResult => ({ valid: !diagnostics.some(item => item.severity === 'error'), diagnostics, repository, checked });
  let root: string;
  try {
    root = await realpath(repository.root);
    if (!(await stat(root)).isDirectory()) {
      add('SOURCE_REPO_ROOT_INVALID', '', [], `repo-root 不是目录：${repository.root}`);
      return result();
    }
    repository.root = root;
  } catch (error) {
    add('SOURCE_REPO_ROOT_INVALID', '', [], `无法读取 repo-root：${errorMessage(error)}`);
    return result();
  }

  const entries = collectEvidenceEntries(document);
  const revisions = [
    { revision: document.sourceRevision, path: '/sourceRevision', id: document.id },
    ...(document.navigation?.views ?? []).map((view, i) => ({ revision: view.document.sourceRevision, path: `/navigation/views/${i}/document/sourceRevision`, id: view.document.id })),
  ].filter(item => item.revision !== undefined);
  const needsGit = entries.some(entry => entry.sources.length > 0) || revisions.length > 0;
  if (needsGit) {
    const git = async (...args: string[]) => (await execute('git', ['--no-optional-locks', '-C', root, '-c', 'core.fsmonitor=false', ...args], {
      windowsHide: true, timeout: 10000, maxBuffer: 1024 * 1024, env: { ...process.env, GIT_OPTIONAL_LOCKS: '0' },
    })).stdout;
    try {
      const gitRoot = await realpath((await git('rev-parse', '--show-toplevel')).trim());
      if (relative(root, gitRoot) !== '') add('SOURCE_GIT_ROOT_MISMATCH', '', [], 'repo-root 必须指向 Git 仓库根目录，不能借用父目录的修订。');
      else {
        repository.commit = (await git('rev-parse', '--verify', 'HEAD')).trim();
        repository.dirty = (await git('status', '--porcelain=v1', '-z', '--untracked-files=normal')).length > 0;
      }
    } catch (error) {
      // Plain documentation directories can pin files without declaring a Git revision.
      if (revisions.length > 0 || repository.commit !== undefined) {
        add('SOURCE_GIT_UNAVAILABLE', '', [], `无法核对 Git HEAD/dirty 状态：${errorMessage(error)}`);
      }
    }
  }
  for (const { revision, path, id } of revisions) {
    if (repository.commit && revision!.commit.toLowerCase() !== repository.commit.toLowerCase()) {
      add('SOURCE_REVISION_MISMATCH', `${path}/commit`, [id], `来源 commit 与当前 HEAD 不一致：记录 ${revision!.commit}，当前 ${repository.commit}。`);
    }
    if (revision!.dirty !== undefined && repository.dirty !== undefined && revision!.dirty !== repository.dirty) {
      add('SOURCE_DIRTY_MISMATCH', `${path}/dirty`, [id], `来源 dirty 与当前工作副本不一致：记录 ${revision!.dirty}，当前 ${repository.dirty}。`);
    }
  }

  let totalBytes = 0;
  const cache = new Map<string, FileInspection>();
  const inspect = async (filePath: string): Promise<FileInspection> => {
    const cached = cache.get(filePath);
    if (cached) return cached;
    let inspection: FileInspection;
    try {
      const initial = await stat(filePath);
      if (!initial.isFile()) inspection = { code: 'SOURCE_NOT_FILE', message: '来源不是普通文件。' };
      else if (initial.size > MAX_SOURCE_BYTES) inspection = { code: 'SOURCE_FILE_SIZE_LIMIT', message: '单个来源文件超过 8 MiB，不读取其内容；请引用更小的文件。' };
      else if (totalBytes + initial.size > MAX_TOTAL_SOURCE_BYTES) inspection = { code: 'SOURCE_TOTAL_SIZE_LIMIT', message: '来源文件累计读取超过 64 MiB；请缩小取证范围。' };
      else {
        const file = await open(filePath, constants.O_RDONLY | (constants.O_NONBLOCK ?? 0) | (constants.O_NOFOLLOW ?? 0));
        try {
          const info = await file.stat();
          if (!info.isFile()) inspection = { code: 'SOURCE_NOT_FILE', message: '打开的来源不是普通文件。' };
          else if (info.dev !== initial.dev || info.ino !== initial.ino) inspection = { code: 'SOURCE_FILE_CHANGED', message: '来源在核对路径后发生替换，请重新核验。' };
          else {
            const chunks: Buffer[] = [];
            let bytes = 0;
            let limit: FileInspection | undefined;
            for (;;) {
              const available = Math.min(64 * 1024, MAX_SOURCE_BYTES - bytes + 1, MAX_TOTAL_SOURCE_BYTES - totalBytes + 1);
              const chunk = Buffer.alloc(available);
              const read = await file.read(chunk, 0, available, null);
              if (read.bytesRead === 0) break;
              bytes += read.bytesRead; totalBytes += read.bytesRead;
              if (bytes > MAX_SOURCE_BYTES) { limit = { code: 'SOURCE_FILE_SIZE_LIMIT', message: '来源读取期间超过 8 MiB，停止核验。' }; break; }
              if (totalBytes > MAX_TOTAL_SOURCE_BYTES) { limit = { code: 'SOURCE_TOTAL_SIZE_LIMIT', message: '来源文件累计读取超过 64 MiB，停止核验。' }; break; }
              chunks.push(chunk.subarray(0, read.bytesRead));
            }
            if (limit) inspection = limit;
            else {
              const content = Buffer.concat(chunks);
              const sha256 = createHash('sha256').update(content).digest('hex');
              try {
                const text = new TextDecoder('utf-8', { fatal: true }).decode(content);
                const lines = text.length === 0 ? 0 : text.split(/\r\n|\r|\n/).length - (/\r$|\n$/.test(text) ? 1 : 0);
                inspection = { sha256, lines };
              } catch (error) { inspection = { sha256, textError: errorMessage(error) }; }
            }
          }
        } finally { await file.close(); }
      }
    } catch (error) { inspection = { code: 'SOURCE_READ_FAILED', message: `无法读取来源：${errorMessage(error)}` }; }
    cache.set(filePath, inspection);
    return inspection;
  };

  for (const entry of entries) {
    for (const [i, source] of entry.sources.entries()) {
      const path = `${entry.path}/sources/${i}`;
      const check: SourceCheck = { path: source.path, ...(source.line !== undefined ? { line: source.line } : {}), diagnosticPath: path, matched: false };
      checked.push(check);
      const normalized = safeRelativePath(source.path);
      if (normalized === undefined) { add('SOURCE_PATH_UNSAFE', `${path}/path`, [entry.id], '来源必须使用仓库内安全相对路径，不能包含目录越界、绝对路径或盘符/数据流。'); continue; }
      const candidate = resolve(root, normalized);
      if (!within(root, candidate)) { add('SOURCE_PATH_OUTSIDE', `${path}/path`, [entry.id], '来源路径越过 repo-root 边界。'); continue; }
      let filePath: string;
      try { filePath = await realpath(candidate); }
      catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        add(code === 'ENOENT' || code === 'ENOTDIR' ? 'SOURCE_FILE_MISSING' : 'SOURCE_READ_FAILED', `${path}/path`, [entry.id], `无法解析来源路径：${errorMessage(error)}`);
        continue;
      }
      if (!within(root, filePath)) { add('SOURCE_PATH_OUTSIDE', `${path}/path`, [entry.id], '来源符号链接或 junction 的实际目标越过 repo-root 边界。'); continue; }
      const inspected = await inspect(filePath);
      if ('code' in inspected) { add(inspected.code, `${path}/path`, [entry.id], inspected.message); continue; }
      check.sha256 = inspected.sha256;
      check.matched = true;
      if (source.line !== undefined) {
        if (inspected.textError) {
          add('SOURCE_TEXT_ENCODING', `${path}/line`, [entry.id], `带行号来源不是有效 UTF-8 文本：${inspected.textError}`); check.matched = false;
        } else if (!Number.isSafeInteger(source.line) || source.line < 1 || source.line > inspected.lines!) {
          add('SOURCE_LINE_INVALID', `${path}/line`, [entry.id], `来源行号 ${source.line} 不在文件的 1..${inspected.lines} 有效范围内。`); check.matched = false;
        }
      }
      if (source.sha256 !== undefined) {
        check.sha256Matches = source.sha256.toLowerCase() === inspected.sha256;
        if (!check.sha256Matches) { add('SOURCE_HASH_MISMATCH', `${path}/sha256`, [entry.id], `来源 SHA-256 不一致：记录 ${source.sha256}，实际 ${inspected.sha256}。`); check.matched = false; }
      } else if (entry.status === 'confirmed' && repository.dirty === true) {
        add('SOURCE_HASH_UNPINNED', `${path}/sha256`, [entry.id], 'Git 工作副本有未提交变化，confirmed 来源需要 sha256 固定当前内容；HEAD 无法固定未提交内容。');
      }
    }
  }
  return result();
}
