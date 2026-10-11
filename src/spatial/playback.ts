import type { DemoScenario, DemoState } from './contracts';

/** Timelines are explicitly authored; dependency edges do not imply execution order. */
export function createPlayback(scenarios: readonly DemoScenario[]) {
  const timelines = new Map(scenarios.map(scenario => [scenario.id, scenario]));
  function getSteps(id: string | null) {
    if (id === null) return [];
    const scenario = timelines.get(id);
    if (!scenario) throw new Error(`未知演示场景：${id}`);
    return scenario.steps;
  }
  function createState(id: string | null = scenarios[0]?.id ?? null): DemoState {
    getSteps(id);
    return { scenario:id, status:'idle', index:-1, elapsedMs:0 };
  }
  function stepDuration(state: DemoState) { return getSteps(state.scenario)[state.index]?.durationMs ?? 2200; }
  function play(state: DemoState): DemoState {
    if (!getSteps(state.scenario).length) return { ...state };
    if (state.status === 'idle' || state.status === 'complete') return { ...state, status:'playing', index:0, elapsedMs:0 };
    return { ...state, status:'playing' };
  }
  function pause(state: DemoState): DemoState { return { ...state, status:state.status === 'playing' ? 'paused' : state.status }; }
  function next(state: DemoState): DemoState {
    const steps = getSteps(state.scenario), last = steps.length - 1;
    if (last < 0) return { ...state };
    if (state.index >= last) return { ...state, status:'complete', index:last, elapsedMs:steps[last]!.durationMs };
    return { ...state, status:'paused', index:state.index+1, elapsedMs:0 };
  }
  function previous(state: DemoState): DemoState {
    if (state.index < 0) return { ...state };
    return { ...state, status:'paused', index:Math.max(0,state.index-1), elapsedMs:0 };
  }
  function advance(state: DemoState, deltaMs: number): DemoState {
    if (!Number.isFinite(deltaMs) || deltaMs < 0) throw new RangeError('演示时间增量必须为有限的非负数。');
    if (state.status !== 'playing') return { ...state };
    const steps = getSteps(state.scenario);
    let index = state.index, elapsedMs = state.elapsedMs, remaining = deltaMs;
    while (index < steps.length) {
      const duration = steps[index]!.durationMs;
      const untilNext = duration - elapsedMs;
      // Subtract before addition so enormous finite deltas cannot overflow elapsed time.
      if (remaining < untilNext) return { ...state, index, elapsedMs:elapsedMs+remaining };
      remaining -= untilNext;
      if (index === steps.length-1) return { ...state, status:'complete', index, elapsedMs:duration };
      index += 1; elapsedMs = 0;
    }
    return { ...state };
  }
  function progress(state: DemoState) {
    const steps = getSteps(state.scenario);
    if (state.index < 0 || !steps.length) return 0;
    if (state.status === 'complete') return 1;
    const total = steps.reduce((sum, step) => sum+step.durationMs, 0);
    return (steps.slice(0,state.index).reduce((sum,step) => sum+step.durationMs,0)+state.elapsedMs)/total;
  }
  return { getSteps, createState, stepDuration, play, pause, next, previous, advance, progress,
    reset:(state:DemoState)=>createState(state.scenario), changeScenario:createState };
}
