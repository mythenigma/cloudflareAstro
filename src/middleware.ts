import type { MiddlewareHandler } from "astro";
import { BLOG_LEGACY_REDIRECTS } from "./data/blog-legacy-redirects.mjs";

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

  const legacyTarget = BLOG_LEGACY_REDIRECTS[normalizedPath];
  if (legacyTarget && legacyTarget !== normalizedPath) {
    url.pathname = legacyTarget;
    return Response.redirect(url.toString(), 301);
  }

  // Redirect any trailing slash to the non-trailing-slash version
  if (pathname !== normalizedPath) {
    url.pathname = normalizedPath;
    return Response.redirect(url.toString(), 301);
  }

  return next();
};
