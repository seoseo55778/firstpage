import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 750, 828, 1080, 1200],
    imageSizes: [96, 128, 256, 384, 640],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
