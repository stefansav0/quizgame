import Link from "next/link";

// 🚀 SERVER-SIDE FETCH FUNCTION FOR MAIN BLOG
async function getBlog(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.getknowify.com";
    
    // Revalidates the cache every 60 seconds
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch blog ${slug}. Status:`, res.status);
      return null;
    }
    
    const data = await res.json();
    return data.success ? data.blog : null;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

// 🚀 SERVER-SIDE FETCH FUNCTION FOR RELATED BLOGS
async function getRelatedBlogs(currentSlug, currentCategory) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.getknowify.com";
    
    // Fetch all blogs
    const res = await fetch(`${baseUrl}/api/blogs`, {
      next: { revalidate: 120 }, 
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    const allBlogs = data.success ? data.blogs : [];
    
    // Filter out the current article and grab 3-4 relevant ones for the sidebar
    const related = allBlogs
      .filter((b) => b.slug !== currentSlug && b.status !== "draft")
      .sort((a, b) => (a.category === currentCategory ? -1 : 1))
      .slice(0, 4);
      
    return related;
  } catch (error) {
    console.error("Failed to fetch related blogs:", error);
    return [];
  }
}

// ✅ DYNAMIC METADATA FOR SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return { title: "Blog Not Found | GetKnowify" };

  const description = blog.metaDescription || (blog.content
    ? blog.content.replace(/<[^>]+>/g, '').substring(0, 160) + "..."
    : "Read the latest tips and trends on our blog.");

  const keywordsArray = blog.keywords 
    ? blog.keywords.split(',').map(keyword => keyword.trim()) 
    : ["friendship quizzes", "social trends"];

  return {
    title: `${blog.title} | GetKnowify`,
    description: description,
    keywords: keywordsArray,
    openGraph: {
      title: blog.title,
      description: description,
      type: "article",
      authors: [blog.author || "GetKnowify Team"],
    },
  };
}

// ✅ UPGRADED PARSER: Light-Theme Optimized
const renderContent = (content) => {
  if (!content) return null;

  return content.split('\n').map((line, index) => {
    if (line.trim() === '') {
      return <div key={index} className="h-4"></div>;
    }

    let formattedLine = line
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
      .replace(/\[(.*?)\]/g, '<span class="text-emerald-600 font-semibold cursor-pointer hover:underline">$1</span>');

    if (line.startsWith('## ')) {
      return (
        <h2 key={index} 
            className="text-2xl md:text-3xl font-extrabold mt-12 mb-6 text-slate-900 tracking-tight border-b border-slate-100 pb-3 text-left"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace('## ', '') }} 
        />
      );
    }
    
    if (line.startsWith('### ')) {
      return (
        <h3 key={index} 
            className="text-xl font-bold mt-8 mb-4 text-slate-800 text-left"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace('### ', '') }} 
        />
      );
    }
    
    if (line.startsWith('* ') || line.startsWith('- ')) {
      return (
        <li key={index} 
            className="ml-6 list-disc mb-2 text-slate-700 text-lg leading-relaxed text-left"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^(\* |- )/, '') }} 
        />
      );
    }
    
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={index} 
            className="ml-6 list-decimal mb-3 text-slate-700 text-lg leading-relaxed text-left"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^\d+\.\s/, '') }} 
        />
      );
    }

    return (
      <p key={index} 
         className="mb-6 text-slate-700 leading-relaxed text-lg text-left"
         dangerouslySetInnerHTML={{ __html: formattedLine }} 
      />
    );
  });
};

// ✅ MAIN PAGE COMPONENT
export default async function BlogPage({ params }) {
  const { slug } = await params;
  
  // Fetch main article and related articles in parallel
  const [blog, relatedBlogs] = await Promise.all([
    getBlog(slug),
    getBlog(slug).then(b => b ? getRelatedBlogs(slug, b.category) : []) 
  ]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center flex-col gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Article not found 😢</h1>
        <Link href="/blog" className="text-emerald-600 font-medium hover:underline">
          Return to Blog
        </Link>
      </div>
    );
  }

  const fallbackDescription = blog.content
    ? blog.content.replace(/<[^>]+>/g, '').substring(0, 160)
    : "Read the latest tips on our blog.";
  
  const finalDescription = blog.metaDescription || fallbackDescription;

  // 🚀 DYNAMIC JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": finalDescription,
    "articleSection": blog.category || "Blog",
    "keywords": blog.keywords || "",
    "author": {
      "@type": "Person",
      "name": blog.author || "GetKnowify Team" 
    },
    "publisher": {
      "@type": "Organization",
      "name": "GetKnowify",
      "logo": {
        "@type": "ImageObject",
        "url": "https://getknowify.com/logo.png" 
      }
    },
    "datePublished": blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString(), 
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 pb-20">
      
      {/* INJECT SEO SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* CLEAN BACKGROUND HEADER */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-white border-b border-slate-200/50 pointer-events-none z-0" />

      {/* NEW WIDER CONTAINER FOR TWO-COLUMN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blog" className="text-emerald-600 text-sm font-bold uppercase tracking-wider hover:text-emerald-700 transition-colors flex items-center gap-2">
            <span aria-hidden="true">&larr;</span> Back to Articles
          </Link>
        </nav>

        {/* TWO COLUMN GRID: 1 column on mobile, 12 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* ==============================================
              LEFT COLUMN: MAIN ARTICLE (Spans 8 columns)
              ============================================== */}
          <div className="lg:col-span-8">
            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-16">
              <div className="p-6 sm:p-8 md:p-12">
                
                {/* HEADER AREA - FORCED LEFT ALIGNMENT */}
                <header className="mb-10 text-left">
                  {blog.category && (
                    <div className="mb-5 inline-block">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full border border-emerald-100">
                        {blog.category}
                      </span>
                    </div>
                  )}

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-slate-900 tracking-tight text-left">
                    {blog.title}
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed mb-8 max-w-3xl text-left">
                    {finalDescription}
                  </p>
                  
                  {/* AUTHOR & META - FORCED LEFT ALIGNMENT */}
                  <div className="flex items-center justify-start gap-4 pt-6 border-t border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-200 flex-shrink-0">
                       {(blog.author?.charAt(0) || "G")}
                    </div>
                    <div className="text-left">
                      <p className="text-base font-bold text-slate-900">{blog.author || "GetKnowify Team"}</p>
                      <time className="text-sm text-slate-500 font-medium">
                        {blog.createdAt 
                          ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) 
                          : new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} 
                      </time>
                    </div>
                  </div>
                </header>

                {/* COVER IMAGE */}
                {blog.coverImage && (
                  <figure className="mb-12">
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-md border border-slate-100"
                    />
                  </figure>
                )}

                {/* ARTICLE CONTENT */}
                <div className="w-full text-left">
                  {blog.content?.includes("<h1>") || blog.content?.includes("<p>") || blog.content?.includes("<") 
                    ? <div className="prose prose-lg prose-slate max-w-none prose-a:text-emerald-600 hover:prose-a:text-emerald-700 prose-img:rounded-xl text-left" dangerouslySetInnerHTML={{ __html: blog.content }} />
                    : <div className="content-wrapper text-left">{renderContent(blog.content)}</div>
                  }
                </div>

              </div>
            </article>
          </div>

          {/* ==============================================
              RIGHT COLUMN: SIDEBAR (Spans 4 columns)
              ============================================== */}
          <aside className="lg:col-span-4">
            {/* STICKY CONTAINER: Keeps it visible while scrolling */}
            <div className="sticky top-8">
              
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Read Next</h3>
                  <Link href="/blog" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                    View all &rarr;
                  </Link>
                </div>
                
                {/* RELATED POSTS LIST (Vertical Stack) */}
                {relatedBlogs && relatedBlogs.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    {relatedBlogs.map((relatedPost) => (
                      <Link 
                        href={`/blogs/${relatedPost.slug}`} 
                        key={relatedPost._id || relatedPost.slug}
                        className="group flex flex-col gap-3"
                      >
                        {/* Sidebar Image */}
                        <div className="h-40 w-full bg-slate-100 rounded-xl overflow-hidden relative">
                          {relatedPost.coverImage ? (
                            <img 
                              src={relatedPost.coverImage} 
                              alt={relatedPost.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xl">
                              GetKnowify
                            </div>
                          )}
                          {relatedPost.category && (
                            <span className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-[9px] font-black uppercase tracking-widest rounded-md shadow-sm">
                              {relatedPost.category}
                            </span>
                          )}
                        </div>

                        {/* Sidebar Content */}
                        <div>
                          <h4 className="text-base font-bold text-slate-900 leading-snug mb-1 group-hover:text-emerald-600 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-slate-500 line-clamp-2">
                            {relatedPost.metaDescription || "Click to read more about this topic..."}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">More articles coming soon!</p>
                )}
              </div>

            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}