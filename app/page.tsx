
import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const SITE_URL = "https://www.getknowify.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  title: "How Well Do You Know Me? | The Ultimate Friendship Quiz",
  description:
    "Create your custom 'How Well Do You Know Me' quiz in seconds. Test your best friends, crush, or partner to see who really knows you best. 100% Free online quiz maker.",

  keywords: [
    "how well do you know me",
    "friendship test",
    "best friend quiz",
    "BFF quiz",
    "couples quiz",
    "friendship quiz online",
    "viral quiz maker",
    "test my friends",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "How Well Do You Know Me? | GetKnowify",
    description:
      "Dare your friends to take your custom quiz. See who scores highest on the live leaderboard!",
    url: SITE_URL,
    siteName: "GetKnowify",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "GetKnowify - Friendship Quiz Leaderboard",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "How Well Do You Know Me? | GetKnowify",
    description:
      "Dare your friends to take your custom quiz and check the live leaderboard!",
    images: [OG_IMAGE],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GetKnowify",
    url: SITE_URL,
    description:
      "Create friendship quizzes, play games, and discover who knows you best.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the How Well Do You Know Me quiz free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Creating a quiz, sharing it, and checking your leaderboard is free.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this as a Couples Quiz?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can share your quiz with your partner, boyfriend, girlfriend, or crush to see how well they know you.",
        },
      },
      {
        "@type": "Question",
        name: "Are my quiz answers private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Review the site's privacy policy for details about quiz access, stored information, and available deletion options.",
        },
      },
    ],
  },
];

const jsonLdScript = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript }}
      />

      <HomeClient />
    </>
  );
}
