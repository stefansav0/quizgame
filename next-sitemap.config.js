/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Make sure this exactly matches your canonical URL (add www. if you use it!)
  siteUrl: "https://www.getknowify.com", 
  generateRobotsTxt: true,
  
  // Default fallback settings
  changefreq: "daily", 
  priority: 0.7,
  
  // 🛑 Keep Google's bots out of private or low-value routes
  exclude: ['/api/*', '/dashboard/*', '/admin/*', '/server-sitemap.xml'],

  // 🤖 Advanced robots.txt policies
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/dashboard', '/admin'],
      },
    ],
    // If you ever add a dynamic sitemap later, you can list it here
    additionalSitemaps: [
      // 'https://www.getknowify.com/server-sitemap.xml', 
    ],
  },

  // 🚀 Dynamic Priority Engine
  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;

    // 1. Homepage gets absolute top priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } 
    // 2. The Blog Hub gets high priority (so Google sees when you add new posts)
    else if (path === '/blog') {
      priority = 0.9;
      changefreq = 'daily';
    }
    // 3. Individual Blog Posts get good priority
    else if (path.includes('/blog/')) {
      priority = 0.8;
      changefreq = 'weekly'; // Blogs don't change every day once published
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};