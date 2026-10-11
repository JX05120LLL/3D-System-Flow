import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDocument } from '../../src/model/validate.ts';

const basic = (id = 'system'): any => ({
  schemaVersion: '2.0', id, title: '系统',
  view: { kind: 'overview', direction: 'RIGHT', theme: 'dark' },
  nodes: [{ id: 'service', kind: 'process', label: '服务' }], edges: [], groups: [],
});

test('optional revision, file fingerprints and step evidence preserve legacy documents', () => {
  assert.equal(validateDocument(basic()).valid, true);
  const document = basic();
  document.sourceRevision = { commit: 'a'.repeat(40), dirty: true };
  const evidence = { evidenceStatus: 'confirmed', sources: [{ path: 'src/service.ts', line: 3, sha256: 'b'.repeat(64) }] };
  Object.assign(document.nodes[0], evidence);
  document.spatial = { scenarios: [{ id: 'request', label: '请求', steps: [{
    id: 'enter', title: '接收', description: '明确编排的阅读步骤', route: ['service'], focusId: 'service', tone: 'request', ...evidence,
  }] }] };
  const before = JSON.stringify(document);
  const result = validateDocument(document);
  assert.equal(result.valid, true, JSON.stringify(result.diagnostics));
  assert.equal(JSON.stringify(document), before);
});

test('independent embedded views can reuse node IDs and carry explicit bridges', () => {
  const document = basic();
  document.navigation = { views: [{ parentId: 'system', ownerId: 'service', document: basic('service-details') }], bridges: [{
    id: 'delegate', source: { viewId: 'system', nodeId: 'service' }, target: { viewId: 'service-details', nodeId: 'service' },
    kind: 'dependency', directed: true, evidenceStatus: 'assumed',
  }] };
  assert.equal(validateDocument(document).valid, true);
});
