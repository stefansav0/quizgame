"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();

        console.log("Blogs:", data.blogs);

        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="w-full max-w-6xl mx-auto mb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black">
            Latest Friendship Quiz Guides
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[420px] rounded-3xl bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-6xl mx-auto mb-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900">
          Latest Friendship Quiz Guides
        </h2>

        <p className="text-slate-600 mt-4 text-lg">
          Explore expert guides, friendship tips, quiz ideas and social games.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => {
          const image =
            blog.image ||
            blog.coverImage ||
            blog.featuredImage ||
            blog.thumbnail ||
            "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg";

          return (
            <Link
              key={blog._id}
              href={`/blog/${blog.slug}`}
              className="group"
            >
              <article className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 h-full">

                <div className="overflow-hidden">
                  <img
                    src={image}
                    alt={blog.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                      Blog
                    </span>

                    {blog.createdAt && (
                      <span className="text-sm text-slate-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-slate-600 line-clamp-3 mb-5">
                    {blog.excerpt ||
                      blog.description ||
                      "Read this detailed friendship quiz guide."}
                  </p>

                  <span className="text-indigo-600 font-semibold">
                    Read More →
                  </span>
                </div>

              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}