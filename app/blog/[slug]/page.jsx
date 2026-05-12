import Link from "next/link";

// 🚀 SERVER-SIDE FETCH FUNCTION
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

// ✅ DYNAMIC METADATA FOR SEO (Now using your custom Meta Description & Keywords)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return { title: "Blog Not Found | GetKnowify" };

  // Use the dedicated metaDescription from DB, fallback to content snippet if missing
  const description = blog.metaDescription || (blog.content
    ? blog.content.replace(/<[^>]+>/g, '').substring(0, 160) + "..."
    : "Read the latest tips and trends on our blog.");

  // Safely parse the comma-separated keywords string into an array for Next.js metadata
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
            className="text-2xl md:text-3xl font-extrabold mt-12 mb-6 text-slate-900 tracking-tight border-b border-slate-100 pb-3"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace('## ', '') }} 
        />
      );
    }
    
    if (line.startsWith('### ')) {
      return (
        <h3 key={index} 
            className="text-xl font-bold mt-8 mb-4 text-slate-800"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace('### ', '') }} 
        />
      );
    }
    
    if (line.startsWith('* ') || line.startsWith('- ')) {
      return (
        <li key={index} 
            className="ml-6 list-disc mb-2 text-slate-700 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^(\* |- )/, '') }} 
        />
      );
    }
    
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={index} 
            className="ml-6 list-decimal mb-3 text-slate-700 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^\d+\.\s/, '') }} 
        />
      );
    }

    return (
      <p key={index} 
         className="mb-6 text-slate-700 leading-relaxed text-lg"
         dangerouslySetInnerHTML={{ __html: formattedLine }} 
      />
    );
  });
};

// ✅ MAIN PAGE COMPONENT
export default async function BlogPage({ params }) {
  const { slug } = await params;
  
  const blog = await getBlog(slug);

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

  // Fallback description just in case
  const fallbackDescription = blog.content
    ? blog.content.replace(/<[^>]+>/g, '').substring(0, 160)
    : "Read the latest tips on our blog.";
  
  const finalDescription = blog.metaDescription || fallbackDescription;

  // 🚀 DYNAMIC JSON-LD (Now incredibly robust for AdSense & Google Discover)
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* INJECT SEO SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* CLEAN BACKGROUND HEADER */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-white border-b border-slate-200/50 pointer-events-none z-0" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blog" className="text-emerald-600 text-sm font-bold uppercase tracking-wider hover:text-emerald-700 transition-colors flex items-center gap-2">
            <span aria-hidden="true">&larr;</span> Back to Articles
          </Link>
        </nav>

        {/* MAIN ARTICLE CARD */}
        <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          
          <div className="p-8 md:p-12 lg:p-16">
            {/* HEADER AREA */}
            <header className="mb-12 text-center md:text-left">
              
              {/* ✨ NEW: Category Badge */}
              {blog.category && (
                <div className="mb-5 inline-block">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full border border-emerald-100">
                    {blog.category}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-slate-900 tracking-tight">
                {blog.title}
              </h1>
              
              {/* ✨ NEW: Uses exact Meta Description as the article subtitle */}
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8 max-w-3xl">
                {finalDescription}
              </p>
              
              {/* AUTHOR & META */}
              <div className="flex items-center justify-center md:justify-start gap-4 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-200">
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
              <figure className="mb-14">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-md border border-slate-100"
                />
              </figure>
            )}

            {/* ARTICLE CONTENT */}
            <div className="max-w-3xl mx-auto">
              {blog.content?.includes("<h1>") || blog.content?.includes("<p>") || blog.content?.includes("<") 
                ? <div className="prose prose-lg prose-slate max-w-none prose-a:text-emerald-600 hover:prose-a:text-emerald-700 prose-img:rounded-xl" dangerouslySetInnerHTML={{ __html: blog.content }} />
                : <div className="content-wrapper">{renderContent(blog.content)}</div>
              }
            </div>
          </div>
        </article>

      </main>
    </div>
  );
}