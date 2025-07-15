import { withPayload } from "@payloadcms/next/withPayload";

import redirects from "./redirects.js";

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", ""),
        };
      }),
    ],
    // Enable image optimization
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Fix Windows long path issues
    path: '/_next/image',
    loader: 'default',
    // Reduce filename length issues
    domains: [],
  },
  // Fix Windows path issues
  experimental: {
    esmExternals: 'loose',
  },
  reactStrictMode: true,
  redirects,
  eslint: {
    // ⛔ Prevent build from failing on missing prettier plugin
    ignoreDuringBuilds: true,
  },
};

export default withPayload(nextConfig);
