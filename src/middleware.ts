import type { MiddlewareHandler } from "astro";
import { BLOG_LEGACY_REDIRECTS } from "./data/blog-legacy-redirects.mjs";
import { BLOG_GONE } from "./data/blog-gone.mjs";

// Canonicalize URLs to match astro.config.mjs: trailingSlash: 'never'
// Astro's trailingSlash config only affects build-time link generation.
// This middleware does the runtime 301 so /blog/en/foo/ → /blog/en/foo,
// avoiding duplicate URLs in Google Search Console.
export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);
  const { pathname } = url;
  const normalizedPath =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.replace(/\/+$/, "")
      : pathname;

  // Skip root, files with extensions, and internal asset paths
  if (
    pathname === "/" ||
    pathname.startsWith("/_astro/") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return next();
  }

  // Permanently removed content. Return 410 Gone so Google de-indexes faster
  // than a 404:
  //  - de/fr/ko language sections were downlined for SEO consolidation.
  //  - /blog-backup/ is an old backup tree that no longer exists.
  if (
    /^\/blog\/(de|fr|ko)(\/|$)/.test(normalizedPath) ||
    /^\/blog-backup(\/|$)/.test(normalizedPath)
  ) {
    return new Response(null, { status: 410, statusText: "Gone" });
  }

  const redirectTarget = (BLOG_LEGACY_REDIRECTS as Record<string, string>)[normalizedPath];

  if (redirectTarget && redirectTarget !== normalizedPath) {
    url.pathname = redirectTarget;
    return Response.redirect(url.toString(), 301);
  }

  // Individually removed URLs (deleted in past consolidation rounds, reported as
  // 404 in Search Console, no current equivalent) → 410 Gone for fast de-indexing.
  if (BLOG_GONE.has(normalizedPath)) {
    return new Response(null, { status: 410, statusText: "Gone" });
  }

  // Redirect any trailing slash to the non-trailing-slash version
  if (pathname !== normalizedPath) {
    url.pathname = normalizedPath;
    return Response.redirect(url.toString(), 301);
  }

  return next();
};
