import type { DiagramDocument, DiagramNode, NavigationBridge, NavigationView } from './types.ts';

/** Each view owns its node namespace. Bridges are separate from graph traversal. */
export function buildNavigation(document: DiagramDocument) {
  const { navigation: _navigation, ...root } = document;
  const views = new Map<string, DiagramDocument>([[document.id, root]]);
  const entries = new Map<string, NavigationView>();
  const children = new Map<string, NavigationView[]>();
  const nodes = new Map<string, Map<string, DiagramNode>>();
  for (const entry of document.navigation?.views ?? []) {
    views.set(entry.document.id, entry.document);
    entries.set(entry.document.id, entry);
    const siblings = children.get(entry.parentId) ?? [];
    siblings.push(entry); children.set(entry.parentId, siblings);
  }
  for (const [id, view] of views) {
    nodes.set(id, new Map([...view.nodes, ...(view.spatial?.interiors ?? []).flatMap(interior => interior.nodes)].map(node => [node.id, node])));
  }
  function getAncestors(id: string): DiagramDocument[] {
    const ancestors: DiagramDocument[] = [];
    const seen = new Set([id]);
    let entry = entries.get(id);
    while (entry && !seen.has(entry.parentId)) {
      const parent = views.get(entry.parentId);
      if (!parent) break;
      seen.add(parent.id); ancestors.unshift(parent); entry = entries.get(parent.id);
    }
    return ancestors;
  }
  return {
    rootId: document.id, views,
    getView: (id: string) => views.get(id),
    getNode: (viewId: string, nodeId: string) => nodes.get(viewId)?.get(nodeId),
    getEntry: (id: string) => entries.get(id),
    getAncestors,
    getChildren: (id: string) => children.get(id) ?? [],
    getChild: (viewId: string, nodeId: string) => (children.get(viewId) ?? []).find(entry => entry.ownerId === nodeId),
    getBridges: (viewId: string, nodeId: string): NavigationBridge[] => (document.navigation?.bridges ?? []).filter(bridge =>
      (bridge.source.viewId === viewId && bridge.source.nodeId === nodeId) || (bridge.target.viewId === viewId && bridge.target.nodeId === nodeId)),
  };
}
