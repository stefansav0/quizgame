import Link from "next/link";

// ✅ FORCE DYNAMIC REVALIDATION
export const revalidate = 60;

// ✅ AUTO GENERATE BLOG SLUGS FOR SITEMAP + SEO
export async function generateStaticParams() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.getknowify.com";

    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch blog slugs");
      return [];
    }

    const data = await res.json();
    const blogs = data.success ? data.blogs : [];

    return blogs
      .filter((blog) => blog.slug && blog.status !== "draft")
      .map((blog) => ({
        slug: blog.slug,
      }));
  } catch (error) {
    console.error("generateStaticParams Error:", error);
    return [];
  }
}

// 🚀 SERVER-SIDE FETCH FUNCTION FOR MAIN BLOG
async function getBlog(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.getknowify.com";
    
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
    
    const res = await fetch(`${baseUrl}/api/blogs`, {
      next: { revalidate: 120 }, 
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    const allBlogs = data.success ? data.blogs : [];
    
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

  if (!blog) {
    return {
      title: "Blog Not Found | GetKnowify",
      description: "The requested article could not be found.",
    };
  }

  const description =
    blog.metaDescription ||
    (blog.content
      ? blog.content.replace(/<[^>]+>/g, "").substring(0, 160) + "..."
      : "Read the latest article on GetKnowify.");

  const image =
    blog.coverImage ||
    "https://www.getknowify.com/og-image.jpg";

  return {
    title: `${blog.title} | GetKnowify`,
    description,
    keywords: blog.keywords || "",
    alternates: {
      canonical: `https://www.getknowify.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description,
      url: `https://www.getknowify.com/blog/${blog.slug}`,
      siteName: "GetKnowify",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ✅ UPGRADED PARSER: Enforces Strict Vertical Spacing/Gaps
const renderContent = (content) => {
  if (!content) return null;

  // Split the content by newline and FILTER OUT empty lines.
  // This guarantees we apply a gap to valid text blocks without stacking extra margins.
  const lines = content.split('\n').filter(line => line.trim() !== '');

  return lines.map((line, index) => {
    const trimmed = line.trim();

    let formattedLine = trimmed
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
      .replace(/\[(.*?)\]/g, '<span class="text-emerald-600 font-semibold cursor-pointer hover:underline">$1</span>');

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={index} 
            className="text-2xl md:text-3xl font-extrabold mt-12 mb-6 text-slate-900 tracking-tight border-b border-slate-100 pb-3 text-left block"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace('## ', '') }} 
        />
      );
    }
    
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={index} 
            className="text-xl font-bold mt-8 mb-5 text-slate-800 text-left block"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace('### ', '') }} 
        />
      );
    }
    
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      return (
        <li key={index} 
            className="ml-6 list-disc mb-3 text-slate-700 text-lg leading-relaxed text-left block"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^(\* |- )/, '') }} 
        />
      );
    }
    
    if (/^\d+\.\s/.test(trimmed)) {
      return (
        <li key={index} 
            className="ml-6 list-decimal mb-3 text-slate-700 text-lg leading-relaxed text-left block"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^\d+\.\s/, '') }} 
        />
      );
    }

    // 🛠️ DEFAULT TEXT BLOCK: mb-8 added to explicitly force a gap between paragraphs!
    return (
      <p key={index} 
         className="mb-8 text-slate-700 leading-relaxed text-lg text-left block"
         dangerouslySetInnerHTML={{ __html: formattedLine }} 
      />
    );
  });
};

// ✅ MAIN PAGE COMPONENT
export default async function BlogPage({ params }) {
  const { slug } = await params;
  
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

  // ==========================================
  // 🛠️ DATA SANITIZATION & SPACING FIXES
  // ==========================================
  let safeContent = blog.content || "";

  // 1. Repair AI-hallucinated JSX arrays (.map logic fix)
  safeContent = safeContent.replace(
    /\{\[\s*([\s\S]*?)\s*\]\.map\([\s\S]*?=>\s*\([\s\S]*?\)\)\}/g,
    (match, arrayInner) => {
      const strings = [];
      const stringRegex = /"([^"]+)"|'([^']+)'/g;
      let m;
      
      while ((m = stringRegex.exec(arrayInner)) !== null) {
        strings.push(m[1] || m[2]);
      }
      
      if (strings.length > 0) {
        return `<ol class="ml-6 list-decimal mb-8">\n${strings.map(str => `<li class="mb-2 text-slate-700">${str}</li>`).join('\n')}\n</ol>`;
      }
      return match;
    }
  );

  // 2. Structural HTML check (ignores safe inline tags like <strong>, <a>, <br>)
  const hasStructuralHtml = /<\/?(p|h[1-6]|div|ul|ol|blockquote|table|section|article)[^>]*>/i.test(safeContent);

  // 3. Spacing Fix: Convert all <br> tags to newlines IF we are using the custom parser
  if (!hasStructuralHtml) {
    safeContent = safeContent.replace(/<br\s*\/?>/gi, '\n');
  }

  const fallbackDescription = safeContent
    .replace(/<[^>]+>/g, '')
    .substring(0, 160) || "Read the latest tips on our blog.";
  
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
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="absolute top-0 left-0 right-0 h-96 bg-white border-b border-slate-200/50 pointer-events-none z-0" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        <nav className="mb-8">
          <Link href="/blog" className="text-emerald-600 text-sm font-bold uppercase tracking-wider hover:text-emerald-700 transition-colors flex items-center gap-2">
            <span aria-hidden="true">&larr;</span> Back to Articles
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-8">
            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-16">
              <div className="p-6 sm:p-8 md:p-12">
                
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

                {blog.coverImage && (
                  <figure className="mb-12">
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-md border border-slate-100"
                    />
                  </figure>
                )}

                {/* 🛠️ APPLIED RENDERER LOGIC */}
                <div className="w-full text-left">
                  {hasStructuralHtml ? (
                    <div
                      className="
                        prose prose-slate prose-lg max-w-none 
                        prose-p:mb-8 prose-p:leading-8
                        prose-headings:text-slate-900
                        prose-h1:text-5xl prose-h1:font-black 
                        prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 
                        prose-h3:text-2xl prose-h3:font-semibold 
                        prose-ul:my-6 prose-li:my-2 prose-li:text-slate-700 
                        prose-a:text-emerald-600 hover:prose-a:text-emerald-700 
                        prose-img:rounded-3xl prose-img:shadow-xl 
                        prose-blockquote:border-emerald-500 prose-blockquote:text-slate-700
                      "
                      dangerouslySetInnerHTML={{ __html: safeContent }}
                    />
                  ) : (
                    <div className="content-wrapper">
                      {renderContent(safeContent)}
                    </div>
                  )}
                </div>

              </div>
            </article>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-8">
              
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Read Next</h3>
                  <Link href="/blog" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                    View all &rarr;
                  </Link>
                </div>
                
                {relatedBlogs && relatedBlogs.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    {relatedBlogs.map((relatedPost) => (
                      <Link 
                        href={`/blog/${relatedPost.slug}`} 
                        key={relatedPost._id || relatedPost.slug}
                        className="group flex flex-col gap-3"
                      >
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
