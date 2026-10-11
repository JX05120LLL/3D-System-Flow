import assert from 'node:assert/strict';
import test from 'node:test';
import type { DiagramDocument } from '../../src/model/types.ts';

function fixture(count = 6): DiagramDocument {
  return {
    schemaVersion: '2.0', id: 'layout', title: '处理流水线',
    view: { kind: 'overview', direction: 'RIGHT', theme: 'light' },
    nodes: [{ id: 'ingress', kind: 'start', label: '输入' }, { id: 'processor', kind: 'process', label: '处理器' }, { id: 'storage', kind: 'store', label: '存储' }],
    edges: [{ id: 'in', source: 'ingress', target: 'processor', kind: 'control', directed: true }, { id: 'out', source: 'processor', target: 'storage', kind: 'data', directed: true }],
    groups: [],
    spatial: { interiors: [{ owner: 'processor', nodes: Array.from({ length: count }, (_, i) => ({ id: `component-${i}`, kind: 'process', label: `组件 ${i}` })), edges: [] }] },
  };
}

test('generic layout is deterministic, follows root relationships and leaves input untouched', async () => {
  const { normalizeScene } = await import('../../src/spatial/scene.ts');
  const { createWorldLayout } = await import('../../src/spatial/layout.ts');
  const doc = fixture(); const before = JSON.stringify(doc);
  const layout = createWorldLayout(normalizeScene(doc));
  const ordered = [...layout.overview].sort((a, b) => a.id < b.id ? -1 : 1);
  doc.nodes.reverse(); doc.edges.reverse(); doc.spatial!.interiors![0]!.nodes.reverse();
  const other = createWorldLayout(normalizeScene(doc));
  assert.deepEqual(ordered, [...other.overview].sort((a, b) => a.id < b.id ? -1 : 1));
  assert.deepEqual([...layout.interior].sort((a, b) => a.id < b.id ? -1 : 1), [...other.interior].sort((a, b) => a.id < b.id ? -1 : 1));
  doc.nodes.reverse(); doc.edges.reverse(); doc.spatial!.interiors![0]!.nodes.reverse();
  assert.equal(JSON.stringify(doc), before);
  const position = (id: string) => layout.overview.find(n => n.id === id)!.position;
  assert.ok(position('ingress')[0] < position('processor')[0]);
  assert.ok(position('processor')[0] < position('storage')[0]);
});

test('shells grow with their interiors and contain every separate internal footprint', async () => {
  const { normalizeScene } = await import('../../src/spatial/scene.ts');
  const { createWorldLayout } = await import('../../src/spatial/layout.ts');
  let smallSize: number[] | undefined;
  for (const count of [1, 6, 36, 97]) {
    const layout = createWorldLayout(normalizeScene(fixture(count)));
    const shell = layout.overview.find(n => n.id === 'processor')!;
    assert.equal(shell.shape, 'shell');
    if (count === 1) smallSize = shell.size;
    if (count === 36) assert.ok(shell.size[0] > smallSize![0]! && shell.size[2] > smallSize![2]!);
    assert.equal(layout.interior.length, count);
    for (const inner of layout.interior) {
      assert.equal(inner.owner, shell.id);
      for (const axis of [0, 2] as const) assert.ok(Math.abs(inner.position[axis] - shell.position[axis]) + inner.size[axis] / 2 <= shell.size[axis] / 2 - 1, `${count}: ${inner.id} within shell`);
      assert.ok(inner.position[1] >= 0 && inner.position[1] + inner.size[1] < shell.size[1]);
    }
    for (let i = 0; i < layout.interior.length; i++) for (let j = i + 1; j < layout.interior.length; j++) {
      const a = layout.interior[i]!; const b = layout.interior[j]!;
      assert.ok(Math.abs(a.position[0] - b.position[0]) >= (a.size[0] + b.size[0]) / 2 || Math.abs(a.position[2] - b.position[2]) >= (a.size[2] + b.size[2]) / 2, `${a.id}/${b.id} separate`);
    }
  }
});

test('cycles, self loops, disconnected nodes and DOWN diagrams produce finite nonoverlapping root positions', async () => {
  const { normalizeScene } = await import('../../src/spatial/scene.ts');
  const { createWorldLayout } = await import('../../src/spatial/layout.ts');
  const doc = fixture(1); doc.view.direction = 'DOWN';
  doc.edges.push({ id: 'cycle', source: 'storage', target: 'ingress', kind: 'feedback', directed: true }, { id: 'self', source: 'processor', target: 'processor', kind: 'data', directed: true });
  doc.nodes.push({ id: 'isolated', kind: 'external', label: '独立外部系统' });
  const layout = createWorldLayout(normalizeScene(doc));
  for (const n of [...layout.overview, ...layout.interior]) assert.ok([...n.position, ...n.size].every(Number.isFinite));
  for (let i = 0; i < layout.overview.length; i++) for (let j = i + 1; j < layout.overview.length; j++) {
    const a = layout.overview[i]!; const b = layout.overview[j]!;
    assert.ok(Math.abs(a.position[0] - b.position[0]) >= (a.size[0] + b.size[0]) / 2 || Math.abs(a.position[2] - b.position[2]) >= (a.size[2] + b.size[2]) / 2);
  }
  const down = fixture(1); down.view.direction = 'DOWN';
  const downLayout = createWorldLayout(normalizeScene(down));
  assert.ok(downLayout.overview.find(n => n.id === 'ingress')!.position[2] < downLayout.overview.find(n => n.id === 'storage')!.position[2]);
});

test('authored models override defaults, groups supply regions and routes resolve either graph without aliasing', async () => {
  const { normalizeScene } = await import('../../src/spatial/scene.ts');
  const { createWorldLayout, getRoutePositions } = await import('../../src/spatial/layout.ts');
  const doc = fixture();
  doc.groups = [{ id: 'processing', label: '处理域' }]; doc.nodes[1]!.groupId = 'processing'; doc.nodes[2]!.groupId = 'processing';
  doc.spatial!.models = [{ nodeId: 'storage', shape: 'ledger', color: '#Aa33ff', shortLabel: '归档' }];
  const layout = createWorldLayout(normalizeScene(doc));
  const storage = layout.overview.find(n => n.id === 'storage')!;
  assert.equal(storage.shape, 'ledger'); assert.equal(storage.color, '#Aa33ff'); assert.equal(storage.shortLabel, '归档');
  assert.equal(layout.regions[0]!.label, '处理域');
  const reversed = structuredClone(doc); reversed.nodes.reverse();
  assert.deepEqual(createWorldLayout(normalizeScene(reversed)).regions, layout.regions, 'region color and bounds must be deterministic too');
  const route = getRoutePositions(layout, ['processor', 'component-0', 'storage']);
  assert.deepEqual(route[2], storage.position); route[2]![0] += 1;
  assert.notEqual(route[2]![0], storage.position[0]);
  assert.throws(() => getRoutePositions(layout, ['missing']), /missing/);
  delete doc.spatial;
  const legacy = createWorldLayout(normalizeScene(doc));
  assert.equal(legacy.interior.length, 0); assert.equal(legacy.overview.length, 3);
});
