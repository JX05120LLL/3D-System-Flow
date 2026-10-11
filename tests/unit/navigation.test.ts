import test from 'node:test';
import assert from 'node:assert/strict';
import type { DiagramDocument } from '../../src/model/types.ts';
import { validateDocument } from '../../src/model/validate.ts';
import { normalizeScene } from '../../src/spatial/scene.ts';
import { buildNavigation } from '../../src/model/navigation.ts';

function graph(id: string, label = id): DiagramDocument {
  return { schemaVersion: '2.0', id, title: label, view: { kind: 'overview', direction: 'RIGHT', theme: 'dark' },
    nodes: [{ id: 'shared', kind: 'process', label }], edges: [], groups: [] };
}

export function navigationFixture(): DiagramDocument {
  const root = graph('root', '系统');
  root.nodes.push({ id: 'root-only', kind: 'process', label: '仅根节点' });
  root.spatial = { interiors: [{ owner: 'shared', nodes: [{ id: 'part', kind: 'process', label: '根组件' }], edges: [] }],
    scenarios: [{ id: 'journey', label: '跨图请求', steps: [
      { id: 'root-step', title: '根步骤', description: '根组件', route: ['part'], focusId: 'part', tone: 'request', durationMs: 60000 },
      { id: 'child-step', title: '子步骤', description: '子组件', viewId: 'child', route: ['part'], focusId: 'part', tone: 'data', durationMs: 60000 },
      { id: 'leaf-step', title: '叶步骤', description: '叶节点', viewId: 'leaf', route: ['shared'], focusId: 'shared', tone: 'success', durationMs: 60000 },
    ] }] };
  const child = graph('child', '子系统');
  child.spatial = { interiors: [{ owner: 'shared', nodes: [{ id: 'part', kind: 'process', label: '子组件' }], edges: [] }] };
  root.navigation = { views: [
    { parentId: 'root', ownerId: 'shared', document: child },
    { parentId: 'child', ownerId: 'part', document: graph('leaf', '叶系统') },
  ], bridges: [{ id: 'cross', source: { viewId: 'root', nodeId: 'part' }, target: { viewId: 'child', nodeId: 'part' },
    kind: 'dependency', directed: true, label: '源码关联', details: '明确的跨视图职责', evidenceStatus: 'assumed', sources: [{ path: 'src/demo.ts', line: 3 }] }] };
  return root;
}

test('navigation permits repeated node IDs across views and resolves authored cross-view steps', () => {
  const root = navigationFixture();
  assert.equal(validateDocument(root).valid, true);
  const scene = normalizeScene(root);
  assert.deepEqual(scene.scenarios[0]!.steps.map(step => step.viewId), ['root', 'child', 'leaf']);
  assert.deepEqual(scene.scenarios[0]!.steps.map(step => step.openModules), [['shared'], ['shared'], []]);
});

test('navigation validates parent chains, owner entries, bridges, and per-view step references', () => {
  const cases: [string, string, (root: DiagramDocument) => void][] = [
    ['NAVIGATION_PARENT_MISSING', '/navigation/views/0/parentId', d => { d.navigation!.views[0]!.parentId = 'missing'; }],
    ['NAVIGATION_OWNER_MISSING', '/navigation/views/0/ownerId', d => { d.navigation!.views[0]!.ownerId = 'missing'; }],
    ['NAVIGATION_VIEW_DUPLICATE', '/navigation/views/1/document/id', d => { d.navigation!.views[1]!.document.id = 'root'; }],
    ['NAVIGATION_ENTRY_DUPLICATE', '/navigation/views/1/ownerId', d => { d.navigation!.views[1]!.parentId = 'root'; d.navigation!.views[1]!.ownerId = 'shared'; }],
    ['NAVIGATION_CYCLE', '/navigation/views/0/parentId', d => { d.navigation!.views[0]!.parentId = 'leaf'; }],
    ['NAVIGATION_BRIDGE_NODE_MISSING', '/navigation/bridges/0/target/nodeId', d => { d.navigation!.bridges![0]!.target.nodeId = 'root-only'; }],
    ['NAVIGATION_BRIDGE_VIEW_MISSING', '/navigation/bridges/0/target/viewId', d => { d.navigation!.bridges![0]!.target.viewId = 'missing'; }],
    ['NAVIGATION_BRIDGE_DUPLICATE', '/navigation/bridges/1/id', d => { d.navigation!.bridges!.push(structuredClone(d.navigation!.bridges![0]!)); }],
    ['FLOW_EDGE_UNDIRECTED', '/navigation/bridges/0/directed', d => { d.navigation!.bridges![0]!.kind = 'control'; d.navigation!.bridges![0]!.directed = false; }],
    ['SPATIAL_STEP_VIEW_MISSING', '/spatial/scenarios/0/steps/1/viewId', d => { d.spatial!.scenarios![0]!.steps[1]!.viewId = 'missing'; }],
    ['SPATIAL_ROUTE_NODE_MISSING', '/spatial/scenarios/0/steps/1/route/0', d => { d.spatial!.scenarios![0]!.steps[1]!.route = ['root-only']; }],
    ['SPATIAL_FOCUS_NODE_MISSING', '/spatial/scenarios/0/steps/1/focusId', d => { d.spatial!.scenarios![0]!.steps[1]!.focusId = 'root-only'; }],
    ['EDGE_TARGET_MISSING', '/navigation/views/0/document/edges/0/target', d => { d.navigation!.views[0]!.document.edges.push({ id: 'bad', source: 'shared', target: 'missing', kind: 'dependency', directed: true }); }],
  ];
  for (const [code, path, mutate] of cases) {
    const root = navigationFixture(); mutate(root);
    assert.ok(validateDocument(root).diagnostics.some(d => d.code === code && d.path === path), `${code} ${path}`);
  }
});

test('navigation lookup keeps ancestor order, internal entry points, evidence, and local node namespaces', () => {
  const root = navigationFixture(), before = JSON.stringify(root);
  const navigation = buildNavigation(root);
  assert.deepEqual(navigation.getAncestors('leaf').map(view => view.id), ['root', 'child']);
  assert.deepEqual(navigation.getAncestors('root'), []);
  assert.equal(navigation.getChild('child', 'part')?.document.id, 'leaf');
  assert.equal(navigation.getChild('root', 'part'), undefined);
  assert.equal(navigation.getChildren('root').length, 1);
  assert.equal(navigation.getNode('root', 'part')?.label, '根组件');
  assert.equal(navigation.getNode('child', 'part')?.label, '子组件');
  assert.equal(navigation.getNode('child', 'root-only'), undefined);
  assert.equal(navigation.getView('root')?.navigation, undefined);
  assert.equal(navigation.getView('root')?.spatial?.scenarios?.length, 1);
  assert.deepEqual(navigation.getBridges('child', 'part')[0]?.sources, [{ path: 'src/demo.ts', line: 3 }]);
  assert.equal(navigation.getBridges('leaf', 'shared').length, 0);
  const child = normalizeScene(root, 'child');
  assert.equal(child.document.id, 'child');
  assert.equal(child.documents.shared!.nodes[0]!.label, '子组件');
  assert.equal(child.document.edges.length, 0, 'bridges never enter local graph edges');
  assert.throws(() => normalizeScene(root, 'unknown'), /未知视图/);
  assert.equal(JSON.stringify(root), before);
});

test('navigation forbids nested navigation and child scenarios and caps the whole embedded document', () => {
  for (const mutate of [
    (d: any) => { d.navigation.views[0].document.navigation = { views: [] }; },
    (d: any) => { d.navigation.views[0].document.spatial.scenarios = d.spatial.scenarios; },
    (d: DiagramDocument) => { d.navigation!.views[0]!.document.description = 'a'.repeat(2 * 1024 * 1024); },
    (d: DiagramDocument) => { d.navigation!.views = Array.from({ length: 21 }, (_, i) => ({ parentId: 'root', ownerId: 'shared', document: graph(`view-${i}`) })); },
  ]) {
    const root = navigationFixture(); mutate(root);
    assert.equal(validateDocument(root).valid, false);
  }
});

test('navigation allows four parent jumps and enforces each view limit independently', () => {
  const root = navigationFixture();
  root.navigation!.views.push({ parentId: 'leaf', ownerId: 'shared', document: graph('third') }, { parentId: 'third', ownerId: 'shared', document: graph('fourth') });
  assert.equal(validateDocument(root).valid, true);
  root.navigation!.views.push({ parentId: 'fourth', ownerId: 'shared', document: graph('fifth') });
  assert.ok(validateDocument(root).diagnostics.some(d => d.code === 'NAVIGATION_DEPTH_LIMIT'));
  root.navigation!.views.pop();
  root.navigation!.views[1]!.document.nodes = Array.from({ length: 100 }, (_, i) => ({ id: i === 0 ? 'shared' : `node-${i}`, kind: 'process', label: String(i) }));
  assert.equal(validateDocument(root).valid, true, 'total across views may exceed 100');
  root.navigation!.views[0]!.document.spatial!.interiors![0]!.nodes = Array.from({ length: 100 }, (_, i) => ({ id: i === 0 ? 'part' : `part-${i}`, kind: 'process', label: String(i) }));
  assert.ok(validateDocument(root).diagnostics.some(d => d.code === 'SPATIAL_NODE_LIMIT' && d.path === '/navigation/views/0/document/spatial/interiors'));
});
