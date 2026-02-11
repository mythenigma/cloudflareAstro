# SEO & Compliance Runbook (2026-02-11)

This runbook is for the **online legacy server** (outside this Astro repo), with focus on:
- SEO deindex for sensitive pages
- blocking risky “IP tracking / link tracking” associations
- reducing compliance and brand risk

## Scope

- `maipdf.cn/work.html`
- legacy pages/directories such as:
  - `covid19.html`, `covid19.php`
  - `qr/blog/jianshu/*.html`
  - legacy DRM knowledge pages in `read/`
  - pages/files with names containing `track`, `tracking`, `获取IP`, `追踪`

## Required actions

1. Remove public access to internal work logs
- Set `work.html` to internal-only access; if not possible, replace with 404 stub.
- Response requirements:
  - HTTP status `404`
  - `X-Robots-Tag: noindex, nofollow`
  - HTML `<meta name="robots" content="noindex, nofollow">`

2. Replace sensitive legacy pages with unified 404 noindex stub
- Keep URL path stable (do not redirect to random pages).
- Stub title should be neutral, e.g. `404 - Page Removed`.
- Include a safe destination link to `https://article.maipdf.com/blog`.

3. Remove/forbid third-party IP tracking and suspicious shortlink tools
- Disallow references and outbound links to:
  - `grabify`
  - `iplogger`
  - `whatstheirip`
- Also remove these from:
  - `canonical`
  - `og:*`
  - scripts, button links, comments

4. Neutralize product wording
- Chinese: prefer `打开统计` instead of “追踪记录/访问记录追踪/获取IP”.
- English: use `Visitor ID` wording, avoid “IP address as your watermark”.

5. Search engine hygiene
- Re-submit sitemap after deployment.
- In GSC, request removal for high-risk URLs if already indexed.

## Nginx example snippets

```nginx
# 1) Block /work.html by returning 404 + noindex
location = /work.html {
    add_header X-Robots-Tag "noindex, nofollow" always;
    return 404;
}

# 2) Block sensitive legacy routes
location ~* ^/(covid19(\.html|\.php)?|qr/blog/jianshu/|read/.*(drm|track|tracking).*)$ {
    add_header X-Robots-Tag "noindex, nofollow" always;
    return 404;
}

# 3) Block risky filename patterns
location ~* (track|tracking|获取IP|追踪) {
    add_header X-Robots-Tag "noindex, nofollow" always;
    return 404;
}
```

## 404 stub template

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex, nofollow">
  <title>404 - Page Removed</title>
</head>
<body>
  <h1>404 - Page Removed</h1>
  <p>This page has been removed due to compliance and safety policy.</p>
  <p><a href="https://article.maipdf.com/blog">Go to Blog</a></p>
</body>
</html>
```

## Post-deploy verification checklist

Run these checks against production:

```bash
curl -sI https://maipdf.cn/work.html
curl -sI https://maipdf.cn/covid19.html
curl -sI https://maipdf.cn/covid19.php
```

Expected:
- `HTTP/2 404`
- header contains `X-Robots-Tag: noindex, nofollow`

Content checks:

```bash
curl -sL https://maipdf.cn/work.html | rg -n "grabify|iplogger|whatstheirip|api/maipdfcn_generate.php|log.php\\?pic"
```

Expected:
- no matches

