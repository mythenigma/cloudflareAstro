import fs from "node:fs/promises";
import path from "node:path";
import {
  buildGovernanceRows,
  buildRedirectMap,
  buildSummaryMarkdown,
  toCsv,
} from "./blog-governance-lib.mjs";

const auditCsvPath = path.join(process.cwd(), "BLOG-GOVERNANCE-CN-EN.csv");
const summaryPath = path.join(process.cwd(), "BLOG-GOVERNANCE-ROUND1.md");
const redirectModulePath = path.join(process.cwd(), "src", "data", "blog-legacy-redirects.mjs");

const rows = await buildGovernanceRows();
const redirects = buildRedirectMap(rows);

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
