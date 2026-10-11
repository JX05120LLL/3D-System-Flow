# 真实项目验收、来源核验与分层导航

## 目标和顺序

用户已批准按建议优化：先用两个真实项目完整验收当前 Skill，再补来源核验与分层导航。当前基线为 `0e42355`，工作区初始干净。本次不提交、不推送、不发布。

1. 独立 Agent 仅凭复制的完整 Skill，对只读 CiteRAG、Iteroom 建模、生成并检查浏览器。
2. 另一 Agent 对照源码复核关键事实，记录失败与修正、HEAD、dirty 和引用文件摘要。实际验收产物保存在 `artifacts/acceptance/`，不将其他项目源码或私有配置放入发布包。
3. 完成基线后实现下面两项，并以真实项目产物和通用回归检验。

## 来源核验

- 保留 `sources: [{path,line?}]`，增加可选文件 `sha256`。文档增加可选 `sourceRevision: {commit,dirty?}`；步骤和跨视图关系也能记录 `evidenceStatus/sources`。
- 结构校验对无来源的 `confirmed` 信息给出警告，旧数据仍可生成。
- `validate --repo-root <path> [--strict-sources]`、`generate --repo-root <path> [--strict-sources]` 只读核对引用文件、行号、可选内容摘要与 Git 修订。拒绝目录越界、符号链接越界和非普通文件；核验有明确文件大小上限，不输出源码内容。
- 默认将证据问题作为警告，严格模式将其升级为阻止生成的错误。参数错误和严格失败沿用退出码 2；失败不覆盖原 HTML。
- 核验整个文档及所有子图，JSON 报告明确所做检查。路径、行号或摘要一致仍不证明调用语义正确；源文件的 dirty 状态和工作副本摘要优先用于识别漂移。

## 分层导航

选择内嵌独立子图；沿用每张图现有单层剖面，切换时释放旧 World 并重建。

```text
navigation.views[] = { parentId, ownerId, document }
navigation.bridges[] = {
  id, source: {viewId,nodeId}, target: {viewId,nodeId},
  kind, directed, label?, details?, evidenceStatus?, sources?
}
```

- 根和各子图 `document.id` 唯一。各视图节点 ID 在本视图内唯一；跨视图 ID 可复用，桥引用须带视图 ID。
- 子图 document 包含基础图、sourceRevision 及可选 interiors/models；不递归嵌入 navigation。统一演示定义在根 `spatial.scenarios`，步骤可指定 `viewId`，缺省根图。
- 最多 20 个子图、4 层父子跳转；每视图仍为合计 100 节点/300 边，整个输入仍不超过 2 MiB。
- parentId/ownerId 必须存在，每个父视图节点只映射一个子图；父链必须连到根，不得循环。
- 点选模块按需显示“进入细节”；面包屑返回任一祖先，提供返回父图和总览。手动导航暂停演示；前后步进按步骤视图切换，切场景返回根图，保留平面/立体偏好并清除无效选择、高亮、剖面与路径。
- 桥在职责中显示真实关联，点选可进入目标视图并聚焦。桥不加入单图上下游遍历，不绘制跨图空间连线，避免把不同粒度视图误认为一个执行图。
- `generate --view <document.id>` 可提取指定子图并生成 2D/3D；二维静态导出仍针对一张完整图。所有 HTML 离线自包含。

## 兼容与验证

保留 Skill 名 `system-flow`、schemaVersion `2.0` 和旧图行为；新增可选字段需要新版运行时。增加功能后更新包版本及文档，不新增运行依赖。

验证来源缺失、坏行号、摘要/修订漂移、越界及符号链接；验证导航重复、父链、owner、桥、步骤引用与每图限额。浏览器检查跨视图前后步进、暂停、返回、桥跳转、重复节点 ID、连续切换、窄视口和 WebGL 降级。最后运行类型、单元、构建一致性、浏览器与独立包检查。
