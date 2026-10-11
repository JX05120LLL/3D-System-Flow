import { test, expect, type Page, type TestInfo } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import type { DiagramDocument } from '../../src/model/types';
import { capture } from './helpers';

interface NavigationState {
  viewId: string;
  viewPath: string[];
  mode: 'spatial' | 'flat';
  selectedId: string | null;
  objectIds: string[];
  openModules: string[];
  related: string[];
  isolated: boolean;
  highlight: 'none' | 'upstream' | 'downstream';
  detailsExpanded: boolean;
  demoRoute: string[];
  geometryCount: number;
  demo: { scenario: string | null; status: string; index: number; elapsedMs: number; stepId: string | null };
}

// These tests exercise Chromium's software WebGL, including offline file:// navigation.
test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });

function graph(id: string, title: string): DiagramDocument {
  return { schemaVersion: '2.0', id, title, view: { kind: 'overview', direction: 'RIGHT', theme: 'dark' },
    nodes: [{ id: 'shared', kind: 'process', label: `${title}入口`, summary: `${title}的入口职责`, evidenceStatus: 'assumed' }],
    edges: [], groups: [] };
}

function navigationFixture(fastPlayback = false): DiagramDocument {
  const root = graph('root', '总系统');
  root.nodes.push({ id: 'root-only', kind: 'process', label: '仅根节点', evidenceStatus: 'assumed' });
  root.spatial = { interiors: [{ owner: 'shared', nodes: [
    { id: 'part', kind: 'process', label: '根处理组件', summary: '根视图处理请求', details: '根组件只连接根图同级组件。', evidenceStatus: 'assumed' },
    { id: 'root-peer', kind: 'process', label: '根同级组件', evidenceStatus: 'assumed' },
  ], edges: [{ id: 'local', source: 'part', target: 'root-peer', kind: 'dependency', directed: true, evidenceStatus: 'assumed' }] }],
  scenarios: [{ id: 'journey', label: '跨视图请求', steps: [
    { id: 'root-step', title: '根图接收请求', description: '根视图内的显式请求步骤。', route: ['part', 'root-peer'], focusId: 'part', tone: 'request', durationMs: fastPlayback ? 350 : 60000 },
    { id: 'child-step', title: '子图处理请求', description: '子视图同名组件承担不同职责。', viewId: 'child', route: ['part', 'child-peer'], focusId: 'part', tone: 'data', durationMs: 60000 },
    { id: 'leaf-step', title: '叶图接收结果', description: '再次进入下一层的显式步骤。', viewId: 'leaf', route: ['shared'], focusId: 'shared', tone: 'success', durationMs: 60000 },
    { id: 'return-step', title: '返回根图响应', description: '回到根图的显式响应步骤。', route: ['part'], focusId: 'part', tone: 'success', durationMs: 60000 },
  ] }, { id: 'overview-only', label: '仅总览说明', steps: [
    { id: 'overview-step', title: '仅根节点职责', description: '切换场景后从根图重新开始。', route: ['root-only'], focusId: 'root-only', tone: 'request', durationMs: 60000 },
  ] }] };
  const child = graph('child', '子系统');
  child.nodes.push({ id: 'child-only', kind: 'process', label: '仅子节点', evidenceStatus: 'assumed' });
  child.spatial = { interiors: [{ owner: 'shared', nodes: [
    { id: 'part', kind: 'process', label: '子处理组件', summary: '子视图处理请求', details: '子组件只连接子图同级组件。', evidenceStatus: 'assumed' },
    { id: 'child-peer', kind: 'process', label: '子同级组件', evidenceStatus: 'assumed' },
  ], edges: [{ id: 'local', source: 'part', target: 'child-peer', kind: 'dependency', directed: true, evidenceStatus: 'assumed' }] }] };
  root.navigation = { views: [
    { parentId: 'root', ownerId: 'shared', document: child },
    { parentId: 'child', ownerId: 'part', document: graph('leaf', '叶系统') },
    { parentId: 'leaf', ownerId: 'shared', document: graph('deep', '深层系统') },
    { parentId: 'deep', ownerId: 'shared', document: graph('deepest', '最深系统') },
  ], bridges: [{ id: 'request-bridge', source: { viewId: 'root', nodeId: 'part' }, target: { viewId: 'child', nodeId: 'part' },
    kind: 'dependency', directed: true, label: '处理职责关联', details: '显式跨视图引用，不能作为单图执行路径。',
    evidenceStatus: 'assumed', sources: [{ path: 'src/service.ts', line: 12 }] }] };
  return root;
}

async function state(page: Page): Promise<NavigationState> {
  return page.evaluate(() => (window as unknown as { __sandboxPrototype: { state(): NavigationState } }).__sandboxPrototype.state());
}

async function openNavigation(page: Page, info: TestInfo, options: { fallback?: boolean; fastPlayback?: boolean; mutate?: (document: DiagramDocument) => void } = {}) {
  const source = info.outputPath('navigation.diagram.json'), output = info.outputPath('navigation.html');
  await mkdir(info.outputDir, { recursive: true });
  const document = navigationFixture(options.fastPlayback);
  options.mutate?.(document);
  await writeFile(source, JSON.stringify(document), 'utf8');
  execFileSync(process.execPath, ['system-flow/scripts/generate.mjs', source, '--renderer', '3d', '--output', output, '--overwrite'], { encoding: 'utf8' });
  const network: string[] = [], pageErrors: string[] = [];
  page.on('request', request => { if (/^https?:/i.test(request.url())) network.push(request.url()); });
  page.on('pageerror', error => pageErrors.push(error.message));
  if (options.fallback) {
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, contextId: string, ...args: unknown[]) {
        if (contextId === 'webgl' || contextId === 'webgl2' || contextId === 'experimental-webgl') return null;
        return Reflect.apply(original, this, [contextId, ...args]);
      } as typeof original;
    });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.context().setOffline(true);
  await page.goto(pathToFileURL(output).href);
  await page.waitForFunction(() => typeof (window as unknown as { __sandboxPrototype?: { state?: unknown } }).__sandboxPrototype?.state === 'function');
  await expect(page.locator('html')).toHaveAttribute('data-renderer', options.fallback ? 'unavailable' : 'webgl');
  expect((await state(page)).viewId).toBe('root');
  return { network, pageErrors };
}

async function chooseNode(page: Page, id: string) {
  if (!await page.locator('#node-select').isVisible()) await page.locator('#explore-toggle').click();
  await page.locator('#node-select').selectOption(id);
  await expect(page.locator('#context-card')).toBeVisible();
  expect((await state(page)).selectedId).toBe(id);
}

async function enterView(page: Page, ownerId: string, viewId: string) {
  await chooseNode(page, ownerId);
  await expect(page.locator('#enter-view')).toBeVisible();
  await page.locator('#enter-view').click();
  expect((await state(page)).viewId).toBe(viewId);
}

async function focusPage(page: Page) {
  await page.locator('body').evaluate(element => { element.tabIndex = -1; element.focus(); });
}

test('3D offline navigation enters four layers and returns through parent, breadcrumb, and overview', async ({ page }, info) => {
  const opened = await openNavigation(page, info);
  await enterView(page, 'shared', 'child');
  expect((await state(page)).viewPath).toEqual(['root', 'child']);
  expect((await state(page)).selectedId).toBeNull();
  await enterView(page, 'part', 'leaf');
  await enterView(page, 'shared', 'deep');
  await enterView(page, 'shared', 'deepest');
  expect((await state(page)).viewPath).toEqual(['root', 'child', 'leaf', 'deep', 'deepest']);
  await page.locator('#back-view').click();
  expect((await state(page)).viewId).toBe('deep');
  await page.locator('#view-breadcrumbs button[data-view-id="child"]').click();
  expect((await state(page)).viewPath).toEqual(['root', 'child']);
  await chooseNode(page, 'part');
  await page.locator('#more-details').click();
  await expect(page.locator('#context-details')).toContainText('子组件只连接子图同级组件。');
  await capture(page, info, 'navigation-child-responsibility');
  await page.locator('#back-overview').click();
  expect((await state(page))).toMatchObject({ viewId: 'root', viewPath: ['root'], selectedId: null, openModules: [], demoRoute: [], isolated: false });
  await expect(page.locator('#context-card')).toBeHidden();
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

test('3D repeated node IDs keep responsibilities and traversal local while authored bridges jump to their target', async ({ page }, info) => {
  const opened = await openNavigation(page, info);
  await chooseNode(page, 'part');
  await expect(page.locator('#context-title')).toHaveText('根处理组件');
  await expect(page.locator('#context-summary')).toHaveText('根视图处理请求');
  await page.locator('#show-downstream').click();
  expect((await state(page)).related).toContain('root-peer');
  expect((await state(page)).related).not.toContain('child-peer');
  await page.locator('#more-details').click();
  const bridge = page.locator('#bridge-links button[data-bridge-id="request-bridge"]');
  await expect(bridge).toHaveAttribute('data-target-view-id', 'child');
  await expect(bridge).toHaveAttribute('data-target-node-id', 'part');
  await expect(page.locator('#bridge-links')).toContainText('处理职责关联');
  await expect(page.locator('#bridge-links')).toContainText('显式跨视图引用，不能作为单图执行路径。');
  await expect(page.locator('#bridge-links')).toContainText('src/service.ts:12');
  await expect(page.locator('#bridge-links')).toContainText('假设');
  await expect(page.locator('#bridge-links')).toContainText('总系统');
  await expect(page.locator('#bridge-links')).toContainText('子系统');
  await bridge.click();
  expect((await state(page))).toMatchObject({ viewId: 'child', selectedId: 'part', related: [], isolated: false });
  await expect(page.locator('#context-title')).toHaveText('子处理组件');
  await expect(page.locator('#context-summary')).toHaveText('子视图处理请求');
  expect((await state(page)).objectIds.sort()).toEqual(['child-only', 'child-peer', 'part', 'shared']);
  await page.locator('#show-downstream').click();
  expect((await state(page)).related).toContain('child-peer');
  expect((await state(page)).related).not.toContain('root-peer');
  await page.locator('#more-details').click();
  const returnBridge = page.locator('#bridge-links button[data-bridge-id="request-bridge"]');
  await expect(returnBridge).toHaveAttribute('data-target-view-id', 'root');
  await returnBridge.click();
  expect((await state(page))).toMatchObject({ viewId: 'root', selectedId: 'part', related: [] });
  await expect(page.locator('#context-title')).toHaveText('根处理组件');
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

test('3D cross-view steps move forward and backward and reset without stale state or mode changes', async ({ page }, info) => {
  const opened = await openNavigation(page, info);
  await page.locator('#flat-view').click();
  await chooseNode(page, 'part');
  await page.locator('#show-downstream').click();
  await page.locator('#isolate-node').click();
  const steps = [
    { viewId: 'root', stepId: 'root-step', route: ['part', 'root-peer'], selectedId: 'part', openModules: ['shared'], title: '根图接收请求' },
    { viewId: 'child', stepId: 'child-step', route: ['part', 'child-peer'], selectedId: 'part', openModules: ['shared'], title: '子图处理请求' },
    { viewId: 'leaf', stepId: 'leaf-step', route: ['shared'], selectedId: 'shared', openModules: [], title: '叶图接收结果' },
    { viewId: 'root', stepId: 'return-step', route: ['part'], selectedId: 'part', openModules: ['shared'], title: '返回根图响应' },
  ];
  for (let index = 0; index < steps.length; index++) {
    await page.locator('#demo-step').click();
    const expected = steps[index];
    expect((await state(page))).toMatchObject({ viewId: expected.viewId, selectedId: expected.selectedId, demoRoute: expected.route,
      openModules: expected.openModules, mode: 'flat', related: [], isolated: false, detailsExpanded: false,
      demo: { index, stepId: expected.stepId, status: 'paused' } });
    await expect(page.locator('#demo-title')).toHaveText(expected.title);
  }
  for (let index = steps.length - 2; index >= 0; index--) {
    await page.locator('#demo-back').click();
    const expected = steps[index];
    expect((await state(page))).toMatchObject({ viewId: expected.viewId, selectedId: expected.selectedId, demoRoute: expected.route,
      openModules: expected.openModules, mode: 'flat', demo: { index, stepId: expected.stepId, status: 'paused' } });
  }
  await page.locator('#demo-reset').click();
  expect((await state(page))).toMatchObject({ viewId: 'root', selectedId: null, demoRoute: [], openModules: [], mode: 'flat',
    demo: { scenario: 'journey', index: -1, status: 'idle' } });
  await enterView(page, 'shared', 'child');
  await page.locator('#demo-scenario').selectOption('overview-only');
  expect((await state(page))).toMatchObject({ viewId: 'root', selectedId: null, openModules: [], mode: 'flat',
    demo: { scenario: 'overview-only', index: -1, status: 'idle' } });
  await page.locator('#demo-step').click();
  expect((await state(page))).toMatchObject({ viewId: 'root', selectedId: 'root-only', demo: { stepId: 'overview-step', index: 0 } });
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

test('3D actual cross-view playback pauses for manual navigation and resumes the authored view', async ({ page }, info) => {
  const opened = await openNavigation(page, info, { fastPlayback: true });
  await page.locator('#demo-play').click();
  await expect.poll(async () => (await state(page)).viewId).toBe('child');
  await expect.poll(async () => (await state(page)).demo.elapsedMs).toBeGreaterThan(0);
  expect((await state(page)).demo).toMatchObject({ stepId: 'child-step', index: 1, status: 'playing' });
  await expect(page.locator('#enter-view')).toBeVisible();
  await page.locator('#enter-view').click();
  expect((await state(page)).viewId).toBe('leaf');
  const paused = await state(page);
  expect(paused.demo).toMatchObject({ index: 1, status: 'paused' });
  expect(paused.demoRoute).toEqual([]);
  // This interval verifies the paused clock, rather than delaying page readiness.
  await page.waitForTimeout(250);
  expect((await state(page)).demo.elapsedMs).toBe(paused.demo.elapsedMs);
  await page.locator('#demo-play').click();
  await expect.poll(async () => (await state(page)).viewId).toBe('child');
  expect((await state(page))).toMatchObject({ selectedId: 'part', demoRoute: ['part', 'child-peer'],
    demo: { status: 'playing', index: 1, stepId: 'child-step' } });
  await page.locator('#demo-play').click();
  expect((await state(page)).demo.status).toBe('paused');
  await page.locator('#demo-reset').click();
  await page.locator('#demo-play').click();
  await expect.poll(async () => (await state(page)).viewId).toBe('child');
  await page.locator('#view-breadcrumbs button[data-view-id="root"]').click();
  expect((await state(page)).demo.status).toBe('paused');
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

test('3D focused controls do not also trigger the global step or playback shortcuts', async ({ page }, info) => {
  const opened = await openNavigation(page, info);
  await page.locator('#demo-step').focus();
  await page.keyboard.press('Enter');
  expect((await state(page)).demo.index).toBe(0);
  await page.keyboard.press('ArrowRight');
  expect((await state(page)).demo.index).toBe(0);
  await page.locator('#demo-scenario').focus();
  await page.keyboard.press('Space');
  expect((await state(page)).demo.status).toBe('paused');
  await page.keyboard.press('Escape');
  await chooseNode(page, 'shared');
  await page.locator('#enter-view').focus();
  await page.keyboard.press('Enter');
  expect((await state(page))).toMatchObject({ viewId: 'child', demo: { index: 0, status: 'paused' } });
  await page.locator('#back-view').focus();
  await page.keyboard.press('Space');
  expect((await state(page))).toMatchObject({ viewId: 'root', demo: { index: 0, status: 'paused' } });
  await focusPage(page);
  await page.keyboard.press('ArrowRight');
  expect((await state(page))).toMatchObject({ viewId: 'child', demo: { index: 1, status: 'paused' } });
  await page.keyboard.press('ArrowLeft');
  expect((await state(page))).toMatchObject({ viewId: 'root', demo: { index: 0, status: 'paused' } });
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

interface ResourceSnapshot { listeners: Record<string, number>; observedElements: number }

async function watchResources(page: Page) {
  await page.addInitScript(() => {
    type Listener = EventListenerOrEventListenerObject;
    const tracked = new Map<EventTarget, Map<string, Set<Listener>>>();
    const originalAdd = EventTarget.prototype.addEventListener, originalRemove = EventTarget.prototype.removeEventListener;
    const scope = (target: EventTarget, type: string) => {
      if (target === window || target === document) return /^(keydown|keyup)$/.test(type) ? (target === window ? 'window' : 'document') : null;
      if (target instanceof HTMLCanvasElement) return /^webglcontext/.test(type) ? 'canvas' : null;
      return target instanceof HTMLElement && target.id === 'stage' && /^(pointerdown|pointerup|pointercancel|pointermove|pointerleave|wheel|contextmenu)$/.test(type) ? 'stage' : null;
    };
    const key = (type: string, options?: boolean | AddEventListenerOptions | EventListenerOptions) => `${type}:${typeof options === 'boolean' ? options : !!options?.capture}`;
    EventTarget.prototype.addEventListener = function (type, callback, options) {
      if (callback && scope(this, type)) {
        let events = tracked.get(this); if (!events) { events = new Map(); tracked.set(this, events); }
        const eventKey = key(type, options);
        let listeners = events.get(eventKey); if (!listeners) { listeners = new Set(); events.set(eventKey, listeners); }
        listeners.add(callback);
      }
      return originalAdd.call(this, type, callback, options);
    };
    EventTarget.prototype.removeEventListener = function (type, callback, options) {
      if (callback) tracked.get(this)?.get(key(type, options))?.delete(callback);
      return originalRemove.call(this, type, callback, options);
    };
    const observed = new Map<ResizeObserver, Set<Element>>(), OriginalObserver = ResizeObserver;
    window.ResizeObserver = class extends OriginalObserver {
      observe(target: Element, options?: ResizeObserverOptions) {
        let elements = observed.get(this); if (!elements) { elements = new Set(); observed.set(this, elements); }
        elements.add(target); super.observe(target, options);
      }
      unobserve(target: Element) { observed.get(this)?.delete(target); super.unobserve(target); }
      disconnect() { observed.delete(this); super.disconnect(); }
    };
    Object.defineProperty(window, '__navResources', { value: { snapshot(): ResourceSnapshot {
      const listeners: Record<string, number> = {};
      for (const [target, events] of tracked) for (const [eventKey, callbacks] of events) {
        const targetScope = scope(target, eventKey.split(':')[0]);
        if (targetScope && callbacks.size) listeners[`${targetScope}:${eventKey}`] = (listeners[`${targetScope}:${eventKey}`] ?? 0) + callbacks.size;
      }
      return { listeners, observedElements: [...observed.values()].reduce((total, elements) => total + elements.size, 0) };
    } } });
  });
}

async function resources(page: Page): Promise<ResourceSnapshot> {
  return page.evaluate(() => (window as unknown as { __navResources: { snapshot(): ResourceSnapshot } }).__navResources.snapshot());
}

test('3D twenty view switches keep canvas, labels, geometry, observers, and navigation handlers stable', async ({ page }, info) => {
  await watchResources(page);
  const opened = await openNavigation(page, info);
  await enterView(page, 'shared', 'child');
  await expect.poll(async () => (await state(page)).geometryCount).toBeGreaterThan(0);
  const childGeometry = (await state(page)).geometryCount, childResources = await resources(page);
  await page.locator('#back-view').click();
  await expect.poll(async () => (await state(page)).geometryCount).toBeGreaterThan(0);
  const rootGeometry = (await state(page)).geometryCount, rootResources = await resources(page);
  expect(rootResources.observedElements).toBeGreaterThan(0);
  expect(rootResources.listeners['stage:pointerdown:false']).toBeGreaterThan(0);
  for (let cycle = 0; cycle < 10; cycle++) {
    await enterView(page, 'shared', 'child');
    await expect(page.locator('#stage canvas')).toHaveCount(1);
    await expect(page.locator('#labels .world-label')).toHaveCount(4);
    await expect.poll(async () => (await state(page)).geometryCount).toBe(childGeometry);
    expect(await resources(page)).toEqual(childResources);
    await page.locator('#back-view').click();
    await expect(page.locator('#stage canvas')).toHaveCount(1);
    await expect(page.locator('#labels .world-label')).toHaveCount(4);
    await expect.poll(async () => (await state(page)).geometryCount).toBe(rootGeometry);
    expect(await resources(page)).toEqual(rootResources);
  }
  const resourceEvidence = info.outputPath('navigation-resources.json');
  await writeFile(resourceEvidence, JSON.stringify({ switches: 20,
    root: { geometryCount: rootGeometry, ...rootResources }, child: { geometryCount: childGeometry, ...childResources },
    final: { geometryCount: (await state(page)).geometryCount, ...await resources(page) } }, null, 2), 'utf8');
  await info.attach('navigation-resources', { contentType: 'application/json', path: resourceEvidence });
  await focusPage(page);
  await page.keyboard.press('ArrowRight');
  expect((await state(page)).demo.index).toBe(0);
  await page.keyboard.press('ArrowRight');
  expect((await state(page))).toMatchObject({ viewId: 'child', demo: { index: 1 } });
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

test('3D four-layer navigation and bridge responsibilities fit a 375px viewport', async ({ page }, info) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const opened = await openNavigation(page, info);
  await enterView(page, 'shared', 'child');
  await chooseNode(page, 'part');
  await page.locator('#more-details').click();
  await expect(page.locator('#bridge-links')).toContainText('src/service.ts:12');
  for (const id of ['context-card', 'view-breadcrumbs', 'demo-dock']) {
    const bounds = await page.locator(`#${id}`).boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(375);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await capture(page, info, 'navigation-responsibility-375');
  await page.locator('#enter-view').click();
  await enterView(page, 'shared', 'deep');
  await enterView(page, 'shared', 'deepest');
  expect((await state(page)).viewPath).toEqual(['root', 'child', 'leaf', 'deep', 'deepest']);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await capture(page, info, 'navigation-four-layers-375');
  await page.locator('#view-breadcrumbs button[data-view-id="root"]').click();
  expect((await state(page)).viewId).toBe('root');
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

function useLongResponsibilities(document: DiagramDocument) {
  // Titles and text lengths reproduce the CiteRAG acceptance screenshot; this remains a test teaching fixture.
  document.title = 'CiteRAG · 源码架构与文字问答 · 分层阅读';
  const child = document.navigation!.views[0].document;
  child.title = 'CiteRAG · AnswerService';
  const node = child.spatial!.interiors![0].nodes[0];
  node.label = '归属与幂等'; node.summary = '请求可接收或可复用？';
  node.details = '固定库/普通聊天类型、归档、ready、活动回答/工具及相同 UUID 的正文/模式/图片一致性检查。重复请求只返回原尝试；KB revision/workspace 已变化则拒绝。';
  node.sources = [{ path: 'backend/app/services/answers.py', line: 250 }, { path: 'backend/app/services/answers.py', line: 260 }];
  const edge = child.spatial!.interiors![0].edges[0];
  edge.label = '新请求且全部门禁通过';
  edge.details = '将问题与尝试一起保存，随后按明确编排的教学步骤继续读取；这一长说明用于复现职责卡片的实际高度。';
  edge.sources = [{ path: 'backend/app/services/answers.py', line: 293 }];
}

async function responsibilityLayout(page: Page) {
  return page.evaluate(() => {
    const breadcrumb = document.getElementById('view-breadcrumbs')!.getBoundingClientRect();
    const card = document.getElementById('context-card')!.getBoundingClientRect();
    const overlapWidth = Math.max(0, Math.min(breadcrumb.right, card.right) - Math.max(breadcrumb.left, card.left));
    const overlapHeight = Math.max(0, Math.min(breadcrumb.bottom, card.bottom) - Math.max(breadcrumb.top, card.top));
    const controls = ['context-title', 'more-details', 'close-context', 'enter-view'].map(id => {
      const element = document.getElementById(id)!, bounds = element.getBoundingClientRect();
      const hit = document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
      return { id, reachable: !!hit && (hit === element || element.contains(hit)), top: bounds.top, bottom: bounds.bottom };
    });
    return { overlapArea: overlapWidth * overlapHeight, breadcrumbBottom: breadcrumb.bottom,
      cardTop: card.top, cardBottom: card.bottom, viewportHeight: innerHeight, controls };
  });
}

for (const entry of ['manual', 'scenario', 'fallback'] as const) {
  test(`3D long breadcrumbs keep responsibility headers and controls reachable after ${entry} navigation at 375px`, async ({ page }, info) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const opened = await openNavigation(page, info, { mutate: useLongResponsibilities, fallback: entry === 'fallback' });
    if (entry === 'scenario') {
      await page.locator('#demo-step').click(); await page.locator('#demo-step').click();
      expect((await state(page))).toMatchObject({ viewId: 'child', selectedId: 'part', demo: { index: 1 } });
    } else {
      await enterView(page, 'shared', 'child');
      if (entry === 'manual') await page.locator('#flat-view').click();
      await chooseNode(page, 'part');
    }
    await page.locator('#more-details').click();
    await expect(page.locator('#context-title')).toHaveText('归属与幂等');
    await expect(page.locator('#context-details')).toContainText('KB revision/workspace 已变化则拒绝。');
    await expect(page.locator('#bridge-links')).toContainText('src/service.ts:12');
    await capture(page, info, `navigation-long-titles-${entry}-375`);
    await expect.poll(async () => (await responsibilityLayout(page)).overlapArea, 'Long breadcrumbs must not cover the responsibility card').toBe(0);
    const layout = await responsibilityLayout(page);
    expect(layout.cardTop).toBeGreaterThanOrEqual(layout.breadcrumbBottom);
    expect(layout.cardBottom).toBeLessThanOrEqual(layout.viewportHeight);
    expect(layout.controls.filter(control => !control.reachable)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    await page.locator('#more-details').click(); await expect(page.locator('#context-details')).toBeHidden();
    await page.locator('#more-details').click(); await expect(page.locator('#context-details')).toBeVisible();
    await page.locator('#enter-view').click(); expect((await state(page)).viewId).toBe('leaf');
    expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
  });
}

test('3D WebGL failure retains navigation, bridge responsibilities, and cross-view keyboard steps', async ({ page }, info) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const opened = await openNavigation(page, info, { fallback: true });
  await expect(page.locator('#fallback')).toBeVisible();
  for (const id of ['spatial-view', 'flat-view', 'reset-view']) await expect(page.locator(`#${id}`)).toBeDisabled();
  await enterView(page, 'shared', 'child');
  await chooseNode(page, 'part');
  await page.locator('#more-details').click();
  await expect(page.locator('#context-title')).toHaveText('子处理组件');
  await expect(page.locator('#context-details')).toContainText('子组件只连接子图同级组件。');
  await page.locator('#bridge-links button[data-bridge-id="request-bridge"]').click();
  expect((await state(page))).toMatchObject({ viewId: 'root', selectedId: 'part', geometryCount: 0 });
  await expect(page.locator('#context-title')).toHaveText('根处理组件');
  await focusPage(page);
  await page.keyboard.press('ArrowRight');
  expect((await state(page))).toMatchObject({ viewId: 'root', demo: { index: 0 } });
  await page.keyboard.press('ArrowRight');
  expect((await state(page))).toMatchObject({ viewId: 'child', selectedId: 'part', demo: { index: 1 } });
  await page.keyboard.press('ArrowRight');
  expect((await state(page))).toMatchObject({ viewId: 'leaf', selectedId: 'shared', demo: { index: 2 } });
  await page.keyboard.press('ArrowLeft');
  expect((await state(page))).toMatchObject({ viewId: 'child', selectedId: 'part', demo: { index: 1 } });
  await page.locator('#more-details').click();
  await expect(page.locator('#context-details')).toContainText('子组件只连接子图同级组件。');
  await expect(page.locator('#fallback')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await capture(page, info, 'navigation-fallback-375');
  await page.locator('#demo-reset').click();
  expect((await state(page))).toMatchObject({ viewId: 'root', selectedId: null, demo: { index: -1, status: 'idle' } });
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});
