import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { validateDocument } from '../../src/model/validate.ts';
import type { DiagramDocument } from '../../src/model/types.ts';

function fixture(): any {
  return {
    schemaVersion: '2.0', id: 'spatial', title: '文档处理',
    view: { kind: 'overview', direction: 'RIGHT', theme: 'light' }, groups: [],
    nodes: [{ id: 'parser', kind: 'process', label: '解析器' }, { id: 'indexer', kind: 'process', label: '索引器' }],
    edges: [{ id: 'root-link', source: 'parser', target: 'indexer', kind: 'data', directed: true }],
    spatial: {
      interiors: [
        { owner: 'parser', nodes: [{ id: 'read-text', kind: 'process', label: '读取文本' }, { id: 'split-text', kind: 'process', label: '切分文本' }], edges: [{ id: 'parse-link', source: 'read-text', target: 'split-text', kind: 'control', directed: true }] },
        { owner: 'indexer', nodes: [{ id: 'embed-text', kind: 'process', label: '向量化' }], edges: [] },
      ],
      models: [{ nodeId: 'parser', shape: 'shell', color: '#3af', shortLabel: '解析器' }],
      scenarios: [{ id: 'ingest', label: '建立索引', steps: [{ id: 'read', title: '读取文档', description: '教学路径', route: ['parser', 'read-text', 'split-text', 'embed-text'], focusId: 'split-text', tone: 'data' }] }],
    },
  };
}

test('spatial extension is optional, accepts explicit interiors and does not mutate input', () => {
  const doc = fixture(); const before = JSON.stringify(doc);
  assert.equal(validateDocument(doc).valid, true);
  assert.equal(JSON.stringify(doc), before);
  for (const spatial of [undefined, {}, { models: [] }, { scenarios: [] }, { interiors: [] }]) {
    const copy = fixture(); copy.spatial = spatial;
    if (spatial === undefined) delete copy.spatial;
    assert.equal(validateDocument(copy).valid, true);
  }
});

test('spatial rejects unknown owners and duplicate owners, nodes and edge IDs with precise paths', () => {
  for (const [mutate, code, path] of [
    [(d: any) => { d.spatial.interiors[0].owner = 'missing'; }, 'SPATIAL_OWNER_MISSING', '/spatial/interiors/0/owner'],
    [(d: any) => { d.spatial.interiors[1].owner = 'parser'; }, 'SPATIAL_OWNER_DUPLICATE', '/spatial/interiors/1/owner'],
    [(d: any) => { d.spatial.interiors[1].nodes[0].id = 'read-text'; }, 'ID_DUPLICATE', '/spatial/interiors/1/nodes/0/id'],
    [(d: any) => { d.spatial.interiors[0].nodes[0].id = 'parser'; }, 'ID_DUPLICATE', '/spatial/interiors/0/nodes/0/id'],
    [(d: any) => { d.spatial.interiors[0].edges[0].id = 'root-link'; }, 'EDGE_ID_DUPLICATE', '/spatial/interiors/0/edges/0/id'],
  ] as const) {
    const doc = fixture(); mutate(doc);
    const result = validateDocument(doc);
    assert.equal(result.valid, false);
    assert.ok(result.diagnostics.some(d => d.code === code && d.path === path), JSON.stringify(result.diagnostics));
  }
});

test('root edges stay in the root graph and each interior edge stays in its owner', () => {
  for (const [mutate, path] of [
    [(d: any) => { d.edges[0].target = 'read-text'; }, '/edges/0/target'],
    [(d: any) => { d.spatial.interiors[0].edges[0].target = 'embed-text'; }, '/spatial/interiors/0/edges/0/target'],
    [(d: any) => { d.spatial.interiors[0].edges[0].source = 'parser'; }, '/spatial/interiors/0/edges/0/source'],
  ] as const) {
    const doc = fixture(); mutate(doc);
    assert.ok(validateDocument(doc).diagnostics.some(d => d.path === path), path);
  }
});

test('internal decisions and flow edges retain existing branch and direction rules', () => {
  const doc = fixture(); const inside = doc.spatial.interiors[0];
  inside.nodes[0].kind = 'decision';
  assert.ok(validateDocument(doc).diagnostics.some(d => d.code === 'DECISION_BRANCH_COUNT' && d.path === '/spatial/interiors/0/nodes/0/kind'));
  inside.edges[0].directed = false;
  assert.ok(validateDocument(doc).diagnostics.some(d => d.code === 'FLOW_EDGE_UNDIRECTED'));
  inside.edges[0].directed = true;
  inside.edges.push({ ...inside.edges[0], id: 'second-branch', kind: 'exception', label: '是' });
  inside.edges[0].label = '否';
  assert.equal(validateDocument(doc).valid, true);
  inside.edges[0].label = '是';
  assert.ok(validateDocument(doc).diagnostics.some(d => d.code === 'DECISION_CONDITION_DUPLICATE'));
});

test('spatial validates all appearance and choreography references and uniqueness', () => {
  for (const [mutate, code, path] of [
    [(d: any) => { d.spatial.models[0].nodeId = 'missing'; }, 'SPATIAL_MODEL_NODE_MISSING', '/spatial/models/0/nodeId'],
    [(d: any) => { d.spatial.models.push(d.spatial.models[0]); }, 'SPATIAL_MODEL_DUPLICATE', '/spatial/models/1/nodeId'],
    [(d: any) => { d.spatial.scenarios.push(d.spatial.scenarios[0]); }, 'SPATIAL_SCENARIO_DUPLICATE', '/spatial/scenarios/1/id'],
    [(d: any) => { d.spatial.scenarios[0].steps.push(d.spatial.scenarios[0].steps[0]); }, 'SPATIAL_STEP_DUPLICATE', '/spatial/scenarios/0/steps/1/id'],
    [(d: any) => { d.spatial.scenarios[0].steps[0].route.push('missing'); }, 'SPATIAL_ROUTE_NODE_MISSING', '/spatial/scenarios/0/steps/0/route/4'],
    [(d: any) => { d.spatial.scenarios[0].steps[0].focusId = 'missing'; }, 'SPATIAL_FOCUS_NODE_MISSING', '/spatial/scenarios/0/steps/0/focusId'],
  ] as const) {
    const doc = fixture(); mutate(doc);
    assert.ok(validateDocument(doc).diagnostics.some(d => d.code === code && d.path === path), path);
  }
  for (const color of ['red', '#zz0000', 'url(javascript:alert(1))', '#ffffff00']) {
    const doc = fixture(); doc.spatial.models[0].color = color;
    assert.equal(validateDocument(doc).valid, false, color);
  }
  for (const durationMs of [0, -1, .5, 1e308]) {
    const doc = fixture(); doc.spatial.scenarios[0].steps[0].durationMs = durationMs;
    assert.equal(validateDocument(doc).valid, false, String(durationMs));
  }
});

test('node and edge limits count the root graph and every interior together', () => {
  const doc = fixture(); delete doc.spatial.models; delete doc.spatial.scenarios;
  doc.spatial.interiors[0].nodes = Array.from({ length: 97 }, (_, i) => ({ id: `inner-${i}`, kind: 'process', label: `内部 ${i}` }));
  doc.spatial.interiors[0].edges = Array.from({ length: 299 }, (_, i) => ({ id: `inside-edge-${i}`, source: 'inner-0', target: 'inner-1', kind: 'data', directed: true }));
  assert.equal(validateDocument(doc).valid, true, '100 total nodes and 300 total edges are inclusive');
  doc.spatial.interiors[1].nodes.push({ id: 'extra-node', kind: 'process', label: '超限' });
  assert.ok(validateDocument(doc).diagnostics.some(d => d.code === 'SPATIAL_NODE_LIMIT'));
  doc.spatial.interiors[1].nodes.pop();
  doc.spatial.interiors[1].edges.push({ id: 'extra-edge', source: 'embed-text', target: 'embed-text', kind: 'data', directed: true });
  assert.ok(validateDocument(doc).diagnostics.some(d => d.code === 'SPATIAL_EDGE_LIMIT'));
});

test('normalization preserves explicit ownership, safely supports dictionary keys and invents no internals or scenarios', async () => {
  const { normalizeScene, ownerOf } = await import('../../src/spatial/scene.ts');
  const doc = fixture(); doc.nodes[0].id = '__proto__'; doc.edges[0].source = '__proto__';
  doc.spatial.interiors[0].owner = '__proto__'; doc.spatial.models[0].nodeId = '__proto__';
  doc.spatial.scenarios[0].steps[0].route[0] = '__proto__';
  doc.groups = [{ id: 'content', label: '内容处理' }]; doc.nodes[0].groupId = 'content';
  doc.spatial.interiors[0].nodes[0].groupId = 'content';
  const before = JSON.stringify(doc); const scene = normalizeScene(doc);
  assert.deepEqual(scene.moduleIds, ['__proto__', 'indexer']);
  assert.equal(ownerOf(scene, 'read-text'), '__proto__');
  assert.equal(ownerOf(scene, '__proto__'), '__proto__');
  assert.equal(ownerOf(scene, 'unknown/child'), null);
  assert.equal(ownerOf(scene, null), null);
  assert.equal(scene.documents.__proto__!.nodes.length, 2);
  assert.equal(validateDocument(scene.documents.__proto__).valid, true);
  assert.deepEqual(scene.scenarios[0]!.steps[0]!.openModules, ['__proto__', 'indexer']);
  assert.equal(scene.scenarios[0]!.steps[0]!.durationMs, 2200);
  assert.equal(JSON.stringify(doc), before);
  const legacy = structuredClone(doc); delete legacy.spatial;
  const oldScene = normalizeScene(legacy);
  assert.deepEqual(oldScene.moduleIds, []); assert.deepEqual(oldScene.scenarios, []);
  assert.equal(Object.keys(oldScene.documents).length, 0);
  const bad = fixture(); bad.spatial.interiors[0].owner = 'missing';
  assert.throws(() => normalizeScene(bad), /SPATIAL_OWNER_MISSING/);
});

test('formal spatial examples are standalone valid documents with explicit complete routes', () => {
  for (const file of ['microservices-spatial', 'document-pipeline-spatial']) {
    const doc = JSON.parse(readFileSync(new URL(`../../system-flow/examples/${file}.diagram.json`, import.meta.url), 'utf8')) as DiagramDocument;
    assert.equal(validateDocument(doc).valid, true, file);
    assert.ok(doc.spatial!.interiors!.length >= 2);
    assert.ok(doc.spatial!.scenarios!.length >= 1);
    if (file === 'microservices-spatial') {
      assert.equal(doc.nodes.length, 12);
      assert.equal(doc.spatial!.interiors!.reduce((sum, inside) => sum + inside.nodes.length, 0), 16);
      assert.deepEqual(doc.spatial!.scenarios!.map(s => s.steps.length), [16, 10, 15]);
    } else assert.ok(doc.spatial!.interiors!.flatMap(i => i.nodes).every(n => !n.id.includes('/')));
  }
});
