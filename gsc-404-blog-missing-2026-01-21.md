# GSC 404 (Blog) Missing URLs — 2026-01-21

Source CSV:
- `/Users/joehuang/Downloads/article.maipdf.com-Coverage-Drilldown-2026-01-21/Table.csv`

Repo blog root used for existence check:
- `src/content/blog/` (matches `/<blog>/<lang>/<slug>` against `<lang>/<slug>.md|mdx`)

## Summary

- Total rows in CSV: **303**
- URLs under `/blog/`: **298**
- Non-blog URLs (not under `/blog/`): **5**
- Blog URLs present in repo (matched): **264**
- Blog URLs missing in repo (no matching file): **16**
- Blog URLs ambiguous (path not in `/blog/<lang>/<slug>` form): **18**

> Notes:
> - “Missing” here means: `src/content/blog/<lang>/<slug>.md|mdx` does not exist.
> - Many missing URLs are **language mismatch**: the slug exists in other language folders, but not in the requested one.

## Missing blog URLs (16)

| URL | Reason |
|---|---|
| `https://article.maipdf.com/blog/en/maiimg-education-training-image-sharing` | exists in other langs: cn, es |
| `https://article.maipdf.com/blog/ja/enterprise-pdf-document-management-guide` | exists in other langs: cn, de, fr, ko |
| `https://article.maipdf.com/blog/ja/enterprise-pdf-encryption-traceability` | exists in other langs: cn, de, en, es |
| `https://article.maipdf.com/blog/fr/pdf-online-viewing-without-download` | exists in other langs: cn, de, en, es, ja |
| `https://article.maipdf.com/blog/de/pdf-security-best-practices-complete-guide-document-protection` | exists at blog root: `pdf-security-best-practices-complete-guide-document-protection.md` |
| `https://article.maipdf.com/blog/es/enterprise-pdf-document-management-guide` | exists in other langs: cn, de, fr, ko |
| `https://article.maipdf.com/blog/en/enterprise-pdf-document-management-guide` | exists in other langs: cn, de, fr, ko |
| `https://article.maipdf.com/blog/de/social-media-image-gallery-sharing-guide` | exists in other langs: cn, en, es, fr, ko |
| `https://article.maipdf.com/blog/fr/easy-pdf-sharing` | exists in other langs: cn, de, en, es, ja |
| `https://article.maipdf.com/blog/ko/pdf-to-qr` | exists in other langs: de, en, es, fr, ja |
| `https://article.maipdf.com/blog/fr/share-pdf-online` | exists in other langs: cn, de, en, es |
| `https://article.maipdf.com/blog/fr/instant-pdf-link-generation` | exists in other langs: cn, de, en, es, ko |
| `https://article.maipdf.com/blog/en/modify-link` | exists in other langs: cn, fr |
| `https://article.maipdf.com/blog/en/how-to-create-offline-pdf-package-guide` | exists in other langs: cn, de, es |
| `https://article.maipdf.com/blog/en/maipdf-secure-efficient-sharing` | exists in other langs: cn, de, es |
| `https://article.maipdf.com/blog/en/maiimg-bulk-image-sharing-guide` | exists in other langs: cn, de, es |

## Missing counts by language

- de: 2
- en: 6
- es: 1
- fr: 4
- ja: 2
- ko: 1

## Generated output file

I generated a machine-readable list for follow-up (redirects / content backfills):
- `missing_blog_urls_from_gsc.csv` (repo root)

## Suggested redirect mapping (not applied)

If you decide to reduce GSC 404s later (without creating content duplicates), a common approach is 301 redirects from the missing URLs to an existing language version of the same slug.

**Note:** Per current decision, we are **not applying any functional redirects** right now.

