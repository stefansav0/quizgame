
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg";

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs/public", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch ideas");
        }

        const data = await res.json();

        if (controller.signal.aborted) return;

        const publishedBlogs = Array.isArray(data.blogs)
          ? data.blogs.slice(0, 6)
          : [];

        setBlogs(publishedBlogs);
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Failed to load quiz ideas:", error);
        setBlogs([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchBlogs();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-[420px] animate-pulse rounded-3xl border border-slate-200 bg-slate-100"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Quiz &amp; Game Ideas
          </h3>

          <p className="mt-3 text-slate-600">
            New quiz and game ideas are coming soon.
          </p>

          <Link
            href="/ideas"
            prefetch={false}
            className="mt-6 inline-flex rounded-2xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            Explore Ideas →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => {
          const image =
            blog.image ||
            blog.coverImage ||
            blog.featuredImage ||
            blog.thumbnail ||
            FALLBACK_IMAGE;

          const category =
            blog.category || "Quiz & Game Ideas";

          const date = blog.createdAt
            ? new Date(blog.createdAt)
            : null;

          const formattedDate =
            date && !Number.isNaN(date.getTime())
              ? date.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : null;

          return (
            <Link
              key={blog._id || blog.slug}
              href={`/ideas/${blog.slug}`}
              prefetch={false}
              className="group block h-full"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl">

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={image}
                    alt={blog.title || "Quiz and game idea"}
                    loading="lazy"
                    decoding="async"
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-6">

                  {/* CATEGORY & DATE */}
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                      {category}
                    </span>

                    {formattedDate && (
                      <span className="text-xs text-slate-500">
                        {formattedDate}
                      </span>
                    )}
                  </div>

                  {/* TITLE */}
                  <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-7 text-slate-900 transition-colors group-hover:text-indigo-700">
                    {blog.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mb-6 line-clamp-3 text-sm leading-7 text-slate-600">
                    {blog.excerpt ||
                      blog.description ||
                      blog.metaDescription ||
                      "Explore this useful quiz or game idea from the GetKnowify Team."}
                  </p>

                  {/* READ MORE */}
                  <div className="mt-auto">
                    <span className="inline-flex items-center font-semibold text-indigo-600 transition group-hover:gap-2 group-hover:text-indigo-700">
                      Read the idea
                      <span className="ml-1 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
