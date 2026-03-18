import { connectDB } from "@/lib/mongodb";
import Letter from "@/models/Letter";
import LetterClient from "./LetterClient";

// --- ROMANTIC LINK PREVIEWS ---
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  await connectDB();
  const letter = await Letter.findById(id).lean();

  if (!letter) return { title: "Letter Not Found" };

  return {
    title: `You received a secret letter from ${letter.senderName} 💌`,
    description: `Tap to open your sealed envelope...`,
    openGraph: {
      title: `You received a secret letter from ${letter.senderName} 💌`,
      description: `Tap to open your sealed envelope...`,
      siteName: 'Secret Letters',
      type: 'website',
    },
  };
}

// --- THE MAIN SERVER COMPONENT ---
export default async function LetterPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  await connectDB();

  try {
    const letter = await Letter.findById(id).lean();

    if (!letter) {
      return (
        <div className="min-h-screen bg-[#0f111a] flex items-center justify-center text-white font-sans text-2xl font-bold">
          This letter was lost in the mail! 📭
        </div>
      );
    }

    const serializedLetter = {
      ...letter,
      _id: letter._id.toString(),
      createdAt: letter.createdAt?.toISOString(),
    };

    return <LetterClient letter={serializedLetter} />;
    
  } catch (error) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex items-center justify-center text-white font-sans text-2xl font-bold">
        Invalid Letter ID 🕵️‍♂️
      </div>
    );
  }
}