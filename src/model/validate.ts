import type { ErrorObject, ValidateFunction } from 'ajv';
import validateSchema from './validator.generated.js';
import { buildGraphIndex, findRelated, isFlowEdge } from './graph-index.ts';
import type { Diagnostic, DiagramDocument, DiagramEdge, ValidationResult } from './types.ts';

export const MAX_DOCUMENT_BYTES = 2 * 1024 * 1024;
const compiledValidator = validateSchema as ValidateFunction;

function pointerSegment(value: string): string {
  return value.replaceAll('~', '~0').replaceAll('/', '~1');
}

function schemaDiagnostic(error: ErrorObject): Diagnostic {
  let path = error.instancePath;
  if (error.keyword === 'required') path += `/${pointerSegment(String(error.params.missingProperty))}`;
  if (error.keyword === 'additionalProperties') path += `/${pointerSegment(String(error.params.additionalProperty))}`;
  return {
    code: `SCHEMA_${error.keyword.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()}`,
    path, ids: [], severity: 'error',
    message: `${path || '/'}: ${error.message ?? '结构不符合 schema'}`,
  };
}

type AddDiagnostic = (code: string, path: string, ids: string[], message: string, severity?: Diagnostic['severity']) => void;

function validateBranches(document: DiagramDocument, add: AddDiagnostic, prefix = ''): void {
  const index = buildGraphIndex(document);
  document.nodes.forEach((node, i) => {
    const outgoing = index.outgoing.get(node.id) ?? [];
    if (node.kind === 'decision') {
      const branches = outgoing.filter(isFlowEdge);
      if (branches.length < 2) add('DECISION_BRANCH_COUNT', `${prefix}/nodes/${i}/kind`, [node.id], 'decision 在流程子图中至少需要两个出口，data/dependency 不计入。');
      const conditions = new Set<string>();
      for (const edge of branches) {
        const label = edge.label?.trim();
        const path = `${prefix}/edges/${document.edges.indexOf(edge)}/label`;
        if (!label) add('DECISION_CONDITION_MISSING', path, [node.id, edge.id], '判断出口必须有非空条件，不能自动推断是或否。');
        else if (conditions.has(label)) add('DECISION_CONDITION_DUPLICATE', path, [node.id, edge.id], '同一判断节点的出口条件必须可区分。');
        if (label) conditions.add(label);
      }
    }
    if (node.kind === 'fork' && outgoing.filter((edge) => edge.kind === 'control').length < 2) {
      add('FORK_BRANCH_COUNT', `${prefix}/nodes/${i}/kind`, [node.id], 'fork 至少需要两个 control 出口。');
    }
    if (node.kind === 'join' && (index.incoming.get(node.id) ?? []).filter((edge) => edge.kind === 'control').length < 2) {
      add('JOIN_BRANCH_COUNT', `${prefix}/nodes/${i}/kind`, [node.id], 'join 至少需要两个 control 入口。');
    }
  });
}

/** Does not apply defaults, remove properties, mutate input, or compile schema at runtime. */
export function validateDocument(input: unknown): ValidationResult {
  const diagnostics: Diagnostic[] = [];
  const add = (code: string, path: string, ids: string[], message: string, severity: Diagnostic['severity'] = 'error') => {
    diagnostics.push({ code, path, ids, message, severity });
  };
  try {
    const serialized = JSON.stringify(input);
    if (serialized !== undefined && new TextEncoder().encode(serialized).byteLength > MAX_DOCUMENT_BYTES) {
      add('DOCUMENT_SIZE_LIMIT', '', [], '图数据超过 2 MiB，请提炼为总览与子图，不要放入完整源码或日志。');
      return { valid: false, diagnostics };
    }
  } catch (error) {
    add('DOCUMENT_NOT_JSON', '', [], `图数据无法表示为 JSON：${error instanceof Error ? error.message : String(error)}`);
    return { valid: false, diagnostics };
  }
  if (!compiledValidator(input)) {
    return { valid: false, diagnostics: (compiledValidator.errors ?? []).map(schemaDiagnostic) };
  }
  const document = input as DiagramDocument;
  const nodeIds = new Set<string>();
  const objectIds = new Set<string>();
  const edgeIds = new Set<string>();
  document.nodes.forEach((node, i) => {
    if (objectIds.has(node.id)) add('ID_DUPLICATE', `/nodes/${i}/id`, [node.id], '节点和组 ID 必须在同一命名空间内唯一。');
    objectIds.add(node.id);
    nodeIds.add(node.id);
  });
  document.groups.forEach((group, i) => {
    if (objectIds.has(group.id)) add('ID_DUPLICATE', `/groups/${i}/id`, [group.id], '节点和组 ID 必须在同一命名空间内唯一。');
    objectIds.add(group.id);
  });
  const groups = new Map(document.groups.map((group) => [group.id, group]));
  document.nodes.forEach((node, i) => {
    if (node.groupId && !groups.has(node.groupId)) add('NODE_GROUP_MISSING', `/nodes/${i}/groupId`, [node.id, node.groupId], '节点引用的分组不存在。');
  });
  document.groups.forEach((group, i) => {
    if (group.parentId && !groups.has(group.parentId)) add('GROUP_PARENT_MISSING', `/groups/${i}/parentId`, [group.id, group.parentId], '父分组不存在。');
    const ancestors = new Set<string>();
    let current: typeof group | undefined = group;
    while (current) {
      if (ancestors.has(current.id)) {
        add('GROUP_CYCLE', `/groups/${i}/parentId`, [...ancestors], '分组归属不能形成循环。');
        break;
      }
      ancestors.add(current.id);
      current = current.parentId ? groups.get(current.parentId) : undefined;
    }
    if (ancestors.size > 2) add('GROUP_DEPTH_LIMIT', `/groups/${i}/parentId`, [...ancestors], '分组最多支持两层；请合并层级或拆为子图。');
  });
  document.edges.forEach((edge, i) => {
    if (edgeIds.has(edge.id)) add('EDGE_ID_DUPLICATE', `/edges/${i}/id`, [edge.id], '边 ID 必须在文档内唯一。');
    edgeIds.add(edge.id);
    if (!nodeIds.has(edge.source)) add('EDGE_SOURCE_MISSING', `/edges/${i}/source`, [edge.id, edge.source], '边的 source 必须引用已有节点。');
    if (!nodeIds.has(edge.target)) add('EDGE_TARGET_MISSING', `/edges/${i}/target`, [edge.id, edge.target], '边的 target 必须引用已有节点。');
    if (isFlowEdge(edge) && !edge.directed) add('FLOW_EDGE_UNDIRECTED', `/edges/${i}/directed`, [edge.id], 'control、exception 和 feedback 流程边必须有明确方向。');
  });
  const index = buildGraphIndex(document);
  document.groups.forEach((group, i) => {
    if (!index.groupMembers.get(group.id)?.size) add('GROUP_EMPTY', `/groups/${i}`, [group.id], '分组必须直接或通过子组包含节点。');
  });
  validateBranches(document, add);
  const seenPrimary = new Set<string>();
  let previous: DiagramEdge | undefined;
  (document.view.primaryPath ?? []).forEach((id, i) => {
    const path = `/view/primaryPath/${i}`;
    const edge = index.edges.get(id);
    if (!edge) add('PRIMARY_EDGE_MISSING', path, [id], '主路径引用的边不存在。');
    if (seenPrimary.has(id)) add('PRIMARY_EDGE_DUPLICATE', path, [id], '主路径不能重复引用同一条边。');
    seenPrimary.add(id);
    if (edge && !edge.directed) add('PRIMARY_EDGE_UNDIRECTED', path, [id], '主路径只能使用有向边。');
    if (previous && edge && previous.target !== edge.source) add('PRIMARY_PATH_DISCONNECTED', path, [previous.id, id], '主路径相邻边必须按照 source → target 连续连接。');
    previous = edge;
  });
  (document.view.collapsedGroups ?? []).forEach((id, i) => {
    if (!groups.has(id)) add('COLLAPSED_GROUP_MISSING', `/view/collapsedGroups/${i}`, [id], '初始折叠状态引用的组不存在。');
  });
  const interiors = document.spatial?.interiors ?? [];
  const globalNodeIds = new Set(nodeIds);
  const owners = new Set<string>();
  let totalNodes = document.nodes.length;
  let totalEdges = document.edges.length;
  interiors.forEach((interior, i) => {
    const prefix = `/spatial/interiors/${i}`;
    if (!nodeIds.has(interior.owner)) add('SPATIAL_OWNER_MISSING', `${prefix}/owner`, [interior.owner], '剖面 owner 必须引用总览节点。');
    if (owners.has(interior.owner)) add('SPATIAL_OWNER_DUPLICATE', `${prefix}/owner`, [interior.owner], '同一个总览节点只能定义一个剖面。');
    owners.add(interior.owner);
    totalNodes += interior.nodes.length;
    totalEdges += interior.edges.length;
    const localIds = new Set(interior.nodes.map(node => node.id));
    interior.nodes.forEach((node, j) => {
      if (objectIds.has(node.id)) add('ID_DUPLICATE', `${prefix}/nodes/${j}/id`, [node.id], '总览、组和所有剖面的节点 ID 必须在同一命名空间内唯一。');
      objectIds.add(node.id);
      globalNodeIds.add(node.id);
      if (node.groupId && !groups.has(node.groupId)) add('NODE_GROUP_MISSING', `${prefix}/nodes/${j}/groupId`, [node.id, node.groupId], '内部节点引用的分组不存在。');
    });
    interior.edges.forEach((edge, j) => {
      const path = `${prefix}/edges/${j}`;
      if (edgeIds.has(edge.id)) add('EDGE_ID_DUPLICATE', `${path}/id`, [edge.id], '总览和所有剖面的边 ID 必须在文档内唯一。');
      edgeIds.add(edge.id);
      if (!localIds.has(edge.source)) add('EDGE_SOURCE_MISSING', `${path}/source`, [edge.id, edge.source], '内部边的 source 必须引用同一剖面的节点。');
      if (!localIds.has(edge.target)) add('EDGE_TARGET_MISSING', `${path}/target`, [edge.id, edge.target], '内部边的 target 必须引用同一剖面的节点。');
      if (isFlowEdge(edge) && !edge.directed) add('FLOW_EDGE_UNDIRECTED', `${path}/directed`, [edge.id], 'control、exception 和 feedback 流程边必须有明确方向。');
    });
    validateBranches({ ...document, nodes: interior.nodes, edges: interior.edges, groups: [] }, add, prefix);
  });
  if (totalNodes > 100) add('SPATIAL_NODE_LIMIT', '/spatial/interiors', [], '总览和所有剖面合计最多 100 个节点。');
  if (totalEdges > 300) add('SPATIAL_EDGE_LIMIT', '/spatial/interiors', [], '总览和所有剖面合计最多 300 条边。');
  const modelIds = new Set<string>();
  (document.spatial?.models ?? []).forEach((model, i) => {
    const path = `/spatial/models/${i}/nodeId`;
    if (!globalNodeIds.has(model.nodeId)) add('SPATIAL_MODEL_NODE_MISSING', path, [model.nodeId], '模型必须引用已有总览或内部节点。');
    if (modelIds.has(model.nodeId)) add('SPATIAL_MODEL_DUPLICATE', path, [model.nodeId], '同一节点只能定义一个模型外观。');
    modelIds.add(model.nodeId);
  });
  const scenarioIds = new Set<string>();
  (document.spatial?.scenarios ?? []).forEach((scenario, i) => {
    const path = `/spatial/scenarios/${i}`;
    if (scenarioIds.has(scenario.id)) add('SPATIAL_SCENARIO_DUPLICATE', `${path}/id`, [scenario.id], '演示场景 ID 必须唯一。');
    scenarioIds.add(scenario.id);
    const stepIds = new Set<string>();
    let durationMs = 0;
    scenario.steps.forEach((step, j) => {
      const stepPath = `${path}/steps/${j}`;
      if (stepIds.has(step.id)) add('SPATIAL_STEP_DUPLICATE', `${stepPath}/id`, [scenario.id, step.id], '同一场景的步骤 ID 必须唯一。');
      stepIds.add(step.id);
      step.route.forEach((id, k) => {
        if (!globalNodeIds.has(id)) add('SPATIAL_ROUTE_NODE_MISSING', `${stepPath}/route/${k}`, [scenario.id, step.id, id], '演示路径必须引用已有总览或内部节点。');
      });
      if (!globalNodeIds.has(step.focusId)) add('SPATIAL_FOCUS_NODE_MISSING', `${stepPath}/focusId`, [scenario.id, step.id, step.focusId], '演示焦点必须引用已有总览或内部节点。');
      durationMs += step.durationMs ?? 2200;
    });
    if (!Number.isSafeInteger(durationMs)) add('SPATIAL_DURATION_LIMIT', `${path}/steps`, [scenario.id], '场景总时长不能超过安全整数范围。');
  });
  // A disconnected graph is useful in some comparisons; report rather than discard it.
  if (diagnostics.length === 0) {
    const visited = new Set<string>();
    const components: string[][] = [];
    for (const node of document.nodes) {
      if (visited.has(node.id)) continue;
      const queue = [node.id];
      visited.add(node.id);
      for (let cursor = 0; cursor < queue.length; cursor += 1) {
        const id = queue[cursor]!;
        for (const edge of [...index.incoming.get(id)!, ...index.outgoing.get(id)!]) {
          const adjacent = edge.source === id ? edge.target : edge.source;
          if (!visited.has(adjacent)) { visited.add(adjacent); queue.push(adjacent); }
        }
      }
      components.push(queue);
    }
    if (components.length > 1) add('GRAPH_DISCONNECTED', '/nodes', components.slice(1).flat(), `图中包含 ${components.length} 个互不连通的子图；请确认这是预期表达。`, 'warning');
    const starts = document.nodes.filter((node) => node.kind === 'start').map((node) => node.id);
    if (document.view.kind === 'flow' && starts.length > 0) {
      const reached = findRelated(index, starts, 'downstream').nodeIds;
      const flowNodeIds = new Set(document.edges.filter(isFlowEdge).flatMap((edge) => [edge.source, edge.target]));
      const unreachable = document.nodes.filter((node) => flowNodeIds.has(node.id) && !reached.has(node.id)).map((node) => node.id);
      if (unreachable.length > 0) add('GRAPH_UNREACHABLE', '/nodes', unreachable, '这些流程节点无法从任何 start 节点沿流程方向到达，请确认入口和边方向。', 'warning');
    }
  }
  const valid = !diagnostics.some((diagnostic) => diagnostic.severity === 'error');
  return { valid, ...(valid ? { document } : {}), diagnostics };
}
