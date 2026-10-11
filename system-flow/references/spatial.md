# 3D 沙盘建模与验收

需要空间交互、组件剖面或步骤演示时读取本文件。基础字段与事实状态仍遵循 [建模规则](modeling.md)，字段约束以 [JSON Schema](diagram-schema.json) 为准。

## 选择与生成

`generate.mjs --renderer 3d` 从同一份 `schemaVersion: "2.0"` 图数据生成自包含 HTML，Three.js、样式和数据都在文件内。默认 `--renderer 2d` 保持原有二维流程、编辑和静态导出。没有 `spatial` 的旧图也能生成 3D，总览只展示已提供的根节点和关系；不会补造内部组件或场景。

```powershell
node "<skill-dir>/scripts/validate.mjs" "<work-dir>/system.diagram.json"
node "<skill-dir>/scripts/generate.mjs" "<work-dir>/system.diagram.json" --renderer 3d --output "<work-dir>/system-3d.html"
```

无需安装 Three.js 或复制原型目录；完整 Skill 目录与 Node.js 24.x 即可生成。阅读 3D 场景需要浏览器 WebGL；WebGL 不可用时用对象列表、职责卡与演示文字阅读，空间控件会禁用。

## 可选 spatial 字段

根图的 `nodes`、`edges`、`groups` 和 `view` 继续表达基础图，2D 使用这些字段。`spatial` 的三个数组都可省略：

| 字段 | 内容与引用范围 |
| --- | --- |
| `interiors` | `[{ owner, nodes, edges }]`；owner 必须是根节点 ID，每个根节点至多一个内部图。内部 node/edge 使用基础节点、关系字段；端点只能引用当前内部图节点。 |
| `models` | `[{ nodeId, shape, color?, shortLabel? }]`；nodeId 可引用根或内部节点，至多配置一次。color 为 `#RGB` 或 `#RRGGBB`，shortLabel 为模型上的简短名牌。 |
| `scenarios` | `[{ id, label, steps }]`；每个场景显式提供有序步骤，步骤字段见下文。 |

单个视图的内部剖面只支持一层，深入组件使用下面的 navigation 子图。ID 无需 `/` 前缀：组件归属来自 `owner`，例如 `entry-handler` 可以属于 `document-worker`。每个视图的根图、内部节点与分组共用唯一 ID；边 ID 在该视图内唯一，跨视图可复用。场景 ID 唯一，步骤 ID 在各自场景内唯一。根边只引用本视图根节点，内部边只引用同一内部图节点；跨视图关联使用显式桥。

每个视图连同其内部图最多 100 节点、300 边；整个文件 2 MiB、每视图 20 组和两层分组与文本限额仍适用。内部节点的 groupId 可引用所属视图已有分组，内部图不另设 groups。完整内部说明也会嵌入 HTML，分享前检查敏感信息。

## 分层导航

在文档根级增加 `navigation`，将独立子图内嵌到同一个离线 HTML。子图是不同粒度的阅读视图，父子关系不自动成为运行依赖。

```json
{
  "navigation": {
    "views": [{
      "parentId": "system",
      "ownerId": "worker",
      "document": {
        "schemaVersion": "2.0", "id": "worker-components", "title": "处理组件",
        "view": { "kind": "overview", "direction": "RIGHT", "theme": "light" },
        "nodes": [{ "id": "entry", "kind": "process", "label": "入口", "evidenceStatus": "assumed" }],
        "edges": [], "groups": []
      }
    }],
    "bridges": [{
      "id": "reading-link",
      "source": { "viewId": "system", "nodeId": "worker" },
      "target": { "viewId": "worker-components", "nodeId": "entry" },
      "kind": "dependency", "directed": true,
      "label": "入口职责阅读关联", "evidenceStatus": "assumed"
    }]
  }
}
```

此片段须合并到 id 为 system、含 worker 节点的完整根文档。

- `views[]` 的 parentId 指根或已内嵌视图的 document.id，ownerId 指父视图根节点或内部组件。一个父节点至多对应一个子图；所有父链必须通向根，不能成环或孤立。
- 每个 document.id 唯一，最多 20 个子图、4 次父子跳转。节点 ID 只在本视图唯一，可以在不同视图复用；不能用同名 ID 暗示同一组件。
- 子图可包含基础字段、sourceRevision 和 spatial.interiors/models；不能再嵌入 navigation 或 scenarios。所有视图和场景统一定义在最外层根文档。
- `bridges` 两端必须带 viewId/nodeId，可指根节点或内部组件。同视图跨剖面的桥也允许；它们通过职责卡跳转，不加入单图上下游遍历或空间连线。kind/directed 与基础关系一致，来源和事实状态也需核对。
- 点选带子图的节点后“进入细节”；面包屑返回祖先，返回按钮回父图，总览按钮回根。进入图时保留俯视/立体偏好，清除上一个视图的选中、高亮、隔离和剖面状态。手动导航暂停演示；演示自动切图保持播放。旧图不出现分层入口。

完整教学例子：[文档处理分层图](../examples/document-pipeline-navigation.diagram.json)，包含总览、解析组件、切分细节、索引组件和跨层步骤。

## 模型形态

可选 shape：`service`、`shell`、`gateway`、`client`、`database`、`event`、`external`、`auth`、`decision`、`rack`、`adjust`、`link`、`channel`、`ledger`、`result`。

按明确的职责选择形态，例如已证实的存储用 database、判断用 decision、事件中介用 event。rack、adjust、link、channel、ledger 等教学形态也需要说明其指代，不能因为名称含有“支付”“库存”就自动赋予流水账本或预留职责。未显式配置时，阅读器只按基础 node.kind 使用通用形态；有内部图的根节点统一呈现剖面外壳，其 shell 形态优先于 models 的 shape，颜色与短名牌仍采用配置。

名牌用于辨认对象，完整职责放在 summary/details，并保留 evidenceStatus/sources。颜色辅助区分，不单独表示状态。模型大小、坐标、距离、端口和剖面均为展示几何，不是机器、容量、延迟、部署位置或代码层级的测量结果。

## 编排演示

每个 step 必填：`id`、`title`、`description`、`route: string[]`、`focusId`、`tone`；可选 `durationMs`、`viewId`、`evidenceStatus` 和 `sources`。未填写 durationMs 时每步 2200ms，未填写 viewId 时属于根视图。route 和 focusId 只引用指定视图中的根或内部节点；跨视图调用分为明确步骤并写明条件。tone 可选 `request|data|success|failure`。durationMs 必须是正安全整数，场景总时长也不能超过安全整数范围；最多 20 个场景、每场景 200 步、每步 route 300 项。

route 是作者编排的阅读路径，不能从 dependency 或 data 边自动推导执行顺序、响应方向、异常补偿或异步时机。若需要解释跨模块调用，先依据源码/文档确认，再在步骤 description 明确其条件与依据；教学假设应写明“假设”或“教学示意”。一个场景应是一条前提一致的路径，取消、超时和各输入拒绝等互斥情况分别编排。步骤不执行请求、不改业务数据，也不表示真实 trace。

```json
{
  "spatial": {
    "interiors": [{
      "owner": "document-worker",
      "nodes": [{ "id": "entry-handler", "kind": "process", "label": "入口处理", "details": "假设：校验导入请求并交给解析器。", "evidenceStatus": "assumed" }],
      "edges": []
    }],
    "models": [{ "nodeId": "entry-handler", "shape": "gateway", "shortLabel": "入口" }],
    "scenarios": [{
      "id": "import-walkthrough",
      "label": "导入示意",
      "steps": [{ "id": "enter-worker", "title": "进入处理模块", "description": "教学假设：展示入口组件的职责，不代表已运行的导入请求。", "route": ["document-worker", "entry-handler"], "focusId": "entry-handler", "tone": "request", "durationMs": 2200 }]
    }]
  }
}
```

此片段需要合并到包含根节点 `document-worker` 的完整图数据。参考 Skill 自带的 [微服务](../examples/microservices-spatial.diagram.json) 与 [文档处理](../examples/document-pipeline-spatial.diagram.json) 两份空间示例；它们的内部职责与步骤为显式教学假设。

## 阅读行为

拖动旋转、滚轮缩放、右键平移；顶部图标提供俯视、立体、复位和全屏。通过模型、名牌或按需对象列表选择模块与组件。多个外壳可以独立展开；选择内部组件时按 owner 自动展开所属模块。职责卡提供完整说明、聚焦、上下游、恢复关系和隔离。组件的上下游只遍历所属内部图，根模块只遍历根图。

有场景时显示演示选择器及播放、暂停、前后单步、重置；没有场景则隐藏演示区域。步骤根据 viewId 切图，再按 route/focusId 展开所需外壳。倒退按截止当前步骤、仅当前视图重建已展开集合，避免跨图同名 owner 误开；重置或切换场景回到总览。手动选择、查看职责/关联或导航会暂停，继续播放恢复原步骤。页面进入后台自动暂停。

对象列表和按钮可用键盘操作。焦点离开按钮、输入和选择控件时，Space 播放/暂停，左右键前后步进；Escape 先关闭对象列表，再返回总览。遵守系统减少动态效果设置。

## 实际验收

1. validate 后生成 HTML，断网通过 `file://` 打开；确认没有外部请求、脚本错误、缺失模型或固定示例文案。至少用两份不同系统数据验收，并用旧的无 spatial 图确认兼容。
2. 检查桌面和窄屏总览、旋转/缩放/复位。选择根模型与内部模型，核对对象列表、名牌、summary/details；特别检查不含 `/` 的内部 ID 仍展开正确 owner。
3. 独立展开多个模块，聚焦、上下游和隔离；确认内部高亮只包含当前内部图，职责卡可关闭、内容不越界。空间和大小只表示展示层次。
4. 每个已编排场景前后单步并重置、切换；核对 viewId、focus、route、剖面累计展开及倒退收拢。实际播放跨视图后手动检查暂停并继续；无场景图不出现空演示控件。
5. 有子图时检查逐层进入、父图/祖先/总览返回、桥职责和跳转、跨图同名 ID。连续切图后应只有一个画布，无重复监听、标签或几何资源累计；窄屏导航与职责可操作。
6. 检查键盘、减少动态效果及 WebGL 不可用的导航/职责/步骤降级。拦截 WebGL 创建只能证明模拟失败场景，窄屏视口模拟不能写成实体手机验证。
7. 从仓库外只复制完整 Skill 目录后生成 3D；独立复制验证不得依赖 src、prototypes 或仓库 node_modules。分别报告结构、来源、真实浏览器、模拟降级、离线和独立包结果，未执行的项目明确列出。

开发验收可通过 `window.__sandboxPrototype.state()` 观察对象、归属剖面和演示状态；此接口用于检查，不代表业务运行数据。

## 静态交付

3D HTML 不支持二维 SVG/PNG/JPEG 静态导出或详情编辑。需要 README 图片时，用同一 JSON 生成 2D HTML，再调用 export。默认输出根图；通过 `--view <document.id>` 提取一个已内嵌子图的完整二维图。其他剖面和统一场景保留在源 JSON 和完整 3D HTML。

```powershell
node "<skill-dir>/scripts/generate.mjs" "<work-dir>/system.diagram.json" --renderer 2d --output "<work-dir>/system-2d.html"
node "<skill-dir>/scripts/export.mjs" "<work-dir>/system-2d.html" --format svg --output "<work-dir>/system.svg"
node "<skill-dir>/scripts/generate.mjs" "<work-dir>/system.diagram.json" --view "worker-components" --renderer 2d --output "<work-dir>/worker-2d.html"
```

不能用场景截图冒充完整架构 SVG，也不能宣称 3D 支持旧二维的编辑、折叠和导出能力。
