import { BLOG_GOVERNANCE_OVERRIDES } from "./blog-governance-config.mjs";
import { buildGovernanceRows } from "./blog-governance-lib.mjs";

const rows = await buildGovernanceRows();
const rowByKey = new Map(rows.map((row) => [row.key, row]));

const errors = [];

for (const row of rows) {
  if (!row.topicCluster) {
    errors.push(`${row.key}: missing topic_cluster`);
  }

  if (!row.action) {
    errors.push(`${row.key}: missing action`);
  }

  if (row.action === "301") {
    if (!row.targetSlug) {
      errors.push(`${row.key}: 301 rows must include target_slug`);
      continue;
    }

    const target = rowByKey.get(row.targetSlug);
    if (!target) {
      errors.push(`${row.key}: target_slug ${row.targetSlug} does not exist`);
      continue;
    }

    if (target.action === "301") {
      errors.push(`${row.key}: target_slug ${row.targetSlug} is also a 301 source`);
    }

    if (!/^noindex:\s*true\s*$/m.test(row.raw)) {
      errors.push(`${row.key}: 301 source must also carry frontmatter noindex: true`);
    }
  }

  if (row.action === "noindex" && !/^noindex:\s*true\s*$/m.test(row.raw)) {
    errors.push(`${row.key}: noindex row must carry frontmatter noindex: true`);
  }
}

for (const [key, override] of Object.entries(BLOG_GOVERNANCE_OVERRIDES)) {
  if (override.action === "301" && !override.targetSlug) {
    errors.push(`${key}: override with action=301 must include targetSlug`);
  }
}

if (errors.length > 0) {
  console.error("Blog governance validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const actionCounts = rows.reduce((acc, row) => {
  acc[row.action] = (acc[row.action] || 0) + 1;
  return acc;
}, {});

console.log("Blog governance validation passed.");
console.log(actionCounts);
