import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createServiceDocuments, SERVICE_IDS } from '../src/service-documents.ts';
import type { DiagramDocument } from '../../../src/model/types.ts';
import { createWorldLayout, getRoutePositions } from '../src/world-layout.ts';

const fixture = (): DiagramDocument => JSON.parse(readFileSync(new URL('../../../tests/fixtures/traditional-microservices.diagram.json', import.meta.url), 'utf8'));

test('covers all original modules and all three teaching interiors without changing their documents', () => {
  const overview = fixture(), documents = createServiceDocuments();
  const before = JSON.stringify({ overview, documents });
  const layout = createWorldLayout(overview, documents);
  assert.equal(layout.overview.length, 12);
  assert.equal(layout.interior.length, 16);
  assert.equal(new Set([...layout.overview, ...layout.interior].map(node => node.id)).size, 28);
  assert.equal(JSON.stringify({ overview, documents }), before);
  for (const placed of [...layout.overview, ...layout.interior]) {
    assert.ok([...placed.position, ...placed.size].every(Number.isFinite), placed.id);
    assert.ok(placed.size.every(size => size > 0), placed.id);
    assert.strictEqual(placed.node, (placed.owner ? documents[placed.owner] : overview).nodes.find(node => node.id === placed.id));
    assert.equal(placed.interior, placed.owner !== null);
  }
});

test('places the twelve volumetric modules on the ground without overlapping footprints', () => {
  const nodes = createWorldLayout(fixture(), createServiceDocuments()).overview;
  for (const node of nodes) assert.equal(node.position[1], 0, node.id);
  for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i]!, b = nodes[j]!;
    assert.ok(Math.abs(a.position[0] - b.position[0]) >= (a.size[0] + b.size[0]) / 2 + .4
      || Math.abs(a.position[2] - b.position[2]) >= (a.size[2] + b.size[2]) / 2 + .4, `${a.id} overlaps ${b.id}`);
  }
});

test('places each interior inside its owning shell footprint with clear gaps', () => {
  const layout = createWorldLayout(fixture(), createServiceDocuments());
  for (const node of layout.interior) {
    const shell = layout.overview.find(shell => shell.id === node.owner)!;
    assert.ok(Math.abs(node.position[0] - shell.position[0]) + node.size[0] / 2 < shell.size[0] / 2, node.id);
    assert.ok(Math.abs(node.position[2] - shell.position[2]) + node.size[2] / 2 < shell.size[2] / 2, node.id);
  }
  for (let i = 0; i < layout.interior.length; i++) for (let j = i + 1; j < layout.interior.length; j++) {
    const a = layout.interior[i]!, b = layout.interior[j]!;
    assert.ok(Math.abs(a.position[0] - b.position[0]) >= (a.size[0] + b.size[0]) / 2 + .4
      || Math.abs(a.position[2] - b.position[2]) >= (a.size[2] + b.size[2]) / 2 + .4, `${a.id} overlaps ${b.id}`);
  }
});

test('keeps data stores close to their owning service and uses distinct module forms', () => {
  const nodes = createWorldLayout(fixture(), createServiceDocuments()).overview;
  for (const owner of SERVICE_IDS) {
    const service = nodes.find(node => node.id === owner)!, store = nodes.find(node => node.id === `${owner}-db`)!;
    assert.ok(Math.hypot(service.position[0] - store.position[0], service.position[2] - store.position[2]) < 10);
    assert.equal(store.shape, 'database');
    assert.equal(service.shape, 'shell');
  }
  assert.equal(nodes.find(node => node.id === 'gateway')!.shape, 'gateway');
  assert.equal(nodes.find(node => node.id === 'event-bus')!.shape, 'event');
  assert.equal(nodes.find(node => node.id === 'payment-provider')!.shape, 'external');
});

test('resolves teaching routes across exterior and interior IDs and rejects unknown endpoints', () => {
  const layout = createWorldLayout(fixture(), createServiceDocuments());
  const route = getRoutePositions(layout, ['gateway', 'order/receive', 'order/draft', 'order/reserve', 'inventory/receive', 'payment/collect']);
  assert.equal(route.length, 6);
  assert.deepEqual(route[2], layout.interior.find(node => node.id === 'order/draft')!.position);
  assert.throws(() => getRoutePositions(layout, ['gateway', 'missing']), /missing/);
  assert.deepEqual(getRoutePositions(layout, []), []);
});

test('fails explicitly for incomplete or mismatched example data and dangling relationships', () => {
  const missing = fixture(); missing.nodes = missing.nodes.filter(node => node.id !== 'gateway');
  assert.throws(() => createWorldLayout(missing, createServiceDocuments()), /gateway/);
  const duplicate = fixture(); duplicate.nodes.push({ ...duplicate.nodes[0]! });
  assert.throws(() => createWorldLayout(duplicate, createServiceDocuments()), /重复/);
  for (const owner of SERVICE_IDS) {
    const documents = createServiceDocuments(); documents[owner].edges[0]!.target = `${owner}/unknown`;
    assert.throws(() => createWorldLayout(fixture(), documents), /unknown/);
    const extra = createServiceDocuments(); extra[owner].nodes.push({ id: `${owner}/unknown`, kind: 'process', label: 'Unknown' });
    assert.throws(() => createWorldLayout(fixture(), extra), /unknown/);
  }
});

test('gives storage, collection and result responsibilities distinct physical forms', () => {
  const layout = createWorldLayout(fixture(), createServiceDocuments());
  const form = (id: string) => layout.interior.find(node => node.id === id)!.shape;
  assert.equal(form('inventory/adjust'), 'adjust');
  assert.equal(form('inventory/state'), 'rack');
  assert.equal(form('payment/associate'), 'link');
  assert.equal(form('payment/collect'), 'channel');
  assert.equal(form('payment/record'), 'ledger');
  assert.equal(form('payment/result'), 'result');
});
