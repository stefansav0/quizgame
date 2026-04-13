import { blogs } from "@/lib/blogData"; 
import Link from "next/link";
import RelatedPosts from "@/components/RelatedPosts";

// ✅ DYNAMIC METADATA FOR SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | GetKnowify`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      authors: [blog.author || "GetKnowify Team"],
    },
  };
}

// ✅ UPGRADED PARSER: Now handles **bold** text and [Bracketed CTAs]
const renderContent = (content) => {
  return content.split('\n').map((line, index) => {
    // Skip empty lines cleanly
    if (line.trim() === '') {
      return <div key={index} className="h-3"></div>;
    }

    // Process inline bolding (**text**) and pseudo-links ([text])
    let formattedLine = line
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-black">$1</strong>')
      .replace(/\[(.*?)\]/g, '<span class="text-emerald-400 font-bold cursor-pointer hover:underline">$1</span>');

    // Render H2 tags
    if (line.startsWith('## ')) {
      return (
        <h2 key={index} 
            className="text-2xl md:text-3xl font-black mt-12 mb-4 text-emerald-400 tracking-tight"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace('## ', '') }} 
        />
      );
    }
    
    // Render H3 tags
    if (line.startsWith('### ')) {
      return (
        <h3 key={index} 
            className="text-xl font-bold mt-8 mb-3 text-white"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace('### ', '') }} 
        />
      );
    }
    
    // Render Bullet Points
    if (line.startsWith('* ') || line.startsWith('- ')) {
      return (
        <li key={index} 
            className="ml-6 list-disc mb-2 text-slate-300 text-lg"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^(\* |- )/, '') }} 
        />
      );
    }
    
    // Render Numbered Lists (e.g., "1. ", "2. ")
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={index} 
            className="ml-6 list-decimal mb-3 text-slate-300 text-lg"
            dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^\d+\.\s/, '') }} 
        />
      );
    }

    // Standard Paragraphs
    return (
      <p key={index} 
         className="mb-5 text-slate-300 leading-relaxed text-lg"
         dangerouslySetInnerHTML={{ __html: formattedLine }} 
      />
    );
  });
};

// ✅ MAIN PAGE COMPONENT
export default async function BlogPage({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0a0c10] text-white flex items-center justify-center flex-col gap-4">
        <h1 className="text-3xl font-bold">Article not found 😢</h1>
        <Link href="/blog" className="text-emerald-400 hover:underline">Return to Blog</Link>
      </div>
    );
  }

  // 🚀 DYNAMIC JSON-LD (Crucial for AdSense E-E-A-T)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.description,
    "author": {
      "@type": "Person",
      "name": blog.author || "Ravi K." // Uses the real author name we added
    },
    "publisher": {
      "@type": "Organization",
      "name": "GetKnowify",
      "logo": {
        "@type": "ImageObject",
        "url": "https://getknowify.com/logo.png" // Update with your actual logo URL
      }
    },
    // Fallback to today if you haven't added a date to the object yet
    "datePublished": blog.date ? new Date(blog.date).toISOString() : new Date().toISOString(), 
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-sans selection:bg-emerald-500/30">
      
      {/* INJECT SEO SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BACKGROUND GLOW */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[150%] h-80 bg-emerald-500/10 blur-[120px] pointer-events-none z-0" />

      <main className="max-w-3xl mx-auto px-6 py-20 relative z-10">
        
        {/* HEADER AREA */}
        <header className="mb-12 border-b border-white/10 pb-8 text-center md:text-left">
          <Link href="/blog" className="text-emerald-400 text-sm font-bold uppercase tracking-widest hover:text-emerald-300 mb-6 inline-block">
            ← Back to Articles
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            {blog.title}
          </h1>
          <p className="text-xl text-slate-400 font-medium">
            {blog.description}
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg">
              ✍️
            </div>
            <div className="text-left">
              {/* Dynamically pulling the author and category */}
              <p className="text-sm font-bold text-white">{blog.author || "Ravi K."}</p>
              <p className="text-xs text-slate-500">
                {blog.date || "2026"} • {blog.category || "Social Games"}
              </p>
            </div>
          </div>
        </header>

        {/* ARTICLE CONTENT */}
        <article className="mb-16">
          {renderContent(blog.content)}
        </article>

        {/* HIGH CONVERTING CALL TO ACTION */}
        <div className="bg-[#13151f] border border-emerald-500/30 rounded-3xl p-8 md:p-10 text-center shadow-[0_0_40px_rgba(16,185,129,0.1)] mb-16 relative overflow-hidden group cursor-pointer hover:border-emerald-400 transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-300"></div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Are your friends actually paying attention? 👀
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Stop guessing. Create your own custom viral friendship quiz in 60 seconds and see who makes it to the top of your leaderboard.
          </p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 text-emerald-950 font-black px-8 py-4 rounded-2xl hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Create Your Quiz 🚀
          </Link>
        </div>

        {/* AUTOMATED RELATED POSTS */}
        <RelatedPosts currentSlug={blog.slug} />

      </main>
    </div>
  );
}