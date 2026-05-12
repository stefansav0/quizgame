import Link from "next/link";

// --- ADVANCED SEO CONFIGURATION ---
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.getknowify.com";

export const metadata = {
  title: {
    default: "The Friendship Quiz Blog | Viral Trends & Best Friend Guides",
    template: "%s | GetKnowify Blog"
  },
  description: "Master the art of social bonding. Explore viral friendship quiz ideas, BFF dares, personality trends, and expert guides to testing your inner circle in 2026.",
  keywords: [
    "viral friendship quizzes", "BFF compatibility test", "best friend dare ideas", 
    "friendship bond testing", "social gaming trends 2026", "how to make viral quizzes",
    "fake friend identifiers", "relationship quizzes", "interactive social content"
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "The Ultimate Friendship & Social Quiz Blog | GetKnowify",
    description: "The #1 destination for viral quiz trends and friendship guides.",
    url: `${SITE_URL}/blog`,
    siteName: "GetKnowify",
    images: [{ url: `${SITE_URL}/og-blog-cover.jpg`, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Friendship Quiz Blog | GetKnowify",
    description: "Discover the next viral friendship trend.",
    images: [`${SITE_URL}/og-blog-cover.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// --- OPTIMIZED FETCHING ---
async function getPublishedBlogs() {
  try {
    const res = await fetch(`${SITE_URL}/api/blogs`, {
      next: { revalidate: 3600 }, // Increased to 1 hour for better performance, use On-Demand Revalidation if possible
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    
    if (data.success && Array.isArray(data.blogs)) {
      return data.blogs.filter((blog) => blog.status === "published");
    }
    return [];
  } catch (error) {
    console.error("Critical SEO Fetch Error:", error);
    return [];
  }
}

export default async function BlogList() {
  const blogs = await getPublishedBlogs();

  // --- ADVANCED STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/blog/#webpage`,
        "url": `${SITE_URL}/blog`,
        "name": "Friendship & Social Trends Blog - GetKnowify",
        "description": "Expert guides on friendship quizzes and viral social trends.",
        "breadcrumb": { "@id": `${SITE_URL}/blog/#breadcrumb` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog/#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Blog" }
        ]
      },
      {
        "@type": "ItemList",
        "itemListElement": blogs.map((blog, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `${SITE_URL}/blog/${blog.slug}`
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Modern Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        
        {/* BREADCRUMBS (SEO Boost) */}
        <nav className="flex mb-8 text-sm font-medium text-slate-500 uppercase tracking-widest">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Blog</span>
        </nav>

        

        {/* FEATURED POST (Optional - First Blog) */}
        {blogs.length > 0 && (
            <div className="mb-16">
                 {/* Logic for a large featured card can go here */}
            </div>
        )}

        {/* BLOG GRID */}
        {blogs.length === 0 ? (
          <div className="text-center py-32 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <p className="text-slate-500 text-xl font-light">The lab is currently brewing new trends. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`} className="group">
                <article className="flex flex-col h-full bg-[#0d0d0d] border border-white/[0.05] rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)]">
                  
                  {/* Visual Element (Even if no image, use a gradient placeholder) */}
                  <div className="h-48 w-full bg-gradient-to-br from-emerald-900/20 to-slate-900 group-hover:scale-105 transition-transform duration-700" />

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                        {blog.category || "Trend Report"}
                      </span>
                      <time className="text-[11px] text-slate-500 font-bold uppercase tracking-tighter">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </time>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                      {blog.content?.replace(/<[^>]+>/g, '').substring(0, 140)}...
                    </p>

                    <div className="mt-auto pt-6 border-t border-white/[0.05] flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-500">By {blog.author || "GetKnowify Team"}</span>
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                        Deep Read <span>→</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}