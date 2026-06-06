# maikurokosmos —— 个人网站

> 本文件是项目的"宪法"，记录核心决策、架构和约定。
> 给未来的 Claude Code 会话和项目维护者参考。每当有重要决策变更时，请同步更新此文件。

---

## 1. 项目是什么

**maikurokosmos** 是站主的个人网站，整合三个相对独立的主题板块。站主前端零基础，因此工具链优先选择**简单、文档友好、能循序渐进**的方案。

### 三大板块

| 板块 | 路径 | 内容定位 | 内容形态 |
|---|---|---|---|
| **技术 (Tech)** | `/tech` | 研究类长文、数据库发布、可交互 demo app | Markdown/MDX 长文 + 交互组件 |
| **语言学 (Linguistics)** | `/linguistics` | 纯语言学的学习与研究，与科技无关。例如《哈利波特》翻译分析 | Markdown/MDX 长文 |
| **音乐 (Music)** | `/music` | 参与演出的视频 link、未来自制视频 | 嵌入式视频 + 简短说明 |

### 内容特点（影响架构选择）

- **经常发文章** → 写作流程必须无痛（Markdown 优先）。
- **排版需求高于纯 Markdown** → 文章中需要插入自定义设计元素（特殊标题、结论卡片、图表等），因此采用 **MDX**。
- **未来要做交互 demo** → 例如"余弦相似度"demo：用户提供参考文件 + 提问，计算问题与各文件的语义相似度，展示哪个文件最可能是 AI 实际依赖的来源。通过 Astro 的 **Islands 架构**实现。

---

## 2. 技术栈（已确定）

| 层 | 选择 | 理由 |
|---|---|---|
| **框架 / SSG** | **Astro** | 静态为主、加载快、SEO 好；MDX 支持自定义组件；Islands 架构按需引入交互；新手文档友好 |
| **内容写作** | **Markdown / MDX** | `.md` 写普通长文；`.mdx` 在文章中插入自定义组件 |
| **交互组件** | React 或 Svelte（按需，Astro Islands） | 只有交互"孤岛"加载 JS，不拖慢全站 |
| **部署** | **Vercel** | `git push` 自动部署；免费额度充足；Astro 支持一流；自带 serverless 函数（未来 demo 可用） |
| **代码托管** | **GitHub** | 已 `git init` |
| **编辑器** | VS Code（推荐） | — |

### 关键架构理念

```
整站 = 静态海洋（90%，Markdown/MDX，零 JS，飞快）
        + 设计元素（MDX 内嵌自定义组件）
        + 交互孤岛（React/Svelte 组件，按需加载，如余弦相似度 demo）
```

### 技术栈可替换性（解耦）

- **Astro**（"厨房"：把源码编译成静态网页）和 **Vercel**（"店面"：托管上线）是**完全解耦**的两层。
- 若未来 Vercel 国内访问不佳，可迁移到 **Cloudflare Pages / Netlify**，源码无需改动。

---

## 3. 目录结构

### 当前已有（站主手动创建）

```
maikurokosmos-website/
├── CLAUDE.md                       ← 本文件
├── .git/
└── public/                         ← 静态资源，原样复制，URL 稳定
    ├── favicon.ico                 ← RealFaviconGenerator 正版套件
    ├── favicon.svg
    ├── favicon-96x96.png
    ├── apple-touch-icon.png
    ├── web-app-manifest-192x192.png
    ├── web-app-manifest-512x512.png
    ├── site.webmanifest            ← theme_color 已设为品牌深紫 #210a35
    ├── fonts/                       (空)
    ├── icons/                       (空)
    └── images/
        ├── logo.svg                ← 浅色背景用（深紫文字 #210a35）
        └── logo-dark.svg           ← 深色背景用（白色文字）
```

### 规划中（Astro 初始化后形成）

```
src/
├── pages/                          ← 每个文件 = 一个路由页面
│   ├── index.astro                 ← 首页（三板块入口）
│   ├── tech/
│   ├── linguistics/
│   └── music/
├── content/                        ← 所有文章（Content Collections）
│   ├── tech/
│   ├── linguistics/
│   └── music/
├── components/                     ← 复用组件（Header、Footer、自定义设计元素…）
└── layouts/                        ← 页面骨架模板
astro.config.mjs                    ← Astro 配置
package.json
```

### `public/` vs `src/assets/` 约定

- **`public/`**：需要稳定 URL、不经构建处理的资源（favicon、manifest 等）。引用用绝对路径，如 `/images/logo.svg`。
- **`src/assets/`**（Astro 初始化后可选启用）：需要构建工具优化（压缩、加哈希、生成 WebP）的资源，在代码中 `import` 引用。
- 目前 logo 暂放 `public/images/`，用 `<img src="/images/logo.svg">` 引用即可。

---

## 4. 信息架构与页面布局（IA）

### 全局设计基调

- **默认主题**：**浅色**（白/浅背景 + 品牌紫点缀）。"科技感"通过紫色渐变、几何/网格元素、交互处微光实现，而非深色背景。
- **Logo 用法**：浅色主题用 `logo.svg`（深紫文字）。`logo-dark.svg` 暂留作未来深色模式用。
- **响应式**：桌面端完整导航；移动端（窄屏）收为**汉堡菜单 ☰**，展开后列出所有板块 + 子项。

### 顶部导航栏（Header）

- **左**：Logo（点击回首页）
- **右**：`About` ｜ `Tech ▾` ｜ `Linguistics ▾` ｜ `Music ▾`
- 每个大板块**文字本身可点** → 进入板块首页；悬停/点击展开下拉子菜单。

下拉子项：

| 板块 | 子板块 |
|---|---|
| **Tech** | Writings ｜ Datasets ｜ Tools and Demos |
| **Linguistics** | Readings ｜ Analysis |
| **Music** | Solo ｜ Choir ｜ Casual Cover ｜ Critique |

### 路由结构

```
/                          首页
/about                     关于我

/tech                      技术板块首页（介绍 3 个子板块）
/tech/writings             研究长文列表
/tech/datasets             数据库发布列表
/tech/tools-and-demos      工具与 Demo 列表

/linguistics               语言学板块首页（介绍 2 个子板块）
/linguistics/readings      Readings 列表
/linguistics/analysis      Analysis 列表

/music                     音乐板块首页（介绍 4 个子板块）
/music/solo                Solo
/music/choir               Choir
/music/casual-cover        Casual Cover
/music/critique            Critique
```

### 首页（从上往下滚动）

1. **Hero**：**左右分栏、非居中**。左侧 = 大 Logo + 关于我简短介绍（+ CTA 按钮）；右侧 = AI 生成配图（暂占位，生成好后替换）。
2. **三大板块介绍**：三张卡片，可点进各板块首页。
3. **最新动态**：三板块**混合**的卡片流，每张卡片标注**所属板块标签 + 日期**。
4. **Footer**。

### 板块首页（如 `/tech`）

- 介绍该板块下**每个子板块是什么** + 各自入口。

### 文章详情页

- **侧边目录（TOC）** + **顶部阅读进度条** + 正文。
- 文章头部带**板块标签**与**日期**。

---

## 5. 品牌与设计资源

### 品牌色（来自 logo）

| 变量含义 | 色值 | 用途 |
|---|---|---|
| 主色（深紫） | `#210a35` | logo 主体与文字、`theme_color`、深色背景 |
| 紫色 | `#881ed3` | 装饰、强调 |
| 粉紫 | `#e736d3` | 装饰、强调、高亮 |

> 建立设计系统 / CSS 变量时，以这三色为基础调色板。

### Logo 使用规则

- `logo.svg` 用于**浅色背景**，`logo-dark.svg` 用于**深色背景**。
- 两文件均已清理：去除 Illustrator 残留（`id="Layer_1"` 等），并加上 `role="img"` / `aria-label` / `<title>` 无障碍标签。
- ⚠️ **类名冲突注意**：两个 SVG 内部都用了 `.cls-1/.cls-2/.cls-3`。用 `<img>` 引用**无问题**；但若未来将两者**内联**到同一页面（如做成内联 SVG 以支持 CSS 控色 / hover 动画 / 主题切换），全局 `<style>` 会互相覆盖。届时需改为 `fill="..."` 行内属性或给类名加文件前缀。
- 未来优化方向：若想用 CSS 一键切换主题色，可将主体 fill 改为 `currentColor` 并内联引用（需框架支持，届时再做）。

### Favicon

- 由 RealFaviconGenerator 生成，套件完整且专业，**勿手动改动**。
- Astro 初始化后需在 `<head>` 中引用（favicon、apple-touch-icon、manifest 链接）。
- `apple-touch-icon.png` 已包含；`site.webmanifest` 的 `theme_color`/`background_color` 已设为 `#210a35`。

### `design/` 文件夹（暂未创建）

- 未来如需存放设计源文件，建议结构 `design/brand/`，目前**只需 brand 一类**，其余暂不需要。
- ⚠️ **PSD 等源文件勿直接提交 git**（二进制、体积大、无法 diff）。应放云盘，或用 Git LFS，或加入 `.gitignore`。仓库内只保留导出的 PNG/SVG 成品。

---

## 6. 开发路线图（循序渐进）

站主零基础，按阶段推进，每阶段都有可见成果：

- [ ] **阶段 0：初始化**　检查 Node.js → `npm create astro` → 接入 logo/favicon → 本地跑通
- [ ] **阶段 1：骨架 + 普通文章**　三板块入口页 + 用纯 Markdown 发文章 → 部署到 Vercel 上线
- [ ] **阶段 2：MDX 设计元素**　设计并引入自定义组件（特殊标题、结论卡片等），丰富文章排版
- [ ] **阶段 3：交互 Demo**　实现余弦相似度 demo（优先纯浏览器 `transformers.js` 方案，免费 / 私密 / 自包含）

---

## 7. 常用命令

> ⚠️ Astro 尚未初始化，以下命令在阶段 0 完成后补全。

```bash
# 安装依赖
# npm install

# 本地开发服务器
# npm run dev

# 构建生产版本
# npm run build

# 本地预览构建产物
# npm run preview
```

---

## 8. 待决 / 备忘

- **域名**：www.maikurokosmos.com
- **Vercel 国内访问**：可用性不稳定，可能被墙或变慢。若目标读者主要在国内，未来考虑同时部署 Cloudflare Pages 或迁移国内云。
- **交互组件框架**：React vs Svelte 未最终敲定，到阶段 3 按 demo 复杂度再选。
- **深色 / 浅色模式策略**：尚未设计，影响 logo 切换与配色，待阶段 1/2 规划。
- **字体**：`public/fonts/` 当前为空，是否使用自定义字体待定。
