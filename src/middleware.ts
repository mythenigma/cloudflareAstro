import type { MiddlewareHandler } from "astro";

// Canonicalize URLs to match astro.config.mjs: trailingSlash: 'never'
// This reduces duplicate URLs like /blog/en/foo/ vs /blog/en/foo (and the GSC "Alternative page with proper canonical tag" noise).
export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);
  const { pathname } = url;

  // Slug redirects (keep old URLs working after renames)
  // NOTE: Add entries here when you change a content filename (slug) to avoid creating new 404s.
  const slugRedirects: Record<string, string> = {
    "/blog/cn/replace-image-keep-link-guide": "/blog/cn/replace-pdf-keep-link-maipdf",
    "/blog/en/modify-link": "/blog/en/modify-pdf-links",
    "/blog/en/offline-pdf-sharing-vs-online-sharing-complete-comparison": "/blog/en/offline-vs-online-pdf-sharing-comparison",
    "/blog/en/how-to-create-offline-pdf-package-guide": "/blog/en/how-to-create-offline-pdf-package-complete-guide",
    "/blog/en/maiimg-bulk-image-sharing-guide": "/blog/en/maiimg-bulk-image-sharing-complete-guide",
    "/blog/en/maipdf-secure-efficient-sharing": "/blog/en/maipdf-secure-efficient-pdf-sharing",
    "/blog/cn/file-open-statistics-tracking-guide": "/blog/cn/open-statistics-and-access-control-guide",
    "/blog/cn/maiimg-disable-link-and-access-tracking": "/blog/cn/open-statistics-and-access-control-guide",
    "/blog/cn/maiimg-image-tracking-guide": "/blog/cn/open-statistics-and-access-control-guide",
    "/blog/cn/maiimg-quick-link-generation-one-click-disable-tracking": "/blog/cn/open-statistics-and-access-control-guide",
    "/blog/cn/maiimg-share-images-tracking": "/blog/cn/open-statistics-and-access-control-guide",
    "/blog/cn/maiimg-share-images-tracking-control": "/blog/cn/open-statistics-and-access-control-guide",
    "/blog/cn/maipdf-quick-link-generation-one-click-disable-tracking": "/blog/cn/open-statistics-and-access-control-guide",
    "/blog/cn/online-pdf-sharing-tracking": "/blog/cn/open-statistics-and-access-control-guide",
    "/blog/cn/pdf-access-tracking-basics": "/blog/cn/open-statistics-and-access-control-guide",
    "/blog/de/file-open-statistics-tracking-guide": "/blog/de/open-statistics-and-access-control-guide",
    "/blog/de/maiimg-quick-link-generation-one-click-disable-tracking": "/blog/de/open-statistics-and-access-control-guide",
    "/blog/de/maiimg-share-images-tracking-control": "/blog/de/open-statistics-and-access-control-guide",
    "/blog/de/maipdf-quick-link-generation-one-click-disable-tracking": "/blog/de/open-statistics-and-access-control-guide",
    "/blog/de/online-pdf-sharing-tracking": "/blog/de/open-statistics-and-access-control-guide",
    "/blog/de/pdf-access-tracking-analytics-quick-start": "/blog/de/open-statistics-and-access-control-guide",
    "/blog/de/pdf-link-analytics-what-to-track": "/blog/de/open-statistics-and-access-control-guide",
    "/blog/en/drm-digital-certificate-file-protection-guide": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/drm-limit-pdf-views": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/drm-limit-pdf-views-practical": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/file-open-statistics-tracking-guide": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/free-online-drm-for-pdf": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/limit-pdf-views-drm": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/maiimg-image-tracking-analytics-guide": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/maiimg-quick-link-generation-one-click-disable-tracking": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/maiimg-share-images-tracking-control": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/maipdf-quick-link-generation-one-click-disable-tracking": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/master-pdf-access-tracking-analytics": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/offline-pdf-drm-enterprise-solution": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/offline-pdf-drm-mode": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/online-pdf-sharing-tracking": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/pdf-access-tracking-analytics-quick-start": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/pdf-link-analytics-what-to-track": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/pdf-online-drm-complete-guide": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/pdf-watermark-tracking-access-monitoring-guide": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/en/tracking-pdf-usage-analytics": "/blog/en/open-statistics-and-access-control-guide",
    "/blog/es/file-open-statistics-tracking-guide": "/blog/es/open-statistics-and-access-control-guide",
    "/blog/es/maiimg-quick-link-generation-one-click-disable-tracking": "/blog/es/open-statistics-and-access-control-guide",
    "/blog/es/maiimg-share-images-tracking-control": "/blog/es/open-statistics-and-access-control-guide",
    "/blog/es/maipdf-quick-link-generation-one-click-disable-tracking": "/blog/es/open-statistics-and-access-control-guide",
    "/blog/es/online-pdf-sharing-tracking": "/blog/es/open-statistics-and-access-control-guide",
    "/blog/file-open-statistics-tracking-guide": "/blog/open-statistics-and-access-control-guide",
    "/blog/fr/drm-limit-pdf-views": "/blog/fr/open-statistics-and-access-control-guide",
    "/blog/fr/drm-limit-pdf-views-practical": "/blog/fr/open-statistics-and-access-control-guide",
    "/blog/fr/file-open-statistics-tracking-guide": "/blog/fr/open-statistics-and-access-control-guide",
    "/blog/fr/maiimg-quick-link-generation-one-click-disable-tracking": "/blog/fr/open-statistics-and-access-control-guide",
    "/blog/fr/maipdf-quick-link-generation-one-click-disable-tracking": "/blog/fr/open-statistics-and-access-control-guide",
    "/blog/fr/offline-pdf-drm-mode": "/blog/fr/open-statistics-and-access-control-guide",
    "/blog/fr/offline-pdf-drm-solution-entreprise": "/blog/fr/open-statistics-and-access-control-guide",
    "/blog/fr/online-pdf-sharing-tracking": "/blog/fr/open-statistics-and-access-control-guide",
    "/blog/fr/pdf-access-tracking-analytics-quick-start": "/blog/fr/open-statistics-and-access-control-guide",
    "/blog/fr/pdf-link-analytics-what-to-track": "/blog/fr/open-statistics-and-access-control-guide",
    "/blog/fr/pdf-online-drm-complete-guide": "/blog/fr/open-statistics-and-access-control-guide",
    "/blog/ja/maiimg-quick-link-generation-one-click-disable-tracking": "/blog/ja/open-statistics-and-access-control-guide",
    "/blog/ja/maipdf-quick-link-generation-one-click-disable-tracking": "/blog/ja/open-statistics-and-access-control-guide",
    "/blog/ja/pdf-access-tracking-analytics-quick-start": "/blog/ja/open-statistics-and-access-control-guide",
    "/blog/ja/pdf-link-analytics-what-to-track": "/blog/ja/open-statistics-and-access-control-guide",
    "/blog/ko/maiimg-quick-link-generation-one-click-disable-tracking": "/blog/ko/open-statistics-and-access-control-guide",
    "/blog/ko/maipdf-quick-link-generation-one-click-disable-tracking": "/blog/ko/open-statistics-and-access-control-guide",
  };
  if (slugRedirects[pathname]) {
    url.pathname = slugRedirects[pathname];
    return Response.redirect(url.toString(), 301);
  }

  // Skip root, files with extensions, and internal asset paths
  if (
    pathname === "/" ||
    pathname.startsWith("/_astro/") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return next();
  }

  // Redirect any trailing slash to the non-trailing-slash version
  if (pathname.endsWith("/")) {
    url.pathname = pathname.replace(/\/+$/, "");
    return Response.redirect(url.toString(), 301);
  }

  return next();
};
