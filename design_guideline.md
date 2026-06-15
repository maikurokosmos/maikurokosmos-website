# maikurokosmos —— 设计规范 (Design Guideline)

> 本文件是网站的**视觉与版面规范**，配合根目录的 `CLAUDE.md`（项目宪法）使用。
> CLAUDE.md 管"项目是什么 / 架构决策"，本文件管"长什么样 / 怎么排版"。
> 改了设计决策请同步更新本文件。所有真实取值以 `src/styles/global.css` 为准。

---

## 0. 总体基调

- **浅色主题**为默认。科技感来自**纯色 + 几何 + 大字 + 微光**，不是深色背景。
- **纯色，禁用渐变** ⚠️：全站不使用任何 `gradient` 填充。所有颜色为品牌纯色。
- **风格关键词**：quirky（怪趣）+ technology。略夸张的大字、圆角、手绘元素。
- **全小写美学**：英文标题、导航、按钮等 UI 文字基本**全小写**（呼应 logo）；仅 eyebrow 小标签和大字 slogan 用大写。
- **板块命名玩法（c→k）**：英文板块标题风格化为 **te(k)h / linguisti(k)s / musi(k)**（`label`）；正确拼写 tech / linguistics / music（`name`，用于 chip/meta/a11y）；URL slug 保持正确。中文板块标题玩"动词+点+名词"：**搞点技术 / 学点语言 / 玩点音乐**（`label`）；规范名 技术 / 语言学 / 音乐（`name`）。

---

## 1. 颜色系统

定义在 `src/styles/global.css` 的 `:root`，**一律用 CSS 变量引用，不要硬编码**。

### 1.1 品牌色（来自 logo）

| 变量 | 值 | 用途 |
|---|---|---|
| `--c-ink` | `#210a35` | 主色·深紫。标题、深色区块（footer）、logo 文字、`theme_color`、日期块文字 |
| `--c-purple` | `#881ed3` | 紫。强调、链接、tech 板块强调色 |
| `--c-pink` | `#e736d3` | 粉紫。强调、高亮、linguistics 板块强调色、h2 手绘曲线 |

### 1.2 中性色

| 变量 | 值 | 用途 |
|---|---|---|
| `--c-bg` | `#ffffff` | 页面背景 |
| `--c-bg-alt` | `#faf7fd` | 交替区块的浅薰衣草底 |
| `--c-surface` | `#ffffff` | 卡片背景 |
| `--c-text` | `#2e2a38` | 正文 |
| `--c-muted` | `#6b6577` | 次要文字（地址、日期、说明、目录） |
| `--c-border` | `#ece8f3` | 描边 / 分隔线 |

### 1.3 效果色

| 变量 | 值 | 用途 |
|---|---|---|
| `--c-hero` | `#f1e9fb` | Hero / 板块 banner 浅紫背景；活动日期块背景 |
| `--c-slogan` | `#c2a6ea` | 首页大字 slogan 跑马灯 |

### 1.4 阴影（无渐变，仅柔和投影）

| 变量 | 值 |
|---|---|
| `--glow` | `0 8px 30px rgba(136,30,211,.18)`（紫色微光，按钮用） |
| `--shadow-sm` | `0 1px 3px rgba(33,10,53,.06), 0 1px 2px rgba(33,10,53,.04)` |
| `--shadow-md` | `0 10px 30px rgba(33,10,53,.08)`（卡片 hover） |

### 1.5 板块强调色（section accent）

定义在 `src/config/site.ts` 每个 section 的 `accent`：

| 板块 | accent |
|---|---|
| tech（技术） | `#881ed3` |
| linguistics（语言学） | `#e736d3` |
| music（音乐） | `#b42ed0` |

---

## 2. 布局

### 2.1 尺寸 token

| 变量 | 值 |
|---|---|
| `--container` | `1180px`（`.container` 居中最大宽，左右 padding 24px） |
| `--radius` | `16px`（卡片）｜ `--radius-sm` `10px` |
| `--header-h` | `80px`（吸顶导航高；锚点 `scroll-padding-top` 已对齐） |

- 区块用 `.section`（`padding-block: 72px`）；交替底色用 `.section--alt`（`--c-bg-alt`）。

### 2.2 页面骨架

- **Header**：吸顶、半透明毛玻璃、底部 1px 边。左 = logo（回首页）；右 = `about` ｜ 三大板块（文字可点进板块首页，悬停展开下拉）｜ **EN / 中 语言切换（圆角滑块）**。
- **Footer**：深色 `--c-ink` 背景，白字。小写 tagline `tech · linguistics · music`（中文 `技术 · 语言学 · 音乐`）；按板块分列子链接。
- **响应式**：`≤900px` 收为汉堡菜单；下拉变可展开手风琴。

### 2.3 首页（从上到下）

1. **Hero**：左右分栏（左文右图，非居中）。左 = 大标题（slogan 式）+ 简介 + 按钮(`about me`/`explore`) + 社交图标；右 = 插画（透明 PNG + 不规则圆角三角背景 `#e3d3f5`）。
2. **大字 slogan 跑马灯**：超大字（`--c-slogan`），从右向左滚动，hover 暂停，受 `prefers-reduced-motion` 控制。
3. **板块卡片**（3 张）：顶部彩色边 + 淡化插画背景 + chip + 标签。
4. **最新动态**：三板块混合列表，每条带板块 chip + 日期。
5. **Footer**。

### 2.4 板块首页（/tech /linguistics /music）

- 顶部 banner（`--c-hero` 底）：左 = 板块大标题 + lead（`板块名：blurb`）；右 = 板块插画。
- 下方子板块卡片。
- **music 例外**：banner 下先放**子板块卡片**（无小标题），再放**演出与活动列表**（见 §3.4）。

### 2.5 文章详情页

- 见 §4：`ArticleLayout` = 标题区 + 客户端侧边目录(TOC) + `.prose` 正文 +（HP 章节页另有顶部阅读进度条）。

---

## 3. 卡片与组件样式

### 3.1 基础卡片 `.card`

- 背景 `--c-surface`，1px `--c-border`，圆角 `--radius`(16px)，`--shadow-sm`。
- hover：`translateY(-4px)` + `--shadow-md` + 边框 `#e0d4f0`。

### 3.2 按钮

- `.btn`：`--font-display`、weight 700、圆角 999px、padding 12px 22px。
- `.btn--primary`：底 `--c-purple`、白字、`--glow`；hover 底 `#761ab8` + 上移 2px。
- `.btn--ghost`：白底、`--c-ink` 字、`--c-border` 边；hover 边变紫。
- **卡片里的 CTA（如"进入系列 →"）一律做成按钮样式**（圆角 + 边框 + padding），不要纯文字链接。

### 3.3 chip / 标签

- **chip**（板块名小药丸，如 `tech`）：纯色底（accent）、白字、圆角 999px、大写、`--font-display`。
- **tag**（关键词标签，如 `翻译`）：⚠️**用 `--font-sans`（不要 `--font-display`/得意黑，太粗不易读）**，weight 600，紫字、`--c-bg-alt` 底、`--c-border` 边、圆角 999px。

### 3.4 活动卡片（music events，参考 `MusicIndex.astro`）

- 整卡：白底、1px 边、圆角 18px、`--shadow-sm`、横向 flex。
- **左侧日期块**：背景 `--c-hero`(#f1e9fb)、文字 `--c-ink`，圆角 14px。三行：月（大写/中文"6月"）、日（大号 800）、年（`--c-muted`）。**月份与日同色（深紫），靠字号区分，不要给月份单独配色**。
- 中间：分类标签（见 tag 规范，`--font-sans`）+ 时间 + 标题 + 场馆名（粗）+ 地址（`--c-muted`）+ 简介（`--c-muted`）。
- **右侧**：按钮式"查看详情"（`event_link`）；**有视频时显示缩略图**（YouTube 取 `img.youtube.com/vi/<id>/hqdefault.jpg`，带 ▶ 遮罩，点开看视频）。
- **即将/往期 切换**：圆角滑块（pill toggle），激活态填 accent。即将按日期正序，往期按日期倒序，每页 10 + "加载更多"。

### 3.5 语言切换 / 手风琴

- 语言切换：圆角 pill，激活 `--c-purple` 白字；`中` 链到 `/zh/` 同名页。
- 手风琴（书目）：原生 `<details>`（零 JS），右侧 `+`/`−`。列表项标题前加文档小图标表示"可点击的页面"，**不要右侧箭头**。

---

## 4. 文档 / 文章格式（Markdown & MDX）

### 4.1 何时用 md / mdx

- `.md`：纯文字长文。
- `.mdx`：需要自定义组件（特殊标题、对译、卡片等）。两者可混用，列表/详情页代码不变。
- ⚠️ **MDX 属性值里禁止 ASCII 直引号 `"`**（会截断属性）；要引号用全角 `""` 或方括号 `「」`，或 `prop={'...'}`。

### 4.2 文章布局 `ArticleLayout.astro`

- frontmatter：`layout`（套此布局）、`title`、`eyebrow`、`date`、`description`。
- 正文别写一级标题 `#`（标题交给 `title`，目录从 `##` 起；`.prose` 已隐藏正文首个 H1）。
- **侧边目录 TOC**：客户端扫描 `.prose h2/h3`（普通 `##` 和自定义 `<Heading>` 都收），自动补 id，无标题则隐藏。

### 4.3 正文排版 `.prose`（global.css）

- 字号 1.05rem、行高 1.85；`h2` 1.5rem、`h3` 1.2rem。
- 引用块：左 3px `--c-purple` 边 + `--c-bg-alt` 底，圆角右侧。
- 行内代码：`--c-bg-alt` 底；代码块：`--c-ink` 底浅字。
- 链接：紫色下划线，hover 粉。

### 4.4 MDX 组件库（`src/components/mdx/`）

| 组件 | 用途 | 关键样式 |
|---|---|---|
| `<Callout type title>` | 提示/结论卡片 | `type`：note(紫) / tip(粉) / warning(#e0a500) / conclusion(ink 边 + `--c-hero` 底)；标题 `--font-display` |
| `<Figure src alt caption>` | 图 + 图注 | 圆角 12px + 边；图注居中 `--c-muted` |
| `<Heading level icon curve>` | 装饰标题 | 开头小 icon（默认手绘四角星 `/icons/star-4.svg`，紫色）+ 文字 + **紧贴的手绘曲线**（h2 粉 / h3 紫）；`icon`/`curve` 可换图片路径；自动进 TOC |
| `<Compare>` `<Row note>` `<Cell>` `<Hl c>` | 双栏对译 + 高亮 + 批注 | 见下 |

**`<Compare>` 配色方案（站主指定，已设为默认）**：

- 表头 `<Compare labelLeft labelRight>`：得意黑、0.95rem、700；左栏头底 `#f1e9fb`、右栏头底 `#f2f2f4`。
- **左栏格底 `#f6f0fc`（淡紫）、右栏格底 `#f5f5f7`（淡灰）**。
- **高亮 `<Hl>` 默认黄色 `#fbef9d`**；可选 `c="1..4"` 给不同色，左右用同 `c` 值即同色，把"对应部分"连起来（c1 `#fcdcef` / c2 `#d9ecfd` / c3 `#ddf6d4` / c4 `#e7d6fb`）。
- **批注 `note`**：占整行合并，琥珀底 `#fdf6e3`，前缀 `※`（`#c79114`）。

用法示例：
```mdx
<Compare labelLeft="中文" labelRight="English">
  <Row note="批注……">
    <Cell>左栏，<Hl>高亮</Hl></Cell>
    <Cell>right, <Hl>highlight</Hl></Cell>
  </Row>
</Compare>
```

> ⚠️ 已知待调：`<Heading>` 组件目前文字上方有多余竖向空隙（曲线贴文字 OK，但整体标题块偏高），下个会话需修 `.deco-h` 的行盒高度。

---

## 5. 中英文版面与字体规范（详细）

### 5.1 字体来源（全部自托管，禁用 Google CDN —— 为国内访问）

| 角色 | 拉丁 | 中文 | 来源 |
|---|---|---|---|
| **显示/标题**（`--font-display`） | **Unbounded**（几何 quirky） | **得意黑 Smiley Sans**（SIL OFL） | Unbounded：`@fontsource-variable/unbounded`；得意黑：`cn-font-split` 分块子集，放 `public/fonts/smiley-sans/`，在 `BaseLayout` 的 `<head>` `<link>` 引入 |
| **阅读/正文**（`--font-sans`） | **Noto Sans** | **Noto Sans SC** | `@fontsource-variable/noto-sans` + `@fontsource/noto-sans-sc`（400/500/700，unicode-range 分块） |

字体变量（global.css）：
```css
--font-sans: 'Noto Sans Variable', 'Noto Sans SC', system-ui, …, 'PingFang SC', 'Microsoft YaHei', sans-serif;
--font-display: 'Unbounded Variable', 'Smiley Sans Oblique', var(--font-sans);
```

### 5.2 英文版面（`/`，`html lang="en"`）

- **标题/显示**：拉丁走 **Unbounded**（`--font-display` 第一顺位）。
- **正文**：**Noto Sans**。
- **大小写**：UI / 标题**全小写**；eyebrow 小标签（`SECTIONS`/`LATEST`）和大字 slogan **大写**。
- **板块名**：te(k)h / linguisti(k)s / musi(k)。
- **日期**：`YYYY Mon DD`，月份缩写，但 May/June/July 写全、9 月用 `Sept`（见 `site.ts` `formatDate`）。
- **站名**：`maikurokosmos`（浏览器标题、简介品牌名）。
- **社交**：github / linkedin / x / youtube。

### 5.3 中文版面（`/zh/`，`html lang="zh-CN"`）

- ⚠️ **不混排两套字体**：中文页 `--font-display` 覆盖为 **得意黑优先、去掉 Unbounded** —— **标题里的英文也走得意黑**，保证中英一致：
  ```css
  html[lang="zh-CN"] { --font-display: 'Smiley Sans Oblique', var(--font-sans); }
  ```
- **正文**：拉丁 Noto Sans、中文 **Noto Sans SC**；⚠️ **Noto Sans SC 400 偏细发虚，中文正文统一 500（Medium）**：
  ```css
  html[lang="zh-CN"] body { font-weight: 500; }
  html[lang="zh-CN"] .footer-col ul a { font-weight: 500; }
  ```
- **大标题**：得意黑标点偏紧，`html[lang="zh-CN"] .hero-title { line-height: 1.3; }`。
- **板块名**：搞点技术 / 学点语言 / 玩点音乐。
- **日期**：`YYYY年M月D日`。
- **站名**：`开启微观宇宙`（浏览器标题 + 简介品牌名；中文版 logo 待做）。
- **社交**：github / linkedin / **微博**(`simple-icons:sinaweibo`) / **bilibili**。
- **标点/引号**：正文用全角中文标点；冒号分隔用全角 `：`（如板块 lead）。

### 5.4 i18n 机制（实现备忘）

- 路由：`/` = 英文（无前缀）、`/zh/` = 中文（Astro `i18n`，`prefixDefaultLocale: false`）。
- 文案：固定 UI 串在 `src/i18n/ui.ts`（`{ en, zh }`）；板块/子板块名与 blurb 在 `site.ts`（`label/labelZh`、`name/nameZh`、`blurb/blurbZh`）。
- 工具：`src/i18n/utils.ts`（`getLangFromUrl` / `useTranslations` / `localizedHref` / `switchLocalePath`）。
- 组件从 URL 自判语言；每个页面在 `/` 和 `/zh/` 各有一个**薄壳**，渲染同一个语言感知组件。
- 加内容时**中英各填一份**（如 `*-en.md` / `*-zh.md`；sheet 的 `*_en` / `*_zh` 列）。

---

## 6. 内容来源（与本规范相关的部分）

- **长文**（tech/writings、linguistics/analysis、music/critique）→ MDX 内容集合 + `ArticleLayout`。
- **清单/目录**（music solo/choir/casual-cover、readings、datasets）→ 数据源（YAML 或 **Google Sheet 构建时读取**）。
- **音乐活动** → Google Sheet（公开发布的 CSV，`papaparse` 解析），列：`type, category, date, time, title_en/zh, event_link, event_location_en/zh, event_address_en/zh, video, description_en/zh, md_name_en/zh`；改表自动同步用 **ISR**（构建时/服务端拉取，国内读者仍拿静态页）。

---

> 详细业务/架构决策见 `CLAUDE.md`。本文件聚焦视觉与版面，新会话维护设计时以此为准。
