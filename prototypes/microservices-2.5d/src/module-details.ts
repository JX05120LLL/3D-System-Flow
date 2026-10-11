import type { DiagramDocument, DiagramEdge, DiagramNode } from '../../../src/model/types.ts';

type GroupId = 'entry' | 'business' | 'data';
interface InternalStep {
  id: string;
  groupId: GroupId;
  kind: DiagramNode['kind'];
  label: string;
  summary: string;
  details: string;
}
interface InternalRelation {
  source: string;
  target: string;
  label: string;
  details: string;
  kind: DiagramEdge['kind'];
}
interface ModuleDefinition {
  label: string;
  scope: string;
  groupLabels: [string, string, string];
  nodes: InternalStep[];
  edges: InternalRelation[];
}

const step = (id: string, groupId: GroupId, label: string, summary: string, details: string, kind: DiagramNode['kind'] = 'process'): InternalStep => ({ id, groupId, label, summary, details, kind });
const relation = (source: string, target: string, label: string, details: string, kind: DiagramEdge['kind'] = 'control'): InternalRelation => ({ source, target, label, details, kind });

function storageModule(label: string, owner: string, stateLabel: string, stateSummary: string, stateDetails: string): ModuleDefinition {
  return {
    label,
    scope: `仅展示${owner}自有数据的逻辑访问职责，不指定数据库产品、表结构、索引或事务实现。`,
    groupLabels: ['服务访问', '状态操作', '状态与结果'],
    nodes: [
      step('request', 'entry', '接收读写请求', `来自${owner}`, `接收所属业务服务的逻辑数据请求。连接方式、查询协议和访问控制需要按真实系统核查。`, 'start'),
      step('operation', 'business', '解释状态操作', '确定读取或更新目标', '将业务服务的请求对应到本模块管理的逻辑状态。此职责拆解不代表真实数据访问层或存储引擎。'),
      step('state', 'data', stateLabel, stateSummary, stateDetails, 'store'),
      step('result', 'data', '返回访问结果', '状态数据或操作结果', '向所属业务服务提供本次读取或更新的结果。错误处理、一致性和并发行为由真实实现决定。', 'end'),
    ],
    edges: [
      relation('request', 'operation', '逻辑访问请求', '示意业务服务表达所需数据或状态变更，不对应具体查询语句。'),
      relation('operation', 'state', '读取或更新状态', '操作目标是模块拥有的逻辑状态，不规定如何存储和提交修改。', 'data'),
      relation('state', 'result', '状态与处理结果', '把本次访问的数据或处理结果交回调用方，不承诺未核查的一致性保证。', 'data'),
    ],
  };
}

const definitions: Record<string, ModuleDefinition> = {
  customer: {
    label: '用户发起下单',
    scope: '仅展示客户端组织请求和呈现同步结果的职责，不指定真实页面、字段或客户端框架。',
    groupLabels: ['用户意图', '请求组织', '结果呈现'],
    nodes: [
      step('intent', 'entry', '形成下单意图', '用户选择需要购买的内容', '表示用户准备提交一笔订单的意图；实际商品选择、地址和支付交互需要由真实产品定义。', 'start'),
      step('prepare', 'business', '组织请求内容', '整理本次下单信息', '把用户意图整理为逻辑下单请求。不指定请求字段、参数校验方式或数据格式。'),
      step('send', 'business', '请求 API 网关', '把请求交给系统入口', '向外层图中的 API 网关发起下单请求；此原型只解释关系，不发送真实网络请求。'),
      step('result', 'data', '呈现同步结果', '向用户解释成功或失败', '接收并展示本教学场景的确定结果。页面表现、错误提示和后续操作仍需按实际产品核查。', 'end'),
    ],
    edges: [
      relation('intent', 'prepare', '下单意图', '用户意图进入请求组织步骤，不代表真实页面已经提交。'),
      relation('prepare', 'send', '下单信息', '组织后的信息交给请求入口，具体字段和格式未指定。'),
      relation('send', 'result', '同步返回结果', '表示客户端收到外层系统的结果，不把服务端内部过程归到客户端。'),
    ],
  },
  gateway: {
    label: 'API 网关',
    scope: '防护、身份校验和路由均为典型职责示意，实际顺序和部署方式需要核查。',
    groupLabels: ['请求接入', '校验与路由', '响应返回'],
    nodes: [
      step('receive', 'entry', '接收入口请求', '承接客户端下单请求', '代表系统入口接收请求的职责，不指定网关产品、监听配置或协议实现。', 'start'),
      step('guard', 'entry', '执行边缘检查', '示意基础防护与限流', '表示可在入口执行的基础检查。是否存在此步骤以及检查顺序都属于教学假设。'),
      step('identity', 'business', '请求身份校验', '关联外层认证服务', '示意网关使用外层认证服务提供的身份校验能力；不指定令牌、会话或认证协议。'),
      step('route', 'business', '路由业务请求', '把下单请求交给订单服务', '对获准继续处理的请求选择外层订单服务。不指定路由规则、服务发现或负载分配方式。'),
      step('result', 'data', '返回入口响应', '向客户端传递处理结果', '表示入口把本教学场景的同步结果返回客户端。拒绝请求和错误响应的实现需要另行核查。', 'end'),
    ],
    edges: [
      relation('receive', 'guard', '接入请求', '入口请求进入示意检查步骤，顺序不是已经证实的运行事实。'),
      relation('guard', 'identity', '检查后进入校验', '只展示被允许继续的请求；被拒绝请求的具体分支未在此子图展开。'),
      relation('identity', 'route', '身份校验通过', '此路径限定为身份校验通过的请求，失败处理需按真实系统核查。'),
      relation('route', 'result', '业务响应', '路由职责关联订单服务的响应，不表示网关自行完成订单业务。'),
    ],
  },
  auth: {
    label: '认证服务',
    scope: '展示抽象身份校验，不指定账号数据来源、令牌格式或权限实现。',
    groupLabels: ['校验入口', '身份判断', '校验结论'],
    nodes: [
      step('receive', 'entry', '接收校验请求', '来自网关的身份信息', '承接外层网关需要核验的身份信息，不假定使用任何认证协议。', 'start'),
      step('interpret', 'business', '解读身份信息', '整理待核验的身份依据', '解释本次请求携带的身份依据；令牌、会话或其他形式都需依据真实系统确认。'),
      step('check', 'business', '形成校验判断', '身份依据是否通过核验', '将抽象核验结果区分为通过和未通过，不在原型中实现真实认证规则。', 'decision'),
      step('accepted', 'data', '返回通过结论', '允许网关继续处理', '向网关说明身份校验通过；具体返回字段及后续访问权限不在此示意中指定。', 'end'),
      step('rejected', 'data', '返回未通过结论', '由网关处理拒绝结果', '向网关说明身份核验未通过；响应码、错误消息和登录交互需由真实产品决定。', 'end'),
    ],
    edges: [
      relation('receive', 'interpret', '身份校验输入', '将网关提供的逻辑身份依据交给核验职责。'),
      relation('interpret', 'check', '待核验依据', '整理后的身份信息进入抽象判断，不代表某种具体认证算法。'),
      relation('check', 'accepted', '校验通过', '明确展示通过条件对应的返回方向。'),
      relation('check', 'rejected', '校验未通过', '明确展示未通过条件，避免把所有校验请求画成成功路径。'),
    ],
  },
  order: {
    label: '订单服务',
    scope: '沿用外层教学示例的同步确定结果场景；异步支付回调、处理中和超时未展开。',
    groupLabels: ['下单入口', '库存与支付协调', '订单状态与结果'],
    nodes: [
      step('receive', 'entry', '接收下单请求', '来自网关的业务请求', '承接外层 API 网关路由的下单请求，不指定接口字段或真实校验逻辑。', 'start'),
      step('draft', 'data', '创建待支付订单', '形成初始订单状态', '代表订单服务创建待支付状态的职责，不指定表结构、事务边界或生成编号的方法。', 'store'),
      step('reserve', 'business', '请求库存预留', '向外层库存服务询问结果', '请求外层库存服务预留本次订单需要的库存，锁粒度、幂等和超时回收仍未指定。'),
      step('check', 'business', '判断库存结果', '预留成功或库存不足', '显式决定是否继续发起支付，库存不足时不会沿此示意路径请求收单。', 'decision'),
      step('payment', 'business', '请求同步收单', '库存成功后进入支付', '请求外层支付服务，并等待本教学场景的确定成功或失败结果。'),
      step('result', 'data', '汇总订单结果', '确认、失败与补偿职责', '库存不足时返回失败；支付失败时请求释放已预留库存并汇总失败；成功时确认订单后请求发布确认事件。此处聚合职责，不指定补偿、持久化或发布可靠性策略。', 'end'),
    ],
    edges: [
      relation('receive', 'draft', '下单请求', '请求进入待支付订单的逻辑状态创建，不指定实际数据库操作。'),
      relation('draft', 'reserve', '待支付订单', '示意创建待支付状态后协调库存预留，真实事务顺序需核查。'),
      relation('reserve', 'check', '库存预留结果', '把库存服务的成功或不足结果交给显式判断。'),
      relation('check', 'payment', '库存预留成功', '只有库存预留成功的分支继续请求支付，保留外层示例的条件。'),
      relation('check', 'result', '库存不足', '库存不足直接进入失败结果汇总，不执行支付步骤。'),
      relation('payment', 'result', '确定支付结果', '汇总成功或失败；支付失败后的释放库存职责见结果节点说明。'),
    ],
  },
  inventory: {
    label: '库存服务',
    scope: '仅展示预留或释放库存的抽象职责，不指定锁、幂等键或回收任务。',
    groupLabels: ['库存请求', '库存调整', '库存状态与结果'],
    nodes: [
      step('receive', 'entry', '接收库存请求', '来自外层订单服务', '承接订单服务发起的预留请求，或支付失败后释放已有预留的请求。', 'start'),
      step('operation', 'business', '识别库存操作', '预留或释放的目标', '区分本次逻辑操作及涉及的库存范围，具体请求字段和校验规则尚未核查。'),
      step('adjust', 'business', '形成调整结果', '核对可用性或释放预留', '预留时形成成功或库存不足的结论；释放时处理已有预留的回退职责。不承诺并发、重复请求或异常输入的实现。'),
      step('state', 'data', '关联库存状态', '库存服务拥有的数据', '表示库存调整需要关联外层库存库中的逻辑状态。是否写入、如何保证一致性需由真实实现确认。', 'store'),
      step('result', 'data', '返回库存结果', '预留成功、不足或释放结果', '向订单服务返回本次操作的逻辑结论；返回字段和失败语义仍待核查。', 'end'),
    ],
    edges: [
      relation('receive', 'operation', '库存操作请求', '把预留或释放请求交给操作识别职责。'),
      relation('operation', 'adjust', '预留或释放目标', '表示已识别的库存操作，不把预留与释放画成同一次顺序操作。'),
      relation('adjust', 'state', '核对或更新库存', '关联数据职责，库存不足并不意味着必须更新库存。', 'data'),
      relation('state', 'result', '库存状态与结论', '将数据关联后的逻辑结果提供给订单服务。', 'data'),
    ],
  },
  payment: {
    label: '支付服务',
    scope: '只展示第三方收单立即返回确定结果的教学场景，不扩展异步回调或支付中状态。',
    groupLabels: ['支付请求', '同步收单协调', '流水与结果'],
    nodes: [
      step('receive', 'entry', '接收支付请求', '来自外层订单服务', '承接库存预留成功后发起的逻辑支付请求，不指定收单参数。', 'start'),
      step('associate', 'business', '关联订单与渠道', '组织本次收单上下文', '把支付请求与订单及外层第三方支付关联，不指定商户配置或渠道选择算法。'),
      step('collect', 'business', '请求外部收单', '等待确定成功或失败', '调用外层第三方支付能力，本子图限定为同步返回确定结果，不模拟真实支付或资金动作。'),
      step('record', 'data', '关联支付流水', '支付服务自有状态', '表示支付服务需要关联外层支付库中的逻辑流水；写入顺序与一致性策略仍需核查。', 'store'),
      step('result', 'data', '返回支付结果', '交给订单服务汇总', '向订单服务提供本教学场景的确定支付结果，订单确认或补偿由外层订单服务承担。', 'end'),
    ],
    edges: [
      relation('receive', 'associate', '支付请求', '逻辑请求进入订单与渠道的关联职责。'),
      relation('associate', 'collect', '收单上下文', '关联后的请求交给外部收单职责，不指定供应商协议。'),
      relation('collect', 'record', '确定收单结果', '将本场景的确定结果关联到支付流水，不保证未核查的提交策略。', 'data'),
      relation('record', 'result', '支付流水与结论', '返回给订单服务的逻辑结论与本次支付状态关联。', 'data'),
    ],
  },
  'order-db': storageModule('订单库', '订单服务', '订单状态记录', '订单服务自有状态', '承载本示意中的待支付与确定结果等逻辑订单状态；实际字段、状态机和存储结构尚未核查。'),
  'inventory-db': storageModule('库存库', '库存服务', '库存状态记录', '库存与预留的逻辑数据', '承载库存服务拥有的逻辑库存状态；库存数量、预留表示和并发更新方式均需要按真实系统核查。'),
  'payment-db': storageModule('支付库', '支付服务', '支付流水记录', '支付服务自有流水', '承载支付服务拥有的逻辑流水及确定结果；不指定流水编号、金额字段或实际存储结构。'),
  'payment-provider': {
    label: '第三方支付',
    scope: '外部渠道内部完全是教学拆解，只沿用立即返回确定结果的场景，不代表供应商实现。',
    groupLabels: ['渠道接入', '抽象收单处理', '确定结果'],
    nodes: [
      step('receive', 'entry', '接收收单请求', '来自外层支付服务', '表示外部能力接收逻辑收单请求的边界，不指定供应商、接口或认证方式。', 'start'),
      step('interpret', 'business', '解读收单意图', '识别本次请求的处理目标', '为教学解释把请求接入与处理目标拆开；不推断任何真实渠道的内部结构。'),
      step('collect', 'business', '形成收单结论', '成功或失败的抽象能力', '仅代表外部能力给出确定结果的职责，不展开资金路径、清算、风控或真实执行细节。'),
      step('result', 'data', '返回确定结果', '交给外层支付服务', '本教学场景立即返回明确成功或失败。异步、处理中、超时和回调不在此图范围内。', 'end'),
    ],
    edges: [
      relation('receive', 'interpret', '逻辑收单请求', '请求在示意中的职责间传递，不对应供应商组件调用。'),
      relation('interpret', 'collect', '收单处理目标', '连接抽象请求与抽象处理能力，不代表实际内部业务流程。'),
      relation('collect', 'result', '明确成功或失败', '保留外层示例限定的确定结果，不引入未展示的支付状态。'),
    ],
  },
  'event-bus': {
    label: '事件总线',
    scope: '仅展示订单确认事件的异步传递能力，不指定消息产品、持久化或具体投递保证。',
    groupLabels: ['事件接入', '传递协调', '事件与结果'],
    nodes: [
      step('receive', 'entry', '接收订单确认事件', '来自已确认的订单', '承接外层订单服务确认订单后发布的事件；发布可靠性策略尚未指定。', 'start'),
      step('prepare', 'business', '组织传递内容', '保留事件所表达的业务信息', '表示事件总线整理传递内容的抽象职责，不指定消息格式、分区或主题结构。'),
      step('pending', 'data', '关联待传递事件', '逻辑上的待交付内容', '这是教学模型中的待传递集合，不承诺实际持久化、复制、缓存或保存期限。', 'store'),
      step('deliver', 'business', '交给消费方', '关联外层通知服务', '表示外层通知服务异步消费订单确认事件。订阅方式、确认、重试和重复投递均需核查。'),
      step('result', 'data', '呈现传递进展', '解释本次逻辑交付结果', '用于理解传递是否到达下一职责，不承诺具体确认机制或恰好一次处理保证。', 'end'),
    ],
    edges: [
      relation('receive', 'prepare', '订单确认事件', '限定为已确认订单的事件，不把失败订单也视为确认事件。'),
      relation('prepare', 'pending', '待传递内容', '关联抽象事件内容，不意味着采用某种队列或持久化方式。', 'data'),
      relation('pending', 'deliver', '异步交付', '展示事件进入消费方的方向，时机与投递保证仍待核查。', 'data'),
      relation('deliver', 'result', '传递进展', '说明抽象职责的处理进展，不指定消息确认或业务提交协议。'),
    ],
  },
  notify: {
    label: '通知服务',
    scope: '仅展示消费事件与发送通知的逻辑职责，渠道、重试和去重机制尚未指定。',
    groupLabels: ['事件消费', '通知组织与发送', '处理结果'],
    nodes: [
      step('receive', 'entry', '接收订单确认事件', '来自外层事件总线', '承接异步消费的订单确认事件，不假定订阅产品或具体投递语义。', 'start'),
      step('content', 'business', '组织通知内容', '把事件解释为用户消息', '表示通知服务把订单确认信息组织为可发送内容，不指定真实模板或个人信息字段。'),
      step('target', 'business', '关联发送目标', '用户与通知方式的逻辑关联', '解释通知发送需要关联目标和方式，实际渠道、偏好与联系方式来源尚未核查。'),
      step('send', 'business', '发送用户通知', '执行抽象通知职责', '表示异步发送消息的能力，本原型不发送真实通知，也不指定供应商或接口。'),
      step('result', 'data', '返回处理结果', '解释本次发送结论', '表示本次发送的逻辑结论，不承诺实际记录存储、重试或去重方案。', 'end'),
    ],
    edges: [
      relation('receive', 'content', '订单确认信息', '消费事件后组织相关通知内容，不把异步通知视为下单同步响应。'),
      relation('content', 'target', '待发送内容', '关联内容与目标的职责，不代表真实个人数据处理实现。'),
      relation('target', 'send', '通知目标与方式', '抽象发送信息交给通知职责，具体渠道仍待确认。'),
      relation('send', 'result', '发送结论', '返回逻辑发送结果，不把重试或投递保证添加为既有能力。'),
    ],
  },
};

/** Creates independent teaching data; no internal relationship is a confirmed implementation fact. */
export function createModuleDocument(moduleId: string): DiagramDocument {
  if (!Object.hasOwn(definitions, moduleId)) throw new Error(`未知模块：${moduleId}`);
  const definition = definitions[moduleId]!;
  const prefix = (id: string) => `${moduleId}/${id}`;
  const groupIds: GroupId[] = ['entry', 'business', 'data'];
  return {
    schemaVersion: '2.0',
    id: `${moduleId}-details`,
    title: `${definition.label} · 内部职责教学示意`,
    description: `内部职责与连接均为教学假设，需依据真实源码或文档核查。${definition.scope}展示分组不表示实际部署边界，空间高度不表示执行顺序。`,
    view: { kind: 'overview', direction: 'RIGHT', theme: 'light' },
    nodes: definition.nodes.map(node => ({ ...node, id: prefix(node.id), evidenceStatus: 'assumed' })),
    edges: definition.edges.map((edge, i) => ({ ...edge, id: prefix(`link-${i + 1}`), source: prefix(edge.source), target: prefix(edge.target), directed: true, evidenceStatus: 'assumed' })),
    groups: groupIds.map((id, i) => ({ id, label: definition.groupLabels[i]!, details: '教学展示分组，职责拆解及边界仍需按真实系统核查。' })),
  };
}
