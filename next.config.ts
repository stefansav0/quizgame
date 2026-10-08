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

      {
      source: "/ideas/10-important-questions-before-making-relationship-official",
      destination: "/ideas/questions-before-making-relationship-official",
      permanent: true,
    },
    {
      source: "/ideas/why-friendship-quizzes-are-taking-over-social-media",
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