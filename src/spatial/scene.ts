import type { DiagramDocument } from '../model/types.ts';
import { validateDocument } from '../model/validate.ts';
import { buildNavigation } from '../model/navigation.ts';
import type { ModuleDocuments, SpatialScene } from './contracts.ts';

/** Normalize only authored components and steps; root edges remain in the root graph. */
export function normalizeScene(document: DiagramDocument, viewId = document.id): SpatialScene {
  const result = validateDocument(document);
  if (!result.valid) throw new Error(result.diagnostics.filter(d => d.severity === 'error').map(d => `${d.code} ${d.path}: ${d.message}`).join('\n'));
  const navigation = buildNavigation(document);
  const view = navigation.getView(viewId);
  if (!view) throw new Error(`未知视图：${viewId}`);
  const scene = normalizeView(view);
  const ownersByView = new Map([...navigation.views].map(([id, item]) => [id, normalizeView(item)]));
  scene.scenarios = (document.spatial?.scenarios ?? []).map(scenario => ({
    id: scenario.id,
    label: scenario.label,
    steps: scenario.steps.map(step => ({
      ...step,
      viewId: step.viewId ?? document.id,
      route: [...step.route],
      durationMs: step.durationMs ?? 2200,
      openModules: [...new Set([...step.route, step.focusId].map(id => ownerOf(ownersByView.get(step.viewId ?? document.id)!, id)).filter((id): id is string => id !== null))],
    })),
  }));
  return scene;
}

function normalizeView(document: DiagramDocument): SpatialScene {
  const documents: ModuleDocuments = Object.create(null) as ModuleDocuments;
  const owners = new Map<string, string>();
  const moduleIds: string[] = [];
  const rootNodes = new Map(document.nodes.map(node => [node.id, node]));
  const rootGroups = new Map(document.groups.map(group => [group.id, group]));
  for (const interior of document.spatial?.interiors ?? []) {
    moduleIds.push(interior.owner);
    const groupIds = new Set<string>();
    for (const node of interior.nodes) {
      owners.set(node.id, interior.owner);
      let groupId = node.groupId;
      while (groupId && !groupIds.has(groupId)) {
        groupIds.add(groupId);
        groupId = rootGroups.get(groupId)?.parentId;
      }
    }
    documents[interior.owner] = {
      schemaVersion: document.schemaVersion,
      id: `${document.id}:${interior.owner}`,
      title: `${rootNodes.get(interior.owner)!.label} · 内部组件`,
      ...(document.description === undefined ? {} : { description: document.description }),
      view: { kind: document.view.kind, direction: document.view.direction, theme: document.view.theme },
      nodes: interior.nodes,
      edges: interior.edges,
      groups: document.groups.filter(group => groupIds.has(group.id)),
    };
  }
  const scene: SpatialScene = {
    document, moduleIds, documents, owners,
    models: new Map((document.spatial?.models ?? []).map(({ nodeId, ...model }) => [nodeId, model])),
    scenarios: [],
  };
  return scene;
}

/** Ownership is explicit; punctuation and node prefixes have no semantic meaning. */
export function ownerOf(scene: SpatialScene, id: string | null): string | null {
  if (id === null) return null;
  return scene.owners.get(id) ?? (scene.moduleIds.includes(id) ? id : null);
}
