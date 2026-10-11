import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { DiagramDocument } from '../../../src/model/types.ts';
import { createSceneModel, createModuleSceneModel, getHighlight, type ViewMode, type HighlightMode, type SceneNode, type SceneModel } from './scene-model.ts';
import { createModuleDocument } from './module-details.ts';

declare const __DIAGRAM__: DiagramDocument;
const overview = createSceneModel(__DIAGRAM__);
let model: SceneModel = overview;
let byId = new Map(model.nodes.map(node => [node.id, node]));
let laneById = new Map(model.lanes.map(lane => [lane.id, lane]));
const el = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id)! as T;
const stage = el('stage');
const labels = el('labels');
const select = el<HTMLSelectElement>('node-select');
let mode: ViewMode = 'spatial';
let selectedId: string | null = null;
let highlight: HighlightMode = 'none';
let activeModuleId: string | null = null;
let overviewSelection: { selectedId: string | null; highlight: HighlightMode } = { selectedId: null, highlight: 'none' };
let rendererAvailable = false;
let focusCamera = (_id: string, _animate: boolean) => {};
let applyView = (_animate: boolean) => {};
let applyHighlight = () => {};
let resetCamera = (_animate: boolean) => {};
let rebuildScene = () => {};
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function paragraph(text: string, className?: string) {
  const p = document.createElement('p'); p.textContent = text;
  if (className) p.className = className;
  return p;
}
function choose(id: string | null) {
  selectedId = id;
  if (!id) highlight = 'none';
  select.value = id ?? '';
  updatePanel(); applyHighlight();
}
function refreshModel(next: SceneModel) {
  model = next;
  byId = new Map(model.nodes.map(node => [node.id, node]));
  laneById = new Map(model.lanes.map(lane => [lane.id, lane]));
  select.replaceChildren(new Option(activeModuleId ? '选择内部节点' : '从一个模块开始', ''));
  for (const lane of model.lanes) {
    const group = document.createElement('optgroup'); group.label = lane.label;
    for (const node of model.nodes.filter(node => node.laneId === lane.id)) group.append(new Option(node.node.label, node.id));
    select.append(group);
  }
  select.value = selectedId ?? '';
  rebuildScene(); updatePanel();
}
function openModule(id: string) {
  if (activeModuleId) return;
  const next = createModuleSceneModel(createModuleDocument(id));
  overviewSelection = { selectedId: id, highlight: selectedId === id ? highlight : 'none' };
  activeModuleId = id; selectedId = null; highlight = 'none';
  refreshModel(next);
  el('back-overview').focus({ preventScroll: true });
}
function backToOverview() {
  if (!activeModuleId) return;
  activeModuleId = null;
  selectedId = overviewSelection.selectedId; highlight = overviewSelection.highlight;
  refreshModel(overview);
  const returnLabel = selectedId ? labels.querySelector<HTMLButtonElement>(`[data-node-id="${selectedId}"]`) : null;
  (returnLabel ?? select).focus({ preventScroll: true });
}
function activateNode(id: string) { if (activeModuleId) choose(id); else openModule(id); }
function updatePanel() {
  document.documentElement.dataset.mode = mode;
  document.documentElement.dataset.selectedNode = selectedId ?? '';
  document.documentElement.dataset.highlight = highlight;
  document.documentElement.dataset.module = activeModuleId ?? '';
  const parent = activeModuleId ? overview.nodes.find(node => node.id === activeModuleId) : undefined;
  el('scene-title').textContent = parent ? `${parent.node.label} · 内部结构` : '从请求到服务，再到数据。';
  el('scene-description').textContent = parent ? '教学拆解 · 点击子模块查看职责与关联，沿连接探索。' : '传统电商微服务架构 · 点击模块，进入内部结构。';
  el('scene-eyebrow').textContent = parent ? 'MODULE / INTERIOR' : 'MICROSERVICES / OVERVIEW';
  el('diagram-count').textContent = `${model.nodes.length} 节点 / ${model.edges.length} 连接`;
  el('back-overview').hidden = !parent;
  el('breadcrumb-current').textContent = parent ? parent.node.label : '系统总览';
  el('breadcrumb-divider').hidden = !parent;
  el('inspector-title').textContent = parent ? '内部节点与关系' : '模块与关系';
  el('select-label').textContent = parent ? '选择内部节点' : '选择模块（查看整体关联）';
  el('evidence-note').textContent = parent ? '内部节点与连线是新增的教学拆解，未从真实服务代码推导；空间高度仅用于阅读。' : '总览来自现有示例；点击模块进入教学内部视图，所有关系仍需核查。';
  const details = el('details'); details.replaceChildren();
  const node = selectedId ? byId.get(selectedId) : undefined;
  if (node) {
    const heading = document.createElement('h3'); heading.textContent = node.node.label;
    const meta = document.createElement('div'); meta.className = 'node-meta';
    for (const value of [laneById.get(node.laneId)!.label, parent ? '教学示意' : '假设 · 待核查']) {
      const tag = document.createElement('span'); tag.textContent = value; meta.append(tag);
    }
    details.append(heading, meta, paragraph(node.node.details ?? node.node.summary ?? '此节点未提供额外说明。'));
  } else if (parent) {
    const heading = document.createElement('h3'); heading.textContent = parent.node.label;
    const meta = document.createElement('div'); meta.className = 'node-meta';
    const tag = document.createElement('span'); tag.textContent = '模块概览 · 教学示意'; meta.append(tag);
    details.append(heading, meta, paragraph(parent.node.details ?? parent.node.summary ?? ''), paragraph('点击内部节点，查看它的职责和输入输出。', 'module-tip'));
  } else {
    details.append(paragraph('从一个模块开始。', 'empty-caption'), paragraph('点击画布模块进入内部，或用下方入口快速体验。'));
    const quick = document.createElement('div'); quick.className = 'quick-links';
    for (const id of ['order', 'gateway', 'payment']) {
      const button = document.createElement('button'); button.textContent = byId.get(id)!.node.label;
      button.addEventListener('click', () => openModule(id)); quick.append(button);
    }
    details.append(quick);
  }
  el<HTMLButtonElement>('enter-module').hidden = !!parent;
  el<HTMLButtonElement>('enter-module').disabled = !node;
  el('enter-module').textContent = node && !parent ? `进入${node.node.label}内部 →` : '进入模块内部 →';
  el<HTMLButtonElement>('focus-node').disabled = !node || !rendererAvailable;
  for (const id of ['flat-view', 'spatial-view', 'reset-view']) el<HTMLButtonElement>(id).disabled = !rendererAvailable;
  el<HTMLButtonElement>('show-upstream').disabled = !node;
  el<HTMLButtonElement>('show-downstream').disabled = !node;
  for (const [id, value] of [['show-all', 'none'], ['show-upstream', 'upstream'], ['show-downstream', 'downstream']]) {
    el(id!).setAttribute('aria-pressed', String(highlight === value));
  }
  el('flat-view').setAttribute('aria-pressed', String(mode === 'flat'));
  el('spatial-view').setAttribute('aria-pressed', String(mode === 'spatial'));
  el('mode-label').textContent = !rendererAvailable ? '节点列表模式' : mode === 'flat' ? '平面流程视图' : '分层立体视图';
  el('gesture-hint').textContent = !rendererAvailable ? '通过节点列表查看职责与关联' : matchMedia('(max-width: 720px)').matches
    ? `双指缩放与平移 · ${parent ? '点选节点查看详情' : '点选模块进入内部'}`
    : mode === 'flat' ? `拖动画布平移 · 滚轮缩放 · ${parent ? '双击节点聚焦' : '点击模块进入内部'}` : '拖动画布旋转 · 滚轮缩放 · 右键平移';
  const related = getHighlight(model, selectedId, highlight);
  el('highlight-summary').textContent = !node ? '选择节点后，可沿连接方向查看关联。'
    : highlight === 'none' ? '显示全部节点与连接。'
      : `${highlight === 'upstream' ? '上游' : '下游'}可达：${related.nodeIds.size} 节点，${related.edgeIds.size} 连接（含当前节点）。`;
  const connections = el('connections'); connections.replaceChildren();
  const title = document.createElement('h3'); title.className = 'connections-heading';
  title.textContent = node ? '与此节点直接相连' : '图中有什么'; connections.append(title);
  if (!node) {
    for (const lane of model.lanes) {
      connections.append(paragraph(`${lane.label} · ${model.nodes.filter(n => n.laneId === lane.id).length} 节点`, 'connection-empty'));
    }
  } else {
    const edges = model.edges.filter(edge => edge.source === node.id || edge.target === node.id);
    if (!edges.length) connections.append(paragraph('没有直接连接。', 'connection-empty'));
    for (const edge of edges) {
      const outgoing = edge.source === node.id;
      const other = byId.get(outgoing ? edge.target : edge.source)!;
      const button = document.createElement('button'); button.className = 'connection-row';
      const name = document.createElement('span'); name.textContent = `${outgoing ? '→' : '←'} ${other.node.label}`;
      const explanation = document.createElement('small'); explanation.textContent = edge.label ?? edge.kind;
      button.append(name, explanation); button.addEventListener('click', () => choose(other.id)); connections.append(button);
    }
  }
}
refreshModel(overview);
select.addEventListener('change', () => choose(select.value || null));
el('enter-module').addEventListener('click', () => { if (selectedId && !activeModuleId) openModule(selectedId); });
el('back-overview').addEventListener('click', backToOverview);
el('focus-node').addEventListener('click', event => { if (selectedId) focusCamera(selectedId, event.detail > 0); });
el('reset-view').addEventListener('click', event => resetCamera(event.detail > 0));
for (const [id, value] of [['flat-view', 'flat'], ['spatial-view', 'spatial']] as const) {
  el(id).addEventListener('click', event => {
    if (mode === value) return;
    mode = value; updatePanel(); applyView(event.detail > 0);
  });
}
for (const [id, value] of [['show-all', 'none'], ['show-upstream', 'upstream'], ['show-downstream', 'downstream']] as const) {
  el(id).addEventListener('click', () => { highlight = value; updatePanel(); applyHighlight(); });
}
document.addEventListener('keydown', event => { if (event.key === 'Escape') { if (selectedId) choose(null); else backToOverview(); } });
updatePanel();

function bootScene() {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (error) {
    el('fallback').hidden = false;
    document.documentElement.dataset.renderer = 'unavailable';
    updatePanel();
    console.warn('WebGL initialization unavailable', error instanceof Error ? error.message : String(error));
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0xf8fafc, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.prepend(renderer.domElement);
  renderer.domElement.setAttribute('aria-label', '可旋转、缩放的微服务架构');
  document.documentElement.dataset.renderer = 'webgl';
  rendererAvailable = true;
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 2.1));
  const light = new THREE.DirectionalLight(0xffffff, 2.0); light.position.set(-500, 800, 1600); scene.add(light);
  const camera = new THREE.OrthographicCamera(-1000, 1000, 850, -850, 1, 10000);
  const controls = new OrbitControls(camera, stage);
  controls.enableDamping = false;
  controls.minZoom = .35; controls.maxZoom = 6;
  controls.minPolarAngle = .65; controls.maxPolarAngle = 1.6;
  controls.minAzimuthAngle = -.6; controls.maxAzimuthAngle = .6;
  controls.rotateSpeed = .5; controls.zoomSpeed = .7;
  const nodeObjects = new Map<string, { mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial[]>; outline: THREE.LineSegments; label: HTMLButtonElement }>();
  const laneObjects: { mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>; outline: THREE.LineSegments; label: HTMLElement; anchor: THREE.Vector3; z: number; width: number }[] = [];
  const edgeObjects: { id: string; mesh: THREE.Mesh<THREE.TubeGeometry, THREE.MeshBasicMaterial>; arrow: THREE.Mesh<THREE.ConeGeometry, THREE.MeshBasicMaterial>; label: HTMLElement; anchor: THREE.Vector3 }[] = [];
  const nodeWidth = 230, nodeHeight = 100;
  function createObjects() {
    clearEdges();
    for (const object of nodeObjects.values()) {
      scene.remove(object.mesh); object.mesh.geometry.dispose();
      for (const material of new Set(object.mesh.material)) material.dispose();
      object.outline.geometry.dispose(); (object.outline.material as THREE.Material).dispose(); object.label.remove();
    }
    nodeObjects.clear();
    for (const object of laneObjects) {
      scene.remove(object.mesh); object.mesh.geometry.dispose(); object.mesh.material.dispose();
      object.outline.geometry.dispose(); (object.outline.material as THREE.Material).dispose(); object.label.remove();
    }
    laneObjects.length = 0;
  for (const lane of model.lanes) {
    const width = lane.width ?? 1660;
    const geometry = new THREE.BoxGeometry(width, 190, 7);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: lane.tint, roughness: 1 }));
    mesh.position.set(0, lane.y, lane.z - 21); scene.add(mesh);
    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: lane.color, transparent: true, opacity: .2 }));
    mesh.add(outline);
    const label = document.createElement('div'); label.className = 'lane-label'; label.style.setProperty('--lane-color', lane.color);
    const number = document.createElement('span'); number.textContent = String(laneObjects.length + 1).padStart(2, '0');
    label.append(number, document.createTextNode(lane.label)); labels.append(label);
    laneObjects.push({ mesh, outline, label, anchor: new THREE.Vector3(-width / 2 + 35, lane.y + 77, lane.z - 13), z: lane.z, width });
  }
  for (const node of model.nodes) {
    const lane = laneById.get(node.laneId)!;
    const geometry = new THREE.BoxGeometry(nodeWidth, nodeHeight, 16);
    const side = new THREE.MeshStandardMaterial({ color: lane.color, roughness: .8 });
    const face = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1 });
    const mesh = new THREE.Mesh(geometry, [side, side, side, side, face, side]);
    mesh.position.set(node.x, node.y, node.z); mesh.userData.nodeId = node.id; scene.add(mesh);
    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: '#bdcbd8' })); mesh.add(outline);
    const label = document.createElement('button'); label.className = 'node-label'; label.dataset.nodeId = node.id;
    label.style.setProperty('--lane-color', lane.color); label.setAttribute('aria-label', activeModuleId ? node.node.label : `进入${node.node.label}内部`);
    const kind = document.createElement('span'); kind.className = 'node-kind'; kind.textContent = activeModuleId ? node.id.split('/').at(-1)! : `${node.id} · 进入 ↗`;
    const title = document.createElement('strong'); title.textContent = node.node.label;
    const summary = document.createElement('small'); summary.textContent = node.node.summary ?? '';
    label.append(kind, title, summary);
    // Keep buttons clickable while their wheel events reach the shared viewport.
    label.addEventListener('pointerdown', event => event.stopPropagation());
    label.addEventListener('click', () => activateNode(node.id));
    if (activeModuleId) label.addEventListener('dblclick', () => { choose(node.id); focusCamera(node.id, true); });
    labels.append(label); nodeObjects.set(node.id, { mesh, outline, label });
  }
  }
  function nodePosition(node: SceneNode, ox = 0, oy = 0) { return new THREE.Vector3(node.x + ox, node.y + oy, (mode === 'spatial' ? node.z : 0) + 11); }
  function edgeCurve(id: string, source: SceneNode, target: SceneNode): THREE.Curve<THREE.Vector3> {
    let start: THREE.Vector3, end: THREE.Vector3, handleA: THREE.Vector3, handleB: THREE.Vector3;
    if (id === 'payment-provider') {
      start = nodePosition(source, 117, -18); end = nodePosition(target, 117, 18);
      const routeX = source.x + 160;
      return new THREE.CatmullRomCurve3([start, new THREE.Vector3(routeX, source.y - 45, start.z), new THREE.Vector3(routeX, target.y + 45, end.z), end], false, 'centripetal');
    }
    if (activeModuleId && Math.abs(source.y - target.y) > 300) {
      // Route past the intervening layer so a skipped layer cannot look like an endpoint.
      const side = source.x + target.x <= 0 ? -1 : 1;
      const direction = Math.sign(target.y - source.y);
      start = nodePosition(source, side * 117, direction * 18);
      end = nodePosition(target, side * 117, -direction * 18);
      const routeX = side * (Math.max(...model.nodes.map(node => Math.abs(node.x))) + 160);
      return new THREE.CatmullRomCurve3([start,
        new THREE.Vector3(routeX, source.y + direction * 45, start.z),
        new THREE.Vector3(routeX, target.y - direction * 45, end.z), end], false, 'centripetal');
    }
    if (source.y === target.y) {
      const sign = Math.sign(target.x - source.x) || 1;
      start = nodePosition(source, sign * 117); end = nodePosition(target, -sign * 117);
      if (Math.abs(target.x - source.x) > 400) {
        start = nodePosition(source, 65, 52); end = nodePosition(target, -65, 52);
        handleA = start.clone().add(new THREE.Vector3(90, 100, 0)); handleB = end.clone().add(new THREE.Vector3(-90, 100, 0));
      } else { handleA = start.clone().lerp(end, .33); handleB = start.clone().lerp(end, .66); }
    } else {
      const sign = Math.sign(target.y - source.y);
      start = nodePosition(source, 0, sign * 52); end = nodePosition(target, 0, -sign * 52);
      const offset = Math.min(95, Math.abs(end.y - start.y) * .6);
      handleA = start.clone().add(new THREE.Vector3(0, sign * offset, 0));
      handleB = end.clone().add(new THREE.Vector3(0, -sign * offset, 0));
    }
    return new THREE.CubicBezierCurve3(start, handleA, handleB, end);
  }
  function clearEdges() {
    for (const edge of edgeObjects) { scene.remove(edge.mesh, edge.arrow); edge.mesh.geometry.dispose(); edge.mesh.material.dispose(); edge.arrow.geometry.dispose(); edge.arrow.material.dispose(); edge.label.remove(); }
    edgeObjects.length = 0;
  }
  function rebuildEdges() {
    clearEdges();
    for (const edge of model.edges) {
      const source = byId.get(edge.source)!, target = byId.get(edge.target)!;
      const curve = edgeCurve(edge.id, source, target);
      const color = laneById.get(source.laneId)!.color;
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 45, 1.5, 5, false), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .72 }));
      const end = curve.getPoint(1), tangent = curve.getTangent(1).normalize();
      const arrow = new THREE.Mesh(new THREE.ConeGeometry(5, 12, 8), new THREE.MeshBasicMaterial({ color, transparent: true }));
      arrow.position.copy(end.clone().addScaledVector(tangent, -6)); arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
      scene.add(mesh, arrow);
      const label = document.createElement('div'); label.className = 'edge-label'; label.textContent = edge.label ?? ''; label.dataset.edgeId = edge.id; labels.append(label);
      const anchor = curve.getPoint(edge.id === 'payment-provider' ? .74 : .5); anchor.z += 8;
      edgeObjects.push({ id: edge.id, mesh, arrow, label, anchor });
    }
  }
  const tmp = new THREE.Vector3();
  function project(position: THREE.Vector3) {
    tmp.copy(position).project(camera);
    return { x: (tmp.x + 1) * stage.clientWidth / 2, y: (1 - tmp.y) * stage.clientHeight / 2, visible: tmp.z > -1 && tmp.z < 1 };
  }
  function place(label: HTMLElement, position: THREE.Vector3) {
    const p = project(position); label.style.left = `${p.x}px`; label.style.top = `${p.y}px`;
    label.style.visibility = p.visible ? 'visible' : 'hidden';
  }
  function render() {
    renderer.render(scene, camera);
    for (const object of nodeObjects.values()) {
      place(object.label, object.mesh.position.clone().add(new THREE.Vector3(0, 0, 12)));
      const left = project(object.mesh.position.clone().add(new THREE.Vector3(-115, 0, 12)));
      const right = project(object.mesh.position.clone().add(new THREE.Vector3(115, 0, 12)));
      object.label.style.width = `${Math.max(96, Math.min(222, Math.abs(right.x - left.x) - 7))}px`;
    }
    for (const lane of laneObjects) {
      place(lane.label, lane.anchor);
      lane.label.style.left = `${Math.max(14, Math.min(stage.clientWidth - 140, project(lane.anchor).x))}px`;
    }
    for (const edge of edgeObjects) place(edge.label, edge.anchor);
  }
  let motionFrame = 0, renderFrame = 0;
  function requestRender() { if (!renderFrame) renderFrame = requestAnimationFrame(() => { renderFrame = 0; render(); }); }
  controls.addEventListener('change', requestRender);
  controls.addEventListener('start', () => cancelAnimationFrame(motionFrame));
  function moveCamera(position: THREE.Vector3, target: THREE.Vector3, zoom: number, animate: boolean) {
    cancelAnimationFrame(motionFrame);
    const startPosition = camera.position.clone(), startTarget = controls.target.clone(), startZoom = camera.zoom;
    const duration = animate && !reducedMotion() ? 340 : 0;
    const started = performance.now();
    function step(now: number) {
      const progress = duration ? Math.min(1, (now - started) / duration) : 1;
      const eased = 1 - (1 - progress) ** 3;
      camera.position.copy(startPosition).lerp(position, eased); controls.target.copy(startTarget).lerp(target, eased);
      camera.zoom = THREE.MathUtils.lerp(startZoom, zoom, eased); camera.updateProjectionMatrix(); camera.lookAt(controls.target); controls.update(); render();
      if (progress < 1) motionFrame = requestAnimationFrame(step);
    }
    step(started);
  }
  function defaultPose() {
    const target = new THREE.Vector3(0, activeModuleId ? 0 : -40, mode === 'spatial' ? activeModuleId ? 100 : 80 : 0);
    return { target, position: target.clone().add(mode === 'spatial' ? new THREE.Vector3(560, 560, 1800) : new THREE.Vector3(0, 0, 2200)) };
  }
  function fitZoom(position: THREE.Vector3, target: THREE.Vector3) {
    const oldPosition = camera.position.clone(), oldTarget = controls.target.clone(), oldZoom = camera.zoom;
    camera.position.copy(position); camera.zoom = 1; camera.lookAt(target); camera.updateProjectionMatrix(); camera.updateMatrixWorld();
    let extentX = 0, extentY = 0;
    for (const lane of laneObjects) for (const x of [-lane.width / 2 - 15, lane.width / 2 + 15]) for (const y of [-105, 105]) {
      const p = new THREE.Vector3(x, lane.mesh.position.y + y, lane.mesh.position.z).project(camera);
      extentX = Math.max(extentX, Math.abs(p.x)); extentY = Math.max(extentY, Math.abs(p.y));
    }
    let zoom = Math.min(.9 / extentX, .91 / extentY);
    if (stage.clientWidth < 600) zoom = Math.max(zoom, 1700 / (stage.clientHeight * 2.15));
    camera.position.copy(oldPosition); controls.target.copy(oldTarget); camera.zoom = oldZoom; camera.lookAt(oldTarget); camera.updateProjectionMatrix();
    return zoom;
  }
  resetCamera = animate => {
    const pose = defaultPose(); const zoom = fitZoom(pose.position, pose.target);
    if (stage.clientWidth < 600 && !activeModuleId) { pose.position.x -= 290; pose.target.x -= 290; }
    moveCamera(pose.position, pose.target, zoom, animate);
  };
  focusCamera = (id, animate) => {
    const node = byId.get(id)!; const target = nodePosition(node); const pose = defaultPose();
    const zoom = Math.min(4.2, Math.max(fitZoom(pose.position, pose.target) * 1.45, 2.1));
    moveCamera(target.clone().add(pose.position.clone().sub(pose.target)), target, zoom, animate);
  };
  applyHighlight = () => {
    const related = getHighlight(model, selectedId, highlight);
    for (const [id, object] of nodeObjects) {
      const active = related.nodeIds.has(id), chosen = selectedId === id;
      object.label.dataset.related = String(active); object.label.dataset.selected = String(chosen);
      object.label.setAttribute('aria-pressed', String(chosen));
      for (const material of new Set(object.mesh.material)) { material.transparent = !active; material.opacity = active ? 1 : .18; material.depthWrite = active; }
      object.mesh.material[4]!.color.set(chosen ? '#eaf2ff' : '#ffffff');
      const outlineMaterial = object.outline.material as THREE.LineBasicMaterial;
      outlineMaterial.color.set(chosen ? '#2563eb' : '#bdcbd8'); outlineMaterial.transparent = true; outlineMaterial.opacity = active ? 1 : .15;
    }
    for (const edge of edgeObjects) {
      const active = related.edgeIds.has(edge.id); edge.mesh.material.opacity = active ? .82 : .08; edge.arrow.material.opacity = active ? 1 : .08;
      edge.label.dataset.related = String(active);
    }
    requestRender();
  };
  applyView = animate => {
    for (const node of model.nodes) nodeObjects.get(node.id)!.mesh.position.z = mode === 'spatial' ? node.z : 0;
    for (const lane of laneObjects) { const z = mode === 'spatial' ? lane.z : 0; lane.mesh.position.z = z - 21; lane.anchor.z = z - 13; }
    controls.enableRotate = mode === 'spatial';
    controls.mouseButtons.LEFT = mode === 'spatial' ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN;
    rebuildEdges(); applyHighlight(); resetCamera(animate);
  };
  rebuildScene = () => { cancelAnimationFrame(motionFrame); createObjects(); applyView(false); };
  const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2();
  let pointerStart = { x: 0, y: 0 };
  renderer.domElement.addEventListener('pointerdown', event => { pointerStart = { x: event.clientX, y: event.clientY }; });
  renderer.domElement.addEventListener('pointerup', event => {
    if (event.button !== 0 || Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 5) return;
    const bounds = renderer.domElement.getBoundingClientRect(); pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects([...nodeObjects.values()].map(object => object.mesh), false)[0];
    if (hit) activateNode(hit.object.userData.nodeId as string);
  });
  function resize() {
    const width = stage.clientWidth, height = stage.clientHeight;
    renderer.setSize(width, height); const aspect = width / height;
    camera.left = -850 * aspect; camera.right = 850 * aspect; camera.top = 850; camera.bottom = -850; camera.updateProjectionMatrix();
    resetCamera(false); updatePanel();
  }
  new ResizeObserver(resize).observe(stage);
  createObjects(); resize(); applyView(false);
  Object.defineProperty(globalThis, '__flowPrototype', { value: {
    state: () => ({ mode, moduleId: activeModuleId, selectedId, highlight, renderer: 'webgl', camera: camera.position.toArray(), target: controls.target.toArray(), zoom: camera.zoom,
      nodeCount: model.nodes.length, edgeCount: model.edges.length, geometryCount: renderer.info.memory.geometries,
      nodes: model.nodes.map(node => ({ id: node.id, z: nodeObjects.get(node.id)!.mesh.position.z, related: getHighlight(model, selectedId, highlight).nodeIds.has(node.id) })) }),
  } });
}
bootScene();
