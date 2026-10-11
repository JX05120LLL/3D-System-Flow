import type { DemoScenario, DemoState, DemoStep, ServiceId } from './contracts.ts';
import { serviceOfNode } from './service-documents.ts';

export const STEP_DURATION_MS = 2200;

const step = (id: string, title: string, description: string, route: readonly string[], focusId: string, tone: DemoStep['tone']): DemoStep => {
  const openModules = [...new Set(route.filter(nodeId => nodeId.includes('/')).map(serviceOfNode).filter((owner): owner is ServiceId => owner !== null))];
  return Object.freeze({ id, title, description: `教学示意：${description}`, route: Object.freeze([...route]), focusId, tone, openModules: Object.freeze(openModules) });
};

// Explicit choreography, independent of dependency-edge traversal and live traffic.
const entrance: readonly DemoStep[] = [
  step('client-request', '发起下单', '客户端组织下单意图，把请求交给 API 网关。本原型只展示路径，不发送真实请求。', ['customer', 'gateway'], 'gateway', 'request'),
  step('gateway-entry', '接入网关', '网关承担入口接入和基础检查职责，实际防护配置、限流规则与执行顺序仍需核查。', ['gateway'], 'gateway', 'request'),
  step('identity-check', '身份校验', '网关请求认证服务并得到通过结论。这是选定的教学路径，失败鉴权及真实认证协议未展开。', ['gateway', 'auth', 'gateway'], 'auth', 'request'),
  step('route-order', '进入订单', '身份校验通过后，网关把请求交给订单服务的接入职责；展开订单外壳查看内部职责。', ['gateway', 'order', 'order/receive'], 'order/receive', 'request'),
  step('create-order', '创建待支付订单', '接入职责交给初始订单状态职责，并关联外层订单库。不指定真实表结构、事务边界或幂等规则。', ['order/receive', 'order/draft', 'order-db'], 'order/draft', 'data'),
  step('reserve-stock', '请求预留库存', '订单协调职责请求库存服务预留，库存接入职责先识别本次操作是预留，不预先假定此次预留成功。', ['order/draft', 'order/reserve', 'inventory', 'inventory/receive', 'inventory/operation'], 'inventory/operation', 'request'),
  step('inspect-stock', '核对库存状态', '库存调整职责核对可用状态，并关联外层库存库。此时尚未返回预留结论；库存不足只关联读取结果，不代表成功更新库存。', ['inventory/operation', 'inventory/adjust', 'inventory/state', 'inventory-db', 'inventory/state'], 'inventory/adjust', 'data'),
];

const stockSuccess = step('stock-success', '预留成功', '库存状态职责把已确定的成功结论交给库存结果职责，再返回订单的库存判断职责。只有此分支允许继续支付；释放仅用于后续支付失败的补偿。', ['inventory/state', 'inventory/result', 'order/check'], 'order/check', 'success');
const requestPayment = step('request-payment', '请求同步收单', '只有库存预留成功后，订单服务的支付协调职责才请求支付服务，进入支付请求接入职责。', ['order/check', 'order/payment', 'payment', 'payment/receive'], 'payment/receive', 'request');
const preparePayment = step('prepare-payment', '关联订单与渠道', '支付接入职责交给订单与渠道关联职责，组织收单上下文后进入外部收单协调职责。尚未得到渠道的成功或失败结果。', ['payment/receive', 'payment/associate', 'payment/collect'], 'payment/associate', 'request');
const paymentRecord = step('record-payment', '关联流水与结果', '收单协调职责将渠道的确定结果交给流水职责，关联外层支付库，再由支付结果职责交回订单的结果职责。实际写入顺序与可靠性方案仍需核查。', ['payment/collect', 'payment/record', 'payment-db', 'payment/record', 'payment/result', 'order/result'], 'payment/record', 'data');

const scenarios: Record<DemoScenario, readonly DemoStep[]> = {
  success: Object.freeze([
    ...entrance,
    stockSuccess,
    requestPayment,
    preparePayment,
    step('channel-success', '渠道收单成功', '支付服务的收单协调职责请求外层第三方渠道，渠道立即返回明确成功。本场景没有支付处理中、超时或异步回调。', ['payment/collect', 'payment-provider', 'payment/collect'], 'payment-provider', 'success'),
    paymentRecord,
    step('confirm-order', '确认订单', '订单的结果职责汇总支付成功并关联确认状态，订单库承载逻辑状态；状态更新与事件发布的可靠性策略未指定。', ['order/result', 'order-db'], 'order/result', 'success'),
    step('success-response', '返回下单成功', '订单通过网关返回同步成功结果，无需等待异步通知。返回方向为演示编排，不从架构依赖边推断。', ['order', 'gateway', 'customer'], 'customer', 'success'),
    step('publish-event', '发布确认事件', '成功确认后，订单发布确认事件到事件总线。为便于讲解在响应后展示异步侧，这不规定实际发布与响应的先后或投递保证。', ['order', 'event-bus'], 'event-bus', 'data'),
    step('notify-user', '异步发送通知', '通知服务消费确认事件并组织用户通知；同步成功结果已返回，不等待本步骤。渠道、重试和去重机制尚未指定。', ['event-bus', 'notify'], 'notify', 'success'),
  ]),
  'out-of-stock': Object.freeze([
    ...entrance,
    step('stock-shortage', '库存不足', '库存状态核对后确定预留未成功，由库存结果职责把不足结论返回订单的库存判断职责。没有已预留库存需要补偿，也不把读取库存状态误认为成功预留。', ['inventory/state', 'inventory/result', 'order/check'], 'order/check', 'failure'),
    step('cancel-order', '取消待支付订单', '订单结果职责取消待支付状态，不请求支付，也不请求释放库存，因为此次预留没有成功。', ['order/check', 'order/result', 'order-db'], 'order/result', 'failure'),
    step('failure-response', '返回库存不足', '取消待支付订单后，通过网关返回库存不足的同步结果。本分支不发布确认事件，也不进入成功通知路径。', ['order', 'gateway', 'customer'], 'customer', 'failure'),
  ]),
  'payment-failed': Object.freeze([
    ...entrance,
    stockSuccess,
    requestPayment,
    preparePayment,
    step('channel-failure', '渠道收单失败', '第三方渠道立即返回明确失败，交回支付服务的收单协调职责。这是确定失败的场景，超时或处理中并未等同于失败。', ['payment/collect', 'payment-provider', 'payment/collect'], 'payment-provider', 'failure'),
    paymentRecord,
    step('cancel-order', '取消待支付订单', '订单结果职责收到确定失败并取消待支付状态。这是业务补偿，不等于跨库事务回滚。', ['order/result', 'order-db'], 'order/result', 'failure'),
    step('release-stock', '释放已预留库存', '取消订单后请求同一个库存服务；接入、操作识别与调整职责改为处理释放，关联外层库存库，再由库存结果职责返回释放结论。这里释放先前成功的预留，释放失败、重试和幂等仍需真实系统设计。', ['order/result', 'inventory', 'inventory/receive', 'inventory/operation', 'inventory/adjust', 'inventory/state', 'inventory-db', 'inventory/state', 'inventory/result', 'order/result'], 'inventory/adjust', 'failure'),
    step('failure-response', '返回支付失败', '本选定教学路径在释放库存后，经网关返回支付失败结果；未展示释放失败分支，也不发布确认事件。', ['order', 'gateway', 'customer'], 'customer', 'failure'),
  ]),
};

export function getDemoSteps(scenario: DemoScenario): readonly DemoStep[] {
  if (!Object.hasOwn(scenarios, scenario)) throw new Error(`未知演示场景：${scenario}`);
  return scenarios[scenario];
}

export function createDemoState(scenario: DemoScenario = 'success'): DemoState {
  getDemoSteps(scenario);
  return { scenario, status: 'idle', index: -1, elapsedMs: 0 };
}

export function play(state: DemoState): DemoState {
  getDemoSteps(state.scenario);
  if (state.status === 'idle' || state.status === 'complete') return { ...state, status: 'playing', index: 0, elapsedMs: 0 };
  return { ...state, status: 'playing' };
}

export function pause(state: DemoState): DemoState {
  return { ...state, status: state.status === 'playing' ? 'paused' : state.status };
}

export function next(state: DemoState): DemoState {
  const lastIndex = getDemoSteps(state.scenario).length - 1;
  if (state.index >= lastIndex) return { ...state, status: 'complete', index: lastIndex, elapsedMs: STEP_DURATION_MS };
  return { ...state, status: 'paused', index: state.index + 1, elapsedMs: 0 };
}

export function previous(state: DemoState): DemoState {
  if (state.index < 0) return { ...state };
  return { ...state, status: 'paused', index: Math.max(0, state.index - 1), elapsedMs: 0 };
}

export function reset(state: DemoState): DemoState { return createDemoState(state.scenario); }
export function changeScenario(scenario: DemoScenario): DemoState { return createDemoState(scenario); }

export function advance(state: DemoState, deltaMs: number): DemoState {
  if (!Number.isFinite(deltaMs) || deltaMs < 0) throw new RangeError('演示时间增量必须为有限的非负数。');
  if (state.status !== 'playing') return { ...state };
  const steps = getDemoSteps(state.scenario);
  const remainingMs = (steps.length - state.index) * STEP_DURATION_MS - state.elapsedMs;
  // Compare before addition, so even a huge finite delta cannot overflow the timeline.
  if (deltaMs >= remainingMs) return { ...state, status: 'complete', index: steps.length - 1, elapsedMs: STEP_DURATION_MS };
  const elapsed = state.elapsedMs + deltaMs;
  return { ...state, index: state.index + Math.floor(elapsed / STEP_DURATION_MS), elapsedMs: elapsed % STEP_DURATION_MS };
}
