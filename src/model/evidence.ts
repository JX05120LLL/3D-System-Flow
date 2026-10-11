import type { EvidenceStatus, Source, ViewDocument } from './diagram.generated.ts';
import type { Diagnostic, DiagramDocument } from './types.ts';

export interface EvidenceEntry {
  id: string;
  path: string;
  status: EvidenceStatus;
  sources: Source[];
}

/** Enumerates model claims without inferring whether a description is true. */
export function collectEvidenceEntries(document: DiagramDocument): EvidenceEntry[] {
  const entries: EvidenceEntry[] = [];
  const add = (item: { id: string; evidenceStatus?: EvidenceStatus; sources?: Source[] }, path: string) => {
    entries.push({ id: item.id, path, status: item.evidenceStatus ?? 'assumed', sources: item.sources ?? [] });
  };
  const addView = (view: DiagramDocument | ViewDocument, prefix: string) => {
    view.nodes.forEach((node, i) => add(node, `${prefix}/nodes/${i}`));
    view.edges.forEach((edge, i) => add(edge, `${prefix}/edges/${i}`));
    (view.spatial?.interiors ?? []).forEach((interior, i) => {
      interior.nodes.forEach((node, j) => add(node, `${prefix}/spatial/interiors/${i}/nodes/${j}`));
      interior.edges.forEach((edge, j) => add(edge, `${prefix}/spatial/interiors/${i}/edges/${j}`));
    });
  };
  addView(document, '');
  (document.navigation?.views ?? []).forEach((view, i) => addView(view.document, `/navigation/views/${i}/document`));
  (document.spatial?.scenarios ?? []).forEach((scenario, i) => {
    scenario.steps.forEach((step, j) => add(step, `/spatial/scenarios/${i}/steps/${j}`));
  });
  (document.navigation?.bridges ?? []).forEach((bridge, i) => add(bridge, `/navigation/bridges/${i}`));
  return entries;
}

export function collectEvidenceWarnings(document: DiagramDocument): Diagnostic[] {
  return collectEvidenceEntries(document)
    .filter(entry => entry.status === 'confirmed' && !entry.sources.some(source => source.path.trim().length > 0))
    .map(entry => ({
      code: 'SOURCE_MISSING', path: `${entry.path}/sources`, ids: [entry.id], severity: 'warning',
      message: 'confirmed 信息需要至少一个非空来源；来源一致仍需人工核对描述与调用语义。',
    }));
}
