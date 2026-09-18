import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Baked into every client bundle at build time (this file runs in Node
  // during `next build`, not in the browser), so it's a fixed value for the
  // whole deployment and only changes on the next actual build. R2-hosted
  // image URLs append it as `?v=`, so replacing an image file's contents at
  // the same URL is picked up immediately on the next deploy instead of
  // being served stale from Cloudflare's edge cache or a visitor's browser
  // cache until the old cache entry happens to expire.
  env: {
    NEXT_PUBLIC_ASSET_VERSION: String(Date.now()),
  },
};

export default nextConfig;
