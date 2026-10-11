import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { validateDocument } from '../../../src/model/validate.ts';
import type { DiagramDocument } from '../../../src/model/types.ts';
import { createModuleDocument } from '../src/module-details.ts';

const sourceUrl = new URL('../../../tests/fixtures/traditional-microservices.diagram.json', import.meta.url);
const sourceText = readFileSync(sourceUrl, 'utf8');
const sourceDocument: DiagramDocument = JSON.parse(sourceText);

for (const module of sourceDocument.nodes) {
  test(`${module.id} has a complete, valid internal teaching diagram`, () => {
    const document = createModuleDocument(module.id);
    const validation = validateDocument(document);

    assert.equal(validation.valid, true, JSON.stringify(validation.diagnostics));
    assert.ok(document.title.includes(module.label));
    assert.match(document.description!, /教学.*假设/);
    assert.ok(document.nodes.length >= 3 && document.nodes.length <= 6);
    assert.ok(document.edges.length >= 3 && document.edges.length <= 6);
    assert.deepEqual(document.groups.map(group => group.id), ['entry', 'business', 'data']);
    for (const group of document.groups) {
      const members = document.nodes.filter(node => node.groupId === group.id);
      assert.ok(members.length >= 1 && members.length <= 3, `${module.id}/${group.id} should have 1 to 3 members`);
    }
    const nodeIds = new Set(document.nodes.map(node => node.id));
    assert.equal(nodeIds.size, document.nodes.length);
    for (const node of document.nodes) {
      assert.ok(node.id.startsWith(`${module.id}/`));
      assert.ok(document.groups.some(group => group.id === node.groupId));
      assert.ok(node.label.trim());
      assert.ok(node.summary?.trim());
      assert.ok(node.details?.trim());
      assert.equal(node.evidenceStatus, 'assumed');
    }
    for (const edge of document.edges) {
      assert.ok(nodeIds.has(edge.source), edge.source);
      assert.ok(nodeIds.has(edge.target), edge.target);
      assert.equal(edge.directed, true);
      assert.ok(edge.label?.trim());
      assert.ok(edge.details?.trim());
      assert.equal(edge.evidenceStatus, 'assumed');
    }
  });
}

test('covers the real 12-module fixture without modifying its source file', () => {
  assert.equal(sourceDocument.nodes.length, 12);
  for (const module of sourceDocument.nodes) createModuleDocument(module.id);
  assert.equal(readFileSync(sourceUrl, 'utf8'), sourceText);
  assert.equal(sourceDocument.edges.length, 11);
});

test('each call returns an independent document for internal view state', () => {
  const first = createModuleDocument('order');
  const before = JSON.stringify(first);
  const second = createModuleDocument('order');
  second.nodes[0]!.label = 'Changed in another view';
  second.edges[0]!.label = 'Changed relation';
  second.groups[0]!.label = 'Changed grouping';

  assert.equal(JSON.stringify(first), before);
  assert.equal(JSON.stringify(createModuleDocument('order')), before);
});

test('order starts payment only after the explicit inventory success branch', () => {
  const document = createModuleDocument('order');
  const check = document.nodes.find(node => node.kind === 'decision');
  assert.ok(check);
  const branches = document.edges.filter(edge => edge.source === check.id);
  assert.equal(branches.length, 2);
  const success = branches.find(edge => edge.label === '库存预留成功');
  const failure = branches.find(edge => edge.label === '库存不足');
  assert.equal(success?.target, 'order/payment');
  assert.equal(failure?.target, 'order/result');
  assert.match(document.nodes.find(node => node.id === 'order/result')!.details!, /释放/);
});

test('unknown and inherited property names are rejected explicitly', () => {
  for (const id of ['unknown-module', '', 'toString', '__proto__']) {
    assert.throws(() => createModuleDocument(id), /未知模块/);
  }
});
