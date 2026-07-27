import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import PlayQuizClient from "./PlayQuizClient";
import Link from "next/link";
import FloatingLayout from "@/components/FloatingLayout";

// --- VIRAL LINK PREVIEWS FOR WHATSAPP/INSTAGRAM ---
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  await connectDB();
  const quiz = await Quiz.findById(id).lean();

  if (!quiz) {
    return { 
      title: "Quiz Not Found | Getknowify",
      description: "This quiz has been deleted or no longer exists."
    };
  }

  return {
    title: `How well do you know ${quiz.creatorName}? 🤔`,
    description: `Take ${quiz.creatorName}'s bestie quiz and see if you can score 10/10!`,
    openGraph: {
      title: `How well do you know ${quiz.creatorName}? 🤔`,
      description: `Take ${quiz.creatorName}'s bestie quiz and see if you can score 10/10!`,
      siteName: 'Getknowify',
      type: 'website',
    },
  };
}

// --- THE MAIN SERVER COMPONENT ---
export default async function QuizPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  await connectDB();
  
  let quiz;
  try {
    // Attempt to find the quiz. (Using try/catch in case the ID format is invalid)
    quiz = await Quiz.findById(id).lean();
  } catch (error) {
    quiz = null;
  }

  // 🔴 IF QUIZ WAS DELETED OR DOES NOT EXIST
  if (!quiz) {
    return (
      <FloatingLayout activeTheme="light">
        <div className="w-full max-w-md relative z-10 mt-10 md:mt-20">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-10 rounded-[2rem] text-center shadow-xl">
            <div className="text-6xl mb-6 animate-bounce">🗑️</div>
            <h1 className="text-2xl md:text-3xl font-black mb-4 text-emerald-500 tracking-tight">Oops! Quiz Not Found</h1>
            <p className="text-slate-500 mb-8 leading-relaxed font-medium">
              Sorry, but we could not find that quiz. The creator might have deleted it to start over!
            </p>
            <Link 
              href="/create" 
              className="inline-block bg-emerald-500 text-white font-black text-lg px-8 py-4 rounded-xl hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95 shadow-[0_10px_20px_rgba(16,185,129,0.2)] w-full"
            >
              Create Your Own Quiz 🚀
            </Link>
          </div>
        </div>
      </FloatingLayout>
    );
  }

  // 🟢 IF QUIZ EXISTS, PREPARE DATA AND RENDER CLIENT UI
  const serializedQuiz = {
    ...quiz,
    _id: quiz._id.toString(),
    createdAt: quiz.createdAt?.toISOString(),
    questions: quiz.questions.map((q) => ({
      ...q,
      _id: q._id ? q._id.toString() : undefined,
    })),
  };

  return (
    <FloatingLayout activeTheme="light">
      <PlayQuizClient quiz={serializedQuiz} />
    </FloatingLayout>
  );
}