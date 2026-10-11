import assert from 'node:assert/strict';
import test from 'node:test';
import type { DiagramDocument } from '../../src/model/types.ts';
import * as model from '../../src/model/evidence.ts';

function document(): DiagramDocument {
  return {
    schemaVersion: '2.0', id: 'root', title: '来源',
    view: { kind: 'overview', direction: 'RIGHT', theme: 'light' },
    nodes: [{ id: 'owner', kind: 'process', label: '模块', evidenceStatus: 'confirmed' }],
    edges: [{ id: 'e', source: 'owner', target: 'owner', kind: 'dependency', directed: true, evidenceStatus: 'confirmed', sources: [] }],
    groups: [],
    spatial: {
      interiors: [{ owner: 'owner', nodes: [{ id: 'inside', kind: 'process', label: '内部', evidenceStatus: 'confirmed' }], edges: [] }],
      scenarios: [{ id: 'run', label: '步骤', steps: [{ id: 'step', title: '执行', description: '', route: ['owner'], focusId: 'owner', tone: 'request', evidenceStatus: 'confirmed' }] }],
    },
    navigation: {
      views: [{ parentId: 'root', ownerId: 'owner', document: {
        schemaVersion: '2.0', id: 'child', title: '子图', view: { kind: 'overview', direction: 'RIGHT', theme: 'light' },
        nodes: [{ id: 'child-node', kind: 'process', label: '子模块', evidenceStatus: 'confirmed', sources: [{ path: '   ' }] }],
        edges: [], groups: [],
        spatial: { interiors: [{ owner: 'child-node', nodes: [{ id: 'child-inside', kind: 'process', label: '子内部', evidenceStatus: 'confirmed' }], edges: [] }] },
      } }],
      bridges: [{ id: 'bridge', source: { viewId: 'root', nodeId: 'owner' }, target: { viewId: 'child', nodeId: 'child-node' }, kind: 'dependency', directed: true, evidenceStatus: 'confirmed' }],
    },
  };
}

test('confirmed objects in all views, interiors, root steps and bridges require a nonempty source', () => {
  const doc = document();
  const before = JSON.stringify(doc);
  const warnings = model.collectEvidenceWarnings(doc);
  assert.deepEqual(warnings.map(item => item.path).sort(), [
    '/nodes/0/sources', '/edges/0/sources', '/spatial/interiors/0/nodes/0/sources',
    '/spatial/scenarios/0/steps/0/sources', '/navigation/views/0/document/nodes/0/sources',
    '/navigation/views/0/document/spatial/interiors/0/nodes/0/sources', '/navigation/bridges/0/sources',
  ].sort());
  assert.ok(warnings.every(item => item.code === 'SOURCE_MISSING' && item.severity === 'warning'));
  assert.equal(JSON.stringify(doc), before);
});

test('unmarked description objects default to assumed without requiring evidence', () => {
  const doc = document();
  doc.nodes = [{ id: 'owner', kind: 'process', label: '描述' }];
  doc.edges = []; delete doc.spatial; delete doc.navigation;
  assert.deepEqual(model.collectEvidenceWarnings(doc), []);
  doc.nodes[0]!.evidenceStatus = 'confirmed';
  doc.nodes[0]!.sources = [{ path: 'src/真实文件.ts', line: 1 }];
  assert.deepEqual(model.collectEvidenceWarnings(doc), []);
});
