import type { DiagramDocument } from '../../../src/model/types.ts';

export type WorldMode = 'spatial' | 'flat';
export type ServiceId = 'order' | 'inventory' | 'payment';
export type ServiceDocuments = Record<ServiceId, DiagramDocument>;
export type DemoScenario = 'success' | 'out-of-stock' | 'payment-failed';
export type DemoStatus = 'idle' | 'playing' | 'paused' | 'complete';

/** Authored teaching steps, never inferred from dependency edges or live traffic. */
export interface DemoStep {
  id: string;
  title: string;
  description: string;
  route: readonly string[];
  focusId: string;
  tone: 'request' | 'data' | 'success' | 'failure';
  /** Interiors needed by this step. Playback retains the union up to the current step. */
  openModules: readonly ServiceId[];
}

export interface DemoState {
  scenario: DemoScenario;
  status: DemoStatus;
  index: number;
  elapsedMs: number;
}

export interface WorldSnapshot {
  mode: WorldMode;
  cutaway: boolean;
  openModules: ServiceId[];
  shellOpen: Record<ServiceId, number>;
  isolated: boolean;
  selectedId: string | null;
  camera: number[];
  target: number[];
  objectIds: string[];
  demoRoute: string[];
  demoProgress: number;
  geometryCount: number;
  orderShellOpen: number;
}

export interface WorldController {
  renderer: 'webgl' | 'unavailable';
  setMode(mode: WorldMode): void;
  setOpenModules(modules: readonly ServiceId[], animate?: boolean): void;
  setSelection(id: string | null, related?: { nodeIds: Set<string>; edgeIds: Set<string> }): void;
  setIsolation(enabled: boolean): void;
  setDemo(step: DemoStep | null, progress: number): void;
  focus(id: string): void;
  reset(): void;
  state(): WorldSnapshot;
  dispose(): void;
}
