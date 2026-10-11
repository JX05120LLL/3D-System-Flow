import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { DemoStep, ModuleId, SpatialScene, WorldController, WorldMode, WorldSnapshot } from './contracts.ts';
import { ownerOf } from './scene.ts';
import { createWorldLayout, type PlacedNode, type Position, type WorldLayout } from './layout.ts';

type Related = { nodeIds: Set<string>; edgeIds: Set<string> };
type Material = THREE.MeshStandardMaterial | THREE.MeshBasicMaterial | THREE.LineBasicMaterial;
interface Entity {
  placement: PlacedNode;
  group: THREE.Group;
  label: HTMLDivElement;
  nameplate: THREE.Sprite;
  materials: Set<Material>;
  baseOpacity: Map<Material, number>;
  baseColor: Map<Material, THREE.Color>;
  halo: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
}
interface Connection {
  id: string;
  source: string;
  target: string;
  group: THREE.Group;
  materials: Set<Material>;
  interior: boolean;
  owner: ModuleId | null;
}
interface TransformTween {
  started: number;
  duration: number;
  from: number;
  to: number;
}
interface CameraTween {
  started: number;
  duration: number;
  fromPosition: THREE.Vector3;
  toPosition: THREE.Vector3;
  fromTarget: THREE.Vector3;
  toTarget: THREE.Vector3;
}

const vector = (position: Position) => new THREE.Vector3(...position);
const clampProgress = (value: number) => Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function unavailableController(stage: HTMLElement, layout: WorldLayout, moduleIds: readonly ModuleId[]): WorldController {
  let mode: WorldMode = 'spatial', selectedId: string | null = null, isolated = false;
  let openModules: ModuleId[] = [];
  let demoRoute: string[] = [], demoProgress = 0;
  const existingMessage = stage.querySelector<HTMLElement>('#fallback');
  const message = existingMessage ?? document.createElement('div');
  const previouslyHidden = message.hidden;
  const objectIds = new Set([...layout.overview, ...layout.interior].map(node => node.id));
  if (!existingMessage) {
    message.className = 'world-fallback';
    message.textContent = '当前浏览器无法启用 WebGL。模块列表、职责说明和演示步骤仍可使用。';
    stage.append(message);
  }
  message.hidden = false;
  return {
    renderer: 'unavailable',
    setMode(value) { mode = value; },
    setOpenModules(value) { openModules = moduleIds.filter(id => value.includes(id)); },
    setSelection(value) { selectedId = value; },
    setIsolation(value) { isolated = value; },
    setDemo(step, progress) {
      for (const id of step?.route ?? []) if (!objectIds.has(id)) throw new Error(`演示路径引用不存在的节点：${id}`);
      demoRoute = step ? [...step.route] : []; demoProgress = clampProgress(progress);
    },
    focus() {}, reset() {},
    state: () => ({ mode, cutaway: openModules.length > 0, openModules: [...openModules],
      shellOpen: Object.fromEntries(moduleIds.map(id => [id, +openModules.includes(id)])), isolated,
      selectedId, camera: [], target: [], objectIds: [...layout.overview, ...layout.interior].map(node => node.id),
      demoRoute, demoProgress, geometryCount: 0 }),
    dispose() { if (!existingMessage) message.remove(); else message.hidden = previouslyHidden; },
  };
}

/** One continuous teaching world. Internal geometry is authored, never an inferred deployment. */
export function createWorld(stage: HTMLElement, spatialScene: SpatialScene, onSelect: (id: string) => void): WorldController {
  const layout = createWorldLayout(spatialScene);
  const moduleIds = spatialScene.moduleIds;
  const moduleSet = new Set(moduleIds);
  const { document: overview, documents } = spatialScene;
  const worldBounds = new THREE.Box3();
  for (const node of [...layout.overview, ...layout.interior]) {
    worldBounds.expandByPoint(new THREE.Vector3(node.position[0] - node.size[0] / 2 - 2, 0, node.position[2] - node.size[2] / 2 - 2));
    worldBounds.expandByPoint(new THREE.Vector3(node.position[0] + node.size[0] / 2 + 2, node.position[1] + node.size[1] + 4, node.position[2] + node.size[2] / 2 + 2));
  }
  if (worldBounds.isEmpty()) worldBounds.set(new THREE.Vector3(-10, 0, -10), new THREE.Vector3(10, 10, 10));
  const worldCenter = worldBounds.getCenter(new THREE.Vector3());
  const worldSize = worldBounds.getSize(new THREE.Vector3());
  const worldSpan = Math.max(worldSize.x, worldSize.z, 24);
  const farPlane = Math.max(600, worldSpan * 32);
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch (error) {
    console.warn('WebGL initialization unavailable', error instanceof Error ? error.message : String(error));
    return unavailableController(stage, layout, moduleIds);
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor('#091222');
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.setAttribute('aria-label', '可旋转和缩放的系统架构沙盘');
  renderer.domElement.style.cssText = 'position:absolute;inset:0;display:block;width:100%;height:100%;touch-action:none';
  stage.prepend(renderer.domElement);
  const existingLabels = stage.querySelector<HTMLElement>('#labels');
  const labels = existingLabels ?? document.createElement('div');
  if (!existingLabels) { labels.id = 'labels'; stage.append(labels); }
  labels.style.position = 'absolute'; labels.style.inset = '0'; labels.style.pointerEvents = 'none'; labels.style.overflow = 'hidden';
  const createdLabels: HTMLElement[] = [];
  const previousCursor = stage.style.cursor;
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#091222', farPlane * .7, farPlane);
  const camera = new THREE.PerspectiveCamera(39, 1, .1, farPlane);
  const controls = new OrbitControls(camera, stage);
  controls.enableDamping = false;
  controls.minDistance = 6; controls.maxDistance = farPlane * .8;
  controls.minPolarAngle = .2; controls.maxPolarAngle = 1.35;
  controls.rotateSpeed = .55; controls.zoomSpeed = .8; controls.panSpeed = .8;
  const hemispheric = new THREE.HemisphereLight('#b9d8ff', '#11202a', 2.1); scene.add(hemispheric);
  const lightReach = worldSpan * .8;
  const keyLight = new THREE.DirectionalLight('#d9e7ff', 3.0);
  keyLight.position.set(worldCenter.x - lightReach * .5, lightReach, worldCenter.z + lightReach * .45);
  keyLight.target.position.set(worldCenter.x, 0, worldCenter.z); scene.add(keyLight.target);
  keyLight.castShadow = true; keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.left = -lightReach; keyLight.shadow.camera.right = lightReach; keyLight.shadow.camera.top = lightReach; keyLight.shadow.camera.bottom = -lightReach;
  keyLight.shadow.camera.near = 1; keyLight.shadow.camera.far = lightReach * 4;
  keyLight.shadow.bias = -.0003; keyLight.shadow.normalBias = .045; scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight('#547cff', 2.0);
  rimLight.position.set(worldCenter.x + lightReach * .5, lightReach * .6, worldCenter.z - lightReach * .7);
  rimLight.target.position.set(worldCenter.x, 0, worldCenter.z); scene.add(rimLight, rimLight.target);
  const warmLight = new THREE.DirectionalLight('#f7ce9c', .6);
  warmLight.position.set(worldCenter.x + lightReach * .6, lightReach * .3, worldCenter.z + lightReach * .45);
  warmLight.target.position.set(worldCenter.x, 0, worldCenter.z); scene.add(warmLight, warmLight.target);

  let mode: WorldMode = 'spatial', selectedId: string | null = null, hoveredId: string | null = null, isolated = false;
  let openModules: ModuleId[] = [], relationFilter: Related | undefined;
  const shellOpen: Record<ModuleId, number> = Object.fromEntries(moduleIds.map(id => [id, 0]));
  let demoStep: DemoStep | null = null, demoProgress = 0, demoKey = '';
  let disposed = false, frame = 0;
  const shellTweens = new Map<ModuleId, TransformTween>();
  let cameraTween: CameraTween | null = null;
  let cameraContext: { kind: 'overview' | 'cutaway' | 'focus' | 'demo'; id?: string } = { kind: 'overview' };
  const entities = new Map<string, Entity>();
  const connections: Connection[] = [];
  const allGeometries = new Set<THREE.BufferGeometry>();
  const allMaterials = new Set<THREE.Material>();
  const allTextures = new Set<THREE.Texture>();
  const shellParts: { owner: ModuleId; roof: boolean; group: THREE.Group; closed: THREE.Vector3; opened: THREE.Vector3; openedRotation: THREE.Vector3 }[] = [];

  function ownGeometry<T extends THREE.BufferGeometry>(geometry: T): T { allGeometries.add(geometry); return geometry; }
  function ownMaterial<T extends THREE.Material>(material: T): T { allMaterials.add(material); return material; }
  function standard(color: THREE.ColorRepresentation, emissive: THREE.ColorRepresentation = '#000000', opacity = 1) {
    return ownMaterial(new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: .35, roughness: .55, metalness: .25,
      transparent: opacity < 1, opacity, depthWrite: opacity >= .8 }));
  }
  function addMesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material, position?: THREE.Vector3, castShadow = true) {
    const mesh = new THREE.Mesh(ownGeometry(geometry), material);
    if (position) mesh.position.copy(position);
    mesh.castShadow = castShadow; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  function box(parent: THREE.Object3D, size: Position, position: Position, material: THREE.Material) {
    return addMesh(parent, new THREE.BoxGeometry(...size), material, vector(position));
  }
  function outline(parent: THREE.Object3D, mesh: THREE.Mesh, color: THREE.ColorRepresentation, opacity = .55) {
    const lines = new THREE.LineSegments(ownGeometry(new THREE.EdgesGeometry(mesh.geometry)), ownMaterial(new THREE.LineBasicMaterial({ color, transparent: true, opacity })));
    lines.position.copy(mesh.position); lines.rotation.copy(mesh.rotation); parent.add(lines); return lines;
  }
  const ground = box(scene, [worldSize.x + 8, .25, worldSize.z + 8], [worldCenter.x, -.24, worldCenter.z], standard('#0d1d31'));
  ground.castShadow = false;
  const gridSize = worldSpan + 8;
  const grid = new THREE.GridHelper(gridSize, Math.min(120, Math.max(12, Math.ceil(gridSize / 2))), '#2c4665', '#1a2f47');
  grid.position.set(worldCenter.x, -.09, worldCenter.z); grid.scale.set((worldSize.x + 8) / gridSize, 1, (worldSize.z + 8) / gridSize);
  (grid.material as THREE.LineBasicMaterial).transparent = true; (grid.material as THREE.LineBasicMaterial).opacity = .36;
  allGeometries.add(grid.geometry); allMaterials.add(grid.material as THREE.Material); scene.add(grid);
  for (const region of layout.regions) {
    const slab = box(scene, [region.width, .045, region.depth], [region.center[0], -.075, region.center[2]],
      standard(new THREE.Color(region.color).multiplyScalar(.055)));
    slab.castShadow = false;
    const border = outline(scene, slab, region.color, .13); border.position.y = -.047;
  }

  function createNameplate(placement: PlacedNode): THREE.Sprite {
    const canvas = document.createElement('canvas'); canvas.width = 640; canvas.height = 132;
    const context = canvas.getContext('2d')!;
    context.fillStyle = '#13283be8'; context.beginPath(); context.roundRect(2, 2, 636, 128, 15); context.fill();
    context.strokeStyle = placement.color; context.lineWidth = 4; context.stroke();
    context.fillStyle = placement.color; context.fillRect(20, 28, 7, 76);
    let fontSize = 84;
    const nameplateFont = (size: number) => `600 ${size}px "Microsoft YaHei", "Segoe UI", sans-serif`;
    context.font = nameplateFont(fontSize);
    const textWidth = context.measureText(placement.shortLabel).width;
    if (textWidth > 554) { fontSize *= 554 / textWidth; context.font = nameplateFont(fontSize); }
    context.textAlign = 'center'; context.textBaseline = 'middle'; context.fillStyle = '#eff7ff';
    context.fillText(placement.shortLabel, 330, 66);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; allTextures.add(texture);
    const material = ownMaterial(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false, toneMapped: false }));
    const sprite = new THREE.Sprite(material); sprite.scale.set(placement.interior ? 3.2 : 5.3, placement.interior ? .66 : 1.09, 1);
    sprite.renderOrder = 18; return sprite;
  }

  function createEntity(placement: PlacedNode): Entity {
    const group = new THREE.Group(); group.position.copy(vector(placement.position)); group.userData.nodeId = placement.id; scene.add(group);
    const label = document.createElement('div'); label.className = placement.interior ? 'world-label internal-label' : 'world-label';
    label.dataset.nodeId = placement.id; label.setAttribute('role', 'button'); label.tabIndex = 0;
    label.setAttribute('aria-label', `${placement.node.label}${moduleSet.has(placement.id) ? '，点击展开内部教学结构' : '，查看模块职责'}`);
    label.title = placement.node.label;
    label.style.cssText = 'position:absolute;transform:translate(-50%,-50%);pointer-events:auto;background:transparent;border:0;color:transparent;padding:0;border-radius:4px;z-index:2';
    label.style.setProperty('--module-color', placement.color);
    const activate = () => onSelect(placement.id);
    label.addEventListener('pointerdown', event => event.stopPropagation());
    label.addEventListener('click', activate);
    label.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate(); } });
    label.addEventListener('mouseenter', () => setHovered(placement.id));
    label.addEventListener('mouseleave', () => setHovered(null));
    labels.append(label); createdLabels.push(label);
    const nameplate = createNameplate(placement); group.add(nameplate);
    const halo = addMesh(group, new THREE.RingGeometry(Math.max(placement.size[0], placement.size[2]) * .52,
      Math.max(placement.size[0], placement.size[2]) * .52 + (placement.interior ? .08 : .12), 64),
      ownMaterial(new THREE.MeshBasicMaterial({ color: placement.color, side: THREE.DoubleSide, transparent: true, opacity: .8, depthWrite: false }))) as Entity['halo'];
    halo.rotation.x = -Math.PI / 2; halo.position.y = .075; halo.visible = false;
    const entity: Entity = { placement, group, label, nameplate, halo, materials: new Set(), baseOpacity: new Map(), baseColor: new Map() };
    entities.set(placement.id, entity); return entity;
  }
  function gatherMaterials(entity: Entity) {
    entity.group.traverse(object => {
      if (!('material' in object) || object === entity.halo) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of materials) {
        if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshBasicMaterial || material instanceof THREE.LineBasicMaterial) {
          entity.materials.add(material); entity.baseOpacity.set(material, material.opacity); entity.baseColor.set(material, material.color.clone());
        }
      }
    });
  }
  function addBase(entity: Entity) {
    const { group, placement } = entity;
    const [width, , depth] = placement.size;
    const pedestal = box(group, [width + .5, .38, depth + .5], [0, .19, 0], standard('#172a40'));
    outline(group, pedestal, placement.color, .3);
    box(group, [width * .6, .06, .065], [0, .43, depth / 2 + .05], standard(placement.color, placement.color));
  }
  function buildService(entity: Entity) {
    const { group, placement } = entity; const [width, height, depth] = placement.size;
    const body = box(group, [width * .87, height - .8, depth * .8], [0, height / 2 + .08, 0], standard('#294b70'));
    outline(group, body, placement.color, .65);
    box(group, [width * .96, .3, depth * .9], [0, height - .18, 0], standard('#3f6085'));
    box(group, [width * .65, height * .55, .09], [0, height * .47, depth * .405], standard('#101f33'));
    for (let i = 0; i < 3; i++) {
      box(group, [width * .52, .1, .11], [0, height * .36 + i * .52, depth * .42], standard(placement.color, placement.color));
      addMesh(group, new THREE.SphereGeometry(.06, 8, 6), standard(placement.color, placement.color), new THREE.Vector3(width * .34, height * .36 + i * .52, depth * .42));
    }
    for (let i = -1; i <= 1; i++) box(group, [.22, .4, depth * .5], [i * width * .23, height + .16, 0], standard('#4d7096'));
    addMesh(group, new THREE.CylinderGeometry(.07, .07, .65, 8), standard('#b3c8e5'), new THREE.Vector3(0, height + .55, 0));
    addMesh(group, new THREE.SphereGeometry(.17, 12, 8), standard(placement.color, placement.color), new THREE.Vector3(0, height + .98, 0));
  }
  function buildDatabase(entity: Entity) {
    const { group, placement } = entity; const radius = placement.size[0] * .4, height = placement.size[1];
    for (let i = 0; i < 3; i++) {
      const y = .55 + (i + .5) * (height - .65) / 3;
      addMesh(group, new THREE.CylinderGeometry(radius, radius, (height - .85) / 3, 40), standard('#29455f'), new THREE.Vector3(0, y, 0));
      const ring = addMesh(group, new THREE.TorusGeometry(radius, .045, 8, 40), standard(placement.color, placement.color), new THREE.Vector3(0, y + (height - .85) / 6, 0));
      ring.rotation.x = Math.PI / 2;
    }
    addMesh(group, new THREE.CylinderGeometry(radius, radius, .12, 40), standard('#7795b4'), new THREE.Vector3(0, height + .08, 0));
  }
  function buildGateway(entity: Entity) {
    const { group, placement } = entity; const [width, height, depth] = placement.size;
    const material = standard('#395e79');
    const left = box(group, [width * .2, height - .45, depth * .62], [-width * .36, height / 2, 0], material); outline(group, left, placement.color, .7);
    const right = box(group, [width * .2, height - .45, depth * .62], [width * .36, height / 2, 0], material); outline(group, right, placement.color, .7);
    const lintel = box(group, [width, .75, depth * .7], [0, height - .22, 0], standard('#4d7690')); outline(group, lintel, placement.color, .8);
    box(group, [width * .48, height * .65, .09], [0, height * .49, 0], standard(placement.color, placement.color, .2));
    for (const x of [-width * .25, width * .25]) box(group, [.06, height * .74, .08], [x, height * .49, depth * .36], standard(placement.color, placement.color));
  }
  function buildClient(entity: Entity) {
    const { group, placement } = entity;
    const shell = box(group, [3.1, 2.1, .45], [0, 2, -.1], standard('#668aaa')); shell.rotation.x = -.08; outline(group, shell, placement.color, .75);
    box(group, [2.7, 1.7, .07], [0, 2, .17], standard('#164258', placement.color));
    for (let i = 0; i < 3; i++) box(group, [1.5 - i * .2, .065, .06], [-.3, 2.45 - i * .3, .22], standard(placement.color, placement.color));
    box(group, [.4, 1, .4], [0, .85, 0], standard('#416480'));
    box(group, [2.3, .16, 1.5], [0, .46, .1], standard('#557892'));
  }
  function buildAuth(entity: Entity) {
    const { group, placement } = entity;
    addMesh(group, new THREE.CylinderGeometry(1.05, 1.4, 3.7, 6), standard('#325a76'), new THREE.Vector3(0, 2.35, 0));
    const shield = addMesh(group, new THREE.OctahedronGeometry(.9, 0), standard(placement.color, placement.color), new THREE.Vector3(0, 3.7, .1));
    shield.scale.y = 1.25;
    for (const y of [1.1, 2.1, 3.1]) {
      const ring = addMesh(group, new THREE.TorusGeometry(1.25, .045, 8, 6), standard(placement.color, placement.color), new THREE.Vector3(0, y, 0)); ring.rotation.x = Math.PI / 2;
    }
  }
  function buildEvent(entity: Entity) {
    const { group, placement } = entity;
    for (const z of [-1.2, 1.2]) box(group, [5.7, .3, .3], [0, 1.4, z], standard('#846343'));
    for (const x of [-2.4, 2.4]) box(group, [.3, 2.1, 2.8], [x, 1.3, 0], standard('#37516b'));
    for (let i = -1; i <= 1; i++) {
      const packet = box(group, [1, 1.25, 1.15], [i * 1.55, 1.55, 0], standard('#655a46', placement.color));
      outline(group, packet, placement.color, .8);
      box(group, [.7, .08, .1], [i * 1.55, 1.55, .61], standard(placement.color, placement.color));
    }
    box(group, [5.8, .09, .11], [0, 2.3, 1.35], standard(placement.color, placement.color));
  }
  function buildExternal(entity: Entity) {
    const { group, placement } = entity;
    addMesh(group, new THREE.CylinderGeometry(1.6, 1.9, .55, 6), standard('#695946'), new THREE.Vector3(0, .7, 0));
    const core = addMesh(group, new THREE.OctahedronGeometry(1.5, 0), standard('#dab77d'), new THREE.Vector3(0, 3.0, 0)); core.rotation.y = .4;
    outline(group, core, placement.color, .85);
    const ring = addMesh(group, new THREE.TorusGeometry(1.95, .055, 8, 48), standard(placement.color, placement.color), new THREE.Vector3(0, 2.55, 0)); ring.rotation.x = Math.PI / 2;
  }
  function buildShell(entity: Entity) {
    const { group, placement } = entity;
    const owner = placement.id;
    const [width, height, depth] = placement.size;
    const floorWidth = width - .5, floorDepth = depth - .5;
    const wallHeight = height - 1.1, wallY = .45 + wallHeight / 2;
    const sideX = floorWidth / 2 - .1, sideZ = floorDepth / 2 - .1;
    const floor = box(group, [floorWidth, .28, floorDepth], [0, .57, 0], standard('#1c3550')); outline(group, floor, placement.color, .5);
    const part = (size: Position, closed: Position, opened: Position, rotation: Position, color: string, opacity = 1, roof = false) => {
      const holder = new THREE.Group(); holder.position.copy(vector(closed)); group.add(holder);
      const mesh = box(holder, size, [0, 0, 0], standard(color, '#102545', opacity)); outline(holder, mesh, placement.color, .6);
      shellParts.push({ owner, roof, group: holder, closed: vector(closed), opened: vector(opened), openedRotation: vector(rotation) }); return holder;
    };
    const roof = part([floorWidth, .58, floorDepth], [0, height - .4, 0], [-width * .1, height + 2.8, -depth * .75], [-.15, 0, -.08], '#40688e', 1, true);
    const interiorShapes = new Set(layout.interior.filter(node => node.owner === owner).map(node => node.shape));
    if (interiorShapes.has('rack')) {
      for (const x of [-width * .26, 0, width * .26]) {
        const crate = box(roof, [1.3, .85, 1.8], [x, .75, 0], standard('#2d736b')); outline(roof, crate, placement.color, .8);
        box(roof, [.09, .95, 1.9], [x, .75, 0], standard(placement.color, placement.color));
      }
    } else if (interiorShapes.has('channel') || interiorShapes.has('ledger')) {
      for (const x of [-width / 6, width / 6]) {
        const coin = addMesh(roof, new THREE.TorusGeometry(.82, .14, 12, 40), standard(placement.color, placement.color), new THREE.Vector3(x, 1.25, 0));
        coin.rotation.y = .25;
      }
      box(roof, [1.5, .12, .16], [0, 1.25, 0], standard(placement.color, placement.color));
    } else for (const x of [-width * .25, 0, width * .25]) box(roof, [1.1, .4, Math.min(3, depth * .4)], [x, .46, 0], standard('#6c8cad'));
    box(roof, [width * .47, .1, .16], [0, .83, depth * .23], standard(placement.color, placement.color));
    part([floorWidth, wallHeight, .22], [0, wallY, -sideZ], [0, wallY + 1.4, -sideZ - 1.45], [-.18, 0, 0], '#274e76', .82);
    part([floorWidth, wallHeight, .22], [0, wallY, sideZ], [0, 1.25, sideZ + 1.55], [.72, 0, 0], '#274e76', .82);
    part([.22, wallHeight, floorDepth - .4], [-sideX, wallY, 0], [-sideX - .15, wallY - .4, 0], [0, 0, -.13], '#284e74', .84);
    part([.22, wallHeight, floorDepth - .4], [sideX, wallY, 0], [sideX + .15, wallY - .4, 0], [0, 0, .13], '#284e74', .84);
    box(group, [floorWidth - .3, .085, .1], [0, .76, sideZ - .25], standard(placement.color, placement.color));
  }
  function buildInterior(entity: Entity) {
    const { placement } = entity;
    const group = new THREE.Group(); entity.group.add(group);
    group.scale.set(placement.size[0] / 1.7, placement.size[1] / (placement.shape === 'decision' ? 1.6 : 1.5), placement.size[2] / 1.7);
    const base = box(group, [1.85, .15, 1.85], [0, .08, 0], standard('#18344e')); outline(group, base, placement.color, .65);
    if (placement.shape === 'decision') {
      const decision = addMesh(group, new THREE.OctahedronGeometry(.78), standard('#947b43', placement.color), new THREE.Vector3(0, .92, 0));
      decision.rotation.y = Math.PI / 4; outline(group, decision, placement.color, .95);
    } else if (placement.shape === 'database') {
      for (const y of [.43, .93]) {
        addMesh(group, new THREE.CylinderGeometry(.67, .67, .44, 32), standard('#396080'), new THREE.Vector3(0, y, 0));
        const ring = addMesh(group, new THREE.TorusGeometry(.67, .035, 8, 32), standard(placement.color, placement.color), new THREE.Vector3(0, y + .23, 0)); ring.rotation.x = Math.PI / 2;
      }
    } else if (placement.shape === 'gateway') {
      for (const x of [-.55, .55]) box(group, [.22, 1.1, .8], [x, .71, 0], standard('#32798b'));
      const beam = box(group, [1.45, .25, .85], [0, 1.29, 0], standard('#619ca9')); outline(group, beam, placement.color, .9);
    } else if (placement.shape === 'rack') {
      for (const x of [-.75, .75]) box(group, [.12, 1.4, 1.4], [x, .85, 0], standard('#456f76'));
      for (const y of [.28, .8, 1.35]) {
        box(group, [1.65, .09, 1.45], [0, y, 0], standard('#476c78'));
        for (const x of [-.4, .4]) {
          const stock = box(group, [.58, .37, .65], [x, y + .24, 0], standard('#3e8c75'));
          outline(group, stock, placement.color, .8);
        }
      }
    } else if (placement.shape === 'adjust') {
      const ring = addMesh(group, new THREE.TorusGeometry(.58, .14, 12, 24), standard('#4c9c83'), new THREE.Vector3(0, .98, 0)); ring.rotation.x = Math.PI / 2;
      addMesh(group, new THREE.CylinderGeometry(.22, .33, .8, 16), standard(placement.color, placement.color), new THREE.Vector3(0, .9, 0));
      for (const x of [-.55, .55]) {
        const arrow = addMesh(group, new THREE.ConeGeometry(.18, .45, 8), standard(placement.color, placement.color), new THREE.Vector3(x, 1.23, .15));
        if (x < 0) arrow.rotation.z = Math.PI;
      }
      box(group, [1.3, .18, 1.1], [0, .34, 0], standard('#426e70'));
    } else if (placement.shape === 'link') {
      for (const x of [-.38, .38]) {
        const link = addMesh(group, new THREE.TorusGeometry(.47, .12, 12, 28), standard(placement.color, placement.color), new THREE.Vector3(x, .96, 0));
        link.rotation.y = x < 0 ? -.45 : .8;
      }
      box(group, [1.4, .25, 1.0], [0, .36, 0], standard('#655780'));
    } else if (placement.shape === 'channel') {
      addMesh(group, new THREE.TorusGeometry(.64, .14, 12, 32), standard(placement.color, placement.color), new THREE.Vector3(0, .95, 0));
      const packet = box(group, [.47, .47, .65], [0, .95, .05], standard('#c2afff', placement.color)); packet.rotation.z = Math.PI / 4;
      box(group, [1.4, .25, 1.0], [0, .31, 0], standard('#645783'));
    } else if (placement.shape === 'ledger') {
      for (let i = 0; i < 4; i++) {
        const page = box(group, [1.36, .17, 1.15], [i % 2 * .09, .34 + i * .26, 0], standard(i === 3 ? '#9383b7' : '#594e7e'));
        outline(group, page, placement.color, .7);
        box(group, [.09, .09, .72], [-.42, .46 + i * .26, 0], standard(placement.color, placement.color));
      }
    } else if (placement.shape === 'result') {
      const output = box(group, [1.25, .65, 1.15], [0, .48, 0], standard('#416579')); outline(group, output, placement.color, .8);
      box(group, [.12, .7, .12], [0, 1.08, 0], standard(placement.color, placement.color));
      const arrow = addMesh(group, new THREE.ConeGeometry(.32, .58, 4), standard(placement.color, placement.color), new THREE.Vector3(0, 1.42, 0));
      arrow.rotation.z = -Math.PI / 2;
    } else {
      const body = box(group, [1.35, 1.05, 1.35], [0, .69, 0], standard('#315472')); outline(group, body, placement.color, .8);
      box(group, [1, .1, .09], [0, .62, .72], standard(placement.color, placement.color));
      box(group, [1.2, .12, 1.2], [0, 1.28, 0], standard('#56799a'));
    }
  }
  for (const placement of layout.overview) {
    const entity = createEntity(placement); addBase(entity);
    switch (placement.shape) {
      case 'shell': buildShell(entity); break;
      case 'database': buildDatabase(entity); break;
      case 'gateway': buildGateway(entity); break;
      case 'client': buildClient(entity); break;
      case 'auth': buildAuth(entity); break;
      case 'event': buildEvent(entity); break;
      case 'external': buildExternal(entity); break;
      case 'decision': case 'rack': case 'adjust': case 'link': case 'channel': case 'ledger': case 'result': buildInterior(entity); break;
      default: buildService(entity);
    }
    gatherMaterials(entity);
  }
  for (const placement of layout.interior) {
    const entity = createEntity(placement); buildInterior(entity); gatherMaterials(entity); entity.group.visible = false;
  }

  function topPosition(id: string) {
    const entity = entities.get(id);
    if (!entity) throw new Error(`空间对象不存在：${id}`);
    const owner = moduleSet.has(id) ? id : null;
    return entity.group.position.clone().add(new THREE.Vector3(0, owner && shellOpen[owner] > .5 ? 1.8 : entity.placement.size[1] + .18, 0));
  }
  function port(source: Entity, target: Entity) {
    const start = source.group.position.clone(), end = target.group.position.clone();
    const dx = end.x - start.x, dz = end.z - start.z;
    const distance = Math.hypot(dx, dz) || 1;
    const ux = dx / distance, uz = dz / distance;
    const halfWidth = source.placement.size[0] / 2, halfDepth = source.placement.size[2] / 2;
    const offset = Math.min(Math.abs(ux) > .001 ? halfWidth / Math.abs(ux) : Infinity, Math.abs(uz) > .001 ? halfDepth / Math.abs(uz) : Infinity);
    start.x += ux * offset; start.z += uz * offset; start.y += source.placement.interior ? 1.0 : 1.05;
    return start;
  }
  function curveBetween(source: Entity, target: Entity, demo = false): THREE.Curve<THREE.Vector3> {
    if (source === target) {
      const start = topPosition(source.placement.id);
      const radius = Math.max(1.1, source.placement.size[0] * .65);
      return new THREE.CubicBezierCurve3(start, start.clone().add(new THREE.Vector3(radius, 1.5, radius)),
        start.clone().add(new THREE.Vector3(-radius, 1.5, radius)), start.clone());
    }
    if (demo || source.placement.interior || target.placement.interior) {
      const start = topPosition(source.placement.id), end = topPosition(target.placement.id);
      const direction = end.clone().sub(start); direction.y = 0;
      const lift = Math.max(.55, Math.min(2.8, direction.length() * .12));
      return new THREE.CubicBezierCurve3(start, start.clone().addScaledVector(direction, .28).add(new THREE.Vector3(0, lift, 0)),
        end.clone().addScaledVector(direction, -.28).add(new THREE.Vector3(0, lift, 0)), end);
    }
    const start = port(source, target), end = port(target, source);
    const direction = end.clone().sub(start); direction.y = 0; direction.normalize();
    const lowY = demo ? .36 : .24;
    const a = start.clone().addScaledVector(direction, .8); a.y = lowY;
    const b = end.clone().addScaledVector(direction, -.8); b.y = lowY;
    return new THREE.CatmullRomCurve3([start, a, b, end], false, 'centripetal');
  }
  function createConnection(id: string, sourceId: string, targetId: string, inside: boolean, directed: boolean) {
    const source = entities.get(sourceId)!, target = entities.get(targetId)!;
    const curve = curveBetween(source, target);
    const group = new THREE.Group(); scene.add(group);
    const color = inside ? '#709ac5' : source.placement.color;
    const material = ownMaterial(new THREE.MeshBasicMaterial({ color, transparent: true, opacity: inside ? .42 : .4, depthWrite: false }));
    const tube = addMesh(group, new THREE.TubeGeometry(curve, inside ? 36 : 48, inside ? .025 : .035, 6, false), material, undefined, false);
    if (directed) {
      const direction = curve.getTangent(.94).normalize();
      const arrow = addMesh(group, new THREE.ConeGeometry(inside ? .1 : .14, inside ? .25 : .35, 8), material, curve.getPoint(.94), false);
      arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    }
    tube.userData.connectionId = id;
    group.visible = !inside;
    connections.push({ id, source: sourceId, target: targetId, group, materials: new Set([material]), interior: inside, owner: inside ? source.placement.owner : null });
  }
  for (const edge of overview.edges) createConnection(edge.id, edge.source, edge.target, false, edge.directed);
  // Internal paths are built at their expanded positions, retained while the shell changes.
  for (const owner of moduleIds) for (const edge of documents[owner].edges) createConnection(edge.id, edge.source, edge.target, true, edge.directed);
  const demoGroup = new THREE.Group(); scene.add(demoGroup);
  const markerMaterial = ownMaterial(new THREE.MeshBasicMaterial({ color: '#91f6ff', depthTest: false }));
  const marker = addMesh(demoGroup, new THREE.SphereGeometry(.18, 18, 12), markerMaterial, undefined, false);
  const markerGlowMaterial = ownMaterial(new THREE.MeshBasicMaterial({ color: '#62dfff', transparent: true, opacity: .22, depthWrite: false, depthTest: false }));
  const markerGlow = addMesh(marker, new THREE.SphereGeometry(.34, 16, 10), markerGlowMaterial, undefined, false);
  marker.renderOrder = 30; markerGlow.renderOrder = 29; marker.visible = false;
  let demoCurve: THREE.CurvePath<THREE.Vector3> | null = null;
  const demoPieces: THREE.Mesh[] = [];
  function clearDemoPath() {
    for (const piece of demoPieces) {
      demoGroup.remove(piece); piece.geometry.dispose(); allGeometries.delete(piece.geometry);
      const materials = Array.isArray(piece.material) ? piece.material : [piece.material];
      for (const material of materials) { material.dispose(); allMaterials.delete(material); }
    }
    demoPieces.length = 0; demoCurve = null; marker.visible = false;
  }
  function rebuildDemoPath() {
    clearDemoPath();
    if (!demoStep || !demoStep.route.length) return;
    const toneColors = { request: '#6fe6ff', data: '#a2b9ff', success: '#68f4bd', failure: '#ff988e' };
    const color = toneColors[demoStep.tone]; markerMaterial.color.set(color); markerGlowMaterial.color.set(color);
    if (demoStep.route.length === 1) { marker.position.copy(topPosition(demoStep.route[0]!)); marker.visible = true; return; }
    const path = new THREE.CurvePath<THREE.Vector3>();
    for (let i = 0; i < demoStep.route.length - 1; i++) {
      const source = entities.get(demoStep.route[i]!)!, target = entities.get(demoStep.route[i + 1]!)!;
      const segment = curveBetween(source, target, true); path.add(segment);
      const material = ownMaterial(new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .95, depthWrite: false }));
      const piece = addMesh(demoGroup, new THREE.TubeGeometry(segment, 44, .085, 8, false), material, undefined, false); piece.renderOrder = 4;
      demoPieces.push(piece);
      const arrow = addMesh(demoGroup, new THREE.ConeGeometry(.2, .43, 10), ownMaterial(new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .95, depthWrite: false })), segment.getPoint(.84), false);
      arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), segment.getTangent(.84).normalize()); demoPieces.push(arrow);
    }
    demoCurve = path; marker.visible = true; marker.position.copy(path.getPointAt(demoProgress));
  }
  function updateEmphasis() {
    const routeIds = new Set(demoStep?.route ?? []);
    const selectedOwner = selectedId ? ownerOf(spatialScene, selectedId) : null;
    const family = new Set<string>();
    if (selectedOwner) {
      family.add(selectedOwner);
      for (const [id, owner] of spatialScene.owners) if (owner === selectedOwner) family.add(id);
      // Root graph adjacency keeps explicitly related external resources with a module.
      for (const edge of overview.edges) {
        const neighbor = edge.source === selectedOwner ? edge.target : edge.target === selectedOwner ? edge.source : null;
        if (neighbor && !ownerOf(spatialScene, neighbor)) family.add(neighbor);
      }
    } else if (selectedId) family.add(selectedId);
    const inFamily = (id: string) => !selectedId || family.has(id);
    for (const [id, entity] of entities) {
      const chosen = selectedId === id, hovered = hoveredId === id, onRoute = routeIds.has(id);
      const owner = moduleSet.has(id) ? id : null;
      const related = !relationFilter || relationFilter.nodeIds.has(id);
      let opacity = 1;
      if (demoStep) opacity = onRoute || chosen || owner && openModules.includes(owner) ? 1 : .32;
      else if (openModules.length && !inFamily(id)) opacity = .26;
      else if (openModules.length && !entity.placement.interior && !owner) opacity = .58;
      if (!related && !chosen && !onRoute) opacity *= .22;
      if (isolated && !inFamily(id)) opacity *= .08;
      if (hovered) opacity = Math.max(opacity, .9);
      // Exploded shell panels remain a light contextual frame, not an obstacle over components.
      const shellOpacity = owner ? 1 - shellOpen[owner] * .76 : 1;
      for (const material of entity.materials) {
        const brightness = opacity < .5 ? .6 : hovered || chosen ? 1.18 : 1;
        material.color.copy(entity.baseColor.get(material)!).multiplyScalar(brightness);
        material.opacity = entity.baseOpacity.get(material)! * opacity * shellOpacity;
        material.transparent = material.opacity < .999;
        material.depthWrite = material.opacity >= .8;
      }
      entity.group.traverse(object => {
        if (object instanceof THREE.Mesh && object !== entity.halo) object.castShadow = opacity >= .5 && (!owner || shellOpen[owner] < .2);
      });
      entity.halo.visible = (chosen || hovered || onRoute) && (!entity.placement.owner || shellOpen[entity.placement.owner] > .03);
      entity.halo.material.opacity = hovered && !chosen ? .5 : .8;
      entity.halo.material.color.set(onRoute && demoStep ? { request: '#6fe6ff', data: '#a2b9ff', success: '#68f4bd', failure: '#ff988e' }[demoStep.tone] : entity.placement.color);
      entity.label.dataset.selected = String(chosen); entity.label.dataset.active = String(onRoute);
      entity.label.dataset.related = String(related); entity.label.setAttribute('aria-pressed', String(chosen));
      entity.nameplate.material.opacity = Math.max(.35, opacity);
      entity.nameplate.userData.emphasizedVisible = opacity > .12;
    }
    for (const connection of connections) {
      const onRoute = demoStep?.route.some((id, i) => id === connection.source && demoStep!.route[i + 1] === connection.target) ?? false;
      const related = !relationFilter || relationFilter.edgeIds.has(connection.id);
      let opacity = demoStep ? onRoute ? .75 : .08 : !related ? .06 : openModules.length && !connection.interior ? .2 : connection.interior ? .55 : .34;
      if (isolated && (!inFamily(connection.source) || !inFamily(connection.target))) opacity *= .12;
      for (const material of connection.materials) material.opacity = opacity;
      connection.group.visible = !connection.owner || shellOpen[connection.owner] > .08;
    }
  }
  function applyShellPosition(owner: ModuleId, value: number) {
    shellOpen[owner] = value;
    for (const part of shellParts) {
      if (part.owner !== owner) continue;
      part.group.position.copy(part.closed).lerp(part.opened, value);
      part.group.rotation.set(part.openedRotation.x * value, part.openedRotation.y * value, part.openedRotation.z * value);
      // Retired roofs cannot cover a neighbouring service during cross-service playback.
      part.group.scale.setScalar(part.roof ? 1 - value * .95 : 1);
      part.group.visible = !part.roof || value < .92;
    }
    for (const placement of layout.interior) {
      if (placement.owner !== owner) continue;
      const entity = entities.get(placement.id)!;
      const opened = vector(placement.position);
      const center = entities.get(owner)!.group.position;
      const collapsed = new THREE.Vector3(center.x + (opened.x - center.x) * .2, .75, center.z + (opened.z - center.z) * .2);
      entity.group.position.copy(collapsed).lerp(opened, value); entity.group.scale.setScalar(.15 + .85 * value);
      entity.group.visible = value > .025;
    }
    updateEmphasis();
  }
  const tmpPosition = new THREE.Vector3();
  function screenPosition(position: THREE.Vector3) {
    tmpPosition.copy(position).project(camera);
    return { x: (tmpPosition.x + 1) * stage.clientWidth / 2, y: (1 - tmpPosition.y) * stage.clientHeight / 2,
      visible: tmpPosition.z > -1 && tmpPosition.z < 1 };
  }
  function renderLabels() {
    const occupied: { left: number; right: number; top: number; bottom: number }[] = [];
    const route = new Set(demoStep?.route ?? []);
    const priority = (entity: Entity) => entity.placement.id === selectedId ? 4 : entity.placement.id === hoveredId ? 3
      : route.has(entity.placement.id) ? 2 : entity.placement.interior ? 1 : 0;
    const ordered = [...entities.values()].sort((a, b) => priority(b) - priority(a));
    for (const entity of ordered) {
      const { placement } = entity;
      const nameplatePosition = new THREE.Vector3(0, placement.size[1] + (placement.interior ? .5 : 1.1), 0);
      if (moduleSet.has(placement.id)) {
        nameplatePosition.lerp(new THREE.Vector3(0, 1.2, placement.size[2] / 2 + .2), shellOpen[placement.id]);
      }
      entity.nameplate.position.copy(nameplatePosition);
      const anchor = entity.nameplate.getWorldPosition(new THREE.Vector3());
      const point = screenPosition(anchor);
      const viewPosition = anchor.clone().applyMatrix4(camera.matrixWorldInverse);
      const factor = stage.clientHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * Math.max(.1, -viewPosition.z));
      // A nearby nameplate remains attached to its model without becoming foreground signage.
      const baseWidth = placement.interior ? 3.2 : 5.3;
      const worldWidth = Math.min(baseWidth, 128 / (factor * entity.group.scale.x));
      entity.nameplate.scale.set(worldWidth, worldWidth * 132 / 640, 1);
      const width = entity.nameplate.scale.x * entity.group.scale.x * factor;
      const height = entity.nameplate.scale.y * entity.group.scale.y * factor;
      const rectangle = { left: point.x - width / 2, right: point.x + width / 2, top: point.y - height / 2, bottom: point.y + height / 2 };
      const collides = occupied.some(other => rectangle.left < other.right + 3 && rectangle.right > other.left - 3
        && rectangle.top < other.bottom + 3 && rectangle.bottom > other.top - 3);
      const show = point.visible && entity.group.visible && entity.nameplate.userData.emphasizedVisible !== false
        && (!placement.owner || shellOpen[placement.owner] > .65)
        && rectangle.left >= 2 && rectangle.right <= stage.clientWidth - 2 && rectangle.top >= 2 && rectangle.bottom <= stage.clientHeight - 2
        && (!collides || priority(entity) >= 2);
      entity.nameplate.visible = show;
      if (show) occupied.push(rectangle);
      entity.label.style.visibility = show ? 'visible' : 'hidden';
      entity.label.style.left = `${point.x}px`; entity.label.style.top = `${point.y}px`;
      entity.label.style.width = `${Math.max(24, width)}px`; entity.label.style.height = `${Math.max(22, height)}px`;
    }
    renderContext();
  }

  function renderContext() {
    const card = stage.querySelector<HTMLElement>('#context-card');
    if (card && !card.hidden && selectedId && entities.has(selectedId)) {
      const entity = entities.get(selectedId)!;
      const point = screenPosition(entity.group.position.clone().add(new THREE.Vector3(0, entity.placement.size[1] * .7, 0)));
      card.style.visibility = point.visible ? 'visible' : 'hidden';
      const width = card.offsetWidth || 280, height = card.offsetHeight || 140;
      const owner = ownerOf(spatialScene, selectedId);
      const contextEntity = owner ? entities.get(owner)! : entity;
      const { position, size } = contextEntity.placement;
      const projected = [];
      for (const x of [-1, 1]) for (const y of [0, 1]) for (const z of [-1, 1]) {
        projected.push(screenPosition(new THREE.Vector3(position[0] + x * (size[0] / 2 + .7),
          position[1] + y * (size[1] + (owner && openModules.includes(owner) ? 3.2 : .7)), position[2] + z * (size[2] / 2 + .8))));
      }
      const minX = Math.min(...projected.map(p => p.x)), maxX = Math.max(...projected.map(p => p.x));
      let left = maxX + 16;
      if (left + width > stage.clientWidth - 16) left = minX - width - 16;
      card.style.left = `${Math.max(12, Math.min(stage.clientWidth - width - 12, left))}px`;
      const top = stage.clientWidth < 600 ? stage.clientHeight - height - 142 : point.y - height * .4;
      card.style.top = `${Math.max(72, Math.min(stage.clientHeight - height - 125, top))}px`;
    }
    const hint = stage.querySelector<HTMLElement>('#hover-hint');
    if (hint) {
      const entity = hoveredId ? entities.get(hoveredId) : undefined;
      hint.hidden = !entity || hoveredId === selectedId || !!demoStep;
      if (entity && !hint.hidden) {
        const point = screenPosition(entity.nameplate.getWorldPosition(new THREE.Vector3()));
        hint.textContent = entity.placement.node.label;
        hint.style.left = `${Math.max(12, Math.min(stage.clientWidth - (hint.offsetWidth || 180) - 12, point.x + 20))}px`;
        hint.style.top = `${Math.max(68, Math.min(stage.clientHeight - 145, point.y + 20))}px`;
      }
    }
  }
  function render() {
    if (disposed) return;
    camera.updateMatrixWorld(); renderLabels(); renderer.render(scene, camera);
  }
  function schedule() { if (!disposed && !frame) frame = requestAnimationFrame(tick); }
  function tick(now: number) {
    frame = 0;
    if (disposed) return;
    let finishedShell = false;
    for (const [owner, tween] of shellTweens) {
      const progress = clampProgress((now - tween.started) / tween.duration);
      const eased = 1 - (1 - progress) ** 3;
      applyShellPosition(owner, THREE.MathUtils.lerp(tween.from, tween.to, eased));
      if (progress === 1) { shellTweens.delete(owner); finishedShell = true; }
    }
    if (finishedShell) rebuildDemoPath();
    if (cameraTween) {
      const progress = clampProgress((now - cameraTween.started) / cameraTween.duration);
      const eased = 1 - (1 - progress) ** 3;
      camera.position.copy(cameraTween.fromPosition).lerp(cameraTween.toPosition, eased);
      controls.target.copy(cameraTween.fromTarget).lerp(cameraTween.toTarget, eased); controls.update();
      if (progress === 1) cameraTween = null;
    }
    render();
    if (shellTweens.size || cameraTween) schedule();
  }
  function moveCamera(position: THREE.Vector3, target: THREE.Vector3, animate = true) {
    if (animate && !reducedMotion()) {
      cameraTween = { started: performance.now(), duration: 650, fromPosition: camera.position.clone(), toPosition: position,
        fromTarget: controls.target.clone(), toTarget: target }; schedule();
    } else { cameraTween = null; camera.position.copy(position); controls.target.copy(target); controls.update(); schedule(); }
  }
  function overviewPose() {
    return frameBounds(layout.overview.map(node => node.id), 3.7);
  }
  function cutawayPose(owner?: ModuleId) {
    const modules = owner ? [owner] : openModules;
    if (!modules.length) return overviewPose();
    return frameBounds([...modules, ...layout.interior.filter(node => node.owner && modules.includes(node.owner)).map(node => node.id)], 1.7);
  }
  function frameBounds(ids: readonly string[], extraHeight = 0, focusTarget?: THREE.Vector3) {
    const bounds = new THREE.Box3();
    for (const id of ids) {
      const entity = entities.get(id); if (!entity) continue;
      const { position, size } = entity.placement;
      bounds.expandByPoint(new THREE.Vector3(position[0] - size[0] / 2 - .5, position[1], position[2] - size[2] / 2 - .5));
      bounds.expandByPoint(new THREE.Vector3(position[0] + size[0] / 2 + .5, position[1] + size[1] + 1.1 + extraHeight, position[2] + size[2] / 2 + .5));
    }
    if (bounds.isEmpty()) bounds.copy(worldBounds);
    const target = focusTarget?.clone() ?? bounds.getCenter(new THREE.Vector3());
    const direction = mode === 'flat' ? new THREE.Vector3(0, 1, .00015).normalize() : new THREE.Vector3(12, 17, 21).normalize();
    const right = new THREE.Vector3(0, 1, 0).cross(direction).normalize();
    const up = direction.clone().cross(right).normalize();
    const tangentV = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2), tangentH = tangentV * camera.aspect;
    let distance = 18;
    for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
      const delta = new THREE.Vector3(x, y, z).sub(target);
      const towardCamera = delta.dot(direction);
      distance = Math.max(distance, towardCamera + Math.abs(delta.dot(right)) / (tangentH * .82),
        towardCamera + Math.abs(delta.dot(up)) / (tangentV * .8));
    }
    return { target, position: target.clone().addScaledVector(direction, distance) };
  }
  function demoPose() {
    if (!demoStep) return cutawayPose();
    const ids = [...new Set([...demoStep.route, demoStep.focusId])];
    const owners = new Set(ids.map(id => entities.get(id)!.placement.owner));
    if (owners.size === 1 && !owners.has(null)) return cutawayPose([...owners][0]!);
    return frameBounds(ids, 2.7);
  }
  function focusPose(id: string) {
    const entity = entities.get(id)!;
    if (moduleSet.has(id) && openModules.includes(id)) return cutawayPose(id);
    if (!entity.placement.interior) return frameBounds([id], .5);
    const target = vector(entity.placement.position).add(new THREE.Vector3(0, entity.placement.size[1] * .6, 0));
    if (stage.clientWidth < 600 && entity.placement.owner) {
      const pose = frameBounds([entity.placement.owner], .7, target);
      return { target, position: target.clone().add(pose.position.sub(target).multiplyScalar(1.08)) };
    }
    const aspect = Math.max(.45, camera.aspect), scale = Math.max(1, .9 / aspect);
    const offset = mode === 'flat' ? new THREE.Vector3(0, 15 * scale, .01) : new THREE.Vector3(6.4, 8.7, 10.0).multiplyScalar(scale);
    return { target, position: target.clone().add(offset) };
  }
  function frameContext(animate = false) {
    const pose = cameraContext.kind === 'demo' ? demoPose()
      : cameraContext.kind === 'focus' && cameraContext.id && entities.has(cameraContext.id) ? focusPose(cameraContext.id)
        : openModules.length ? cutawayPose() : overviewPose();
    moveCamera(pose.position, pose.target, animate);
  }
  function configureControls() {
    controls.enableRotate = mode === 'spatial';
    controls.minPolarAngle = mode === 'flat' ? .0001 : .2;
    controls.maxPolarAngle = mode === 'flat' ? .0002 : 1.35;
    controls.mouseButtons.LEFT = mode === 'flat' ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE;
    controls.touches.ONE = mode === 'flat' ? THREE.TOUCH.PAN : THREE.TOUCH.ROTATE;
    controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
  }
  function reset(animate = true) { cameraContext = { kind: openModules.length ? 'cutaway' : 'overview' }; frameContext(animate); }
  function focus(id: string) {
    if (disposed || !entities.has(id)) return;
    cameraContext = { kind: 'focus', id }; frameContext(true);
  }
  function onControlsChange() { schedule(); }
  function onControlsStart() { cameraTween = null; }
  controls.addEventListener('change', onControlsChange); controls.addEventListener('start', onControlsStart);
  const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
  let pointerStart: { id: number; x: number; y: number } | null = null;
  const pointers = new Set<number>();
  function onPointerDown(event: PointerEvent) {
    pointers.add(event.pointerId);
    if (pointers.size > 1) { pointerStart = null; return; }
    if (event.isPrimary) pointerStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }
  function onPointerCancel() { pointerStart = null; pointers.clear(); }
  function pickAt(event: PointerEvent): string | null {
    const bounds = renderer.domElement.getBoundingClientRect();
    pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const roots = [...entities.values()].filter(entity => entity.group.visible).map(entity => entity.group);
    const hits = raycaster.intersectObjects(roots, true);
    for (const hit of hits) {
      if (hit.object instanceof THREE.LineSegments || hit.object === marker || hit.object === markerGlow) continue;
      let visibleObject: THREE.Object3D | null = hit.object;
      let visible = true;
      while (visibleObject) { if (!visibleObject.visible) { visible = false; break; } visibleObject = visibleObject.parent; }
      if (!visible) continue;
      let object: THREE.Object3D | null = hit.object;
      while (object && !object.userData.nodeId) object = object.parent;
      if (object?.userData.nodeId) {
        const id = object.userData.nodeId as string;
        // Open walls and lifted roofs are context. Interior components must receive the click.
        if (moduleSet.has(id) && shellOpen[id] > .6 && hit.object !== entities.get(id)!.nameplate) continue;
        return id;
      }
    }
    return null;
  }
  function onPointerUp(event: PointerEvent) {
    pointers.delete(event.pointerId);
    if (!pointerStart || event.pointerId !== pointerStart.id) return;
    const start = pointerStart; pointerStart = null;
    if (event.button !== 0 || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) return;
    const id = pickAt(event); if (id) onSelect(id);
  }
  function setHovered(id: string | null) {
    if (hoveredId === id || disposed) return;
    hoveredId = id; stage.style.cursor = id ? 'pointer' : 'grab'; updateEmphasis(); schedule();
  }
  function onPointerMove(event: PointerEvent) {
    if (pointers.size || event.pointerType === 'touch') return;
    if (event.target instanceof HTMLElement && event.target.closest('#context-card, button, select')) { setHovered(null); return; }
    setHovered(pickAt(event));
  }
  function onPointerLeave() { setHovered(null); }
  // OrbitControls captures pointers to stage. Picking must observe that same element.
  stage.addEventListener('pointerdown', onPointerDown);
  stage.addEventListener('pointerup', onPointerUp);
  stage.addEventListener('pointercancel', onPointerCancel);
  stage.addEventListener('pointermove', onPointerMove);
  stage.addEventListener('pointerleave', onPointerLeave);
  function resize() {
    if (disposed) return;
    const width = Math.max(stage.clientWidth, 1), height = Math.max(stage.clientHeight, 1);
    renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); frameContext(false); schedule();
  }
  const observer = new ResizeObserver(resize); observer.observe(stage);
  const cardObserver = new ResizeObserver(schedule);
  const contextCard = stage.querySelector<HTMLElement>('#context-card'); if (contextCard) cardObserver.observe(contextCard);
  for (const owner of moduleIds) applyShellPosition(owner, 0);
  configureControls(); resize(); reset(false); render();
  return {
    renderer: 'webgl',
    setMode(value) { if (disposed || mode === value) return; mode = value; configureControls(); frameContext(false); },
    setOpenModules(modules, animate = true) {
      if (disposed) return;
      const nextModules = moduleIds.filter(id => modules.includes(id));
      if (nextModules.length === openModules.length && nextModules.every((id, index) => id === openModules[index])) return;
      openModules = nextModules;
      cameraContext = { kind: openModules.length ? 'cutaway' : 'overview' };
      for (const owner of moduleIds) {
        const to = openModules.includes(owner) ? 1 : 0;
        if (shellOpen[owner] === to) { shellTweens.delete(owner); continue; }
        if (animate && !reducedMotion()) shellTweens.set(owner, { started: performance.now(), duration: 650, from: shellOpen[owner], to });
        else { shellTweens.delete(owner); applyShellPosition(owner, to); }
      }
      rebuildDemoPath(); updateEmphasis(); schedule();
      frameContext(animate);
    },
    setSelection(id, related) { if (disposed) return; selectedId = id; relationFilter = related; updateEmphasis(); schedule(); },
    setIsolation(value) { if (disposed || isolated === value) return; isolated = value; updateEmphasis(); schedule(); },
    setDemo(step, progress) {
      if (disposed) return;
      for (const id of step?.route ?? []) if (!entities.has(id)) throw new Error(`演示路径引用不存在的节点：${id}`);
      const nextKey = step ? JSON.stringify([step.id, step.tone, step.route]) : '';
      demoStep = step; demoProgress = clampProgress(progress);
      if (nextKey !== demoKey) {
        demoKey = nextKey; rebuildDemoPath(); updateEmphasis();
        if (step) { cameraContext = { kind: 'demo' }; frameContext(true); }
        else cameraContext = { kind: openModules.length ? 'cutaway' : 'overview' };
      }
      if (demoCurve) marker.position.copy(demoCurve.getPointAt(demoProgress));
      schedule();
    },
    focus, reset: () => reset(),
    state: (): WorldSnapshot => ({ mode, cutaway: openModules.length > 0, openModules: [...openModules], shellOpen: { ...shellOpen }, isolated,
      selectedId, camera: camera.position.toArray(), target: controls.target.toArray(), objectIds: [...entities.keys()],
      demoRoute: [...(demoStep?.route ?? [])], demoProgress, geometryCount: renderer.info.memory.geometries }),
    dispose() {
      if (disposed) return; disposed = true;
      cancelAnimationFrame(frame); shellTweens.clear(); cameraTween = null; observer.disconnect(); cardObserver.disconnect();
      controls.removeEventListener('change', onControlsChange); controls.removeEventListener('start', onControlsStart); controls.dispose();
      stage.removeEventListener('pointerdown', onPointerDown); stage.removeEventListener('pointerup', onPointerUp);
      stage.removeEventListener('pointercancel', onPointerCancel);
      stage.removeEventListener('pointermove', onPointerMove); stage.removeEventListener('pointerleave', onPointerLeave);
      clearDemoPath();
      for (const geometry of allGeometries) geometry.dispose();
      for (const material of allMaterials) material.dispose();
      for (const texture of allTextures) texture.dispose();
      keyLight.shadow.map?.dispose(); renderer.dispose(); renderer.domElement.remove();
      for (const label of createdLabels) label.remove(); if (!existingLabels) labels.remove();
      createdLabels.length = 0; pointers.clear(); pointerStart = null;
      demoStep = null; relationFilter = undefined;
      scene.clear(); entities.clear(); connections.length = 0; shellParts.length = 0;
      allGeometries.clear(); allMaterials.clear(); allTextures.clear(); stage.style.cursor = previousCursor;
    },
  };
}
