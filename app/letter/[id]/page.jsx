import { connectDB } from "@/lib/mongodb";
import Letter from "@/models/Letter";
import LetterClient from "./LetterClient";
import Link from "next/link"; 

// 🚨 CRITICAL FIX FOR VERCEL DEPLOYMENTS 🚨
// This line completely disables caching for this page. 
// If a letter is deleted, the link will INSTANTLY break and show the 404 page.
export const dynamic = "force-dynamic";

// --- ROMANTIC LINK PREVIEWS ---
export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    await connectDB();
    const letter = await Letter.findById(id).lean();

    if (!letter) return { title: "Letter Not Found | Getknowify" };

    return {
      title: `Secret letter for ${letter.recipientName} 💌`,
      description: `Tap to open your sealed envelope from ${letter.senderName}...`,
      openGraph: {
        title: `Secret letter for ${letter.recipientName} 💌`,
        description: `Tap to open your sealed envelope from ${letter.senderName}...`,
        siteName: 'Getknowify',
        type: 'website',
      },
    };
  } catch (error) {
    // Failsafe in case the ID is malformed
    return { title: "Letter Not Found | Getknowify" }; 
  }
}

// --- THE MAIN SERVER COMPONENT ---
export default async function LetterPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  await connectDB();

  // Helper function to render a beautiful 404 page if deleted or missing
  const renderNotFound = () => (
    <div className="min-h-screen bg-[#0f111a] flex flex-col items-center justify-center text-white text-center p-6 font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="text-7xl mb-6 animate-pulse relative z-10">💨</div>
      <h1 className="text-4xl font-black text-slate-200 mb-3 drop-shadow-md relative z-10">Letter Not Found</h1>
      <p className="text-slate-400 mb-10 font-medium text-lg max-w-md relative z-10">
        This letter has been deleted by the sender, or the link is incorrect. It is lost to the digital wind!
      </p>
      
      <Link 
        href="/letter/create" 
        className="relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)] border border-white/20"
      >
        Write Your Own Letter 💌
      </Link>
    </div>
  );

  try {
    const letter = await Letter.findById(id).lean();

    // If letter was deleted or doesn't exist, show the beautiful 404 UI
    if (!letter) {
      return renderNotFound();
    }

    const serializedLetter = {
      ...letter,
      _id: letter._id.toString(),
      createdAt: letter.createdAt?.toISOString(),
    };

    return <LetterClient letter={serializedLetter} />;
    
  } catch (error) {
    // If the URL ID is completely invalid (e.g. /letter/123), show the 404 UI
    return renderNotFound();
  }
}