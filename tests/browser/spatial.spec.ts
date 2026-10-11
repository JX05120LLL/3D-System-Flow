import { test, expect, type Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { DiagramDocument } from '../../src/model/types';
import { capture } from './helpers';

interface SpatialState {
  mode: 'spatial' | 'flat';
  openModules: string[];
  isolated: boolean;
  selectedId: string | null;
  objectIds: string[];
  demoRoute: string[];
  related: string[];
  detailsExpanded: boolean;
  demo: { scenario: string | null; status: string; index: number; elapsedMs: number; stepsTotal: number; stepId: string | null };
}

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });

async function spatialState(page: Page): Promise<SpatialState> {
  return page.evaluate(() => (window as unknown as { __sandboxPrototype: { state(): SpatialState } }).__sandboxPrototype.state());
}

async function openSpatial(page: Page, name: string, options: { old?: boolean; mutate?: (document: DiagramDocument) => void; fallback?: boolean } = {}) {
  const input = resolve(options.old ? `tests/fixtures/${name}.diagram.json` : `system-flow/examples/${name}.diagram.json`);
  const document: DiagramDocument = JSON.parse(await readFile(input, 'utf8'));
  const suffix = options.mutate ? '-modified' : '';
  const output = resolve(`artifacts/spatial-${name}${suffix}.html`);
  await mkdir(resolve('artifacts'), { recursive: true });
  let source = input;
  if (options.mutate) {
    options.mutate(document);
    source = resolve(`artifacts/spatial-${name}${suffix}.diagram.json`);
    await writeFile(source, JSON.stringify(document), 'utf8');
  }
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
  return { document, network, pageErrors };
}

async function chooseSpatialNode(page: Page, id: string) {
  await page.locator('#explore-toggle').click();
  await page.locator('#node-select').selectOption(id);
  await expect(page.locator('#context-card')).toBeVisible();
  expect((await spatialState(page)).selectedId).toBe(id);
}

function expectedOpenModules(document: DiagramDocument, steps: NonNullable<NonNullable<DiagramDocument['spatial']>['scenarios']>[number]['steps']) {
  const interiors = document.spatial?.interiors ?? [];
  const owners = new Map(interiors.flatMap(interior => interior.nodes.map(node => [node.id, interior.owner] as const)));
  const moduleIds = new Set(interiors.map(interior => interior.owner));
  return [...new Set(steps.flatMap(step => [...step.route, step.focusId]).map(id => owners.get(id) ?? (moduleIds.has(id) ? id : null)).filter((id): id is string => id !== null))].sort();
}

test('3D old graph runs offline without inventing interiors or scenarios', async ({ page }, info) => {
  const opened = await openSpatial(page, 'single-node', { old: true });
  expect((await spatialState(page)).objectIds).toEqual(opened.document.nodes.map(node => node.id));
  expect((await spatialState(page)).demo).toMatchObject({ scenario: null, index: -1, stepsTotal: 0 });
  await expect(page.locator('#demo-dock')).toBeHidden();
  await expect(page.locator('#fallback')).toBeHidden();
  const node = opened.document.nodes[0];
  await page.locator(`.world-label[data-node-id="${node.id}"]`).click();
  await expect(page.locator('#context-title')).toHaveText(node.label);
  await expect(page.locator('#toggle-shell')).toBeHidden();
  expect((await spatialState(page)).openModules).toEqual([]);
  await page.locator('#flat-view').click(); expect((await spatialState(page)).mode).toBe('flat');
  await page.locator('#spatial-view').click(); expect((await spatialState(page)).mode).toBe('spatial');
  await capture(page, info, 'old-graph-3d');
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

for (const name of ['microservices-spatial', 'document-pipeline-spatial']) {
  test(`3D ${name} keeps authored objects, independent owners, and component responsibilities`, async ({ page }, info) => {
    const opened = await openSpatial(page, name), interiors = opened.document.spatial!.interiors!;
    const nodes = [...opened.document.nodes, ...interiors.flatMap(interior => interior.nodes)];
    expect((await spatialState(page)).objectIds.sort()).toEqual(nodes.map(node => node.id).sort());
    expect(await page.locator('#node-select option').count()).toBe(nodes.length + 1);
    await expect(page.locator('#demo-dock')).toBeVisible();
    const seenOwners = new Set<string>();
    for (const interior of interiors) {
      for (const node of interior.nodes) {
        await chooseSpatialNode(page, node.id);
        seenOwners.add(interior.owner);
        expect((await spatialState(page)).openModules.sort()).toEqual([...seenOwners].sort());
        await expect(page.locator('#context-title')).toHaveText(node.label);
        if (node.summary) await expect(page.locator('#context-summary')).toHaveText(node.summary);
        await page.locator('#more-details').click();
        if (node.details) await expect(page.locator('#context-details')).toContainText(node.details);
        for (const source of node.sources ?? []) await expect(page.locator('#context-details')).toContainText(source.path);
      }
    }
    if (name === 'document-pipeline-spatial') expect(interiors.some(interior => interior.nodes.some(node => !node.id.includes('/')))).toBe(true);
    await capture(page, info, `${name}-interiors`);
    await page.locator('#toggle-shell').click();
    expect((await spatialState(page)).openModules).toHaveLength(interiors.length - 1);
    expect((await spatialState(page)).selectedId).toBe(interiors.at(-1)!.owner);
    await page.keyboard.press('Escape');
    expect((await spatialState(page)).openModules).toEqual([]);
    await expect(page.locator('#context-card')).toBeHidden();
    await capture(page, info, `${name}-overview`);
    expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
  });

  test(`3D ${name} authored scenarios step forward, backward, and reset with correct cutaways`, async ({ page }) => {
    const opened = await openSpatial(page, name), scenarios = opened.document.spatial!.scenarios!;
    for (const scenario of scenarios) {
      await page.locator('#demo-scenario').selectOption(scenario.id);
      expect((await spatialState(page)).demo).toMatchObject({ scenario: scenario.id, index: -1, stepsTotal: scenario.steps.length, status: 'idle' });
      for (let index = 0; index < scenario.steps.length; index++) {
        await page.locator('#demo-step').click();
        const state = await spatialState(page), step = scenario.steps[index];
        expect(state.demo).toMatchObject({ index, stepId: step.id, status: 'paused' });
        expect(state.selectedId).toBe(step.focusId); expect(state.demoRoute).toEqual(step.route);
        expect(state.openModules.sort()).toEqual(expectedOpenModules(opened.document, scenario.steps.slice(0, index + 1)));
        await expect(page.locator('#demo-title')).toHaveText(step.title);
        await expect(page.locator('#demo-description')).toHaveText(step.description);
      }
      for (let index = scenario.steps.length - 2; index >= 0; index--) {
        await page.locator('#demo-back').click();
        const state = await spatialState(page);
        expect(state.demo.index).toBe(index); expect(state.selectedId).toBe(scenario.steps[index].focusId);
        expect(state.openModules.sort()).toEqual(expectedOpenModules(opened.document, scenario.steps.slice(0, index + 1)));
      }
      await page.locator('#demo-reset').click();
      expect((await spatialState(page)).demo).toMatchObject({ scenario: scenario.id, index: -1, status: 'idle' });
      expect((await spatialState(page)).openModules).toEqual([]); expect((await spatialState(page)).selectedId).toBeNull();
    }
    expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
  });
}

test('3D non-prefixed components keep upstream and downstream inside their authored interior', async ({ page }) => {
  const opened = await openSpatial(page, 'document-pipeline-spatial');
  const interior = opened.document.spatial!.interiors!.find(item => item.edges.some(edge => edge.directed))!;
  const edge = interior.edges.find(item => item.directed)!;
  expect(edge.source).not.toContain('/');
  await chooseSpatialNode(page, edge.source);
  await page.locator('#show-downstream').click();
  const downstream = (await spatialState(page)).related;
  expect(downstream).toContain(edge.target);
  expect(downstream.every(id => interior.nodes.some(node => node.id === id))).toBe(true);
  await page.locator('#isolate-node').click(); expect((await spatialState(page)).isolated).toBe(true);
  await chooseSpatialNode(page, edge.target);
  await page.locator('#show-upstream').click();
  const upstream = (await spatialState(page)).related;
  expect(upstream).toContain(edge.source);
  expect(upstream.every(id => interior.nodes.some(node => node.id === id))).toBe(true);
  await page.locator('#show-all').click(); expect((await spatialState(page)).related).toEqual([]);
  await chooseSpatialNode(page, interior.owner);
  await page.locator('#show-downstream').click();
  expect((await spatialState(page)).related.every(id => opened.document.nodes.some(node => node.id === id))).toBe(true);
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

test('3D manual responsibility inspection pauses playback and resume restores the teaching step', async ({ page }) => {
  const opened = await openSpatial(page, 'document-pipeline-spatial', { mutate: document => {
    for (const scenario of document.spatial!.scenarios!) for (const step of scenario.steps) step.durationMs = 60000;
  } });
  await page.locator('#demo-play').click();
  await expect.poll(async () => (await spatialState(page)).demo.elapsedMs).toBeGreaterThan(0);
  const component = opened.document.spatial!.interiors![0].nodes[0];
  await chooseSpatialNode(page, component.id);
  await page.locator('#more-details').click();
  const paused = await spatialState(page);
  expect(paused.demo.status).toBe('paused'); expect(paused.detailsExpanded).toBe(true);
  // This interval verifies a frozen clock; it is not a page-readiness delay.
  await page.waitForTimeout(250);
  expect((await spatialState(page)).demo.elapsedMs).toBe(paused.demo.elapsedMs);
  await page.locator('#demo-play').click();
  const resumed = await spatialState(page);
  expect(resumed.demo.status).toBe('playing'); expect(resumed.demo.index).toBe(paused.demo.index);
  expect(resumed.demo.elapsedMs).toBeGreaterThanOrEqual(paused.demo.elapsedMs);
  expect(resumed.selectedId).toBe(opened.document.spatial!.scenarios![0].steps[paused.demo.index].focusId);
  await page.locator('#demo-play').click(); expect((await spatialState(page)).demo.status).toBe('paused');
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

test('3D scenario frames an internal focus outside its distant authored route', async ({ page }) => {
  const opened = await openSpatial(page, 'document-pipeline-spatial', { mutate: document => {
    const rootIds = ['route-origin', ...Array.from({ length: 10 }, (_, index) => `bridge-${index}`), 'focus-module'];
    document.groups = [];
    document.nodes = rootIds.map(id => ({ id, kind: 'process', label: id, evidenceStatus: 'assumed' }));
    document.edges = rootIds.slice(1).map((id, index) => ({
      id: `bridge-edge-${index}`, source: rootIds[index], target: id, kind: 'dependency', directed: true, evidenceStatus: 'assumed',
    }));
    document.spatial = {
      interiors: [{ owner: 'focus-module', nodes: [{ id: 'detached-focus', kind: 'process', label: 'Independent focus', details: 'Teaching focus outside the route.', evidenceStatus: 'assumed' }], edges: [] }],
      scenarios: [{ id: 'detached', label: 'Independent focus', steps: [{ id: 'focus-outside-route', title: 'Inspect another component', description: 'Explicit focus is independent from the authored route.', route: ['route-origin'], focusId: 'detached-focus', tone: 'request' }] }],
    };
  } });
  await page.locator('#demo-step').click();
  expect((await spatialState(page)).demoRoute).toEqual(['route-origin']);
  expect((await spatialState(page)).selectedId).toBe('detached-focus');
  expect((await spatialState(page)).openModules).toEqual(['focus-module']);
  await expect(page.locator('#context-card')).toBeVisible();
  const label = page.locator('.world-label[data-node-id="detached-focus"]');
  await expect(label).toBeVisible();
  for (const mode of ['flat', 'spatial']) {
    await page.locator(`#${mode}-view`).click();
    await expect(page.locator('#context-card')).toBeVisible();
    await expect(label).toBeVisible();
    const bounds = await label.boundingBox(), viewport = page.viewportSize()!;
    expect(bounds!.x).toBeGreaterThanOrEqual(0); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
    expect(bounds!.y).toBeGreaterThanOrEqual(0); expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
  }
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

test('3D actual WebGL component reading stays reachable in a narrow viewport', async ({ page }, info) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const opened = await openSpatial(page, 'document-pipeline-spatial');
  const interior = opened.document.spatial!.interiors!.at(-1)!;
  await chooseSpatialNode(page, interior.nodes.at(-1)!.id);
  await page.locator('#more-details').click();
  await expect(page.locator('#context-details')).toContainText(interior.nodes.at(-1)!.details!);
  const bounds = await page.locator('#context-card').boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(375);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await page.locator('#close-context').click(); await expect(page.locator('#context-card')).toBeHidden();
  expect((await spatialState(page)).openModules).toContain(interior.owner);
  await capture(page, info, 'webgl-interior-375');
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});

test('3D WebGL failure preserves keyboard component and scenario reading in a narrow viewport', async ({ page }, info) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const opened = await openSpatial(page, 'document-pipeline-spatial', { fallback: true });
  await expect(page.locator('#fallback')).toBeVisible();
  for (const id of ['spatial-view', 'flat-view', 'reset-view']) await expect(page.locator(`#${id}`)).toBeDisabled();
  await page.locator('#explore-toggle').focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#node-select')).toBeFocused();
  // A native select change immediately chooses the node and moves focus to the responsibility button.
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#context-card')).toBeVisible();
  await expect(page.locator('#context-details')).toBeHidden();
  await page.locator('#more-details').focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#context-details')).toBeVisible();
  await page.keyboard.press('Escape'); expect((await spatialState(page)).selectedId).toBeNull();
  await page.locator('body').evaluate(element => { element.tabIndex = -1; element.focus(); });
  await page.keyboard.press('ArrowRight'); expect((await spatialState(page)).demo.index).toBe(0);
  await page.keyboard.press('ArrowRight'); expect((await spatialState(page)).demo.index).toBe(1);
  await page.keyboard.press('ArrowLeft'); expect((await spatialState(page)).demo.index).toBe(0);
  await page.keyboard.press('Space'); expect((await spatialState(page)).demo.status).toBe('playing');
  await page.keyboard.press('Space'); expect((await spatialState(page)).demo.status).toBe('paused');
  const interior = opened.document.spatial!.interiors![0];
  await chooseSpatialNode(page, interior.nodes[0].id);
  expect((await spatialState(page)).openModules).toContain(interior.owner);
  await page.locator('#more-details').click();
  await expect(page.locator('#context-details')).toContainText(interior.nodes[0].details!);
  const bounds = await page.locator('#context-card').boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(375);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await capture(page, info, 'webgl-fallback-375');
  expect(opened.network).toEqual([]); expect(opened.pageErrors).toEqual([]);
});
