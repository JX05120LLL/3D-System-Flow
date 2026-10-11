import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlayback } from '../../src/spatial/playback';
import type { DemoScenario } from '../../src/spatial/contracts';

const scenarios: DemoScenario[] = [{ id: 'document-upload', label: '文档处理', steps: [
  { id: 'read', title: '读取', description: '检查输入', route: ['reader'], focusId: 'reader', tone: 'request', openModules: [], durationMs: 1000 },
  { id: 'extract', title: '提取', description: '解析文档', route: ['parser-entry', 'text-extract'], focusId: 'text-extract', tone: 'data', openModules: ['parser'], durationMs: 3000 },
  { id: 'done', title: '完成', description: '返回结果', route: ['store'], focusId: 'store', tone: 'success', openModules: [], durationMs: 500 },
] }, { id: 'retry-path', label: '重试', steps: [
  { id: 'wait', title: '等待', description: '重试读取', route: ['reader'], focusId: 'reader', tone: 'failure', openModules: [], durationMs: 2000 },
] }];

test('spatial playback accepts arbitrary scenario IDs and an empty architecture without invented steps', () => {
  const timeline = createPlayback(scenarios), empty = createPlayback([]);
  assert.deepEqual(timeline.createState(), {scenario:'document-upload',status:'idle',index:-1,elapsedMs:0});
  assert.deepEqual(empty.play(empty.createState()), {scenario:null,status:'idle',index:-1,elapsedMs:0});
  assert.deepEqual(empty.getSteps(null), []);
  assert.deepEqual(empty.next(empty.createState()), empty.createState());
  assert.equal(empty.progress(empty.createState()), 0);
  assert.throws(() => timeline.createState('missing'), /未知/);
});

test('variable step durations preserve fractional elapsed time and pause/resume position', () => {
  const timeline=createPlayback(scenarios), idle=timeline.createState();
  const current=timeline.advance(timeline.play(idle), 1750);
  assert.equal(current.index, 1); assert.equal(current.elapsedMs, 750);
  const frozen=timeline.pause(current);
  assert.deepEqual(timeline.advance(frozen, 9000), frozen);
  const resumed=timeline.advance(timeline.play(frozen), 250);
  assert.equal(resumed.index, 1); assert.equal(resumed.elapsedMs, 1000);
  assert.equal(timeline.stepDuration(resumed), 3000);
  assert.equal(idle.index, -1);
});

test('weighted progress reaches one at exact completion and huge deltas stay within the final step', () => {
  const timeline=createPlayback(scenarios), initial=timeline.play(timeline.createState());
  assert.equal(timeline.progress(timeline.advance(initial, 2250)), .5);
  const final=timeline.advance(initial, 4500);
  assert.deepEqual(final, {scenario:'document-upload',status:'complete',index:2,elapsedMs:500});
  assert.equal(timeline.progress(final), 1);
  assert.deepEqual(timeline.advance(initial, Number.MAX_VALUE), final);
  assert.deepEqual(timeline.next(final), final);
});

test('single-step and backwards navigation pause at boundaries; resets and scenario changes are independent', () => {
  const timeline=createPlayback(scenarios);
  const first=timeline.next(timeline.createState());
  assert.equal(first.index, 0); assert.equal(first.status, 'paused');
  assert.deepEqual(timeline.previous(first), first);
  const second=timeline.next(first), back=timeline.previous(second);
  assert.equal(back.index, 0); assert.equal(back.elapsedMs, 0); assert.equal(back.status, 'paused');
  assert.deepEqual(timeline.reset(second), timeline.createState());
  const other=timeline.changeScenario('retry-path');
  assert.equal(other.scenario,'retry-path'); assert.equal(other.index,-1);
  assert.equal(timeline.getSteps(other.scenario).length,1);
  assert.equal(second.scenario,'document-upload');
});

test('invalid timing rejects before state mutation, including idle and paused states', () => {
  const timeline=createPlayback(scenarios), initial=timeline.createState();
  for(const delta of [-1, Infinity, NaN]) assert.throws(()=>timeline.advance(initial,delta),RangeError);
  assert.equal(initial.elapsedMs, 0);
});
