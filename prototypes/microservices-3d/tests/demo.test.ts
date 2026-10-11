import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import type { DemoScenario } from '../src/contracts.ts';
import { STEP_DURATION_MS, getDemoSteps, createDemoState, play, pause, next, previous, reset, changeScenario, advance } from '../src/demo.ts';
import { SERVICE_IDS, createServiceDocuments, serviceOfNode } from '../src/service-documents.ts';

const scenarios: DemoScenario[] = ['success', 'out-of-stock', 'payment-failed'];
const fixture = JSON.parse(readFileSync(new URL('../../../tests/fixtures/traditional-microservices.diagram.json', import.meta.url), 'utf8'));
const serviceDocuments = createServiceDocuments();
const knownIds = new Set([...fixture.nodes.map((node: { id: string }) => node.id), ...Object.values(serviceDocuments).flatMap(document => document.nodes.map(node => node.id))]);

for (const scenario of scenarios) {
  test(`${scenario} uses authored teaching steps and existing world object IDs`, () => {
    const steps = getDemoSteps(scenario);
    assert.ok(steps.length >= 8 && steps.length <= 18);
    assert.equal(new Set(steps.map(step => step.id)).size, steps.length);
    for (const step of steps) {
      assert.ok(step.title.trim());
      assert.ok(step.title.length <= 12, 'The title fits the compact in-scene callout.');
      assert.ok(step.description.trim());
      assert.match(step.description, /教学|示意/);
      assert.ok(step.route.length > 0);
      assert.ok(knownIds.has(step.focusId), step.focusId);
      assert.ok(step.route.includes(step.focusId));
      const requiredOwners = [...new Set(step.route.filter(id => id.includes('/')).map(serviceOfNode))];
      assert.deepEqual(step.openModules, requiredOwners, `${scenario}: ${step.id} opens exactly its route interiors`);
      for (const owner of step.openModules) assert.ok(SERVICE_IDS.includes(owner));
      assert.ok(['request', 'data', 'success', 'failure'].includes(step.tone));
      for (const id of step.route) assert.ok(knownIds.has(id), `${scenario}: ${id}`);
    }
  });
}

test('teaching choreography and its route/open-module arrays cannot be mutated by playback', () => {
  for (const scenario of scenarios) {
    const steps = getDemoSteps(scenario);
    assert.ok(Object.isFrozen(steps));
    for (const step of steps) {
      assert.ok(Object.isFrozen(step));
      assert.ok(Object.isFrozen(step.route));
      assert.ok(Object.isFrozen(step.openModules));
    }
  }
});

test('success responds before the independently illustrated asynchronous notification', () => {
  const steps = getDemoSteps('success');
  const ids = steps.map(step => step.id);
  assert.deepEqual(ids, ['client-request', 'gateway-entry', 'identity-check', 'route-order', 'create-order', 'reserve-stock', 'inspect-stock', 'stock-success', 'request-payment', 'prepare-payment', 'channel-success', 'record-payment', 'confirm-order', 'success-response', 'publish-event', 'notify-user']);
  const response = steps.find(step => step.id === 'success-response')!;
  assert.equal(response.route.at(-1), 'customer');
  assert.match(response.description, /不等待|无需等待/);
});

test('success visits every authored component inside order, inventory, and payment', () => {
  const routeIds = new Set(getDemoSteps('success').flatMap(step => step.route));
  for (const document of Object.values(serviceDocuments)) {
    for (const node of document.nodes) assert.ok(routeIds.has(node.id), node.id);
  }
  const steps = getDemoSteps('success');
  assert.deepEqual(steps.find(step => step.id === 'reserve-stock')!.route, ['order/draft', 'order/reserve', 'inventory', 'inventory/receive', 'inventory/operation']);
  assert.deepEqual(steps.find(step => step.id === 'request-payment')!.route, ['order/check', 'order/payment', 'payment', 'payment/receive']);
  assert.deepEqual(steps.find(step => step.id === 'prepare-payment')!.route, ['payment/receive', 'payment/associate', 'payment/collect']);
  assert.deepEqual(steps.find(step => step.id === 'channel-success')!.route, ['payment/collect', 'payment-provider', 'payment/collect']);
  assert.deepEqual(steps.find(step => step.id === 'record-payment')!.route, ['payment/collect', 'payment/record', 'payment-db', 'payment/record', 'payment/result', 'order/result']);
});

test('stock state inspection precedes the branch result and does not claim a successful reservation', () => {
  for (const scenario of scenarios) {
    const steps = getDemoSteps(scenario);
    const inspectedIndex = steps.findIndex(step => step.id === 'inspect-stock');
    const conclusionIndex = steps.findIndex(step => ['stock-success', 'stock-shortage'].includes(step.id));
    const inspected = steps[inspectedIndex]!;
    assert.deepEqual(inspected.route, ['inventory/operation', 'inventory/adjust', 'inventory/state', 'inventory-db', 'inventory/state']);
    assert.equal(inspected.tone, 'data');
    assert.match(inspected.description, /尚未返回预留结论/);
    assert.match(inspected.description, /不代表成功更新/);
    assert.equal(conclusionIndex, inspectedIndex + 1);
    assert.deepEqual(steps[conclusionIndex]!.route, ['inventory/state', 'inventory/result', 'order/check']);
    for (const step of steps.slice(0, conclusionIndex)) {
      assert.ok(!step.route.includes('inventory/result'));
      assert.ok(!step.route.some(id => id === 'payment' || id.startsWith('payment/')));
      assert.notEqual(step.tone, 'success');
    }
  }
});

test('out of stock cancels and responds without payment, release, or success events', () => {
  const steps = getDemoSteps('out-of-stock');
  const ids = steps.map(step => step.id);
  assert.deepEqual(ids, ['client-request', 'gateway-entry', 'identity-check', 'route-order', 'create-order', 'reserve-stock', 'inspect-stock', 'stock-shortage', 'cancel-order', 'failure-response']);
  for (const step of steps) {
    for (const id of ['payment', 'payment-provider', 'payment-db', 'order/payment', 'event-bus', 'notify']) assert.ok(!step.route.includes(id), id);
    assert.ok(!step.route.some(id => id.startsWith('payment/')));
    assert.ok(!step.openModules.includes('payment'));
  }
  assert.match(steps.find(step => step.id === 'cancel-order')!.description, /不.*释放/);
});

test('payment failure cancels then releases the existing inventory reservation before response', () => {
  const steps = getDemoSteps('payment-failed');
  const ids = steps.map(step => step.id);
  assert.deepEqual(ids, ['client-request', 'gateway-entry', 'identity-check', 'route-order', 'create-order', 'reserve-stock', 'inspect-stock', 'stock-success', 'request-payment', 'prepare-payment', 'channel-failure', 'record-payment', 'cancel-order', 'release-stock', 'failure-response']);
  assert.deepEqual(steps.find(step => step.id === 'channel-failure')!.route, ['payment/collect', 'payment-provider', 'payment/collect']);
  const release = steps.find(step => step.id === 'release-stock')!;
  assert.deepEqual(release.route, ['order/result', 'inventory', 'inventory/receive', 'inventory/operation', 'inventory/adjust', 'inventory/state', 'inventory-db', 'inventory/state', 'inventory/result', 'order/result']);
  assert.deepEqual(release.openModules, ['order', 'inventory']);
  assert.match(release.description, /同一个库存服务/);
  assert.match(release.description, /先前成功的预留/);
  for (const node of serviceDocuments.inventory.nodes) assert.ok(release.route.includes(node.id), node.id);
  for (const step of steps) assert.ok(!step.route.includes('event-bus') && !step.route.includes('notify'));
});

test('initial play starts at the first step without modifying the idle state', () => {
  const idle = createDemoState();
  assert.deepEqual(idle, { scenario: 'success', status: 'idle', index: -1, elapsedMs: 0 });
  assert.deepEqual(play(idle), { scenario: 'success', status: 'playing', index: 0, elapsedMs: 0 });
  assert.equal(idle.status, 'idle');
});

test('pause freezes progress and play resumes the remaining duration', () => {
  const playing = advance(play(createDemoState()), 700);
  const paused = pause(playing);
  assert.equal(paused.status, 'paused');
  assert.equal(paused.elapsedMs, 700);
  assert.deepEqual(advance(paused, 9000), paused);
  const resumed = advance(play(paused), STEP_DURATION_MS - 700);
  assert.equal(resumed.index, 1);
  assert.equal(resumed.elapsedMs, 0);
  assert.equal(resumed.status, 'playing');
  assert.equal(playing.status, 'playing');
});

test('single stepping pauses and stays within both endpoints', () => {
  const first = next(createDemoState());
  assert.equal(first.index, 0);
  assert.equal(first.status, 'paused');
  assert.deepEqual(previous(first), first);
  const second = next(advance(play(first), 500));
  assert.equal(second.index, 1);
  assert.equal(second.elapsedMs, 0);
  assert.equal(second.status, 'paused');
  assert.deepEqual(previous(second), first);
  assert.deepEqual(previous(createDemoState()), createDemoState());
  assert.deepEqual(pause(createDemoState()), createDemoState());
});

test('reset and scenario changes create independent idle states', () => {
  const original = advance(play(createDemoState('payment-failed')), 5000);
  assert.deepEqual(reset(original), createDemoState('payment-failed'));
  assert.deepEqual(changeScenario('out-of-stock'), createDemoState('out-of-stock'));
  assert.equal(original.status, 'playing');
});

test('advance preserves fractional time and remainder while crossing several steps', () => {
  const original = advance(play(createDemoState()), 0.5);
  const moved = advance(original, STEP_DURATION_MS * 3 + 127.25);
  assert.equal(moved.index, 3);
  assert.equal(moved.elapsedMs, 127.75);
  assert.equal(moved.status, 'playing');
  assert.equal(original.index, 0);
  assert.equal(original.elapsedMs, 0.5);
  assert.deepEqual(advance(moved, 0), moved);
});

test('exact completion, huge delta, and repeated next do not run past the last step', () => {
  for (const scenario of scenarios) {
    const count = getDemoSteps(scenario).length;
    const complete = advance(play(createDemoState(scenario)), count * STEP_DURATION_MS);
    assert.deepEqual(complete, { scenario, status: 'complete', index: count - 1, elapsedMs: STEP_DURATION_MS });
    assert.deepEqual(advance(play(createDemoState(scenario)), Number.MAX_VALUE), complete);
    assert.deepEqual(advance(complete, 100), complete);
    assert.deepEqual(next(complete), complete);
    assert.deepEqual(pause(complete), complete);
    assert.deepEqual(play(complete), { scenario, status: 'playing', index: 0, elapsedMs: 0 });
    assert.deepEqual(previous(complete), { scenario, status: 'paused', index: count - 2, elapsedMs: 0 });
    const finalStep = advance(play(createDemoState(scenario)), (count - 1) * STEP_DURATION_MS);
    assert.equal(finalStep.status, 'playing');
    assert.deepEqual(next(finalStep), complete);
  }
});

test('invalid elapsed deltas are rejected even while the demo is idle or paused', () => {
  for (const state of [createDemoState(), play(createDemoState()), next(createDemoState())]) {
    for (const delta of [-1, NaN, Infinity, -Infinity]) assert.throws(() => advance(state, delta), RangeError);
  }
});

test('unknown scenario values cannot fall back to the success branch silently', () => {
  assert.throws(() => getDemoSteps('unknown' as DemoScenario), /场景/);
  assert.throws(() => createDemoState('__proto__' as DemoScenario), /场景/);
});
