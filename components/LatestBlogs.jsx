"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
      });
  }, []);

  return (
    <section className="w-full max-w-5xl mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black">
          Latest Friendship Quiz Guides
        </h2>

        <p className="text-slate-600 mt-4">
          Explore expert guides and quiz ideas.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog.slug}`}
          >
            <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 transition">
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}

              <h3 className="font-bold text-lg mb-2">
                {blog.title}
              </h3>

              <p className="text-slate-600">
                {blog.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}