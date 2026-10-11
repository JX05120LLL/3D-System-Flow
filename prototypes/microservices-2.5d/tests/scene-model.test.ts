import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import type { DiagramDocument } from '../../../src/model/types.ts';
import { createSceneModel, getHighlight, lanes } from '../src/scene-model.ts';

const fixture = (): DiagramDocument => JSON.parse(readFileSync(new URL('../../../tests/fixtures/traditional-microservices.diagram.json', import.meta.url), 'utf8'));
const sorted = (values: Iterable<string>) => [...values].sort();

test('keeps the real fixture nodes and relationships unchanged', () => {
  const document = fixture();
  const before = JSON.stringify(document);
  const model = createSceneModel(document);

  assert.equal(model.nodes.length, 12);
  assert.equal(model.edges.length, 11);
  assert.deepEqual(model.nodes.map(item => item.node), document.nodes);
  assert.deepEqual(model.edges, document.edges);
  assert.equal(JSON.stringify(document), before);
});

test('lays out every card without overlap even when depth is flattened', () => {
  const model = createSceneModel(fixture());

  assert.equal(model.nodes.length, 12);
  for (const node of model.nodes) {
    assert.ok([node.x, node.y, node.z].every(Number.isFinite), node.id);
    const lane = lanes.find(item => item.id === node.laneId);
    assert.ok(lane, node.id);
    assert.equal(node.y, lane.y);
    assert.equal(node.z, lane.z);
    assert.ok(Math.abs(node.x) + 115 <= 800, `${node.id} stays inside its lane`);
  }
  for (let i = 0; i < model.nodes.length; i++) {
    for (let j = i + 1; j < model.nodes.length; j++) {
      const a = model.nodes[i]!;
      const b = model.nodes[j]!;
      assert.ok(Math.abs(a.x - b.x) >= 230 || Math.abs(a.y - b.y) >= 100, `${a.id} overlaps ${b.id}`);
    }
  }
});

test('represents the four display depths without adding coordinates to source nodes', () => {
  const document = fixture();
  const model = createSceneModel(document);

  assert.deepEqual(lanes.map(lane => lane.z), [0, 70, 140, 210]);
  assert.deepEqual(lanes.map(lane => lane.y), [300, 80, -160, -380]);
  assert.equal(model.nodes.find(item => item.id === 'payment-provider')?.laneId, 'external');
  assert.ok(document.nodes.every(node => !('x' in node) && !('y' in node) && !('z' in node)));
});

test('shows every original object when there is no related-path filter', () => {
  const model = createSceneModel(fixture());

  for (const selection of [getHighlight(model, null, 'downstream'), getHighlight(model, 'order', 'none')]) {
    assert.deepEqual(sorted(selection.nodeIds), sorted(model.document.nodes.map(node => node.id)));
    assert.deepEqual(sorted(selection.edgeIds), sorted(model.document.edges.map(edge => edge.id)));
  }
});

test('order upstream follows incoming edges without including its sibling auth service', () => {
  const model = createSceneModel(fixture());
  const highlighted = getHighlight(model, 'order', 'upstream');

  assert.deepEqual(sorted(highlighted.nodeIds), ['customer', 'gateway', 'order']);
  assert.deepEqual(sorted(highlighted.edgeIds), ['gateway-order', 'request-gateway']);
});

test('order downstream includes exactly the reachable services and data stores', () => {
  const model = createSceneModel(fixture());
  const highlighted = getHighlight(model, 'order', 'downstream');

  assert.deepEqual(sorted(highlighted.nodeIds), sorted(['order', 'inventory', 'payment', 'order-db', 'inventory-db', 'payment-db', 'payment-provider', 'event-bus', 'notify']));
  assert.deepEqual(sorted(highlighted.edgeIds), sorted(['order-inventory', 'order-payment', 'order-order-db', 'inventory-inventory-db', 'payment-payment-db', 'payment-provider', 'order-event-bus', 'event-bus-notify']));
});

test('rejects an unknown selected node instead of illuminating the entire graph', () => {
  const model = createSceneModel(fixture());

  assert.throws(() => getHighlight(model, 'missing', 'upstream'), /missing/);
  assert.throws(() => getHighlight(model, 'missing', 'none'), /missing/);
});

test('reports missing, unknown, and duplicate fixture nodes as configuration errors', () => {
  const missing = fixture();
  missing.nodes = missing.nodes.filter(node => node.id !== 'order');
  assert.throws(() => createSceneModel(missing), /order/);

  const unknown = fixture();
  unknown.nodes.push({ id: 'unknown-service', kind: 'process', label: 'Unknown' });
  assert.throws(() => createSceneModel(unknown), /unknown-service/);

  const duplicate = fixture();
  duplicate.nodes.push({ ...duplicate.nodes[0]! });
  assert.throws(() => createSceneModel(duplicate), /customer/);
});

test('rejects dangling endpoints and duplicate edge IDs', () => {
  const dangling = fixture();
  dangling.edges[0]!.target = 'missing-target';
  assert.throws(() => createSceneModel(dangling), /missing-target/);

  const duplicate = fixture();
  duplicate.edges.push({ ...duplicate.edges[0]! });
  assert.throws(() => createSceneModel(duplicate), /request-gateway/);
});
