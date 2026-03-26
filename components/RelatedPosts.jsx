"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { blogs } from "@/lib/blogData"; // Adjust this import path if needed

export default function RelatedPosts({ currentSlug }) {
  // 1. Filter out the current blog post so we don't recommend what they are already reading
  const availablePosts = blogs.filter((blog) => blog.slug !== currentSlug);

  // 2. Randomly shuffle the remaining posts and pick 3
  const relatedPosts = [...availablePosts]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-20 pt-12 border-t border-white/10 relative z-10">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">🔥</span>
        <h3 className="text-2xl md:text-3xl font-black text-white">
          Read Next
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group h-full"
          >
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <div className="bg-[#13151f] border border-white/5 hover:border-emerald-500/30 rounded-3xl p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)]">
                
                {/* Tag / Category Badge */}
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                    Trending
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-emerald-300 transition-colors">
                  {post.title}
                </h4>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {post.description.substring(0, 100)}...
                </p>

                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-emerald-500 group-hover:text-emerald-400 transition-colors">
                  Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}