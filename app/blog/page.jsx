import { blogs } from "@/lib/blogData"; // Adjust this import if needed
import Link from "next/link";

// ✅ ADD METADATA FOR SEO
export const metadata = {
  title: "The Friendship Quiz Blog | Tips, Ideas & Viral Trends",
  description: "Discover the best friendship quiz questions, viral trends, and guides to testing your best friends. Read the latest tips on our blog.",
  openGraph: {
    title: "The Friendship Quiz Blog",
    description: "Discover the best friendship quiz questions, viral trends, and guides to testing your best friends.",
    type: "website",
  },
};

export default function BlogList() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-sans selection:bg-emerald-500/30 pb-20">
      
      {/* Background Glow Effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[150%] h-80 bg-emerald-500/10 blur-[120px] pointer-events-none z-0" />

      <main className="max-w-5xl mx-auto px-6 pt-24 relative z-10">
        
        {/* HERO SECTION */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-6">
            <span>📚</span> Our Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent">
            Tips, Tricks & <br className="hidden md:block" />
            <span className="text-white">Viral Quiz Ideas.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about testing friendships, exposing fake friends, and creating the ultimate viral quiz.
          </p>
        </header>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group block h-full"
            >
              <article className="bg-[#13151f] border border-white/5 hover:border-emerald-500/40 rounded-3xl p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)] relative overflow-hidden">
                
                {/* Subtle top border gradient on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badge */}
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                    Guide
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 leading-snug group-hover:text-emerald-300 transition-colors">
                  {blog.title}
                </h2>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                  {blog.description}
                </p>

                {/* Read More Link (Pushed to bottom) */}
                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-emerald-500 group-hover:text-emerald-400 transition-colors">
                  Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
                
              </article>
            </Link>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-20 text-center border-t border-white/10 pt-16">
          <p className="text-slate-400 mb-6 font-medium">Ready to put these tips to the test?</p>
          <Link
            href="/"
            className="inline-block bg-emerald-500 text-emerald-950 font-black px-8 py-4 rounded-2xl hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Create Your Own Quiz 🚀
          </Link>
        </div>

      </main>
    </div>
  );
}