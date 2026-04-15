import fs from "node:fs/promises";
import path from "node:path";
import { BLOG_GOVERNANCE_OVERRIDES } from "./blog-governance-config.mjs";
import {
  buildGovernanceRows,
  buildSummaryMarkdown,
  toCsv,
} from "./blog-governance-lib.mjs";

const auditCsvPath = path.join(process.cwd(), "BLOG-GOVERNANCE-CN-EN.csv");
const summaryPath = path.join(process.cwd(), "BLOG-GOVERNANCE-ROUND1.md");
const redirectModulePath = path.join(process.cwd(), "src", "data", "blog-legacy-redirects.mjs");

const rows = await buildGovernanceRows();

// Redirects should be generated from governance overrides directly so legacy sources
// can be removed from the content collection without losing the 301 map.
const redirects = Object.fromEntries(
  Object.entries(BLOG_GOVERNANCE_OVERRIDES)
    .filter(([_, override]) => override?.action === "301" && override?.targetSlug)
    .map(([key, override]) => [`/blog/${key}`, `/blog/${override.targetSlug}`]),
);

await fs.mkdir(path.dirname(redirectModulePath), { recursive: true });
await fs.writeFile(auditCsvPath, toCsv(rows), "utf8");
await fs.writeFile(summaryPath, buildSummaryMarkdown(rows), "utf8");
await fs.writeFile(
  redirectModulePath,
  `export const BLOG_LEGACY_REDIRECTS = ${JSON.stringify(redirects, null, 2)};\n`,
  "utf8",
);

console.log(`Wrote ${rows.length} governance rows to ${path.basename(auditCsvPath)}`);
console.log(`Wrote ${Object.keys(redirects).length} legacy redirects to src/data/blog-legacy-redirects.mjs`);
