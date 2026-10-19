import Link from "next/link";
import Image from "next/image";

// --- SEO CONFIGURATION ---
const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.getknowify.com";
// Strip trailing slash so `${SITE_URL}/api/blogs` never becomes `//api/blogs`.
const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

// Tiny 1x1 transparent blur placeholder (base64). Replace with a real
// low-res version of your fallback if you want a nicer blur effect.
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSI5Ij48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0iI2UyZThmMCIvPjwvc3ZnPg==";

export const metadata = {
  metadataBase: new URL(SITE_URL),

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
        alt: "Quiz & Game Ideas on GetKnowify",
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

// --- HELPERS ---

function getCoverImage(blog) {
  const candidates = [blog?.coverImage, blog?.image, blog?.featuredImage];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
    // Support common CMS shapes such as `{ url, width, height }`.
    if (
      value &&
      typeof value === "object" &&
      typeof value.url === "string" &&
      value.url.trim()
    ) {
      return value.url.trim();
    }
  }

  return "/fallback-blog.jpg";
}

function toAbsoluteUrl(url) {
  if (!url) return `${SITE_URL}/og-blog-cover.jpg`;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

function getFormattedDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function decodeHtmlEntities(value) {
  const namedEntities = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    "#39": "'",
  };

  return value.replace(
    /&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|#39);/gi,
    (entity, match) => {
      const key = match.toLowerCase();

      if (key.startsWith("#x")) {
        const codePoint = Number.parseInt(key.slice(2), 16);
        return Number.isFinite(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
          ? String.fromCodePoint(codePoint)
          : " ";
      }

      if (key.startsWith("#")) {
        const codePoint = Number.parseInt(key.slice(1), 10);
        return Number.isFinite(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
          ? String.fromCodePoint(codePoint)
          : " ";
      }

      return namedEntities[key] ?? entity;
    }
  );
}

function getExcerpt(blog, length = 150) {
  const raw =
    typeof blog?.excerpt === "string" && blog.excerpt.trim()
      ? blog.excerpt
      : typeof blog?.content === "string"
        ? blog.content
        : "";

  if (!raw.trim()) {
    return "Explore this quiz or game idea on GetKnowify.";
  }

  // Decode escaped HTML first so strings such as "&lt;p&gt;" do not
  // appear literally in the preview. Repeat twice for double-escaped content.
  let plain = raw;
  for (let i = 0; i < 2; i += 1) {
    const decoded = decodeHtmlEntities(plain);
    if (decoded === plain) break;
    plain = decoded;
  }

  // Remove non-visible content and HTML tags without rendering HTML.
  plain = plain
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plain) {
    return "Explore this quiz or game idea on GetKnowify.";
  }

  return plain.length > length
    ? `${plain.slice(0, length).trimEnd()}...`
    : plain;
}

function getAuthorInitial(author) {
  if (typeof author !== "string") return "G";
  const initial = author.trim().charAt(0);
  return initial ? initial.toUpperCase() : "G";
}

export default async function IdeasPage() {
  const blogs = await getPublishedBlogs();

  // --- STRUCTURED DATA ---
  const jsonLdGraph = [
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/ideas/#webpage`,
      url: `${SITE_URL}/ideas`,
      name: "Quiz & Game Ideas - GetKnowify",
      description:
        "Useful quiz questions, friendship games, challenges, and conversation ideas for friends, couples, and family.",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "GetKnowify",
      },
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
  ];

  if (blogs.length > 0) {
    jsonLdGraph.push({
      "@type": "ItemList",
      itemListElement: blogs.map((blog, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          url: `${SITE_URL}/ideas/${blog.slug}`,
          headline: blog.title,
          image: toAbsoluteUrl(getCoverImage(blog)),
          datePublished: blog.createdAt || undefined,
          author: {
            "@type": "Person",
            name: blog.author || "GetKnowify Team",
          },
        },
      })),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": jsonLdGraph,
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
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>

          <span className="mx-3 text-slate-300">/</span>

          <span className="text-slate-800 font-semibold">
            Quiz &amp; Game Ideas
          </span>
        </nav>

        {/* PAGE HEADER */}
        <header className="mb-16 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Quiz &amp; Game <span className="text-emerald-600">Ideas</span>
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
              We&apos;re preparing useful quiz and game ideas for you.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => {
              // Prioritize the first row (3 cards on desktop) so the LCP
              // image loads immediately instead of lazily.
              const isAboveTheFold = index < 3;
              const formattedDate = getFormattedDate(blog.createdAt);
              const authorName = blog.author || "GetKnowify Team";

              return (
                <Link
                  key={blog._id || blog.slug || `blog-${index}`}
                  href={`/ideas/${blog.slug}`}
                  className="group flex h-full"
                >
                  <article className="flex flex-col w-full bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
                    {/* IMAGE */}
                    <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-slate-100 to-slate-200">
                      <Image
                        src={getCoverImage(blog)}
                        alt={blog.title || "Quiz and game idea cover"}
                        fill
                        // Do NOT use `unoptimized` — it disables WebP/AVIF,
                        // resizing, and lazy loading handled by Next.js.
                        // `priority` implies eager loading for LCP; the
                        // default for the rest is lazy.
                        priority={isAboveTheFold}
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-500 pointer-events-none" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                      {/* META */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                          {blog.category || "Quiz & Game Ideas"}
                        </span>

                        {formattedDate && (
                          <time
                            dateTime={blog.createdAt}
                            className="text-xs text-slate-500 font-medium uppercase tracking-wide"
                          >
                            {formattedDate}
                          </time>
                        )}
                      </div>

                      {/* TITLE */}
                      <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2 leading-snug">
                        {blog.title}
                      </h2>

                      {/* EXCERPT */}
                      <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-3">
                        {getExcerpt(blog)}
                      </p>

                      {/* FOOTER */}
                      <div className="mt-auto pt-5 border-t border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold">
                            {getAuthorInitial(authorName)}
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {authorName}
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
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}