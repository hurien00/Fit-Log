import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: "/api/fitlog",
        destination: "https://api.api-store.workers.dev/api/fitlog",
      },
      {
        source: "/api/fitlog/:path*",
        destination: "https://api.api-store.workers.dev/api/fitlog/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "**", 
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;