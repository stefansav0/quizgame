import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
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

  async redirects() {
    return [
      // Old blog homepage → New ideas homepage
      {
        source: "/blog",
        destination: "/ideas",
        permanent: true,
      },

      // Old blog articles → New ideas articles
      {
        source: "/blog/:slug",
        destination: "/ideas/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;