# maikurokosmos

站主的个人网站，整合三个相对独立的主题板块：**技术 (Tech)**、**语言学 (Linguistics)**、**音乐 (Music)**。

- 框架：[Astro](https://astro.build)（静态为主 + 按需交互的 Islands 架构）
- 内容：Markdown / MDX
- 部署：Vercel
- 站点：www.maikurokosmos.com

> 项目的核心决策、架构与约定记录在 [`CLAUDE.md`](./CLAUDE.md)，改动前请先阅读。

## 本地开发

所有命令在项目根目录运行：

| 命令 | 作用 |
| :--- | :--- |
| `npm install` | 安装依赖 |
| `npm run dev` | 启动本地开发服务器（`localhost:4321`） |
| `npm run build` | 构建生产版本到 `./dist/` |
| `npm run preview` | 本地预览构建产物 |

## 目录结构

```
public/        静态资源（favicon、logo、manifest），URL 稳定
src/
├── pages/     每个文件 = 一个路由页面
├── layouts/   页面骨架模板
├── components/复用组件（Header、Footer 等）
├── config/    站点配置（导航 / 板块数据）
└── styles/    全局样式与设计系统
```
