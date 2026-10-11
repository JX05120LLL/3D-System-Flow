import { buildGraphIndex, findRelated, type GraphIndex } from '../../../src/model/graph-index.ts';
import type { DiagramDocument, DiagramEdge, DiagramNode } from '../../../src/model/types.ts';

export type ViewMode = 'flat' | 'spatial';
export type HighlightMode = 'none' | 'upstream' | 'downstream';
export type LaneId = 'entry' | 'business' | 'data' | 'external';

export interface SceneLane {
  id: LaneId;
  label: string;
  color: string;
  tint: string;
  y: number;
  z: number;
  width?: number;
}

export interface SceneNode {
  id: string;
  node: DiagramNode;
  laneId: LaneId;
  x: number;
  y: number;
  z: number;
}

export interface SceneModel {
  document: DiagramDocument;
  index: GraphIndex;
  nodes: SceneNode[];
  edges: DiagramEdge[];
  lanes: readonly SceneLane[];
}

// These are display lanes for this teaching example, not deployment facts.
export const lanes: readonly SceneLane[] = [
  { id: 'entry', label: '请求入口', color: '#0f766e', tint: '#ccfbf1', y: 300, z: 0 },
  { id: 'business', label: '业务服务', color: '#2563eb', tint: '#dbeafe', y: 80, z: 70 },
  { id: 'data', label: '数据与事件', color: '#7c3aed', tint: '#ede9fe', y: -160, z: 140 },
  { id: 'external', label: '外部渠道', color: '#b45309', tint: '#fef3c7', y: -380, z: 210 },
];

const positions = new Map<string, { laneId: LaneId; x: number }>([
  ['customer', { laneId: 'entry', x: -620 }],
  ['gateway', { laneId: 'entry', x: -320 }],
  ['auth', { laneId: 'business', x: -590 }],
  ['order', { laneId: 'business', x: -290 }],
  ['inventory', { laneId: 'business', x: 20 }],
  ['payment', { laneId: 'business', x: 330 }],
  ['notify', { laneId: 'business', x: 640 }],
  ['order-db', { laneId: 'data', x: -290 }],
  ['inventory-db', { laneId: 'data', x: 20 }],
  ['payment-db', { laneId: 'data', x: 330 }],
  ['event-bus', { laneId: 'data', x: 640 }],
  ['payment-provider', { laneId: 'external', x: 330 }],
]);

/** The prototype keeps source relationships; only display positions are configured. */
export function createSceneModel(document: DiagramDocument): SceneModel {
  const seenNodes = new Set<string>();
  const nodes = document.nodes.map(node => {
    if (seenNodes.has(node.id)) throw new Error(`原型位置配置错误：节点 ID 重复 ${node.id}`);
    seenNodes.add(node.id);
    const position = positions.get(node.id);
    if (!position) throw new Error(`原型位置配置错误：没有为节点 ${node.id} 配置位置`);
    const lane = lanes.find(item => item.id === position.laneId)!;
    return { id: node.id, node, laneId: lane.id, x: position.x, y: lane.y, z: lane.z };
  });
  const missing = [...positions.keys()].filter(id => !seenNodes.has(id));
  if (missing.length) throw new Error(`原型位置配置错误：示例缺少节点 ${missing.join(', ')}`);

  const seenEdges = new Set<string>();
  for (const edge of document.edges) {
    if (seenEdges.has(edge.id)) throw new Error(`原型关系配置错误：连接 ID 重复 ${edge.id}`);
    seenEdges.add(edge.id);
    for (const endpoint of [edge.source, edge.target]) {
      if (!seenNodes.has(endpoint)) throw new Error(`原型关系配置错误：连接 ${edge.id} 引用了不存在的节点 ${endpoint}`);
    }
  }
  return { document, index: buildGraphIndex(document), nodes, edges: [...document.edges], lanes };
}

/** Three display layers for the authored module examples, not an inferred topology. */
export function createModuleSceneModel(document: DiagramDocument): SceneModel {
  const moduleLanes = lanes.slice(0, 3).map((lane, index) => ({
    ...lane, label: document.groups.find(group => group.id === lane.id)?.label ?? lane.label,
    y: 240 - index * 240, z: index * 100, width: 1120,
  }));
  const seen = new Set<string>();
  const nodes: SceneNode[] = [];
  for (const node of document.nodes) {
    if (seen.has(node.id)) throw new Error(`模块节点 ID 重复 ${node.id}`);
    seen.add(node.id);
    if (!moduleLanes.some(lane => lane.id === node.groupId)) throw new Error(`模块节点 ${node.id} 的展示分组无效`);
  }
  if (!seen.size) throw new Error('模块不能没有节点');
  for (const lane of moduleLanes) {
    const row = document.nodes.filter(node => node.groupId === lane.id);
    if (row.length > 3) throw new Error(`模块展示分组 ${lane.id} 超过 3 个节点`);
    row.forEach((node, index) => nodes.push({ id: node.id, node, laneId: lane.id,
      x: (index - (row.length - 1) / 2) * 330, y: lane.y, z: lane.z }));
  }
  const edgeIds = new Set<string>();
  for (const edge of document.edges) {
    if (edgeIds.has(edge.id)) throw new Error(`模块连接 ID 重复 ${edge.id}`);
    edgeIds.add(edge.id);
    if (!seen.has(edge.source) || !seen.has(edge.target)) throw new Error(`模块连接 ${edge.id} 引用了不存在的节点`);
  }
  return { document, index: buildGraphIndex(document), nodes, edges: [...document.edges], lanes: moduleLanes };
}

export function getHighlight(model: SceneModel, selectedId: string | null, mode: HighlightMode): { nodeIds: Set<string>; edgeIds: Set<string> } {
  if (selectedId !== null && !model.index.nodes.has(selectedId)) throw new Error(`无法高亮不存在的节点 ${selectedId}`);
  if (selectedId === null || mode === 'none') {
    return { nodeIds: new Set(model.index.nodes.keys()), edgeIds: new Set(model.index.edges.keys()) };
  }
  return findRelated(model.index, selectedId, mode);
}
