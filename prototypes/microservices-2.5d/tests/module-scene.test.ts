import assert from 'node:assert/strict';
import test from 'node:test';
import type { DiagramDocument } from '../../../src/model/types.ts';
import { createModuleSceneModel, getHighlight } from '../src/scene-model.ts';

const fixture = (): DiagramDocument => ({
  schemaVersion: '2.0', id: 'internal', title: '教学模块', view: { kind: 'overview', direction: 'DOWN', theme: 'light' },
  groups: [{ id: 'entry', label: '接入' }, { id: 'business', label: '处理' }, { id: 'data', label: '结果' }],
  nodes: [
    { id: 'input', kind: 'start', label: '请求', groupId: 'entry' },
    { id: 'validate', kind: 'process', label: '校验', groupId: 'business' },
    { id: 'execute', kind: 'process', label: '执行', groupId: 'business' },
    { id: 'result', kind: 'end', label: '结果', groupId: 'data' },
  ],
  edges: [
    { id: 'a', source: 'input', target: 'validate', kind: 'control', directed: true },
    { id: 'b', source: 'validate', target: 'execute', kind: 'control', directed: true },
    { id: 'c', source: 'execute', target: 'result', kind: 'data', directed: true },
  ],
});

test('module layout preserves authored nodes and edges and avoids overlap in flat mode', () => {
  const document = fixture(); const before = JSON.stringify(document);
  const model = createModuleSceneModel(document);
  assert.equal(JSON.stringify(document), before);
  assert.deepEqual(model.lanes.map(lane => lane.label), ['接入', '处理', '结果']);
  assert.deepEqual(model.lanes.map(lane => lane.z), [0, 100, 200]);
  for (const node of model.nodes) {
    assert.equal(node.node, document.nodes.find(item => item.id === node.id));
    assert.ok(Math.abs(node.x) + 115 < 560);
    for (const other of model.nodes.filter(item => item.id !== node.id)) {
      assert.ok(Math.abs(node.x - other.x) >= 230 || Math.abs(node.y - other.y) >= 100);
    }
  }
  assert.deepEqual(model.edges, document.edges);
});

test('internal upstream and downstream use only the current module graph', () => {
  const model = createModuleSceneModel(fixture());
  assert.deepEqual([...getHighlight(model, 'execute', 'upstream').nodeIds].sort(), ['execute', 'input', 'validate']);
  assert.deepEqual([...getHighlight(model, 'execute', 'downstream').nodeIds].sort(), ['execute', 'result']);
  assert.throws(() => getHighlight(model, 'order', 'upstream'), /order/);
});

test('rejects empty modules, missing lanes and duplicate nodes', () => {
  const empty = fixture(); empty.nodes = []; assert.throws(() => createModuleSceneModel(empty), /没有节点/);
  const missing = fixture(); missing.nodes[0]!.groupId = 'unknown'; assert.throws(() => createModuleSceneModel(missing), /分组无效/);
  const duplicate = fixture(); duplicate.nodes.push({ ...duplicate.nodes[0]! }); assert.throws(() => createModuleSceneModel(duplicate), /重复/);
});

test('rejects overflowing rows, dangling edges and duplicate edge IDs', () => {
  const overflow = fixture();
  overflow.nodes.push(...['extra-a', 'extra-b'].map(id => ({ id, kind: 'process' as const, label: id, groupId: 'business' })));
  assert.throws(() => createModuleSceneModel(overflow), /超过 3/);
  const dangling = fixture(); dangling.edges[0]!.target = 'unknown'; assert.throws(() => createModuleSceneModel(dangling), /不存在/);
  const duplicate = fixture(); duplicate.edges.push({ ...duplicate.edges[0]! }); assert.throws(() => createModuleSceneModel(duplicate), /重复/);
});
