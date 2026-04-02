import type { MiddlewareHandler } from "astro";

// Canonicalize URLs to match astro.config.mjs: trailingSlash: 'never'
// Astro's trailingSlash config only affects build-time link generation.
// This middleware does the runtime 301 so /blog/en/foo/ → /blog/en/foo,
// avoiding duplicate URLs in Google Search Console.
export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = new URL(context.request.url);
  const { pathname } = url;

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
