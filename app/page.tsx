import HomeClient from "./HomeClient"; // Import the client component we just made
import type { Metadata } from "next";

// --- ADVANCED SEO METADATA ---
export const metadata: Metadata = {
  title: "How Well Do You Know Me? | The Ultimate Friendship Quiz",
  description: "Create your custom 'How Well Do You Know Me' quiz in seconds. Test your best friends, crush, or partner to see who really knows you best. 100% Free online quiz maker.",
  keywords: ["how well do you know me", "friendship test", "best friend quiz", "BFF quiz", "couples quiz", "friendship quiz online"],
  openGraph: {
    title: "How Well Do You Know Me? | Friendship Quiz",
    description: "Dare your friends to take your custom quiz. See who scores highest on the live leaderboard!",
    url: "https://www.getknowify.com",
    siteName: "Getknowify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Well Do You Know Me? | Friendship Quiz",
    description: "Dare your friends to take your custom quiz and check the live leaderboard!",
  }
};

export default function Page() {
  // --- JSON-LD STRUCTURED DATA FOR GOOGLE ---
  // This FAQ Schema allows Google to show your Q&As directly in search results!
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is the How Well Do You Know Me quiz free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Creating a quiz, sharing it, and checking your leaderboard is 100% free forever. There are no hidden fees."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this as a Couples Quiz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. While it's popular as a BFF test, many users send their quiz link to their boyfriend, girlfriend, or crush to test relationship compatibility."
        }
      },
      {
        "@type": "Question",
        "name": "Are my quiz answers private?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your privacy is our priority. Your secret dashboard is only accessible to you, and you can delete your quiz and data from our servers at any time."
        }
      }
    ]
  };

  return (
    <>
      {/* Inject the SEO Schema invisibly into the head of the document */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Render the actual visual page */}
      <HomeClient />
    </>
  );
}