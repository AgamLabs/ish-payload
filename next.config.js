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
  },
  reactStrictMode: true,
  redirects,
  eslint: {
    // ⛔ Prevent build from failing on missing prettier plugin
    ignoreDuringBuilds: true,
  },
};

const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

// ✅ Only wrap withPayload if not in build phase (to skip Payload init on Railway)
export default isBuildPhase ? nextConfig : withPayload(nextConfig);
