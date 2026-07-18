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

## 5. 内容维护与数据来源（内容架构）

> 核心区分：内容按**类型**维护，而不是按板块。九个子板块只有两种内容类型。
> ⚠️ 本节是**已确定的决策**，但**尚未实施**——按路线图到对应阶段再接线。

### 两种内容类型

| 类型 | 形态 | 涉及子板块 | 存储方式 | 加一条新内容 = |
|---|---|---|---|---|
| **长文** | 有标题/正文/排版/目录的文章 | tech/writings、linguistics/analysis、（可能 music/critique） | **Content Collection + `.mdx`** | 新增一个 `.mdx` 文件并 push |
| **目录/清单** | 一行行条目：标题 + 链接/视频 + 日期 + 短说明 | music/solo、choir、casual-cover、linguistics/readings、tech/datasets | **数据源**：YAML 文件 *或* Google Sheet | 加一行数据（YAML 块 / 表格一行） |

### 解耦原则：页面渲染 ≠ 数据来源

清单类内容的**渲染模板**（卡片/列表样式）与**数据来源**（YAML / Google Sheet）是两层，可独立替换。先写一次模板，数据源随时可换、互不影响（与「Astro/Vercel 解耦」同理）。

### Google Sheet 方案的两条硬约束

1. **只能「构建时」读取，禁止浏览器实时 fetch。**
   - ❌ 浏览器实时读 Google：国内被墙 → 白屏；且违背全站"零额外 JS、飞快"的理念。
   - ✅ 构建时读：Vercel（国外）build 时读 Sheet，结果**烤进静态 HTML**；国内读者只拿静态页，根本不碰 Google。
2. **改完表格需触发一次重新构建**（`git push` 会自动触发部署，但编辑 Sheet 不会）。三种触发方式，由懒到勤：
   - 手动：Vercel **Deploy Hook**（一个 URL），改完点书签 → ~1 分钟更新。
   - 定时：Vercel Cron 每日自动 build。
   - 最丝滑：Sheet 内 **Apps Script** 监听编辑 → 自动 ping Deploy Hook → 改完约 1 分钟自动更新。

### YAML vs Google Sheet 取舍

| | **YAML**（仓库内） | **Google Sheet**（构建时读） |
|---|---|---|
| 加条目 | 复制 4 行块、改字、push | 表格加一行（手机可操作） |
| 设置成本 | 几乎为零 | 发布表格 + 配 Deploy Hook |
| 版本可追溯 | ✅ git 历史 | ❌ 无 |
| 更新延迟 | push 即触发 | 改完需触发 + build（~1 分钟） |
| 依赖 | 无 | 依赖 Google（仅构建时，国内读者无感） |

### 各板块采用方案（决定）

- **音乐 solo / choir / casual-cover** → **Google Sheet**（构建时读 + Apps Script 自动触发）。约定字段：`title / link / date / note`。
- **tech/writings、linguistics/analysis** → **MDX 长文**（需侧边目录、阅读进度条、自定义排版）。
- **tech/datasets、linguistics/readings** → 先用 **YAML** 起步（结构简单、零设置），将来嫌烦再无痛切到 Sheet（模板不变）。
- **music/critique** → 视长度定：短则归清单，长则用 MDX。

> 实施顺序：先放一篇**样板 MDX 长文**跑通长文流程（站主进行中）；Google Sheet 字段由站主先建好，待到对应阶段再接线渲染 + 触发器。

### 「最新内容」feed 架构（已实施）

三处 feed 共用一套数据形状 `FeedEntry`（`src/lib/feed.ts`）：

| 位置 | 取数 | 条数 |
|---|---|---|
| 板块首页 `/tech`、`/linguistics` | `getSectionEntries(slug, 10)` | 最新 10 条 |
| 首页「最近更新」 | `getLatestEntries(5)` | 三板块混合，最新 5 条 |
| `/music` 板块首页 | 不用 feed，沿用自己的演出卡片 UI | — |

- **适配器模式**：每个板块一个 adapter，把各自的原生数据源映射成 `FeedEntry`——`tech-content.ts`（读 `config/datasets.ts`）、`linguistics-content.ts`（读 `harryPotter` collection）、`music-content.ts`（读 Google Sheet）。**接一个新数据源 = 写一个 adapter，渲染层不动。**
- **music 只收 `past` 演出**：其 `date` 是演出日期而非发布日期，`upcoming`（未来日期）会永久霸占榜首。演出没有详情页，故链到 `/music/{category}`。
- **linguistics 只收正文章节**（`kind === 'chapter'`）：专栏引言 `series-intro` 与每本书的导读 `book-intro` 属于导言性质，是系列页的框架内容，不作为独立条目进 feed。
- Google Sheet 拉取失败时首页**降级为无 music 的 feed**（try/catch），不会让整个 build 挂掉。
- 子板块 chip 颜色来自 `site.ts` 里每个 `SubSection` 的 `color` 字段。

⚠️ **写文章时必填 frontmatter**：`harryPotter` collection 新增了 `date`（ISO，如 `"2026-07-18"`，**必填**，决定 feed 排序）、`blurb`、`tags`（feed 里显示的一句话简介与标签，用该文件自己的语言写）。en/zh 成对文件靠 `book` + `key` 配对成一条 feed 条目，所以**两个语言版本的 `date` 应保持一致**。

---

## 6. 品牌与设计资源

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

### 设计语言（阶段 1，迭代中）

> 站主参考 "quirky + technology" 风格（Squarespace Blueprint 样本 + givecard.com），整体走"略微怪趣 + 大字 + 纯色"路线。

- **整体基调**：浅色。Hero 区用淡紫背景（`--c-hero: #f1e9fb`）。
- **纯色，无渐变** ⚠️：全站**不使用任何渐变填充**，所有颜色为纯色（站主明确要求）。按钮、标签、语言键等均为品牌纯色。
- **字体策略（双语，均自托管、不走 Google CDN）**：
  - **显示/标签类**（`--font-display`，标题、导航、卡片标签、按钮、页脚板块名、大字 slogan）：拉丁用 **Unbounded**；中文用 **得意黑 Smiley Sans**（SIL OFL 1.1）。得意黑用 `cn-font-split` 分块子集，输出在 `public/fonts/smiley-sans/`（59 个 woff2 + `result.css`，按 unicode-range 仅加载页面用到的块），在 `BaseLayout` 的 `<head>` 里 `<link>` 引入。
  - **阅读/正文类**（`--font-sans`，正文、描述、子菜单、列表）：拉丁用 **Noto Sans**；中文用 **Noto Sans SC**（`@fontsource/noto-sans-sc`，400/700，按 unicode-range 分块）。
  - ⚠️ Hero 简介与板块卡片描述当前用的是 `--font-display`（站主早期要求），故中文版里这些**整段**会以得意黑（斜体 display）呈现，并会拉取较多字体块——若想更易读/更轻量，可把这两处改回 `--font-sans`。
- **大小写约定**：标题与多数文字**全小写**（呼应 logo）；仅 eyebrow 小标签（`SECTIONS`、`LATEST`）和大字 slogan 用大写。
- **板块命名玩法**：板块标题用 c→k 风格化（**te(k)h / linguisti(k)s / musi(k)**），介绍里用正确拼写加粗消歧（**tech** / **linguistics** / **music**）；URL slug 保持正确（`/tech` 等）。`site.ts` 里 `label`=风格化、`name`=正确拼写。
- **日期格式**：`YYYY Mon DD`，月份缩写，但 May/June/July 写全、9 月用 `Sept`（见 `site.ts` 的 `formatDate`）。
- **社交链接**：hero 按钮下方，圆角方形图标（`astro-icon` + `simple-icons`）；链接见 `site.ts` 的 `SOCIALS`，href 待填真实 URL。
- **大字 slogan**：Hero 下方一条超大 slogan（淡紫 `--c-slogan: #c2a6ea`），跑马灯**从右向左滚动**（`.marquee` / `@keyframes marquee`，34s，鼠标悬停暂停）。受 `prefers-reduced-motion` 控制，会为偏好减少动效的用户自动静止。
- **动效**：slogan 跑马灯已启用。其余动效（滚动淡入等）仍待规划。
- **插图规划**：Hero 配图与三张板块卡片**将来都换成 AI 手绘风背景插图**。当前 Hero 无配图占位；板块卡片为纯文字 + 顶部彩色边（已去掉早期的 emoji 图标）。
- **语言**：UI **英文优先**，导航栏含 `EN / 中` 语言切换（中文版"即将上线"，暂未接入 i18n）。

---

## 7. 开发路线图（循序渐进）

站主零基础，按阶段推进，每阶段都有可见成果：

- [x] **阶段 0：初始化**　检查 Node.js → `npm create astro` → 接入 logo/favicon → 本地跑通 ✅
- [ ] **阶段 1：骨架 + 普通文章**　三板块入口页 + 用纯 Markdown 发文章 → 部署到 Vercel 上线
- [ ] **阶段 2：MDX 设计元素**　设计并引入自定义组件（特殊标题、结论卡片等），丰富文章排版
- [ ] **阶段 3：交互 Demo**　实现余弦相似度 demo（优先纯浏览器 `transformers.js` 方案，免费 / 私密 / 自包含）

---

## 8. 常用命令

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

## 9. 待决 / 备忘

- **域名**：www.maikurokosmos.com
- **Vercel 国内访问**：可用性不稳定，可能被墙或变慢。若目标读者主要在国内，未来考虑同时部署 Cloudflare Pages 或迁移国内云。
- **交互组件框架**：React vs Svelte 未最终敲定，到阶段 3 按 demo 复杂度再选。
- **深色 / 浅色模式策略**：尚未设计，影响 logo 切换与配色，待阶段 1/2 规划。
- **字体**：`public/fonts/` 当前为空，是否使用自定义字体待定。
