import type { DiagramDocument } from '../model/types.ts';

export type ModuleId = string;
export type ModuleDocuments = Record<ModuleId, DiagramDocument>;
export type WorldMode = 'spatial' | 'flat';
export type WorldShape = 'service' | 'shell' | 'gateway' | 'client' | 'database' | 'event' | 'external' | 'auth' | 'decision' | 'rack' | 'adjust' | 'link' | 'channel' | 'ledger' | 'result';
export type DemoStatus = 'idle' | 'playing' | 'paused' | 'complete';

/** Explicit teaching choreography; never inferred from dependency edges. */
export interface DemoStep {
  id: string;
  title: string;
  description: string;
  route: readonly string[];
  focusId: string;
  tone: 'request' | 'data' | 'success' | 'failure';
  openModules: readonly ModuleId[];
  durationMs: number;
}

export interface DemoScenario {
  id: string;
  label: string;
  steps: readonly DemoStep[];
}

export interface DemoState {
  scenario: string | null;
  status: DemoStatus;
  index: number;
  elapsedMs: number;
}

export interface SpatialScene {
  document: DiagramDocument;
  moduleIds: ModuleId[];
  documents: ModuleDocuments;
  owners: Map<string, ModuleId>;
  models: Map<string, { shape: WorldShape; color?: string; shortLabel?: string }>;
  scenarios: DemoScenario[];
}

export interface WorldSnapshot {
  mode: WorldMode;
  cutaway: boolean;
  openModules: ModuleId[];
  shellOpen: Record<ModuleId, number>;
  isolated: boolean;
  selectedId: string | null;
  camera: number[];
  target: number[];
  objectIds: string[];
  demoRoute: string[];
  demoProgress: number;
  geometryCount: number;
}

export interface WorldController {
  renderer: 'webgl' | 'unavailable';
  setMode(mode: WorldMode): void;
  setOpenModules(modules: readonly ModuleId[], animate?: boolean): void;
  setSelection(id: string | null, related?: { nodeIds: Set<string>; edgeIds: Set<string> }): void;
  setIsolation(enabled: boolean): void;
  setDemo(step: DemoStep | null, progress: number): void;
  focus(id: string): void;
  reset(): void;
  state(): WorldSnapshot;
  dispose(): void;
}
