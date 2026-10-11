import type { DiagramDocument } from '../../../src/model/types.ts';
import { buildGraphIndex, findRelated } from '../../../src/model/graph-index.ts';
import type { DemoScenario, DemoState, ServiceId, WorldController, WorldMode } from './contracts.ts';
import { createServiceDocuments, SERVICE_IDS, serviceOfNode } from './service-documents.ts';
import { createWorld } from './world.ts';
import { STEP_DURATION_MS, getDemoSteps, createDemoState, play, pause, next, previous, reset, changeScenario, advance } from './demo.ts';

declare const __DIAGRAM__: DiagramDocument;
const overview = __DIAGRAM__;
const services = createServiceDocuments();
const overviewIndex = buildGraphIndex(overview);
const internalIndexes = Object.fromEntries(SERVICE_IDS.map(id => [id, buildGraphIndex(services[id])])) as Record<ServiceId, ReturnType<typeof buildGraphIndex>>;
const nodeMap = new Map([...overview.nodes, ...SERVICE_IDS.flatMap(id => services[id].nodes)].map(node => [node.id, node]));
const el = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id)! as T;
const select = el<HTMLSelectElement>('node-select');
const context = el('context-card');
let world: WorldController;
let mode: WorldMode = 'spatial';
let openModules = new Set<ServiceId>();
let selectedId: string | null = null;
let highlight: 'none' | 'upstream' | 'downstream' = 'none';
let isolated = false;
let detailsExpanded = false;
let demo: DemoState = createDemoState();
let frame = 0;
let lastTime: number | null = null;
let appliedStep: string | null = null;

function setText(id: string, text: string) {
  const element = el(id);
  if (element.textContent !== text) element.textContent = text;
}
function buttonLabel(id: string, label: string) {
  const button = el<HTMLButtonElement>(id);
  button.setAttribute('aria-label', label); button.title = label;
  const accessibleText = button.querySelector('.sr-only');
  if (accessibleText && accessibleText.textContent !== label) accessibleText.textContent = label;
}
function stopClock() { cancelAnimationFrame(frame); frame = 0; lastTime = null; }
function pausePlayback() { demo = pause(demo); stopClock(); updatePlayer(); }
function manualNavigation() { pausePlayback(); appliedStep = null; world.setDemo(null, 0); }
function setOpenModules(ids: Iterable<ServiceId>, animate = true) {
  openModules = new Set(ids); world.setOpenModules([...openModules], animate);
  document.documentElement.dataset.openModules = [...openModules].join(',');
  document.documentElement.dataset.cutaway = String(openModules.size > 0);
}
function relatedSelection() {
  if (!selectedId || highlight === 'none') return undefined;
  const owner = serviceOfNode(selectedId);
  return findRelated(selectedId.includes('/') && owner ? internalIndexes[owner] : overviewIndex, selectedId, highlight);
}
function applySelection() {
  world.setSelection(selectedId, relatedSelection()); world.setIsolation(isolated); updateContext();
}
function choose(id: string | null) {
  if (id && !nodeMap.has(id)) return;
  manualNavigation(); selectedId = id; highlight = 'none'; detailsExpanded = false;
  const owner = serviceOfNode(id);
  if (owner) setOpenModules([...openModules, owner]);
  if (!id) isolated = false;
  applySelection();
  if (id) world.focus(id);
}
function returnOverview() {
  manualNavigation(); selectedId = null; highlight = 'none'; isolated = false; detailsExpanded = false;
  setOpenModules([]); applySelection(); world.reset();
  el('reset-view').focus({ preventScroll: true });
}
function updateContext() {
  const node = selectedId ? nodeMap.get(selectedId) : undefined;
  const owner = serviceOfNode(selectedId);
  const teachingStep = appliedStep && demo.index >= 0 ? getDemoSteps(demo.scenario)[demo.index] : undefined;
  document.documentElement.dataset.mode = mode;
  document.documentElement.dataset.selectedNode = selectedId ?? '';
  document.documentElement.dataset.highlight = highlight;
  document.documentElement.dataset.isolated = String(isolated);
  context.hidden = !node;
  setText('context-title', node?.label ?? '');
  setText('context-summary', teachingStep?.title ?? node?.summary ?? '');
  setText('context-details', teachingStep ? `${node?.details ?? ''}\n\n${teachingStep.description}` : node?.details ?? '');
  el('context-details').hidden = !detailsExpanded;
  el('more-details').setAttribute('aria-expanded', String(detailsExpanded));
  buttonLabel('more-details', detailsExpanded ? '收起职责说明' : '查看完整职责');
  el('toggle-shell').hidden = !owner;
  buttonLabel('toggle-shell', owner && openModules.has(owner) ? '收拢当前服务' : '展开当前服务');
  el('toggle-shell').setAttribute('aria-expanded', String(!!owner && openModules.has(owner)));
  for (const id of ['focus-node', 'isolate-node']) el<HTMLButtonElement>(id).disabled = !node || world.renderer !== 'webgl';
  el('isolate-node').setAttribute('aria-pressed', String(isolated));
  buttonLabel('isolate-node', isolated ? '显示周围模块' : '隔离当前模块');
  const related = relatedSelection();
  for (const [id, value] of [['show-all', 'none'], ['show-upstream', 'upstream'], ['show-downstream', 'downstream']] as const) {
    el(id).setAttribute('aria-pressed', String(highlight === value));
    el<HTMLButtonElement>(id).disabled = !node;
    if (value !== 'none') buttonLabel(id, `${value === 'upstream' ? '上游' : '下游'}${value === highlight && related ? ` · ${related.nodeIds.size} 个节点` : ''}`);
  }
  el('back-overview').hidden = !node && openModules.size === 0;
  setText('view-label', owner && openModules.has(owner) ? `${nodeMap.get(owner)!.label} / 内部` : '系统总览');
  select.value = selectedId ?? '';
  for (const id of ['spatial-view', 'flat-view', 'reset-view']) el<HTMLButtonElement>(id).disabled = world.renderer !== 'webgl';
  el('flat-view').setAttribute('aria-pressed', String(mode === 'flat'));
  el('spatial-view').setAttribute('aria-pressed', String(mode === 'spatial'));
}
function updatePlayer() {
  const active = document.activeElement;
  const steps = getDemoSteps(demo.scenario), step = demo.index >= 0 ? steps[demo.index] : undefined;
  document.documentElement.dataset.demoStatus = demo.status;
  document.documentElement.dataset.demoStep = step?.id ?? '';
  document.documentElement.dataset.demoScenario = demo.scenario;
  setText('demo-status', {idle:'就绪',playing:'播放',paused:'暂停',complete:'完成'}[demo.status]);
  setText('demo-counter', `${Math.max(0, demo.index + 1).toString().padStart(2, '0')} / ${steps.length}`);
  setText('demo-title', step?.title ?? '下单演示');
  setText('demo-description', step?.description ?? '教学示意。选择场景，开始播放或单步查看。');
  const playLabel = demo.status === 'playing' ? '暂停演示' : demo.status === 'complete' ? '重新播放' : demo.status === 'paused' ? '继续播放' : '开始播放';
  buttonLabel('demo-play', playLabel); el('demo-play').dataset.state = demo.status;
  el<HTMLButtonElement>('demo-step').disabled = demo.status === 'complete';
  el<HTMLButtonElement>('demo-back').disabled = demo.index <= 0;
  el<HTMLButtonElement>('demo-reset').disabled = demo.status === 'idle';
  if (active instanceof HTMLButtonElement && active.disabled && ['demo-back', 'demo-step', 'demo-reset'].includes(active.id)) el('demo-play').focus({preventScroll:true});
  el<HTMLProgressElement>('demo-progress').value = demo.index >= 0 ? (demo.index + demo.elapsedMs / STEP_DURATION_MS) / steps.length : 0;
}
function renderPlayback() {
  const steps = getDemoSteps(demo.scenario), step = demo.index >= 0 ? steps[demo.index] ?? null : null;
  if (step && appliedStep !== `${demo.scenario}/${step.id}`) {
    // Reconstruct on backward steps too, so a later service cannot stay open prematurely.
    setOpenModules(steps.slice(0, demo.index + 1).flatMap(item => [...item.openModules]));
    selectedId = step.focusId; highlight = 'none'; isolated = false; detailsExpanded = false;
    appliedStep = `${demo.scenario}/${step.id}`;
    applySelection();
  }
  world.setDemo(step, Math.min(1, demo.elapsedMs / STEP_DURATION_MS)); updatePlayer();
}
function schedulePlayback() {
  if (frame || demo.status !== 'playing') return;
  frame = requestAnimationFrame(now => {
    frame = 0;
    const delta = lastTime === null ? 0 : Math.min(now - lastTime, 250);
    lastTime = now; demo = advance(demo, delta); renderPlayback();
    if (demo.status === 'playing') schedulePlayback(); else lastTime = null;
  });
}
function togglePlayback() {
  if (demo.status === 'playing') pausePlayback();
  else {
    if (demo.status === 'idle' || demo.status === 'complete') { setOpenModules([]); world.reset(); appliedStep = null; }
    demo = play(demo); lastTime = null; renderPlayback(); schedulePlayback();
  }
}
function stepForward() { stopClock(); demo = next(demo); renderPlayback(); }
function stepBackward() { stopClock(); demo = previous(demo); renderPlayback(); }
function resetPlayback(scenario?: DemoScenario) {
  stopClock(); demo = scenario ? changeScenario(scenario) : reset(demo);
  appliedStep = null; selectedId = null; highlight = 'none'; isolated = false; detailsExpanded = false;
  world.setDemo(null, 0); setOpenModules([]); world.reset(); applySelection(); updatePlayer();
}
function closeExplorer(restoreFocus = true) {
  el('explorer').hidden = true; el('explore-toggle').setAttribute('aria-expanded','false');
  if (restoreFocus) el('explore-toggle').focus({preventScroll:true});
}

world = createWorld(el('stage'), overview, services, choose);
document.documentElement.dataset.renderer = world.renderer;
if (world.renderer === 'unavailable') el('fallback').hidden = false;
select.replaceChildren(new Option('选择模块或组件', ''));
const rootGroup = document.createElement('optgroup'); rootGroup.label = '系统模块';
for (const node of overview.nodes) rootGroup.append(new Option(node.label, node.id));
select.append(rootGroup);
for (const id of SERVICE_IDS) {
  const group = document.createElement('optgroup'); group.label = `${nodeMap.get(id)!.label}内部`;
  for (const node of services[id].nodes) group.append(new Option(node.label,node.id));
  select.append(group);
}
setOpenModules([]); updateContext(); updatePlayer();
select.addEventListener('change', () => {
  choose(select.value || null); closeExplorer(false);
  el(selectedId ? world.renderer === 'webgl' ? 'focus-node' : 'more-details' : 'explore-toggle').focus({preventScroll:true});
});
el('explore-toggle').addEventListener('click', () => {
  const opening = el('explorer').hidden;
  el('explorer').hidden = !opening; el('explore-toggle').setAttribute('aria-expanded',String(opening));
  if (opening) select.focus({preventScroll:true});
});
el('explorer-close').addEventListener('click', () => closeExplorer());
el('back-overview').addEventListener('click', returnOverview);
el('close-context').addEventListener('click', () => { choose(null); el('explore-toggle').focus({preventScroll:true}); });
el('focus-node').addEventListener('click', () => { if (selectedId) { pausePlayback(); world.focus(selectedId); } });
el('reset-view').addEventListener('click', () => { pausePlayback(); world.reset(); });
el('more-details').addEventListener('click', () => {
  pausePlayback();
  detailsExpanded = !detailsExpanded; updateContext(); world.setSelection(selectedId,relatedSelection());
});
el('isolate-node').addEventListener('click', () => { manualNavigation(); isolated = !isolated; applySelection(); });
el('toggle-shell').addEventListener('click', () => {
  const owner = serviceOfNode(selectedId); if (!owner) return;
  manualNavigation();
  if (openModules.has(owner)) { openModules.delete(owner); selectedId = owner; }
  else openModules.add(owner);
  detailsExpanded = false; highlight = 'none'; setOpenModules(openModules); applySelection(); world.focus(owner);
});
for (const [id,value] of [['spatial-view','spatial'],['flat-view','flat']] as const) {
  el(id).addEventListener('click', () => { mode=value; world.setMode(mode); updateContext(); });
}
for (const [id,value] of [['show-all','none'],['show-upstream','upstream'],['show-downstream','downstream']] as const) {
  el(id).addEventListener('click', () => { manualNavigation(); highlight=value; applySelection(); });
}
el('demo-play').addEventListener('click',togglePlayback);
el('demo-step').addEventListener('click',stepForward);
el('demo-back').addEventListener('click',stepBackward);
el('demo-reset').addEventListener('click', () => resetPlayback());
el<HTMLSelectElement>('demo-scenario').addEventListener('change',event=>resetPlayback((event.target as HTMLSelectElement).value as DemoScenario));
el<HTMLButtonElement>('fullscreen-view').disabled = !document.fullscreenEnabled;
el('fullscreen-view').addEventListener('click',async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen();
  } catch { setText('demo-title','当前浏览器未允许全屏'); }
});
document.addEventListener('fullscreenchange', () => {
  el('fullscreen-view').setAttribute('aria-pressed',String(!!document.fullscreenElement));
  buttonLabel('fullscreen-view',document.fullscreenElement ? '退出全屏' : '全屏场景');
});
for (const overlay of [context,el('explorer')]) {
  overlay.addEventListener('pointerdown',event=>event.stopPropagation());
  overlay.addEventListener('wheel',event=>event.stopPropagation());
}
document.addEventListener('keydown',event=>{
  if (event.key==='Escape') {
    if (!el('explorer').hidden) closeExplorer(); else if (selectedId || openModules.size) returnOverview();
    return;
  }
  const target=event.target as HTMLElement | null;
  if (target?.closest('button,input,select,textarea,[contenteditable="true"],[role="button"]')) return;
  if (event.code==='Space') { event.preventDefault(); togglePlayback(); }
  if (event.key==='ArrowRight') { event.preventDefault(); stepForward(); }
  if (event.key==='ArrowLeft') { event.preventDefault(); stepBackward(); }
});
document.addEventListener('visibilitychange', () => { if (document.hidden) pausePlayback(); });
window.addEventListener('pagehide',event=>{ pausePlayback(); if (!event.persisted) world.dispose(); });
Object.defineProperty(globalThis,'__sandboxPrototype',{value:{
  state:()=>({...world.state(),highlight,detailsExpanded,related:relatedSelection() ? [...relatedSelection()!.nodeIds] : [],
    demo:{...demo,stepsTotal:getDemoSteps(demo.scenario).length,stepId:demo.index>=0 ? getDemoSteps(demo.scenario)[demo.index]?.id : null}}),
}});
