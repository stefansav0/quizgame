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
      // Mediavine Journey ads.txt redirect
      {
        source: "/ads.txt",
        destination:
          "https://adstxt.journeymv.com/sites/4e13d665-392f-4c84-a5e0-3e7902fb9991/ads.txt",
        permanent: true,
      },

      // Old relationship article URL → New URL
      {
        source:
          "/ideas/10-important-questions-before-making-relationship-official",
        destination:
          "/ideas/questions-before-making-relationship-official",
        permanent: true,
      },

      // Old friendship quiz article URL → New URL
      {
        source:
          "/ideas/why-friendship-quizzes-are-taking-over-social-media",
        destination: "/ideas/how-well-do-you-know-me-quiz",
        permanent: true,
      },

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