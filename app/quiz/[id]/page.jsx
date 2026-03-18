import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import PlayQuizClient from "./PlayQuizClient";

// --- VIRAL LINK PREVIEWS FOR WHATSAPP/INSTAGRAM ---
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  await connectDB();
  const quiz = await Quiz.findById(id).lean();

  if (!quiz) return { title: "Quiz Not Found" };

  return {
    title: `How well do you know ${quiz.creatorName}? 🤔`,
    description: `Take ${quiz.creatorName}'s bestie quiz and see if you can score 10/10!`,
    openGraph: {
      title: `How well do you know ${quiz.creatorName}? 🤔`,
      description: `Take ${quiz.creatorName}'s bestie quiz and see if you can score 10/10!`,
      siteName: 'Bestie Quiz',
      type: 'website',
    },
  };
}

// --- THE MAIN SERVER COMPONENT ---
export default async function QuizPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  await connectDB();
  const quiz = await Quiz.findById(id).lean();

  if (!quiz) {
    return (
      <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center text-white font-sans text-2xl font-bold">
        Quiz not found! 🕵️‍♂️
      </div>
    );
  }

  const serializedQuiz = {
    ...quiz,
    _id: quiz._id.toString(),
    createdAt: quiz.createdAt?.toISOString(),
    questions: quiz.questions.map((q) => ({
      ...q,
      _id: q._id ? q._id.toString() : undefined,
    })),
  };

  return <PlayQuizClient quiz={serializedQuiz} />;
}