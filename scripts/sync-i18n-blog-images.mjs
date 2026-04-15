import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const BLOG_ROOT = path.join(process.cwd(), "src", "content", "blog");
const LANGS = ["fr", "de", "ja", "ko", "es"];
const SOURCE_LANG = "en";

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

function shouldSyncHero(sourceHero, targetHero) {
  if (!sourceHero) return false;
  if (!targetHero) return true;
  return sourceHero !== targetHero;
}

function rewriteFrontmatter(raw, newData) {
  const parsed = matter(raw);
  const next = matter.stringify(parsed.content, { ...parsed.data, ...newData });
  return next;
}

function replaceInlineImage(raw, fromUrl, toUrl) {
  if (!fromUrl || !toUrl || fromUrl === toUrl) return raw;
  if (!raw.includes(fromUrl)) return raw;
  return raw.split(fromUrl).join(toUrl);
}

async function main() {
  const enDir = path.join(BLOG_ROOT, SOURCE_LANG);
  const enEntries = await fs.readdir(enDir, { withFileTypes: true });
  const enSlugs = enEntries
    .filter((e) => e.isFile() && /\.(md|mdx)$/i.test(e.name))
    .map((e) => e.name.replace(/\.(md|mdx)$/i, ""))
    .sort();

  let touched = 0;

  for (const slug of enSlugs) {
    const enPost = await readPost(SOURCE_LANG, slug);
    if (!enPost) continue;
    const sourceHero = enPost.parsed.data?.heroImage;

    for (const lang of LANGS) {
      const target = await readPost(lang, slug);
      if (!target) continue;

      const targetHero = target.parsed.data?.heroImage;
      if (!shouldSyncHero(sourceHero, targetHero)) continue;

      let nextRaw = target.raw;
      // Sync heroImage in frontmatter.
      nextRaw = rewriteFrontmatter(nextRaw, { heroImage: sourceHero });
      // If the old hero image URL was used inline, update it too.
      nextRaw = replaceInlineImage(nextRaw, targetHero, sourceHero);

      if (nextRaw !== target.raw) {
        await fs.writeFile(target.filePath, nextRaw, "utf8");
        touched += 1;
      }
    }
  }

  console.log(`Synced heroImage for ${touched} FR/DE posts that have EN equivalents.`);
}

await main();

