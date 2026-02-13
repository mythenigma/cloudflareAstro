# CloudflareAstro Blog

`article.maipdf.com` 的 Astro 多语言内容站，主要发布 MaiPDF / Maiimg 相关的使用指南与技术内容。

## 1. 项目定位

- 框架：Astro 5
- 部署：Cloudflare Workers
- 内容形态：Markdown/MDX 博客（多语言）
- 站点域名：`https://article.maipdf.com`

## 2. 快速开始

### 环境要求

- Node.js 18+
- npm 9+

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

默认地址：`http://localhost:4321`

## 3. 常用命令

```bash
# 完整构建（搜索索引 + 图片优化 + Astro build）
npm run build

# 快速构建（仅 Astro build）
npm run build:fast

# 预览（构建后通过 wrangler 本地预览）
npm run preview

# 部署到 Cloudflare
npm run deploy
```

## 4. 目录说明

```text
src/
  content/blog/            # 多语言文章内容
  components/              # 组件（含 SEO head）
  pages/                   # 页面入口
  middleware.ts            # URL 规范化、slug 重定向
  scripts/                 # 构建前脚本（搜索索引、图片优化）

public/                    # 静态资源（图片、字体等）
astro.config.mjs           # Astro 配置（site、sitemap、trailingSlash）
```

## 5. 发文流程

1. 在对应语言目录新建文章，如：`src/content/blog/en/xxx.md`
2. 填写 frontmatter（至少包含以下字段）：
   - `title`
   - `description`
   - `pubDate`
   - 可选：`heroImage`、`tags`、`updatedDate`、`noindex`
3. 优先使用无尾斜杠内链（如 `/blog/en/post-slug`）
4. 本地执行 `npm run build`，确认无错误
5. 提交并部署

## 6. SEO 与索引规则（重要）

- 站点 canonical 策略为 **无尾斜杠**（`trailingSlash: 'never'`）
- 运行时 URL 规范化在 `src/middleware.ts`
- sitemap 由 `@astrojs/sitemap` 自动生成
- 改动 slug 时请同步在 `src/middleware.ts` 增加 301 重定向，避免历史 URL 变 404

## 7. 维护建议

- 大批量新增/改名文章后，务必重新构建并提交新 sitemap
- 对测试或工具页面使用 `noindex`，避免污染索引
- 保持文章 frontmatter 结构一致，减少构建期问题

## 8. License

Internal project for MaiPDF / Maiimg content operations.
