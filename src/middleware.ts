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

