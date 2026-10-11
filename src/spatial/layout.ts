import type { DiagramDocument, DiagramNode } from '../model/types.ts';
import { buildGraphIndex } from '../model/graph-index.ts';
import type { SpatialScene, WorldShape } from './contracts.ts';

export type { WorldShape } from './contracts.ts';
export type Position = [number, number, number];

export interface PlacedNode {
  id: string;
  node: DiagramNode;
  position: Position;
  size: Position;
  shape: WorldShape;
  color: string;
  shortLabel: string;
  interior: boolean;
  owner: string | null;
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

const compareId = (a: string, b: string): number => a < b ? -1 : a > b ? 1 : 0;
const sortedNodes = (document: DiagramDocument): DiagramNode[] => [...document.nodes].sort((a, b) => compareId(a.id, b.id));
const colors: Partial<Record<WorldShape, string>> = {
  client: '#69e1dd', gateway: '#62dbdf', auth: '#53acdd', decision: '#efc174',
  database: '#4de1b3', external: '#edbf78', event: '#f1b676', result: '#74bcff',
};

function defaultShape(node: DiagramNode, interior: boolean): WorldShape {
  if (node.kind === 'store') return 'database';
  if (node.kind === 'external') return 'external';
  if (node.kind === 'decision') return 'decision';
  if (node.kind === 'start') return interior ? 'gateway' : 'client';
  if (node.kind === 'end') return 'result';
  return 'service';
}

function shellSize(count: number): Position {
  const columns = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / columns);
  return [Math.max(9.6, (columns - 1) * 3.1 + 4.1), 5.2, Math.max(7.6, (rows - 1) * 3.4 + 4.1)];
}

function place(scene: SpatialScene, node: DiagramNode, owner: string | null): PlacedNode {
  const model = scene.models.get(node.id);
  const shell = owner === null && scene.moduleIds.includes(node.id);
  const shape = shell ? 'shell' : model?.shape ?? defaultShape(node, owner !== null);
  const size: Position = shell ? shellSize(scene.documents[node.id]!.nodes.length)
    : owner !== null ? [1.7, shape === 'decision' ? 1.6 : 1.5, 1.7]
    : shape === 'database' ? [3.4, 3.8, 3.4] : [4.4, 4.8, 4.4];
  return {
    id: node.id, node, position: [0, owner === null ? 0 : .65, 0], size, shape,
    color: model?.color ?? colors[shape] ?? '#559eff',
    shortLabel: model?.shortLabel ?? [...node.label].slice(0, 12).join(''),
    interior: owner !== null, owner,
  };
}

/** Collapse strongly connected components before ranking, so cycles cannot grow ranks forever. */
function dependencyLayers(document: DiagramDocument): Map<string, number> {
  const ids = sortedNodes(document).map(node => node.id);
  const adjacency = new Map(ids.map(id => [id, new Set<string>()]));
  for (const edge of document.edges) {
    adjacency.get(edge.source)!.add(edge.target);
    if (!edge.directed) adjacency.get(edge.target)!.add(edge.source);
  }
  let sequence = 0;
  const numbers = new Map<string, number>();
  const lows = new Map<string, number>();
  const active = new Set<string>();
  const stack: string[] = [];
  const components: string[][] = [];
  const visit = (id: string): void => {
    numbers.set(id, sequence); lows.set(id, sequence); sequence += 1;
    stack.push(id); active.add(id);
    for (const next of [...adjacency.get(id)!].sort(compareId)) {
      if (!numbers.has(next)) { visit(next); lows.set(id, Math.min(lows.get(id)!, lows.get(next)!)); }
      else if (active.has(next)) lows.set(id, Math.min(lows.get(id)!, numbers.get(next)!));
    }
    if (lows.get(id) === numbers.get(id)) {
      const component: string[] = [];
      let current: string;
      do { current = stack.pop()!; active.delete(current); component.push(current); } while (current !== id);
      components.push(component.sort(compareId));
    }
  };
  ids.forEach(id => { if (!numbers.has(id)) visit(id); });
  const componentIds = new Map(components.flatMap((members, i) => members.map(id => [id, i] as const)));
  const outgoing = components.map(() => new Set<number>());
  const indegree = components.map(() => 0);
  for (const [id, targets] of adjacency) for (const target of targets) {
    const from = componentIds.get(id)!; const to = componentIds.get(target)!;
    if (from !== to && !outgoing[from]!.has(to)) { outgoing[from]!.add(to); indegree[to]! += 1; }
  }
  const ranks = components.map(() => 0);
  const queue = components.map((_, i) => i).filter(i => indegree[i] === 0);
  for (let cursor = 0; cursor < queue.length; cursor++) {
    const from = queue[cursor]!;
    for (const to of outgoing[from]!) {
      ranks[to] = Math.max(ranks[to]!, ranks[from]! + 1);
      indegree[to]! -= 1;
      if (indegree[to] === 0) queue.push(to);
    }
  }
  return new Map(ids.map(id => [id, ranks[componentIds.get(id)!]!]));
}

/** Display coordinates explain graph structure; they are not deployment locations or timings. */
export function createWorldLayout(scene: SpatialScene): WorldLayout {
  const overview = sortedNodes(scene.document).map(node => place(scene, node, null));
  const layers = dependencyLayers(scene.document);
  const down = scene.document.view.direction === 'DOWN';
  const mainAxis = down ? 2 : 0;
  const laneAxis = down ? 0 : 2;
  let mainOffset = 0;
  for (const rank of [...new Set(layers.values())].sort((a, b) => a - b)) {
    const nodes = overview.filter(node => layers.get(node.id) === rank);
    const mainSize = Math.max(...nodes.map(node => node.size[mainAxis]));
    const laneSpan = nodes.reduce((sum, node) => sum + node.size[laneAxis], 0) + (nodes.length - 1) * 4;
    let laneOffset = -laneSpan / 2;
    for (const node of nodes) {
      node.position[mainAxis] = mainOffset + mainSize / 2;
      node.position[laneAxis] = laneOffset + node.size[laneAxis] / 2;
      laneOffset += node.size[laneAxis] + 4;
    }
    mainOffset += mainSize + 5;
  }
  const centerOffset = (mainOffset - 5) / 2;
  overview.forEach(node => { node.position[mainAxis] -= centerOffset; });
  const overviewById = new Map(overview.map(node => [node.id, node]));
  const interior = [...scene.moduleIds].sort(compareId).flatMap(owner => {
    const nodes = sortedNodes(scene.documents[owner]!);
    const columns = Math.ceil(Math.sqrt(nodes.length));
    const rows = Math.ceil(nodes.length / columns);
    const shell = overviewById.get(owner)!;
    return nodes.map((node, i) => {
      const placed = place(scene, node, owner);
      placed.position[0] = shell.position[0] + (i % columns - (columns - 1) / 2) * 3.1;
      placed.position[2] = shell.position[2] + (Math.floor(i / columns) - (rows - 1) / 2) * 3.4;
      return placed;
    });
  });
  const index = buildGraphIndex(scene.document);
  const regions = [...scene.document.groups].sort((a, b) => compareId(a.id, b.id)).flatMap(group => {
    const nodes = [...(index.groupMembers.get(group.id) ?? [])].sort(compareId).map(id => overviewById.get(id)!);
    if (nodes.length === 0) return [];
    const minX = Math.min(...nodes.map(node => node.position[0] - node.size[0] / 2)) - 2;
    const maxX = Math.max(...nodes.map(node => node.position[0] + node.size[0] / 2)) + 2;
    const minZ = Math.min(...nodes.map(node => node.position[2] - node.size[2] / 2)) - 2;
    const maxZ = Math.max(...nodes.map(node => node.position[2] + node.size[2] / 2)) + 2;
    return [{ label: group.label, center: [(minX + maxX) / 2, 0, (minZ + maxZ) / 2] as Position,
      width: maxX - minX, depth: maxZ - minZ, color: nodes[0]!.color }];
  });
  return { overview, interior, regions };
}

/** Resolve authored routes without interpreting dependency edges as execution traces. */
export function getRoutePositions(layout: WorldLayout, ids: readonly string[]): Position[] {
  const nodes = new Map([...layout.overview, ...layout.interior].map(node => [node.id, node]));
  return ids.map(id => {
    const node = nodes.get(id);
    if (!node) throw new Error(`演示路径引用不存在的节点：${id}`);
    return [...node.position];
  });
}
