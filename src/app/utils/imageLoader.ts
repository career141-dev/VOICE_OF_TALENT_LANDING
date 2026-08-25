const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

/**
 * Generates an optimized image URL for Cloudflare R2 assets.
 * Utilizes Cloudflare Edge Image Resizing / format auto-selection (AVIF/WebP)
 * when hosted on Cloudflare Zone proxy, or returns clean R2 URL fallback.
 */
export function getOptimizedImageUrl(
  src: string,
  width?: number,
  quality: number = 80
): string {
  if (!src) return "";

  // If src is already a full URL or doesn't start with R2 base, return as-is
  if (src.includes("/cdn-cgi/image/")) {
    return src;
  }

  // If R2 URL is provided, format Cloudflare Edge image transformation parameters
  if (R2_MEDIA_URL && src.startsWith(R2_MEDIA_URL)) {
    const relativePath = src.replace(R2_MEDIA_URL, "").replace(/^\/+/, "");
    const params: string[] = ["format=auto", `quality=${quality}`];
    if (width) {
      params.push(`width=${width}`);
    }
    // Return Cloudflare Edge transform path with fallback to direct R2 URL
    return `${R2_MEDIA_URL}/cdn-cgi/image/${params.join(",")}/${relativePath}`;
  }

  return src;
}
