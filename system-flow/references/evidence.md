# 来源取证与核验

从仓库或文档建模时读取本文件。校验器检查引用是否匹配；Agent 仍须阅读对应实现，核对职责、条件和调用方向。

## 建模步骤

1. 记录取证范围、Git HEAD 和 dirty 状态。只读检查仓库，保留已有改动；不要为绘图调用模型、支付、数据库或真实业务接口。
2. 阅读入口、调用点、被调用实现及关键条件。`confirmed` 表示已有静态依据，不能据此声称业务运行通过、已经部署或达到某项性能指标。找不到依据时使用 `assumed` 或 `planned` 并说明原因。
3. 为节点、关系、步骤及跨视图桥保留必要的 `sources`。填写仓库相对路径、可选起始行号和整个文件的 SHA-256；不要把代码片段、令牌或私有配置内容复制到模型。
4. 每个演示场景表达一条条件一致的路径。主场景说明成功前提；取消、超时、输入拒绝等互斥路径分为独立场景，不能拼成一次执行。依赖边和几何位置不能推导运行顺序。
5. 用 `--repo-root` 核验整个图集，并人工复核关键事实。发现漂移时重新阅读受影响源码、修订描述与行号后再更新摘要；不要只替换 hash 使检查变绿。

## 可选字段

```json
{
  "sourceRevision": {
    "commit": "0123456789abcdef0123456789abcdef01234567",
    "dirty": true
  },
  "sources": [{
    "path": "src/service.ts",
    "line": 12,
    "sha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
  }]
}
```

上面是字段说明片段，须放到相应对象中：`sourceRevision` 属于根或子图文档，`sources` 属于节点、边、步骤或桥。commit 为 40 或 64 位十六进制，sha256 为 64 位十六进制。dirty 可省略；Git 工作副本有改动时，`confirmed` 引用需要 sha256 固定实际文件内容。HEAD 不包含未提交修改。

普通文档目录可只核验文件，不声明 `sourceRevision`；如果声明修订，则必须能核对该目录自己的 Git HEAD。子图可独立声明修订，核验仍针对同一个 `--repo-root`，不支持一个图集混用多个来源仓库。

## 执行核验

```powershell
node "<skill-dir>/scripts/validate.mjs" "<work-dir>/system.diagram.json" --repo-root "<repository>" --strict-sources
node "<skill-dir>/scripts/generate.mjs" "<work-dir>/system.diagram.json" --renderer 3d --output "<work-dir>/system.html" --repo-root "<repository>" --strict-sources
```

- 未传 `--repo-root`：仅校验模型；`confirmed` 无来源会得到 `SOURCE_MISSING` 警告，旧图仍可生成。
- 传入 `--repo-root`：只读核对整个图集，包括未展示的子图、所有剖面、步骤及桥。检查普通文件、行号、可选 SHA-256、修订和 dirty 状态；默认证据问题为警告。
- 再加 `--strict-sources`：证据问题升级为错误，退出码 2，拒绝生成或覆盖 HTML。严格模式必须同时指定 `--repo-root`。
- 路径只允许仓库内相对引用，支持中文、空格及反斜杠。拒绝 `..`、绝对路径、盘符/数据流、实际目标越界的符号链接或 junction、非普通文件。单文件最多 8 MiB，去重后的累计读取最多 64 MiB。

`validate` 输出 `checks.sources.performed/passed`、`failures.sources` 和 `sourceAudit.checked`；其中 `matched` 表示该引用的文件、行号和已声明摘要检查通过。默认警告下 `valid:true` 只表示允许继续，须另看来源结果。未执行的来源检查不能写成通过。生成日志也包含诊断与来源报告，不将本地仓库绝对目录嵌入 HTML。

可以从非严格核验的 `sourceAudit.checked[].sha256` 获取实际摘要；先核对对应源码和描述，再将摘要写回 sources，最后重新严格检查。不要把第一次检查得到的摘要当作描述正确的证明。

## 事实与运行边界

存在的路径、有效行号和一致摘要仍可能指向无关代码。人工审阅至少核对关键主路径、互斥失败路径和规划能力；单独记录结构校验、静态事实复核、离线浏览器、模拟降级与实际业务验证。软件 WebGL 和窄视口模拟不能写成硬件 GPU 或实体手机测试。

核验是一次工作副本观察，没有锁定仓库。多人同时修改时，保留捕获时间、HEAD、dirty 和引用文件摘要，并在交付前复核；报告发生的漂移和修正。图数据和职责全文会随 HTML 分享，引用完整不代表内容已脱敏。
