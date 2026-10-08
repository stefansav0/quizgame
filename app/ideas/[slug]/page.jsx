import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// ======================================================
// REVALIDATION
// ======================================================

export const revalidate = 60;

// ======================================================
// GET ALL PUBLISHED SLUGS
// ======================================================

export async function generateStaticParams() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.getknowify.com";

    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch idea slugs");
      return [];
    }

    const data = await res.json();
    const blogs = data.success ? data.blogs : [];

    return blogs
      .filter(
        (blog) =>
          blog.slug &&
          blog.status === "published"
      )
      .map((blog) => ({
        slug: blog.slug,
      }));
  } catch (error) {
    console.error("generateStaticParams Error:", error);
    return [];
  }
}

// ======================================================
// GET SINGLE IDEA
// ======================================================

async function getIdea(slug) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.getknowify.com";

    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch idea ${slug}. Status:`,
        res.status
      );

      return null;
    }

    const data = await res.json();

    const blog = data.success ? data.blog : null;

    // Never expose drafts publicly
    if (!blog || blog.status !== "published") {
      return null;
    }

    return blog;
  } catch (error) {
    console.error("Failed to fetch idea:", error);
    return null;
  }
}

// ======================================================
// GET RELATED IDEAS
// ======================================================

async function getRelatedIdeas(
  currentSlug,
  currentCategory
) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.getknowify.com";

    const res = await fetch(`${baseUrl}/api/blogs`, {
      next: {
        revalidate: 120,
      },
    });

    if (!res.ok) return [];

    const data = await res.json();

    const allBlogs = data.success ? data.blogs : [];

    const related = allBlogs
      .filter(
        (blog) =>
          blog.slug !== currentSlug &&
          blog.status === "published"
      )
      .sort((a, b) => {
        if (
          currentCategory &&
          a.category === currentCategory &&
          b.category !== currentCategory
        ) {
          return -1;
        }

        if (
          currentCategory &&
          a.category !== currentCategory &&
          b.category === currentCategory
        ) {
          return 1;
        }

        return 0;
      })
      .slice(0, 4);

    return related;
  } catch (error) {
    console.error(
      "Failed to fetch related ideas:",
      error
    );

    return [];
  }
}

// ======================================================
// DYNAMIC SEO METADATA
// ======================================================

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const idea = await getIdea(slug);

  // Draft / missing article
  if (!idea) {
    return {
      title: "Idea Not Found | GetKnowify",
      description:
        "The requested quiz or game idea could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    idea.metaDescription ||
    (idea.content
      ? idea.content
          .replace(/<[^>]+>/g, "")
          .substring(0, 160) + "..."
      : "Discover useful quiz and game ideas on GetKnowify.");

  const image =
    idea.coverImage ||
    "https://www.getknowify.com/og-image.jpg";

  return {
    title: `${idea.title} | GetKnowify`,
    description,

    keywords: idea.keywords || "",

    alternates: {
      canonical: `https://www.getknowify.com/ideas/${idea.slug}`,
    },

    openGraph: {
      title: idea.title,
      description,
      url: `https://www.getknowify.com/ideas/${idea.slug}`,
      siteName: "GetKnowify",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: idea.title,
        },
      ],

      locale: "en_US",
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: idea.title,
      description,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// ======================================================
// LEGACY TEXT CONTENT RENDERER
// ======================================================

const renderContent = (content) => {
  if (!content) return null;

  const lines = content
    .split("\n")
    .filter((line) => line.trim() !== "");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    let formattedLine = trimmed
      .replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      )
      .replace(
        /\[(.*?)\]/g,
        "<span>$1</span>"
      );

    // H2
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="idea-fallback-h2"
          dangerouslySetInnerHTML={{
            __html: formattedLine.replace(
              "## ",
              ""
            ),
          }}
        />
      );
    }

    // H3
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="idea-fallback-h3"
          dangerouslySetInnerHTML={{
            __html: formattedLine.replace(
              "### ",
              ""
            ),
          }}
        />
      );
    }

    // Bullet
    if (
      trimmed.startsWith("* ") ||
      trimmed.startsWith("- ")
    ) {
      return (
        <div
          key={index}
          className="idea-fallback-bullet"
          dangerouslySetInnerHTML={{
            __html: formattedLine.replace(
              /^(\* |- )/,
              ""
            ),
          }}
        />
      );
    }

    // Number
    if (/^\d+\.\s/.test(trimmed)) {
      return (
        <div
          key={index}
          className="idea-fallback-number"
          dangerouslySetInnerHTML={{
            __html: formattedLine.replace(
              /^\d+\.\s/,
              ""
            ),
          }}
        />
      );
    }

    // Paragraph
    return (
      <p
        key={index}
        className="idea-fallback-p"
        dangerouslySetInnerHTML={{
          __html: formattedLine,
        }}
      />
    );
  });
};

// ======================================================
// DECODE HTML ENTITIES
// ======================================================

function decodeHtmlEntities(html) {
  if (!html) return "";

  return html
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#x2F;/gi, "/")
    .replace(/&#47;/gi, "/")
    .replace(/&#96;/gi, "`")
    .replace(/&amp;/gi, "&");
}

// ======================================================
// MAIN IDEA PAGE
// ======================================================

export default async function IdeaPage({ params }) {
  const { slug } = await params;

  const idea = await getIdea(slug);

  // ====================================================
  // IMPORTANT:
  // Drafts and missing articles return a real 404
  // ====================================================

  if (!idea) {
    notFound();
  }

  // ====================================================
  // RELATED IDEAS
  // ====================================================

  const relatedIdeas = await getRelatedIdeas(
    slug,
    idea.category
  );

  // ====================================================
  // CONTENT
  // ====================================================

  let safeContent = idea.content || "";

  safeContent = decodeHtmlEntities(safeContent);

  // ====================================================
  // STRUCTURAL HTML DETECTION
  // ====================================================

  const hasStructuralHtml =
    /<(p|h1|h2|h3|h4|h5|h6|ul|ol|li|blockquote|table|thead|tbody|tr|th|td|div|section|article|a|strong|em|br)\b[^>]*>/i.test(
      safeContent
    );

  // ====================================================
  // DESCRIPTION
  // ====================================================

  const fallbackDescription =
    safeContent
      .replace(/<[^>]+>/g, "")
      .substring(0, 160) ||
    "Discover useful quiz and game ideas on GetKnowify.";

  const finalDescription =
    idea.metaDescription ||
    fallbackDescription;

  // ====================================================
  // JSON-LD
  // ====================================================

  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "Article",

    headline: idea.title,

    description: finalDescription,

    articleSection:
      idea.category || "Quiz & Game Ideas",

    keywords: idea.keywords || "",

    author: {
      "@type": "Person",
      name: idea.author || "GetKnowify Team",
    },

    publisher: {
      "@type": "Organization",
      name: "GetKnowify",

      logo: {
        "@type": "ImageObject",
        url: "https://getknowify.com/logo.png",
      },
    },

    datePublished: idea.createdAt
      ? new Date(idea.createdAt).toISOString()
      : new Date().toISOString(),

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.getknowify.com/ideas/${idea.slug}`,
    },
  };

  // ====================================================
  // PAGE
  // ====================================================

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 pb-20">

      {/* JSON-LD */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* BACKGROUND */}

      <div className="absolute top-0 left-0 right-0 h-96 bg-white border-b border-slate-200/50 pointer-events-none z-0" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">

        {/* BACK */}

        <nav className="mb-8">
          <Link
            href="/ideas"
            className="text-emerald-600 text-sm font-bold uppercase tracking-wider hover:text-emerald-700 transition-colors flex items-center gap-2"
          >
            <span aria-hidden="true">
              &larr;
            </span>

            Back to Quiz & Game Ideas
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* ==================================================
              MAIN ARTICLE
          ================================================== */}

          <div className="lg:col-span-8">

            <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-16">

              <div className="p-6 sm:p-8 md:p-12">

                {/* HEADER */}

                <header className="mb-10 text-left">

                  {idea.category && (
                    <div className="mb-5 inline-block">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full border border-emerald-100">
                        {idea.category}
                      </span>
                    </div>
                  )}

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-slate-900 tracking-tight text-left">
                    {idea.title}
                  </h1>

                  <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed mb-8 max-w-3xl text-left">
                    {finalDescription}
                  </p>

                  {/* AUTHOR */}

                  <div className="flex items-center justify-start gap-4 pt-6 border-t border-slate-100">

                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg border border-slate-200 flex-shrink-0">
                      {idea.author?.charAt(0) || "G"}
                    </div>

                    <div className="text-left">

                      <p className="text-base font-bold text-slate-900">
                        {idea.author ||
                          "GetKnowify Team"}
                      </p>

                      <time className="text-sm text-slate-500 font-medium">
                        {idea.createdAt
                          ? new Date(
                              idea.createdAt
                            ).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </time>

                    </div>

                  </div>

                </header>

                {/* COVER IMAGE */}

                {idea.coverImage && (
                  <figure className="mb-12">

                    <img
                      src={idea.coverImage}
                      alt={idea.title}
                      className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-md border border-slate-100"
                    />

                  </figure>
                )}

                {/* ==================================================
                    ARTICLE CONTENT
                ================================================== */}

                <div className="w-full text-left">

                  {hasStructuralHtml ? (

                    <div
                      className="idea-html-content"
                      dangerouslySetInnerHTML={{
                        __html: safeContent,
                      }}
                    />

                  ) : (

                    <div className="idea-fallback-content">
                      {renderContent(safeContent)}
                    </div>

                  )}

                </div>

              </div>

            </article>

          </div>

          {/* ==================================================
              RELATED IDEAS
          ================================================== */}

          <aside className="lg:col-span-4">

            <div className="sticky top-8">

              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">

                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">

                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Explore More Ideas
                  </h3>

                  <Link
                    href="/ideas"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    View all &rarr;
                  </Link>

                </div>

                {relatedIdeas &&
                relatedIdeas.length > 0 ? (

                  <div className="flex flex-col gap-6">

                    {relatedIdeas.map(
                      (relatedIdea) => (

                        <Link
                          href={`/ideas/${relatedIdea.slug}`}
                          key={
                            relatedIdea._id ||
                            relatedIdea.slug
                          }
                          className="group flex flex-col gap-3"
                        >

                          <div className="h-40 w-full bg-slate-100 rounded-xl overflow-hidden relative">

                            {relatedIdea.coverImage ? (

                              <img
                                src={
                                  relatedIdea.coverImage
                                }
                                alt={
                                  relatedIdea.title
                                }
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />

                            ) : (

                              <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xl">
                                GetKnowify
                              </div>

                            )}

                            {relatedIdea.category && (
                              <span className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-[9px] font-black uppercase tracking-widest rounded-md shadow-sm">
                                {relatedIdea.category}
                              </span>
                            )}

                          </div>

                          <div>

                            <h4 className="text-base font-bold text-slate-900 leading-snug mb-1 group-hover:text-emerald-600 transition-colors line-clamp-2">
                              {relatedIdea.title}
                            </h4>

                            <p className="text-sm text-slate-500 line-clamp-2">
                              {relatedIdea.metaDescription ||
                                "Explore this useful quiz or game idea on GetKnowify."}
                            </p>

                          </div>

                        </Link>

                      )
                    )}

                  </div>

                ) : (

                  <p className="text-slate-500 text-sm">
                    More quiz and game ideas coming soon!
                  </p>

                )}

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}