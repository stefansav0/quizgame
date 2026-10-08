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
        disallow: ["/api", "/dashboard", "/admin"],
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

  // Add dynamically generated published Quiz & Game Ideas articles
  additionalPaths: async (config) => {
    const staticPaths = [
      "/",
      "/ideas",
      "/about",
      "/contact",
      "/privacy",
      "/terms",
    ];

    const staticUrls = await Promise.all(
      staticPaths.map((path) => config.transform(config, path))
    );

    try {
      const response = await fetch(
        "https://www.getknowify.com/api/blogs",
        {
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Blog API returned ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      const publishedBlogs = (data.blogs || []).filter(
        (blog) =>
          blog.status === "published" &&
          blog.slug &&
          typeof blog.slug === "string"
      );

      const ideaUrls = await Promise.all(
        publishedBlogs.map(async (blog) => {
          const path = `/ideas/${blog.slug}`;

          const transformed = await config.transform(config, path);

          return {
            ...transformed,
            lastmod:
              blog.updatedAt ||
              blog.createdAt ||
              transformed.lastmod,
          };
        })
      );

      console.log(
        `next-sitemap: Added ${ideaUrls.length} published Quiz & Game Ideas URLs.`
      );

      return [...staticUrls, ...ideaUrls];
    } catch (error) {
      console.error(
        "next-sitemap: Failed to load published Quiz & Game Ideas:",
        error
      );

      // Keep the build working even if the API is temporarily unavailable.
      return staticUrls;
    }
  },
};