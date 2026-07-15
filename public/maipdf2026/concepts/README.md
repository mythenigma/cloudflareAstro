# MaiPDF two-path / taiji concept materials

Organized 2026-07-10 from Desktop WeChat exports + UUID originals + earlier imports.

## Layout

```text
concepts/
  en/                  # English copy
  zh/                  # Chinese copy
  _duplicates-weixin/  # WeChat recompressions of assets already kept above
  *.jpg|*.png          # Legacy flat paths still referenced by the live homepage
```

## English (`en/`)

| File | Type | Notes |
|------|------|--------|
| `hero-taiji-ink-hires.png` | Hero circle | Best ink taiji with MaiPDF logo (1254²). Prefer this. |
| `hero-taiji-ink.jpg` | Hero circle | Same composition, smaller JPG (legacy / live site). |
| `hero-taiji-ink-no-logo-center.png` | Hero circle | Ink taiji variant without center logo badge. |
| `hero-taiji-flat.png` | Hero circle | Clean B/W flat taiji (no landscape). |
| `homepage-saas-concept.jpg` | Full page | SaaS homepage mock: Two Ways to Secure Every PDF. |
| `poster-one-pdf-two-ways.jpg` | Poster | Ink landscape + “One PDF. Two Ways…” |
| `poster-ink-landscape-chat.png` | Poster | Chat-exported EN poster (lower quality; prefer JPG above). |
| `product-overview.png` | Infographic | EN product overview (pair of ZH `product-intro`). |

## Chinese (`zh/`)

| File | Type | Notes |
|------|------|--------|
| `product-intro-hires.png` | Infographic | Best ZH 产品介绍 (pair of EN `product-overview`). |
| `product-intro.jpg` | Infographic | Same composition, smaller JPG. |
| `poster-ink-landscape.png` | Poster | ZH 水墨海报：一份 PDF，两种方式，全面掌控. |
| `banner-wide-v1.jpg` | Wide banner | 1774×887 landscape split. |
| `banner-wide-v2.jpg` | Wide banner | 1666×944 variant. |
| `banner-wide-v3.jpg` | Wide banner | 1536×1024 variant. |

## Duplicates found

Byte hashes differ (WeChat recompression), but **content is the same**:

| Weixin Desktop file | Kept as |
|---------------------|---------|
| `…64128_277_17.jpg` | `en/homepage-saas-concept.jpg` |
| `…64131_278_17.jpg` | `zh/product-intro.jpg` (+ hires PNG) |
| `…64133_279_17.jpg` | `en/hero-taiji-ink.jpg` (+ hires PNG) |
| `…64134_280_17.jpg` | `en/poster-one-pdf-two-ways.jpg` |

WeChat copies archived under `_duplicates-weixin/` for traceability; prefer the named files in `en/` / `zh/`.

## Near-pairs (EN ↔ ZH)

- `en/product-overview.png` ↔ `zh/product-intro-hires.png`
- `en/poster-one-pdf-two-ways.jpg` ↔ `zh/poster-ink-landscape.png`

## Usage notes

- Core message: **Online Sharing** = fast browser links/QR; **App DRM** = stronger app protection, screenshot-aware reader, device binding, revoke, `.maipdf`.
- Do not reuse unverified trust claims (SOC 2, customer logos) from older SaaS mockups unless confirmed.
- Live homepage currently uses `/maipdf2026/concepts/maipdf-two-path-taiji-hero-visual.jpg` (same asset as `en/hero-taiji-ink.jpg`).
