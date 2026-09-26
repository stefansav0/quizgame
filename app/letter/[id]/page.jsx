
import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Letter from "@/models/Letter";
import LetterClient from "./LetterClient";

// Always retrieve the current letter from the database.
// This prevents a previously rendered letter page from
// remaining cached after the letter is deleted.
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Do not allow search engines to index personal letters.
export const robots = {
  index: false,
  follow: false,
};

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

function isValidLetterId(id) {
  return (
    typeof id === "string" &&
    mongoose.isValidObjectId(id) &&
    /^[a-fA-F0-9]{24}$/.test(id)
  );
}

async function findLetter(id) {
  if (!isValidLetterId(id)) {
    return null;
  }

  await connectDB();

  return Letter.findById(id).lean();
}

function serializeLetter(letter) {
  return {
    ...letter,

    _id: letter._id.toString(),

    createdAt: letter.createdAt
      ? new Date(letter.createdAt).toISOString()
      : null,

    updatedAt: letter.updatedAt
      ? new Date(letter.updatedAt).toISOString()
      : null,
  };
}

// --------------------------------------------------
// DYNAMIC METADATA
// --------------------------------------------------

export async function generateMetadata({ params }) {
  const { id } = await params;

  if (!isValidLetterId(id)) {
    return {
      title: "Letter Not Found | GetKnowify",
      description:
        "This secret letter is unavailable.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  try {
    const letter = await findLetter(id);

    if (!letter) {
      return {
        title: "Letter Not Found | GetKnowify",
        description:
          "This secret letter is no longer available.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const recipientName =
      typeof letter.recipientName === "string"
        ? letter.recipientName.trim()
        : "";

    const senderName =
      typeof letter.senderName === "string"
        ? letter.senderName.trim()
        : "";

    const title = recipientName
      ? `A Secret Letter for ${recipientName} 💌`
      : "You Have a Secret Letter 💌";

    const description = senderName
      ? `Someone has sent you a special message from ${senderName}. Open your digital envelope on GetKnowify.`
      : "Someone has sent you a special message. Open your digital envelope on GetKnowify.";

    const pageUrl =
      `https://getknowify.com/letter/${id}`;

    return {
      title,
      description,

      alternates: {
        canonical: pageUrl,
      },

      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
          noarchive: true,
          nosnippet: true,
        },
      },

      openGraph: {
        title,
        description,
        url: pageUrl,
        siteName: "GetKnowify",
        type: "website",
        images: [
          {
            url: "https://getknowify.com/og-letter.png",
            width: 1200,
            height: 630,
            alt: "A Secret Letter on GetKnowify",
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [
          "https://getknowify.com/og-letter.png",
        ],
      },
    };
  } catch (error) {
    console.error(
      "Failed to generate letter metadata:",
      error
    );

    return {
      title: "Secret Letter | GetKnowify",
      description:
        "Open your secret letter on GetKnowify.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

// --------------------------------------------------
// MAIN LETTER PAGE
// --------------------------------------------------

export default async function LetterPage({ params }) {
  const { id } = await params;

  if (!isValidLetterId(id)) {
    notFound();
  }

  let letter;

  try {
    letter = await findLetter(id);
  } catch (error) {
    console.error(
      "Failed to load secret letter:",
      error
    );

    // A database failure is not the same as a
    // deleted letter. Let Next.js show its error
    // boundary rather than incorrectly returning 404.
    throw error;
  }

  if (!letter) {
    notFound();
  }

  const serializedLetter = serializeLetter(letter);

  return (
    <main className="min-h-screen bg-[#0f111a]">
      <LetterClient letter={serializedLetter} />
    </main>
  );
}