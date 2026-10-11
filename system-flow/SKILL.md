---
name: system-flow
description: Create reviewable software flowcharts, architecture diagrams, or interactive 3D sandboxes with component interiors and authored walkthroughs from repository evidence, design documents, or a supplied system description.
---

# System Flow

为软件系统生成可审阅的流程、架构图与通用 3D 沙盘。Agent 核查仓库、文档或用户描述并建立图数据，本地程序负责校验和渲染；生成的关系不能作为系统事实的证据。交付可继续修改的 `.diagram.json` 与自包含离线 HTML。默认生成 2D，适合完整条件、分组、审核修订和 SVG/PNG/JPEG；用户要求空间交互、组件剖面或步骤演示时使用 3D。用户明确要求 Mermaid 时遵循其格式。

## 路由与工作流

1. 确定读者、范围、图类型和交付格式。2D 多分支、跨组连接或长调用链先试 RIGHT；短线性流程先试 DOWN，实际检查后调整方向或拆图。Before/After 用两份同粒度文档。需要 3D 时读取 [空间建模与验收](references/spatial.md)，保留用户的 2D/3D 选择；未指定时使用 2D。合理可推断时直接推进。
2. 阅读 [建模规则](references/modeling.md) 和 [JSON Schema](references/diagram-schema.json)。先提取节点、边界、方向、条件及来源；保持稳定 ID。区分 confirmed、assumed、planned。
3. 在用户工作目录保存图数据。根图与全部内部图合计最多 100 节点、300 边；根图最多 20 组与两层分组，3D 内部图只支持一层剖面。超限拆图。保留必要分支、回路和条件，details 保存长说明；不手写坐标。内部组件、形态与演示步骤必须来自证据或明确假设，不能由名称关键词、依赖边或几何反推真实职责及执行顺序。
4. 运行校验并修复具体诊断，再生成 HTML。不要直接修改打包资源或为每张图重写模板。
5. 按 [视觉与验收规则](references/visual-guidelines.md) 实际打开、操作并检查截图。2D 核对文字、连线、颜色和方向，文字必须先测量再布局，不能缩小字号掩盖溢出；3D 按 [空间验收](references/spatial.md#实际验收) 检查对象选择、独立剖面、职责和演示前后步进，名牌可用短名，完整职责须可展开。生成成功不等于视觉通过。
6. 交付文件链接、范围、关键假设和实际验证结果。按要求从 2D HTML 导出全展开静态图并独立打开验证；3D HTML 不支持静态导出，需由同一 JSON 生成 2D HTML 后导出。保留 JSON 方便重生成。2D 详情板可审核修订，3D 的结构与文案修改通过 JSON 重生成。

## 可执行入口

将下列 `<skill-dir>` 替换为当前 Skill 的绝对安装目录；输入/输出使用用户工作目录的绝对路径，可含中文和空格。

```powershell
node "<skill-dir>/scripts/validate.mjs" "<work-dir>/diagram.json"
node "<skill-dir>/scripts/generate.mjs" "<work-dir>/diagram.json" --output "<work-dir>/diagram.html"
node "<skill-dir>/scripts/generate.mjs" "<work-dir>/diagram.json" --renderer 3d --output "<work-dir>/diagram-3d.html"

# 仅自动静态导出需要安装这些依赖
npm ci --prefix "<skill-dir>"
node "<skill-dir>/node_modules/playwright/cli.js" install chromium

node "<skill-dir>/scripts/export.mjs" "<work-dir>/diagram.html" --format svg --output "<work-dir>/diagram.svg"
node "<skill-dir>/scripts/export.mjs" "<work-dir>/diagram.html" --format png --scale 2 --output "<work-dir>/diagram.png"
node "<skill-dir>/scripts/export.mjs" "<work-dir>/diagram.html" --format jpg --background "#FFFFFF" --output "<work-dir>/diagram.jpg"
```

`--renderer 2d|3d` 默认为 `2d`。两种生成只需 Node.js 24.x 与完整 Skill 目录，不依赖仓库源码、根 node_modules 或原型目录。HTML 已内嵌渲染运行时；3D 使用 WebGL，不可用时保留可访问的对象与步骤说明。覆盖已有文件要显式加 `--overwrite`；退出码：0 成功、2 输入/参数错误、1 依赖/渲染失败。详细参数使用各入口的 `--help`。

## 阅读者审核与修订

在 **2D HTML** 中点选节点、连接或分组，打开 **编辑详情**。节点可改名称、摘要、说明、类型、所属分组、信息依据和来源；连接可改两端、条件/标签、说明、类型、方向、信息依据和来源；分组可改名称、说明与父分组。保存时验证整个模型并重新布局。诊断未通过时保留原图和表单；可撤销/重做已接受的修改。底栏 **横向 / 纵向** 可切换全图布局，方向选择同样可撤销/重做；下载的图数据、修订 HTML 和静态 SVG 使用所选方向。3D 提供选择、剖面、上下游和演示阅读，修改数据后重新生成。

核对后分别下载 **图数据** 和 **修订 HTML**；`file://` 不会写回原文件。自动导出 PNG/JPEG 时，以下载的修订 HTML 为输入。ID、对象增删和画布布局坐标不能从详情板修改，复杂结构变化仍修改 JSON 并重新运行校验/生成。人工修订图数据不等于更改真实系统；已证实、假设和规划状态仍需来源支持。

## 交付边界

- 两种 HTML 均内嵌数据、CSS 与 JS，不使用 CDN、网络字体、外部模型或服务端。2D 包含布局 Worker，file:// 下可缩放、平移、详情、高亮、折叠和审核修订；3D 内嵌 Three.js，支持旋转、缩放、聚焦、独立剖面和显式编排的演示。
- 节点以低饱和蓝、琥珀、紫、青绿、绿区分处理、判断、存储、外部、起止；普通连接按来源节点使用可辨别的多色调色板。可避障的多段路线绘成连续曲线，简单连接保持直线；不能安全平滑时保留明确的避障线段，不用短圆角掩盖绕行。异常与反馈保留语义色，关系仍用文字、箭头和线型表达。主路径有向连接可播放缓慢流向，支持暂停，并遵守系统减少动态效果偏好；这不表示实时运行。
- 2D 折叠不修改原图；不同条件不合并。2D 静态导出始终完整展开，不继承当前视角、选中态、工具栏或流向动画。3D 未配置内部图时只显示根图，未配置场景时隐藏演示入口；形态、位置、体积和播放路径不代表真实部署或实时流量。
- HTML 的 details 也会完整分享。只收录必要说明与引用，不包含凭证、真实用户记录或整份私有配置。
- 无法运行浏览器时继续交付可完成的 JSON/HTML，并明确视觉或导出未验证。
- 旧 v1 HTML/SVG 按语义人工重建模型，不承诺无损自动还原。`assets/legacy-template.html` 保留旧模板。
- 兼容入口 `python scripts/export_diagram.py` 保留 PNG/JPG 参数和覆盖行为；HTML 新增 Node/Playwright 依赖，旧 SVG 仍用 CairoSVG/Pillow。多 SVG 旧 HTML 要指定 `--svg-index`；旧 HTML 仅支持静态内联 SVG 的位图导出，不执行其页面脚本。
- 图模型表达软件组件、关系与运行路径；没有项目排期、任务进度或甘特图语义。
