/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Main Website URL
  siteUrl: "https://www.getknowify.com",

  // Generate robots.txt automatically
  generateRobotsTxt: true,

  // Generate sitemap index automatically
  generateIndexSitemap: true,

  // Split large sitemaps automatically
  sitemapSize: 5000,

  // Default SEO values
  changefreq: "weekly",
  priority: 0.7,
  autoLastmod: true,

  // Exclude private/internal pages
  exclude: [
    "/api/*",
    "/dashboard/*",
    "/admin/*",
    "/server-sitemap.xml",
    "/404",
    "/500",
  ],

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api",
          "/dashboard",
          "/admin",
        ],
      },
    ],
  },

  // Custom SEO priority logic
  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;

    // Homepage
    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    }

    // Quiz & Game Ideas main page
    else if (path === "/ideas") {
      priority = 0.95;
      changefreq = "daily";
    }

    // Quiz & Game Ideas articles
    else if (path.startsWith("/ideas/")) {
      priority = 0.9;
      changefreq = "weekly";
    }

    // Never Have I Ever pages
    else if (path.startsWith("/nhie/")) {
      priority = 0.9;
      changefreq = "weekly";
    }

    // Quiz pages
    else if (
      path.includes("/quiz") ||
      path.includes("/friendship") ||
      path.includes("/best-friend")
    ) {
      priority = 0.9;
      changefreq = "weekly";
    }

    // Important public pages
    else if (
      path === "/about" ||
      path === "/contact" ||
      path === "/privacy" ||
      path === "/terms"
    ) {
      priority = 0.6;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod
        ? new Date().toISOString()
        : undefined,

      alternateRefs: config.alternateRefs ?? [],
    };
  },

  // Additional important static URLs
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/ideas"),
    await config.transform(config, "/about"),
    await config.transform(config, "/contact"),
    await config.transform(config, "/privacy"),
    await config.transform(config, "/terms"),
  ],
};