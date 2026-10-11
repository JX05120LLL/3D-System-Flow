import type { DiagramDocument, DiagramNode } from '../../../src/model/types.ts';
import type { ServiceDocuments, ServiceId } from './contracts.ts';
import { SERVICE_IDS } from './service-documents.ts';

export type Position = [number, number, number];
export type WorldShape = 'service' | 'shell' | 'gateway' | 'client' | 'database' | 'event' | 'external' | 'auth' | 'decision' | 'rack' | 'adjust' | 'link' | 'channel' | 'ledger' | 'result';

export interface PlacedNode {
  id: string;
  node: DiagramNode;
  position: Position;
  size: Position;
  shape: WorldShape;
  color: string;
  shortLabel: string;
  interior: boolean;
  owner: ServiceId | null;
}

export interface WorldRegion {
  label: string;
  center: Position;
  width: number;
  depth: number;
  color: string;
}

export interface WorldLayout {
  overview: PlacedNode[];
  interior: PlacedNode[];
  regions: readonly WorldRegion[];
}

interface Placement {
  position: Position;
  size: Position;
  shape: WorldShape;
  color: string;
  shortLabel: string;
}

// These authored positions and shapes explain the example; they are not deployment facts.
const exterior: Record<string, Placement> = {
  customer: { position: [-23, 0, 6], size: [4, 3.3, 3.6], shape: 'client', color: '#69e1dd', shortLabel: '客户端' },
  gateway: { position: [-14, 0, 6], size: [5, 5.5, 4], shape: 'gateway', color: '#62dbdf', shortLabel: 'API 网关' },
  auth: { position: [-14, 0, -5], size: [4, 4.9, 4], shape: 'auth', color: '#53acdd', shortLabel: '认证服务' },
  order: { position: [0, 0, 3], size: [9.6, 5.2, 7.6], shape: 'shell', color: '#559eff', shortLabel: '订单服务' },
  inventory: { position: [11, 0, -4], size: [9.6, 5.2, 7.6], shape: 'shell', color: '#4de1b3', shortLabel: '库存服务' },
  payment: { position: [13, 0, 9], size: [9.6, 5.2, 7.6], shape: 'shell', color: '#ac91ff', shortLabel: '支付服务' },
  'order-db': { position: [-1, 0, 12], size: [3.4, 3.8, 3.4], shape: 'database', color: '#559eff', shortLabel: '订单库' },
  'inventory-db': { position: [11, 0, -13], size: [3.4, 3.8, 3.4], shape: 'database', color: '#4de1b3', shortLabel: '库存库' },
  'payment-db': { position: [13, 0, 18], size: [3.4, 3.8, 3.4], shape: 'database', color: '#ac91ff', shortLabel: '支付库' },
  'payment-provider': { position: [25, 0, 9], size: [4.8, 5, 4.8], shape: 'external', color: '#edbf78', shortLabel: '支付渠道' },
  'event-bus': { position: [-2, 0, -13], size: [6.2, 3.2, 3.6], shape: 'event', color: '#f1b676', shortLabel: '事件总线' },
  notify: { position: [1, 0, -21], size: [4.4, 5.2, 4.4], shape: 'service', color: '#f1b676', shortLabel: '通知服务' },
};

const orderInterior: Record<string, Placement> = {
  'order/receive': { position: [-3.1, .65, .8], size: [1.7, 1.35, 1.7], shape: 'gateway', color: '#62dbdf', shortLabel: '请求入口' },
  'order/draft': { position: [-3.1, .65, 5.2], size: [1.7, 1.35, 1.7], shape: 'database', color: '#559eff', shortLabel: '待支付订单' },
  'order/reserve': { position: [0, .65, .8], size: [1.7, 1.35, 1.7], shape: 'service', color: '#4de1b3', shortLabel: '库存预留' },
  'order/check': { position: [0, .65, 5.2], size: [1.7, 1.6, 1.7], shape: 'decision', color: '#efc174', shortLabel: '库存判断' },
  'order/payment': { position: [3.1, .65, .8], size: [1.7, 1.35, 1.7], shape: 'service', color: '#ac91ff', shortLabel: '同步收单' },
  'order/result': { position: [3.1, .65, 5.2], size: [1.7, 1.35, 1.7], shape: 'result', color: '#74bcff', shortLabel: '订单结果' },
};

function insidePlacement(owner: ServiceId, x: number, z: number, shape: WorldShape, shortLabel: string): Placement {
  const shell = exterior[owner]!;
  return { position: [shell.position[0] + x, .65, shell.position[2] + z], size: [1.7, 1.5, 1.7], shape, color: shell.color, shortLabel };
}

const interiors: Record<ServiceId, Record<string, Placement>> = {
  order: orderInterior,
  inventory: {
    'inventory/receive': insidePlacement('inventory', -3.1, -2.2, 'gateway', '库存入口'),
    'inventory/operation': insidePlacement('inventory', 0, -2.2, 'decision', '预留 / 释放'),
    'inventory/adjust': insidePlacement('inventory', 3.1, -2.2, 'adjust', '库存调整'),
    'inventory/state': insidePlacement('inventory', -1.55, 2.2, 'rack', '库存状态'),
    'inventory/result': insidePlacement('inventory', 1.55, 2.2, 'result', '返回结果'),
  },
  payment: {
    'payment/receive': insidePlacement('payment', -3.1, -2.2, 'gateway', '支付入口'),
    'payment/associate': insidePlacement('payment', 0, -2.2, 'link', '订单与渠道'),
    'payment/collect': insidePlacement('payment', 3.1, -2.2, 'channel', '同步收单'),
    'payment/record': insidePlacement('payment', -1.55, 2.2, 'ledger', '支付流水'),
    'payment/result': insidePlacement('payment', 1.55, 2.2, 'result', '支付结果'),
  },
};

const regions: readonly WorldRegion[] = [
  { label: '请求接入', center: [-18, 0, 1], width: 17, depth: 18, color: '#62dbdf' },
  { label: '订单域', center: [-1, 0, 6], width: 12, depth: 20, color: '#559eff' },
  { label: '库存域', center: [11, 0, -7], width: 12, depth: 21, color: '#4de1b3' },
  { label: '支付与渠道', center: [19, 0, 13], width: 25, depth: 20, color: '#ac91ff' },
  { label: '异步通知', center: [-1, 0, -18], width: 13, depth: 13, color: '#f1b676' },
];

function placeDocument(document: DiagramDocument, placements: Record<string, Placement>, owner: ServiceId | null): PlacedNode[] {
  const seen = new Set<string>();
  const result = document.nodes.map(node => {
    if (seen.has(node.id)) throw new Error(`空间示例节点 ID 重复：${node.id}`);
    seen.add(node.id);
    if (!Object.hasOwn(placements, node.id)) throw new Error(`空间示例没有配置节点：${node.id}`);
    const placement = placements[node.id]!;
    return { ...placement, position: [...placement.position] as Position, size: [...placement.size] as Position,
      id: node.id, node, interior: owner !== null, owner };
  });
  const missing = Object.keys(placements).filter(id => !seen.has(id));
  if (missing.length) throw new Error(`空间示例缺少节点：${missing.join(', ')}`);
  const edgeIds = new Set<string>();
  for (const edge of document.edges) {
    if (edgeIds.has(edge.id)) throw new Error(`空间示例连接 ID 重复：${edge.id}`);
    edgeIds.add(edge.id);
    for (const id of [edge.source, edge.target]) if (!seen.has(id)) throw new Error(`空间示例连接引用不存在的节点：${id}`);
  }
  return result;
}

export function createWorldLayout(overview: DiagramDocument, documents: ServiceDocuments): WorldLayout {
  return { overview: placeDocument(overview, exterior, null),
    interior: SERVICE_IDS.flatMap(owner => placeDocument(documents[owner], interiors[owner], owner)), regions };
}

/** Resolves authored demo routes only; no dependency is reinterpreted as an execution trace. */
export function getRoutePositions(layout: WorldLayout, ids: readonly string[]): Position[] {
  const nodes = new Map([...layout.overview, ...layout.interior].map(node => [node.id, node]));
  return ids.map(id => {
    const node = nodes.get(id);
    if (!node) throw new Error(`演示路径引用不存在的节点：${id}`);
    return [...node.position];
  });
}
