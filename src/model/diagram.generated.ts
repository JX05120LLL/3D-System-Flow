/* Generated from diagram-schema.json. Do not edit. */

export type NonEmptyText = string;
export type Details = string;
export type EvidenceStatus = "confirmed" | "assumed" | "planned";
export type Sources = Source[];
/**
 * @minItems 1
 * @maxItems 100
 */
export type Nodes = Node[];
/**
 * @maxItems 300
 */
export type Edges = Edge[];
/**
 * @maxItems 20
 */
export type Groups = Group[];
/**
 * @maxItems 100
 */
export type Interiors = Interior[];
/**
 * @maxItems 100
 */
export type Models = SpatialModel[];

export interface DiagramDocument {
  schemaVersion: "2.0";
  id: NonEmptyText;
  title: NonEmptyText;
  description?: string;
  sourceRevision?: SourceRevision;
  navigation?: Navigation;
  view: View;
  nodes: Nodes;
  edges: Edges;
  groups: Groups;
  spatial?: {
    interiors?: Interiors;
    models?: Models;
    /**
     * @maxItems 20
     */
    scenarios?: Scenario[];
  };
}
export interface SourceRevision {
  commit: string;
  dirty?: boolean;
}
export interface Navigation {
  /**
   * @maxItems 20
   */
  views: {
    parentId: NonEmptyText;
    ownerId: NonEmptyText;
    document: ViewDocument;
  }[];
  /**
   * @maxItems 300
   */
  bridges?: {
    id: NonEmptyText;
    source: ViewEndpoint;
    target: ViewEndpoint;
    kind: "control" | "data" | "dependency" | "exception" | "feedback";
    directed: boolean;
    label?: string;
    details?: Details;
    evidenceStatus?: EvidenceStatus;
    sources?: Sources;
  }[];
}
export interface ViewDocument {
  schemaVersion: "2.0";
  id: NonEmptyText;
  title: NonEmptyText;
  description?: string;
  sourceRevision?: SourceRevision;
  view: View;
  nodes: Nodes;
  edges: Edges;
  groups: Groups;
  spatial?: {
    interiors?: Interiors;
    models?: Models;
  };
}
export interface View {
  kind: "overview" | "flow" | "deployment";
  direction: "RIGHT" | "DOWN";
  theme: "light" | "dark";
  collapsedGroups?: NonEmptyText[];
  primaryPath?: NonEmptyText[];
}
export interface Node {
  id: NonEmptyText;
  kind: "start" | "end" | "process" | "decision" | "store" | "external" | "fork" | "join";
  label: NonEmptyText;
  summary?: string;
  details?: Details;
  groupId?: NonEmptyText;
  evidenceStatus?: EvidenceStatus;
  sources?: Sources;
}
export interface Source {
  path: NonEmptyText;
  line?: number;
  sha256?: string;
}
export interface Edge {
  id: NonEmptyText;
  source: NonEmptyText;
  target: NonEmptyText;
  kind: "control" | "data" | "dependency" | "exception" | "feedback";
  directed: boolean;
  label?: string;
  details?: Details;
  evidenceStatus?: EvidenceStatus;
  sources?: Sources;
}
export interface Group {
  id: NonEmptyText;
  label: NonEmptyText;
  parentId?: NonEmptyText;
  details?: Details;
}
export interface Interior {
  owner: NonEmptyText;
  /**
   * @minItems 1
   * @maxItems 100
   */
  nodes: Node[];
  /**
   * @maxItems 300
   */
  edges: Edge[];
}
export interface SpatialModel {
  nodeId: NonEmptyText;
  shape:
    | "service"
    | "shell"
    | "gateway"
    | "client"
    | "database"
    | "event"
    | "external"
    | "auth"
    | "decision"
    | "rack"
    | "adjust"
    | "link"
    | "channel"
    | "ledger"
    | "result";
  color?: string;
  shortLabel?: NonEmptyText;
}
export interface ViewEndpoint {
  viewId: NonEmptyText;
  nodeId: NonEmptyText;
}
export interface Scenario {
  id: NonEmptyText;
  label: NonEmptyText;
  /**
   * @minItems 1
   * @maxItems 200
   */
  steps: DemoStep[];
}
export interface DemoStep {
  id: NonEmptyText;
  title: NonEmptyText;
  description: string;
  /**
   * @minItems 1
   * @maxItems 300
   */
  route: NonEmptyText[];
  focusId: NonEmptyText;
  viewId?: NonEmptyText;
  evidenceStatus?: EvidenceStatus;
  sources?: Sources;
  tone: "request" | "data" | "success" | "failure";
  durationMs?: number;
}
