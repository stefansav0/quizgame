"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();

        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="w-full max-w-6xl mb-24">
        <h2 className="text-4xl font-black text-center mb-8">
          Latest Friendship Quiz Guides
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white rounded-3xl border border-slate-200 h-[350px] animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-6xl mb-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900">
          Latest Friendship Quiz Guides
        </h2>

        <p className="text-slate-600 mt-4 text-lg">
          Explore expert guides and quiz ideas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog.slug}`}
            className="group"
          >
            <article className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 h-full">
              
              <img
                src={blog.image || "/placeholder.jpg"}
                alt={blog.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="p-6">
                <p className="text-sm text-slate-500 mb-2">
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : ""}
                </p>

                <h3 className="font-bold text-xl text-slate-900 mb-3 line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-slate-600 line-clamp-3 mb-4">
                  {blog.excerpt}
                </p>

                <span className="text-indigo-600 font-semibold">
                  Read More →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}