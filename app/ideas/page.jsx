import Link from "next/link";
import Image from "next/image";

// --- SEO CONFIGURATION ---
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.getknowify.com";

export const metadata = {
  title: {
    default: "Quiz & Game Ideas | GetKnowify",
    template: "%s | GetKnowify",
  },

  description:
    "Discover fun and useful quiz questions, friendship games, conversation starters, challenges, and creative ideas to enjoy with friends, couples, and family.",

  keywords: [
    "quiz ideas",
    "friendship quiz questions",
    "best friend quiz questions",
    "game ideas for friends",
    "never have I ever questions",
    "would you rather questions",
    "couple quiz questions",
    "birthday quiz ideas",
    "best friend challenges",
    "conversation starters",
  ],

  alternates: {
    canonical: `${SITE_URL}/ideas`,
  },

  openGraph: {
    title: "Quiz & Game Ideas | GetKnowify",
    description:
      "Explore quiz questions, friendship games, challenges, and conversation ideas for friends, couples, and family.",
    url: `${SITE_URL}/ideas`,
    siteName: "GetKnowify",
    images: [
      {
        url: `${SITE_URL}/og-blog-cover.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Quiz & Game Ideas | GetKnowify",
    description:
      "Find fun quiz questions, games, challenges, and conversation ideas.",
    images: [`${SITE_URL}/og-blog-cover.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// --- FETCH PUBLISHED CONTENT ---
async function getPublishedBlogs() {
  try {
    const res = await fetch(`${SITE_URL}/api/blogs`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    if (data.success && Array.isArray(data.blogs)) {
      return data.blogs.filter((blog) => blog.status === "published");
    }

    return [];
  } catch (error) {
    console.error("Ideas Fetch Error:", error);
    return [];
  }
}

export default async function IdeasPage() {
  const blogs = await getPublishedBlogs();

  // --- STRUCTURED DATA ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/ideas/#webpage`,
        url: `${SITE_URL}/ideas`,
        name: "Quiz & Game Ideas - GetKnowify",
        description:
          "Useful quiz questions, friendship games, challenges, and conversation ideas for friends, couples, and family.",
        breadcrumb: {
          "@id": `${SITE_URL}/ideas/#breadcrumb`,
        },
      },

      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/ideas/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Quiz & Game Ideas",
            item: `${SITE_URL}/ideas`,
          },
        ],
      },

      {
        "@type": "ItemList",
        itemListElement: blogs.map((blog, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/ideas/${blog.slug}`,
          name: blog.title,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/50 pointer-events-none" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">

        {/* BREADCRUMBS */}
        <nav
          className="flex mb-8 text-sm font-medium text-slate-500 uppercase tracking-wider"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="hover:text-emerald-600 transition-colors"
          >
            Home
          </Link>

          <span className="mx-3 text-slate-300">/</span>

          <span className="text-slate-800 font-semibold">
            Quiz & Game Ideas
          </span>
        </nav>

        {/* PAGE HEADER */}
        <header className="mb-16 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Quiz & Game{" "}
            <span className="text-emerald-600">Ideas</span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            Discover fun quiz questions, friendship games, challenges,
            conversation starters, and creative ideas to enjoy with friends,
            couples, and family.
          </p>
        </header>

        {/* INTRO VALUE SECTION */}
        <section className="mb-12 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Find an idea, then make it your own
          </h2>

          <p className="text-slate-600 leading-relaxed max-w-3xl">
            Looking for questions to ask your best friend, a fun game for a
            group, or ideas for your next couple quiz? Explore our guides and
            use them as inspiration for your own GetKnowify experience.
          </p>
        </section>

        {/* CONTENT GRID */}
        {blogs.length === 0 ? (
          <div className="text-center py-24 rounded-2xl border border-dashed border-slate-300 bg-white shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              New ideas are coming soon
            </h3>

            <p className="text-slate-500 font-medium">
              We're preparing useful quiz and game ideas for you.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/ideas/${blog.slug}`}
                className="group flex h-full"
              >
                <article className="flex flex-col w-full bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">

                  {/* IMAGE */}
                  <div className="h-52 w-full relative overflow-hidden bg-gradient-to-br from-emerald-50 via-slate-100 to-slate-200">
                    <Image
                      src={
                        blog.coverImage ||
                        blog.image ||
                        blog.featuredImage ||
                        "/fallback-blog.jpg"
                      }
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />

                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-500" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">

                    {/* META */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                        {blog.category || "Quiz & Game Ideas"}
                      </span>

                      <time className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                        {new Date(blog.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </time>
                    </div>

                    {/* TITLE */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2 leading-snug">
                      {blog.title}
                    </h2>

                    {/* EXCERPT */}
                    <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-3">
                      {blog.content
                        ?.replace(/<[^>]+>/g, "")
                        .substring(0, 150) ||
                        "Explore this quiz or game idea on GetKnowify."}
                      ...
                    </p>

                    {/* FOOTER */}
                    <div className="mt-auto pt-5 border-t border-slate-100 flex justify-between items-center">
                      <div className="flex items-center gap-2">

                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold">
                          {blog.author?.charAt(0) || "G"}
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {blog.author || "GetKnowify Team"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-emerald-600 text-sm font-bold group-hover:gap-2 transition-all">
                        Explore
                        <span aria-hidden="true">&rarr;</span>
                      </div>
                    </div>

                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}