// 2026-07-20: maiimg-topic articles retired from article.maipdf.com.
// Root cause: maiimg.com already runs its own blog (70 EN + 14 zh-CN
// articles) covering nearly the same topics under its own domain — this
// cluster was duplicate coverage competing with maiimg.com itself, not
// content that belonged on article.maipdf.com. Each entry 301s to the
// closest existing maiimg.com article, or to the language blog index when
// no specific match exists. Corresponding .md files have been deleted so
// these paths actually reach the middleware (static assets take priority
// over middleware for paths that still resolve to a built page).
export const MAIIMG_CLUSTER_REDIRECTS = {
  "/blog/en/free-image-hosting-maiimg-complete-guide": "https://maiimg.com/blog/en/free-image-host-complete-guide-2025",
  "/blog/en/image-embed-code-generator-maiimg-guide": "https://maiimg.com/blog/en/",
  "/blog/en/image-upload-without-account-maiimg-guide": "https://maiimg.com/blog/en/upload-images-online-free-best-platforms",
  "/blog/en/introducing-maiimg-secure-image-sharing-qr-codes": "https://maiimg.com/blog/en/how-to-create-qr-codes-for-images",
  "/blog/en/maiimg-architecture-interior-design-portfolio": "https://maiimg.com/blog/en/designer-portfolio-sharing-guide",
  "/blog/en/maiimg-bulk-image-sharing-complete-guide": "https://maiimg.com/blog/en/image-sharing-best-practices",
  "/blog/en/maiimg-bulk-image-sharing-guide": "https://maiimg.com/blog/en/image-sharing-best-practices",
  "/blog/en/maiimg-creative-portfolio-sharing-workflow": "https://maiimg.com/blog/en/designer-portfolio-sharing-guide",
  "/blog/en/maiimg-ecommerce-seller-image-distribution": "https://maiimg.com/blog/en/ecommerce-product-photo-sharing-guide",
  "/blog/en/maiimg-education-training-image-sharing": "https://maiimg.com/blog/en/",
  "/blog/en/maiimg-encryption-prevent-forwarding-complete-guide": "https://maiimg.com/blog/en/image-security-and-privacy-guide",
  "/blog/en/maiimg-event-photo-delivery-guide": "https://maiimg.com/blog/en/event-photo-sharing-runbook",
  "/blog/en/maiimg-event-photo-distribution-guide": "https://maiimg.com/blog/en/event-photography-workflow-guide",
  "/blog/en/maiimg-influencer-collaboration-image-toolkit": "https://maiimg.com/blog/en/",
  "/blog/en/maiimg-product-launch-image-distribution": "https://maiimg.com/blog/en/ecommerce-product-photo-sharing-guide",
  "/blog/en/maiimg-product-launch-image-hub": "https://maiimg.com/blog/en/ecommerce-product-photo-sharing-guide",
  "/blog/en/maiimg-qr-code-generation": "https://maiimg.com/blog/en/how-to-create-qr-codes-for-images",
  "/blog/en/maiimg-qr-code-image-sharing-guide": "https://maiimg.com/blog/en/how-to-create-qr-codes-for-images",
  "/blog/en/maiimg-qr-code-sharing-guide": "https://maiimg.com/blog/en/easiest-way-to-share-photos-with-qr-codes",
  "/blog/en/maiimg-qrcode-generation-guide": "https://maiimg.com/blog/en/how-to-create-qr-codes-for-images",
  "/blog/en/maiimg-quick-image-sharing-guide": "https://maiimg.com/blog/en/how-to-generate-image-sharing-links",
  "/blog/en/maiimg-real-estate-image-sharing-guide": "https://maiimg.com/blog/en/real-estate-photo-sharing-guide",
  "/blog/en/maiimg-secure-image-sharing-access-control": "https://maiimg.com/blog/en/image-security-and-privacy-guide",
  "/blog/en/maiimg-social-media-campaign-calendar-guide": "https://maiimg.com/blog/en/social-media-photo-sharing-guide",
  "/blog/en/maiimg-travel-photography-sharing-guide": "https://maiimg.com/blog/en/",
  "/blog/en/maiimg-wedding-photography-delivery-guide": "https://maiimg.com/blog/en/wedding-photo-delivery-workflow-guide",
  "/blog/en/share-images-smarter-way-maiimg": "https://maiimg.com/blog/en/image-sharing-best-practices",

  "/blog/cn/maiimg-bulk-image-sharing-guide": "https://maiimg.com/blog/zh-cn/",
  "/blog/cn/maiimg-complete-workflow-guide-with-diagrams": "https://maiimg.com/blog/zh-cn/image-sharing-workflow-flowcharts",
  "/blog/cn/maiimg-education-training-image-sharing": "https://maiimg.com/blog/zh-cn/",
  "/blog/cn/maiimg-encryption-prevent-forwarding-complete-guide": "https://maiimg.com/blog/zh-cn/image-security-and-privacy-guide",
  "/blog/cn/maiimg-event-photo-distribution-guide": "https://maiimg.com/blog/zh-cn/",
  "/blog/cn/maiimg-link-generation-guide": "https://maiimg.com/blog/zh-cn/how-to-generate-image-sharing-links",
  "/blog/cn/maiimg-medical-beauty-case-sharing-guide": "https://maiimg.com/blog/zh-cn/",
  "/blog/cn/maiimg-product-image-collaboration-guide": "https://maiimg.com/blog/zh-cn/ecommerce-product-photo-sharing-guide",
  "/blog/cn/maiimg-qr-code-sharing-guide": "https://maiimg.com/blog/zh-cn/how-to-create-qr-codes-for-images",
  "/blog/cn/maiimg-qrcode-generation-guide": "https://maiimg.com/blog/zh-cn/how-to-create-qr-codes-for-images",
  "/blog/cn/maiimg-quick-image-sharing-guide": "https://maiimg.com/blog/zh-cn/how-to-generate-image-sharing-links",
  "/blog/cn/maiimg-real-estate-image-sharing-guide": "https://maiimg.com/blog/zh-cn/real-estate-photo-sharing-guide",
  "/blog/cn/maiimg-wedding-photography-delivery-guide": "https://maiimg.com/blog/zh-cn/wedding-photo-sharing-guide",
};

// No usable Spanish landing exists on maiimg.com (its /blog/es/ is an
// English stub, canonical points back to /blog/en/) — redirecting there
// would be worse than a clean 410, so these two get removed outright via
// BLOG_GONE instead of a redirect.
export const MAIIMG_CLUSTER_GONE_ES = [
  "/blog/es/maiimg-qr-code-sharing-guide",
  "/blog/es/introducing-maiimg-secure-image-sharing-qr-codes",
];
