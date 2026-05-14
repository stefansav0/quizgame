import Link from "next/link";
import Image from "next/image";

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
      next: { revalidate: 60 }, // 1 hour caching
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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Clean, minimal header background pattern for a professional look */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/50 pointer-events-none" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        
        {/* BREADCRUMBS (SEO Boost & Navigation clarity) */}
        <nav className="flex mb-8 text-sm font-medium text-slate-500 uppercase tracking-wider">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <span className="mx-3 text-slate-300">/</span>
          <span className="text-slate-800 font-semibold">Blog</span>
        </nav>

        {/* PAGE HEADER (Crucial for AdSense & SEO structure) */}
        <header className="mb-16 max-w-3xl">
  <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
    The GetKnowify <span className="text-emerald-600">Blog</span>
  </h1>

  <p className="text-lg text-slate-600 leading-relaxed">
    Discover friendship quiz ideas, social trends, digital relationship topics, and fun guides for creating meaningful conversations with friends and family.
  </p>
</header>

        {/* BLOG GRID */}
        {blogs.length === 0 ? (
          <div className="text-center py-24 rounded-2xl border border-dashed border-slate-300 bg-white shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No articles found</h3>
            <p className="text-slate-500 font-medium">Our writers are currently brewing new trends. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`} className="group flex h-full">
                <article className="flex flex-col w-full bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
                  
                  {/* Visual Element Placeholder (Light Mode Optimized) */}
                  <div className="h-52 w-full relative overflow-hidden bg-slate-100">
  <Image
    src={
      blog.image ||
      blog.featuredImage ||
      "/placeholder.jpg"
    }
    alt={blog.title}
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
    sizes="(max-width: 768px) 100vw, 33vw"
    priority={false}
  />
</div>

                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                        {blog.category || "Trend Report"}
                      </span>
                      <time className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </time>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2 leading-snug">
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-3">
                      {blog.content?.replace(/<[^>]+>/g, '').substring(0, 150) || "Read more about this exciting update..."}...
                    </p>

                    {/* Footer / Author */}
                    <div className="mt-auto pt-5 border-t border-slate-100 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold">
                           {(blog.author?.charAt(0) || "G")}
                         </div>
                         <span className="text-sm font-medium text-slate-700">{blog.author || "GetKnowify Team"}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold group-hover:gap-2 transition-all">
                        Read <span aria-hidden="true">&rarr;</span>
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