import assert from 'node:assert/strict';
import test from 'node:test';
import type { DiagramDocument } from '../../src/model/types.ts';
import { validateDocument } from '../../src/model/validate.ts';

test('child evidence warnings do not hide root connectivity and reachability diagnostics', () => {
  const child: DiagramDocument = { schemaVersion: '2.0', id: 'child', title: '内部',
    view: { kind: 'overview', direction: 'RIGHT', theme: 'light' }, groups: [], edges: [],
    nodes: [{ id: 'inside', kind: 'process', label: '内部', evidenceStatus: 'confirmed' }] };
  const root: DiagramDocument = { schemaVersion: '2.0', id: 'root', title: '流程',
    view: { kind: 'flow', direction: 'RIGHT', theme: 'light' }, groups: [],
    nodes: [{ id: 'start', kind: 'start', label: '入口' }, { id: 'worker', kind: 'process', label: '处理' }, { id: 'done', kind: 'end', label: '完成' }],
    edges: [{ id: 'local', source: 'worker', target: 'done', kind: 'control', directed: true }],
    navigation: { views: [{ parentId: 'root', ownerId: 'worker', document: child }] } };
  const result = validateDocument(root);
  assert.equal(result.valid, true);
  assert.ok(result.diagnostics.some(item => item.code === 'GRAPH_DISCONNECTED' && item.path === '/nodes'));
  assert.ok(result.diagnostics.some(item => item.code === 'GRAPH_UNREACHABLE' && item.path === '/nodes'));
  const evidence = result.diagnostics.filter(item => item.code === 'SOURCE_MISSING');
  assert.equal(evidence.length, 1);
  assert.equal(evidence[0]!.path, '/navigation/views/0/document/nodes/0/sources');
});
