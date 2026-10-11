# Skill Reuse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Implementation was authorized without commits; the subsequent v2.2.0 publication is separately authorized below.

**Goal:** 通过两个真实项目完整验收，并交付可核验来源和离线分层导航。

**Architecture:** 保留单图渲染器，以内嵌子图和显式桥组织导航；Node CLI 负责只读证据核验，浏览器仍离线运行。

**Tech Stack:** Node.js 24、TypeScript、JSON Schema/Ajv、Three.js、Playwright；不新增依赖。

**Spec:** ../specs/2026-10-11-skill-reuse-design.md

## Global Constraints

- 先完成两个真实项目的当前 Skill 基线，再实现功能。
- CiteRAG/Iteroom 只读；保留已有改动，不运行模型或业务请求。
- 旧图继续生成；每视图 100 节点/300 边、最多 20 子图和 4 层跳转、整体 2 MiB。
- 实现验收阶段不提交、不推送、不发布；验收生成物保存 ignored artifacts。

## Review Focus

- dirty 工作副本与 commit 的差异应由文件摘要揭示。
- Windows 中文路径、越界路径与符号链接不得绕过来源核验。
- 同名节点跨图应按 viewId 正确定位。
- 播放中导航与反向步进应清除前一个视图的状态。
- 旧例子与单独安装的 Skill 不依赖仓库源码。

## Tasks

### 1. 两个真实项目基线

- [x] 独立 Agent 使用旧 Skill 完成取证、JSON、HTML、离线浏览器检查与截图。
- [x] 独立复核主要源码事实、失败路径和引用摘要；保存可审阅报告。

### 2. 来源核验

Files: schema、`src/model/evidence.ts`、`src/cli/evidence.ts`、validate/generate CLI、对应 unit tests。

- [x] 测试缺少证据、不存在文件、越界、坏行号、摘要/修订漂移及严格失败保留输出；先确认失败。
- [x] 增加可选证据字段与只读核验；生成诊断可审阅 JSON。
- [x] 运行相关单元测试，并对真实项目图进行来源检查。

### 3. 分层导航

Files: schema、`src/model/navigation.ts`、validate、spatial scene/main/contracts、template/CSS、unit/browser tests。

- [x] 先测试有效多层图及父链、owner、重复、桥/步骤引用、每图限额的拒绝行为。
- [x] 实现导航索引、视图切换、面包屑、桥目标和跨视图演示，保持旧 World 接口。
- [x] 增加 `generate --view` 并验证二维导出输入的粒度。
- [x] 浏览器验证新交互、旧图、窄视口及 WebGL 降级。

### 4. 集成与交付

- [x] 对真实项目生成图补入证据摘要，按源码拆分至少一个真实分层导航案例并实际检查。
- [x] 更新 Skill、参考文档、README、版本和通用教学例子；保持发布包无私人数据。
- [x] typecheck、unit、build/check:build、browser、package/examples 检查。
- [x] 独立 review 并修复确定问题；交付链接、实测范围及未验证项。

## 实际完成与证据

- 121项单元检查通过；完整浏览器66项通过（6.2分钟）。
- 窄屏修复后，最终资源导航11项和旧3D10项通过；当前共69个不同浏览器用例均已覆盖，未重跑不受修复影响的2D用例。
- TypeScript、构建一致性22文件、5个示例和独立包23步通过；Skill quick_validate及2.2.0 ZIP逐文件检查通过。
- 真实项目功能与追加检查通过，详见 docs/acceptance/2026-10-11-real-projects.md；源码事实与运行范围分别记录。
- CiteRAG的11:15:48Z固定快照来源通过，随后并发修改被严格检查检测为20个摘要不匹配；当前来源不是全绿。Iteroom来源最终一致。
- 独立review发现并修复根连通性警告被子图警告取消、空view参数覆盖原HTML两项P2；真实截图发现的窄屏遮挡已补3项回归并修复。
- 实现验收时，产物保存在 ignored artifacts，改动尚未commit/push/publish。

## 后续发布授权

用户随后明确授权提交并推送到远程仓库，以及上传 v2.2.0 Skill ZIP 到发布页面。发布前重新核对提交范围、敏感信息、测试和 ZIP，同步推送 GitHub / Gitee，并在 GitHub Release 提供 ZIP 与 SHA-256 校验文件。
