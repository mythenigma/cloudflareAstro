# Stub / Thin-Content Cleanup Tracker

> **Created:** 2026-04-02
> **Issue:** 2026-01-15 有人从 GSC 404 导出清单批量生成了大量占位页面，内容极薄（3 句万金油 + 1 个 SVG），对 SEO 有害。
> **Last updated:** 2026-06-03 — 改为「语言级」决策，旧的逐文件表已被取代（见下）。

---

## 2026-06-03 决策与执行（取代下方旧表）

GSC 出现三类问题（尾斜杠重复 / 批量薄翻译 / 404+robots）。处理策略从「逐文件审查」升级为「按语言收缩 + 薄内容清理」：

### 语言收缩
- **删除 de / fr / ko / ja**（整目录删除，middleware 对 `/blog/(de|fr|ko|ja)/*` 返回 **410**）。
  - 其中 **ja 是质量重灾区**：下线前 71 篇里 56 篇（79%）是薄页，绝大多数是这批 stub。
- **保留 en / cn / es**。

### 薄内容清理（保留语言内）
- 删除 5 个 cn 纯 stub（<60 词，→410）：`access-control-permission-matrix`、`document-management-best-practices-visual`、`maiimg-qrcode-image-sharing-guide`、`maiimg-three-core-features-explained`、`make-pdf-into-a-link`。
- en 无 <60 词垃圾（最薄 62 词，均为「短但真」）。

### 当前质量画像（noindex 已排除）
| 语言 | 收录页 | 薄页(<150词) | 薄页% |
|------|--------|--------------|-------|
| es | 50 | 1 | 2% ✅ |
| en | 128 | 18 | 14% |
| cn | 96 | 18 | 19% |
| **合计** | **274** | **37** | **14%** |

### 配套技术修复（已上线）
- `wrangler.json` `html_handling: drop-trailing-slash`（修尾斜杠重复）
- `src/data/blog-gone.mjs`：GSC 404/alternative 里彻底删除的 URL → 410
- `src/data/blog-legacy-redirects.mjs`：旧版 EN URL + 改名 slug → 301
- `public/robots.txt`：解除 `/blog-backup/`、`/_astro/` 屏蔽

---

## ⏭️ 剩余工作：扩写「短但真」页（37 篇，不是删除）

这些是 60–149 词的真实文章，需要**扩写加厚**（加 MaiPDF 独有功能实操：Telegram 通知、控制码改/撤链、QR、免注册等），不是删除对象。优先扩写有排名潜力的：

| 词数 | 页面 |
|------|------|
| 68 | en/maiimg-quick-image-sharing-guide |
| 69 | cn/team-collaboration-pdf-workflow |
| 70 | cn/document-security-compliance-checklist |
| 71 | cn/maiimg-image-sharing-workflow-5-steps |
| 71 | cn/safeguard-your-pdfs-online |
| 73 | cn/digital-watermarking-technology-technical-implementation |
| 74 | cn/faster-pdf-loading-enhanced-performance |
| 75 | cn/modify-link |
| 77 | en/maiimg-bulk-image-sharing-guide |
| 80 | en/maiimg-creative-portfolio-sharing-workflow |
| 89 | en/maiimg-event-photo-delivery-guide |
| 93 | cn/social-media-pdf-sharing |
| 94 | en/pdf-sharing-features-overview-visual-guide |
| 96 | en/maiimg-product-launch-image-distribution |
| 102 | cn/how-to-make-a-download-link-for-a-pdf |
| 105 | cn/image-hosting-service-comparison-free-image-hosting |
| 111 | cn/image-sharing-introduction · en/offline-vs-online-pdf-sharing-quick-choice |
| 112 | en/bulk-image-gallery-delivery |
| 114 | cn/pdf-share-link-disable-download |
| 118 | en/share-images-smarter-way-maiimg |
| 122 | en/one-click-share-multiple-images-gallery-sharing |
| 124 | en/free-image-storage-online-image-storage · en/offline-vs-online-pdf-sharing-visual-comparison |
| 127 | cn/share-pdf-whatsapp |
| 130 | cn/compliance-document-distribution |
| 133 | cn/maiimg-secure-image-sharing-access-control |
| 135 | en/watermark-protection-basics |
| 136 | cn/wechat-pdf-sharing |
| 137 | en/safe-client-image-delivery-tool |
| 140 | cn/share-pdf-facebook · en/social-media-image-gallery-sharing-guide |
| 143 | en/privnote-encrypted-note-sharing-complete-guide · en/privnote-secure-self-destruct-messages-guide |
| 144 | es/enterprise-pdf-document-management-guide |
| 148 | cn/maiimg-social-media-campaign-calendar-guide |
| 149 | en/privnote-self-destruct-messages-use-cases |

---

<details>
<summary>旧版逐文件清单（2026-04，已被语言级决策取代，仅留存）</summary>

> 注：de/fr/ko/ja 已整目录删除，下表中这些语言的条目已不存在。en 的大部分已在 4 月删除。

旧表略 — 见 git 历史 `STUB-CLEANUP-TRACKER.md`（2026-04-02 版本）。
</details>
