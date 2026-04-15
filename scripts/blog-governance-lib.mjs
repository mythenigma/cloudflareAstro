import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  BLOG_GOVERNANCE_OVERRIDES,
  BLOG_GOVERNANCE_SCOPE,
} from "./blog-governance-config.mjs";

const BLOG_ROOT = path.join(process.cwd(), "src", "content", "blog");

function escapeCsv(value) {
  const text = value == null ? "" : String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

async function walk(dir, rel = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath, relPath)));
      continue;
    }

    if (/\.(md|mdx)$/i.test(entry.name)) {
      files.push(relPath.replace(/\.(md|mdx)$/i, ""));
    }
  }

  return files;
}

function getCluster(slug, frontmatter, content) {
  const haystack = [
    slug,
    frontmatter.title || "",
    frontmatter.description || "",
    content.slice(0, 400),
  ]
    .join(" ")
    .toLowerCase();

  if (
    /^(_tmp_restore|first-post|second-post)$/.test(slug) ||
    haystack.includes("auto-generated from gsc 404 export")
  ) {
    return "stub-test";
  }

  if (/privnote|self-destruct|自毁|自删除/.test(haystack)) {
    return "privnote-self-destruct";
  }

  if (/maiimg|image|gallery|photo|图片|图库|影像|照片/.test(haystack)) {
    return "maiimg-image-sharing";
  }

  if (/portfolio|resume|作品集|简历|求职/.test(haystack)) {
    return "portfolio-resume";
  }

  if (/replace|modify-link|modify-pdf-links|same-link|替换|不换链接|同一链接/.test(haystack)) {
    return "replace-same-link";
  }

  if (/offline|离线|h5 generation|html package|html-package/.test(haystack)) {
    return "offline-drm";
  }

  if (/watermark|filigran|水印/.test(haystack)) {
    return "dynamic-watermark";
  }

  if (/qr|qrcode|二维码|wechat|whatsapp|scan/.test(haystack)) {
    return "qr-sharing";
  }

  if (/download|copy|print|forward|prevent|disable-printing|防下载|防转发|防打印|防复制/.test(haystack)) {
    return "prevent-download-forward-print";
  }

  if (/view-limit|open limit|access-control|access control|expiration|expiry|viewing-limits|访问次数|查看次数|过期|限次|访问控制|验证/.test(haystack)) {
    return "view-limit-access-control";
  }

  if (/viewer|preview|browsable|viewing|browser|在线预览|在线阅读|浏览器/.test(haystack)) {
    return "online-viewing-preview";
  }

  if (/enterprise|healthcare|corporate|team|training|sales|compliance|security architecture|document management|企业|团队|合规|医疗|培训/.test(haystack)) {
    return "enterprise-industry";
  }

  if (/security|secure|drm|protection|control|安全|保护/.test(haystack)) {
    return "pdf-security-control";
  }

  return "pdf-sharing-basic";
}

function needsTemplateUpgrade(frontmatter, content, action) {
  if (action !== "keep") return false;

  return Boolean(
    !frontmatter.updatedDate ||
      !frontmatter.heroImage ||
      frontmatter.showDefaultCta === undefined ||
      content.includes("Auto-generated from GSC 404 export") ||
      !/^#\s+/m.test(content) ||
      /^(_tmp_restore|first-post|second-post)$/i.test(frontmatter.slugForAudit || "")
  );
}

function getDefaultReason(cluster, frontmatter, content) {
  if (content.includes("Auto-generated from GSC 404 export")) {
    return "Historical GSC placeholder slug kept only until a stronger redirect decision exists.";
  }

  if (!frontmatter.updatedDate) {
    return `Keep for now inside ${cluster}; page still needs a latest-template pass before any merge decision.`;
  }

  return `Keep as the current representative page for ${cluster} unless later consolidation data says otherwise.`;
}

function getNotes(slug, frontmatter, content) {
  const notes = [];

  if (slug.includes("/")) notes.push("nested-slug");
  if (slug.includes("maiimg") || /maiimg|image|gallery|photo|图片|照片/i.test(frontmatter.title || "")) {
    notes.push("maiimg-scope");
  }
  if (content.includes("Auto-generated from GSC 404 export")) notes.push("gsc-placeholder-history");
  if (!frontmatter.updatedDate) notes.push("missing-updatedDate");
  if (!frontmatter.heroImage) notes.push("missing-heroImage");
  if (frontmatter.showDefaultCta === undefined) notes.push("missing-showDefaultCta");

  return notes;
}

export async function loadScopedBlogPosts() {
  const rows = [];

  for (const lang of BLOG_GOVERNANCE_SCOPE) {
    const langDir = path.join(BLOG_ROOT, lang);
    const slugs = (await walk(langDir)).sort();

    for (const slug of slugs) {
      const absolutePath = path.join(langDir, `${slug}.md`);
      const fallbackPath = path.join(langDir, `${slug}.mdx`);
      const filePath = await fs
        .access(absolutePath)
        .then(() => absolutePath)
        .catch(async () => {
          await fs.access(fallbackPath);
          return fallbackPath;
        });
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);

      rows.push({
        lang,
        slug,
        key: `${lang}/${slug}`,
        filePath,
        raw,
        frontmatter: parsed.data,
        content: parsed.content,
      });
    }
  }

  return rows;
}

export async function buildGovernanceRows() {
  const posts = await loadScopedBlogPosts();
  const postKeys = new Set(posts.map((post) => post.key));

  return posts.map((post) => {
    const override = BLOG_GOVERNANCE_OVERRIDES[post.key];
    const topicCluster = override?.topicCluster || getCluster(post.slug, post.frontmatter, post.content);
    const action = override?.action || "keep";
    const targetSlug = override?.targetSlug || "";
    const notes = [...new Set([...(getNotes(post.slug, post.frontmatter, post.content)), ...(override?.notes || [])])];
    const frontmatterForAudit = { ...post.frontmatter, slugForAudit: post.slug };
    const templateUpgrade =
      override?.templateUpgrade ?? needsTemplateUpgrade(frontmatterForAudit, post.content, action);
    const reason = override?.reason || getDefaultReason(topicCluster, post.frontmatter, post.content);

    return {
      lang: post.lang,
      slug: post.slug,
      key: post.key,
      filePath: post.filePath,
      topicCluster,
      action,
      targetSlug,
      reason,
      templateUpgrade,
      notes,
      exists: postKeys.has(post.key),
      frontmatter: post.frontmatter,
      raw: post.raw,
    };
  });
}

export function toCsv(rows) {
  const headers = [
    "lang",
    "slug",
    "topic_cluster",
    "action",
    "target_slug",
    "reason",
    "template_upgrade",
    "notes",
  ];

  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      [
        row.lang,
        row.slug,
        row.topicCluster,
        row.action,
        row.targetSlug,
        row.reason,
        row.templateUpgrade ? "yes" : "no",
        row.notes.join("|"),
      ]
        .map(escapeCsv)
        .join(","),
    ),
  ];

  return `${lines.join("\n")}\n`;
}

export function buildRedirectMap(rows) {
  const redirects = Object.fromEntries(
    rows
      .filter((row) => row.action === "301" && row.targetSlug)
      .map((row) => [`/blog/${row.key}`, `/blog/${row.targetSlug}`]),
  );

  return redirects;
}

export function buildSummaryMarkdown(rows) {
  const actionCounts = rows.reduce((acc, row) => {
    const key = `${row.lang}:${row.action}`;
    acc.set(key, (acc.get(key) || 0) + 1);
    return acc;
  }, new Map());

  const redirects = rows.filter((row) => row.action === "301");
  const noindex = rows.filter((row) => row.action === "noindex");

  const countLine = (lang, action) => `- ${lang} / ${action}: ${actionCounts.get(`${lang}:${action}`) || 0}`;

  return `# Blog Governance Round 1\n\n` +
    `Scope: English + Chinese blog posts only.\n\n` +
    `## Action Counts\n` +
    `${countLine("en", "keep")}\n` +
    `${countLine("en", "301")}\n` +
    `${countLine("en", "noindex")}\n` +
    `${countLine("cn", "keep")}\n` +
    `${countLine("cn", "301")}\n` +
    `${countLine("cn", "noindex")}\n\n` +
    `## Implemented 301 Sources\n` +
    `${redirects.map((row) => `- \`${row.key}\` -> \`${row.targetSlug}\``).join("\n")}\n\n` +
    `## Direct Noindex Sources\n` +
    `${noindex.map((row) => `- \`${row.key}\``).join("\n")}\n`;
}
