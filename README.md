<div align="center">

# System Flow

**把软件系统的结构与运行路径，画成可核对、可修改的流程图。**

从代码、文档或系统描述提取节点与关系，生成可离线阅读的 2D 图或 3D 沙盘，以及适合放进 README、文档和汇报中的二维静态图。

![Node.js 24](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![ELK.js](https://img.shields.io/badge/Layout-ELK.js-6554C0) ![Playwright](https://img.shields.io/badge/Export-Playwright-45BA4B?logo=playwright&logoColor=white)

[效果预览](#效果预览) · [核心能力](#核心能力) · [快速开始](#快速开始) · [安装 Skill](#安装-skill) · [下载 Skill ZIP](https://github.com/JX05120LLL/System-Flow/releases/latest)

</div>

## 项目简介

System Flow 是一个面向**软件架构与运行流程**的本地绘图 Skill。Agent 先核对事实和来源，再把组件、调用、数据流、判断与分组写入 `.diagram.json`；程序负责校验、布局和渲染。默认二维图适合完整流程、审核修订和静态导出；通用三维沙盘支持空间阅读、组件剖面与显式编排的步骤演示。它适合解释“系统由什么组成、请求如何流转、模块如何协作”，不以项目排期或甘特图为目标。

每张图保留可继续修改的源数据与单文件交互 HTML，二维图按需导出 SVG / PNG / JPEG。阅读 HTML 不需要账号、服务器或网络；两种生成所需的运行时均包含在 `system-flow/` 子目录中，三维 HTML 已内嵌 Three.js。

## 效果预览

下面的录屏展示微服务三维场景、内部组件剖面、职责卡与下单步骤播放。点击可查看原始 GIF。

[![System Flow 三维微服务沙盘、组件剖面与下单步骤演示](images/示例.gif)](images/示例.gif)

通用 3D 沙盘从 `.diagram.json` 生成。可选 `spatial` 字段提供单层内部组件、模型形态与有序步骤；点击模型或通过对象列表可展开剖面、聚焦、检查职责和上下游，演示支持暂停、前后单步与重置。

内置 [微服务](system-flow/examples/microservices-spatial.diagram.json) 和 [文档处理](system-flow/examples/document-pipeline-spatial.diagram.json) 两份图数据，可分别生成 2D 与 3D。内部职责和演示步骤均为明确的教学假设，需要按实际系统核对；空间位置、模型体积和播放路径不代表真实部署、容量或实时 trace。操作与验收见 [3D 建模说明](system-flow/references/spatial.md)。

## 核心能力

| 能力 | 说明 |
| --- | --- |
| 二维布局 | 先测量文字，再用 ELK.js 布局；复杂架构可横向，简单流程可纵向，并可在画布上手动切换方向。 |
| 二维关系 | 节点与连线按语义使用克制的多色系；简单连线为直线，适合平滑的避障路径使用连续曲线，箭头与标签保留方向和条件。 |
| 二维阅读 | 缩放、平移、适应画布、节点和连接详情、上下游高亮、两层分组折叠；主路径可显示缓慢流向，也可暂停。 |
| 二维审核 | 点击已有节点、连接或分组，在详情板修改名称、说明、来源、关系端点与条件等字段；校验通过后重新布局，支持撤销和重做。 |
| 通用 3D | 单文件空间沙盘，可选内部剖面、明确的模型形态与编排演示；对象列表、职责说明、聚焦、上下游、隔离及 WebGL 失败时的文字阅读。 |
| 离线交付 | HTML 将图数据、样式和脚本封装在单文件中；静态 SVG 完整展开，PNG/JPEG 可由本地 Chromium 导出。 |

2D 详情板编辑的是**图的描述**，不会修改真实系统代码；增删对象或修改 ID 仍应编辑原始 JSON，3D 内容通过 JSON 重生成。二维审核后使用“下载图数据”和“下载修订 HTML”保存结果，`file://` 页面不会自动覆盖磁盘上的原文件。动效与演示只辅助阅读，不表示实时监控；二维静态导出不含动效、当前缩放或选中状态。

## 工作流程

```mermaid
flowchart LR
    A[代码 / 文档 / 系统描述] --> B[Agent 核对事实与来源]
    B --> C[可修改的 .diagram.json]
    C --> D[校验、文字测量与布局]
    D --> E[2D 单文件交互 HTML]
    E --> F[按需导出 SVG / PNG / JPEG]
    E --> G[人工审核并下载修订文件]
    C --> H[3D 单文件沙盘与编排演示]
```

Agent 负责建立有来源的图数据；本地程序负责校验与生成。图中的“已证实、假设、规划”状态仍需由读者依据来源审核。

## 技术栈

| 环节 | 技术 |
| --- | --- |
| 模型校验 | JSON Schema、Ajv |
| 布局与渲染 | 2D：ELK.js、SVG / CSS、d3-zoom；3D：Three.js 与本地空间布局 |
| 单文件构建 | TypeScript、esbuild |
| 浏览器验证与位图导出 | Playwright、Chromium |

## 项目结构

```text
system-flow/        可独立安装的 Skill、已构建运行时和导出脚本
  examples/         微服务、文档处理两份可复用图数据
  references/       建模、空间扩展与视觉验收说明
src/                模型、投影、测量、布局、2D/3D 阅读器与 CLI 源码
scripts/            构建、示例检查、独立包验证与 ZIP 打包
images/             README 演示 GIF
tests/              单元测试、浏览器回归与测试输入
```

## 快速开始

生成环境为 **Node.js 24.x**。克隆仓库或解压发布 ZIP 后，在包含 `system-flow/` 的目录运行；无需安装开发依赖即可校验并生成示例：

```bash
node system-flow/scripts/validate.mjs system-flow/examples/microservices-spatial.diagram.json
node system-flow/scripts/generate.mjs system-flow/examples/microservices-spatial.diagram.json --output output/microservices-2d.html
node system-flow/scripts/generate.mjs system-flow/examples/microservices-spatial.diagram.json --renderer 3d --output output/microservices-3d.html
node system-flow/scripts/generate.mjs system-flow/examples/document-pipeline-spatial.diagram.json --renderer 3d --output output/document-pipeline-3d.html
```

`--renderer 2d|3d` 默认为 `2d`。在浏览器中直接打开相应 HTML，即可离线阅读。3D 需要 WebGL，不可用时保留对象列表与职责/步骤文字；无 `spatial` 的图也可生成 3D 根图。自动导出静态图使用 2D HTML，先在 Skill 子目录安装 Playwright 和 Chromium：

```bash
npm ci --prefix system-flow
node system-flow/node_modules/playwright/cli.js install chromium
node system-flow/scripts/export.mjs output/microservices-2d.html --format svg --output output/microservices.svg
node system-flow/scripts/export.mjs output/microservices-2d.html --format png --scale 2 --output output/microservices.png
node system-flow/scripts/export.mjs output/microservices-2d.html --format jpg --background "#FFFFFF" --output output/microservices.jpg
```

生成与导出默认不覆盖已有文件，确需替换时添加 `--overwrite`。2D 浏览器工具栏可直接下载 SVG；PNG/JPEG 的 CLI 导出需要本地 Chromium。3D HTML 静态导出会报不支持；用同一 JSON 生成 `--renderer 2d` 后导出根图。更多字段、条件和分组规则见[建模说明](system-flow/references/modeling.md)，空间扩展见 [3D 说明](system-flow/references/spatial.md)。

## 安装 Skill

1. 从 [GitHub Releases](https://github.com/JX05120LLL/System-Flow/releases/latest) 下载 `system-flow-v2.1.0.zip` 与 `SHA256SUMS.txt`，或直接使用仓库中的 [`system-flow/`](system-flow/) 目录。
2. 解压后将完整的 `system-flow/` 复制到编程工具的 Skills 目录，保持目录名为 `system-flow`。以 Codex 为例，个人安装路径为 `~/.agents/skills/system-flow/`，项目安装路径为 `<项目>/.agents/skills/system-flow/`，见 [OpenAI 官方安装说明](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills)。其他支持 `SKILL.md` 的工具按各自配置选择目录。
3. 保留 `SKILL.md`、`LICENSE`、`agents/`、`assets/`、`references/`、`examples/`、`scripts/`、`package.json` 与锁文件。安装 Node.js 24.x 后即可生成；自动静态导出需在复制后的目录执行 `npm ci` 并安装 Chromium。

展示名和触发名为 **System Flow / `system-flow`**。ZIP 包含已构建的 2D/3D 运行时和示例数据，生成不依赖仓库源码或开发环境。

可这样向 Agent 提出任务：

```text
使用 $system-flow，核对这个仓库的主要模块和调用关系，生成架构总览及关键请求流程。
区分已证实、假设和规划，保留重要条件、回路、分组边界与来源。
交付可修改的 .diagram.json、离线交互 HTML 和 README 可嵌入的 SVG，
实际打开检查文字、连线和交互，并标明尚待人工核对的地方。
```

完整使用说明与约束见 [SKILL.md](system-flow/SKILL.md)。

需要三维时可明确提出：

```text
使用 $system-flow，为这个系统生成通用 3D 沙盘。核对模块及内部组件职责和来源，
按明确证据或教学假设编排请求演示，交付 .diagram.json 与离线 3D HTML。
实际检查独立剖面、上下游、前后单步、键盘操作与断网阅读，说明未验证项。
```

## 开发检查

修改 TypeScript 源码时，在仓库根目录安装开发依赖、重新构建并检查生成物：

```bash
npm ci
npm ci --prefix system-flow
npm run typecheck
npm run test:unit
npm run build
npm run check:build
npm run test:browser
npm run examples:check
npm run test:package
npm run package:skill
```

浏览器检查前运行 `node system-flow/node_modules/playwright/cli.js install chromium`。`examples:check` 检查内置示例的生成与导出；`test:package` 从独立复制的 Skill 目录检查 2D 生成/导出和 3D 离线运行。`package:skill` 生成发布 ZIP 与校验信息，交付包不包含本地依赖、浏览器缓存或测试产物。二维静态导出和三维交互应分别验收，生成成功后仍需实际打开检查。

## 更多文档与限制

- [Skill 使用说明](system-flow/SKILL.md)：生成、交互审核、静态导出与交付约束。
- [微服务图数据](system-flow/examples/microservices-spatial.diagram.json)：模块、内部组件与下单步骤教学示例。
- [文档处理图数据](system-flow/examples/document-pipeline-spatial.diagram.json)：第二种系统的空间建模教学示例。
- [建模说明](system-flow/references/modeling.md)：字段、条件、分组与事实状态。
- [3D 建模与验收](system-flow/references/spatial.md)：单层内部组件、形态、步骤、离线与降级检查。

自动布局无法保证任意复杂图都没有交叉；生成后仍需检查事实、文字、方向和布局。旧 v1 HTML / SVG 可使用兼容入口导出位图，但不能无损转换为可编辑图数据；详细限制见 [SKILL.md](system-flow/SKILL.md)。

## 开源许可证

本项目的原创内容采用 [MIT License](LICENSE)。独立复制 `system-flow/` Skill 时，请一并保留其中的 [LICENSE](system-flow/LICENSE)；所含第三方组件仍遵循各自的许可证，详见[第三方声明](system-flow/THIRD_PARTY_NOTICES.md)。
