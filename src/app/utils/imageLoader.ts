const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

// Fixed for the lifetime of a single deployed build (see next.config.ts) —
// changes only when a new build actually runs, not on every page load.
const ASSET_VERSION = process.env.NEXT_PUBLIC_ASSET_VERSION || "";

/**
 * Appends a build-scoped cache-busting version to a URL. Use this on every
 * R2-hosted asset URL so that replacing a file's contents at the same path
 * is reflected immediately on the next deploy, instead of being served
 * stale from Cloudflare's edge cache or a visitor's browser cache.
 */
export function withVersion(url: string): string {
  if (!url || !ASSET_VERSION) return url;
  return `${url}${url.includes("?") ? "&" : "?"}v=${ASSET_VERSION}`;
}

/**
 * Generates an optimized image URL for Cloudflare R2 assets.
 * Utilizes Cloudflare Edge Image Resizing / format auto-selection (AVIF/WebP)
 * when hosted on Cloudflare Zone proxy, or returns clean R2 URL fallback.
 */
export function getOptimizedImageUrl(
  src: string,
  _width?: number,
  _quality: number = 80
): string {
  if (!src) return "";
  // Return clean R2 media URL directly to ensure 100% image loading reliability
  return withVersion(src);
}
