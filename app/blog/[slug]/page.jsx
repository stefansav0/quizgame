import { blogs } from "@/lib/blogData"; // Adjust this import if needed
import Link from "next/link";
import RelatedPosts from "@/components/RelatedPosts"; // Make sure you created this component from the previous step!

// ✅ GENERATE METADATA FOR SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Friendship Quizzes`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
    },
  };
}

// ✅ TINY PARSER TO CONVERT RAW TEXT INTO REAL SEO HTML TAGS
const renderContent = (content) => {
  return content.split('\n').map((line, index) => {
    // Render H2 tags
    if (line.startsWith('## ')) {
      return (
        <h2 key={index} className="text-2xl md:text-3xl font-black mt-10 mb-4 text-emerald-400 tracking-tight">
          {line.replace('## ', '')}
        </h2>
      );
    }
    // Render H3 tags
    if (line.startsWith('### ')) {
      return (
        <h3 key={index} className="text-xl font-bold mt-8 mb-3 text-white">
          {line.replace('### ', '')}
        </h3>
      );
    }
    // Render Bullet Points
    if (line.startsWith('* ') || line.startsWith('- ')) {
      return (
        <li key={index} className="ml-6 list-disc mb-2 text-slate-300 text-lg">
          {line.replace(/^(\* |- )/, '')}
        </li>
      );
    }
    // Empty lines
    if (line.trim() === '') {
      return <div key={index} className="h-2"></div>;
    }
    // Standard Paragraphs
    return (
      <p key={index} className="mb-4 text-slate-300 leading-relaxed text-lg">
        {line}
      </p>
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
        <h1 className="text-3xl font-bold">Blog not found 😢</h1>
        <Link href="/" className="text-emerald-400 hover:underline">Go back home</Link>
      </div>
    );
  }

  // Generate structured data for Google Search (Huge for SEO & AdSense)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.description,
    "author": {
      "@type": "Organization",
      "name": "Quiz Master"
    },
    "datePublished": "2026-03-26", // You can make this dynamic later
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-sans selection:bg-emerald-500/30">
      
      {/* 🚀 INJECT SEO SCHEMA */}
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
              <p className="text-sm font-bold text-white">Quiz Master</p>
              <p className="text-xs text-slate-500">Published in Friendship Quizzes</p>
            </div>
          </div>
        </header>

        {/* ARTICLE CONTENT */}
        <article className="mb-16">
          {renderContent(blog.content)}
        </article>

        {/* HIGH CONVERTING CALL TO ACTION */}
        <div className="bg-[#13151f] border border-emerald-500/30 rounded-3xl p-8 md:p-10 text-center shadow-[0_0_40px_rgba(16,185,129,0.1)] mb-16 relative overflow-hidden group">
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

        {/* 🔗 AUTOMATED RELATED POSTS */}
        <RelatedPosts currentSlug={blog.slug} />

      </main>
    </div>
  );
}