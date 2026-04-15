import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_ROOT = path.join(process.cwd(), "src", "content", "blog");
const SOURCE_LANG = "en";
const TARGET_LANGS = ["fr", "de", "ja", "ko", "es"];

async function readPost(lang, slug) {
  const base = path.join(BLOG_ROOT, lang, `${slug}`);
  const candidates = [`${base}.md`, `${base}.mdx`];
  for (const filePath of candidates) {
    try {
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);
      return { filePath, raw, parsed };
    } catch {
      // ignore
    }
  }
  return null;
}

function collectLocalImageUrls(markdown) {
  const urls = [];

  // Markdown images: ![alt](url "title")
  // Capture only local absolute-path urls (start with /) and stop at whitespace or ')'
  const mdImg = /!\[[^\]]*?\]\((\/[^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
  for (const match of markdown.matchAll(mdImg)) {
    urls.push(match[1]);
  }

  // HTML <img src="/...">
  const htmlImg = /<img\b[^>]*?\bsrc=["'](\/[^"']+)["'][^>]*>/gi;
  for (const match of markdown.matchAll(htmlImg)) {
    urls.push(match[1]);
  }

  return urls;
}

function replaceAll(raw, fromUrl, toUrl) {
  if (!fromUrl || !toUrl || fromUrl === toUrl) return raw;
  if (!raw.includes(fromUrl)) return raw;
  return raw.split(fromUrl).join(toUrl);
}

function syncInlineImages(targetRaw, sourceUrls, targetUrls) {
  // Map by index: targetUrls[i] -> sourceUrls[i]
  const pairs = [];
  const max = Math.min(sourceUrls.length, targetUrls.length);

  for (let i = 0; i < max; i += 1) {
    const fromUrl = targetUrls[i];
    const toUrl = sourceUrls[i];
    if (!fromUrl || !toUrl) continue;
    if (fromUrl === toUrl) continue;
    pairs.push([fromUrl, toUrl]);
  }

  // Apply replacements in order; de-dupe exact same fromUrl
  const seenFrom = new Set();
  let next = targetRaw;
  for (const [fromUrl, toUrl] of pairs) {
    if (seenFrom.has(fromUrl)) continue;
    seenFrom.add(fromUrl);
    next = replaceAll(next, fromUrl, toUrl);
  }

  return { nextRaw: next, mappedCount: pairs.length, sourceCount: sourceUrls.length, targetCount: targetUrls.length };
}

async function main() {
  const enDir = path.join(BLOG_ROOT, SOURCE_LANG);
  const enEntries = await fs.readdir(enDir, { withFileTypes: true });
  const enSlugs = enEntries
    .filter((e) => e.isFile() && /\.(md|mdx)$/i.test(e.name))
    .map((e) => e.name.replace(/\.(md|mdx)$/i, ""))
    .sort();

  const stats = Object.fromEntries(TARGET_LANGS.map((lang) => [lang, { touched: 0, mapped: 0, skippedMismatch: 0 }]));

  for (const slug of enSlugs) {
    const source = await readPost(SOURCE_LANG, slug);
    if (!source) continue;

    const sourceUrls = collectLocalImageUrls(source.parsed.content);
    // If EN has no images, we still allow wiping? No — skip to avoid accidental removal.
    if (sourceUrls.length === 0) continue;

    for (const lang of TARGET_LANGS) {
      const target = await readPost(lang, slug);
      if (!target) continue;

      const targetUrls = collectLocalImageUrls(target.parsed.content);
      if (targetUrls.length === 0) continue;

      // Guardrail: if target has wildly different number of images, skip (likely different page template)
      const ratio = targetUrls.length / sourceUrls.length;
      if (ratio < 0.5 || ratio > 2) {
        stats[lang].skippedMismatch += 1;
        continue;
      }

      const { nextRaw, mappedCount } = syncInlineImages(target.raw, sourceUrls, targetUrls);
      if (nextRaw !== target.raw) {
        await fs.writeFile(target.filePath, nextRaw, "utf8");
        stats[lang].touched += 1;
        stats[lang].mapped += mappedCount;
      }
    }
  }

  for (const lang of TARGET_LANGS) {
    const s = stats[lang];
    console.log(
      `Synced inline local images for ${lang}: touched=${s.touched}, mapped=${s.mapped}, skippedMismatch=${s.skippedMismatch}`,
    );
  }
}

await main();

