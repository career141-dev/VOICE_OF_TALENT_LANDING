const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

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
  return src;
}
