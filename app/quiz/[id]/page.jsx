import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import PlayQuizClient from "./PlayQuizClient";
import Link from "next/link";
import FloatingLayout from "@/components/FloatingLayout";
import mongoose from "mongoose";

const SITE_URL = "https://getknowify.com";

async function getQuiz(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  await connectDB();
  return Quiz.findById(id)
    .select("creatorName quizTitle questions.question questions.options questions.id questions.bgColor")
    .lean();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const quiz = await getQuiz(id).catch(() => null);
  if (!quiz) {
    return {
      title: "Quiz Not Found | GetKnowify",
      description: "This friendship quiz is unavailable. Create your own quiz on GetKnowify.",
      robots: { index: false, follow: true },
    };
  }

  const title = quiz.quizTitle?.trim() || `How well do you know ${quiz.creatorName}?`;
  const description = `Play ${quiz.creatorName}'s friendship quiz, answer ${quiz.questions.length} questions and compare scores with friends on GetKnowify.`;
  const url = `${SITE_URL}/quiz/${encodeURIComponent(id)}`;
  return {
    title: `${title} | GetKnowify`,
    description,
    alternates: { canonical: url },
    // Personal, user-generated quiz URLs are intentionally not indexed. The
    // main homepage and original guides should be the search landing pages.
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "GetKnowify",
      type: "website",
      // Add images only after creating and deploying a real OG image.
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function QuizPage({ params }) {
  const { id } = await params;
  let quiz;
  try {
    quiz = await getQuiz(id);
  } catch (error) {
    console.error("Quiz page load failed:", error);
    return (
      <FloatingLayout activeTheme="light">
        <main className="relative z-10 mx-auto w-full max-w-lg px-4 py-16 text-center">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <h1 className="text-2xl font-black text-slate-900">Unable to load this quiz</h1>
            <p className="mt-3 text-slate-600">Please try again shortly.</p>
            <Link href="/" className="mt-6 inline-block font-bold text-emerald-700 hover:underline">Go to homepage</Link>
          </div>
        </main>
      </FloatingLayout>
    );
  }

  if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    return (
      <FloatingLayout activeTheme="light">
        <main className="relative z-10 mx-auto w-full max-w-lg px-4 py-16 text-center">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <span aria-hidden="true" className="text-5xl">🔎</span>
            <h1 className="mt-5 text-2xl font-black text-slate-900">Quiz not found</h1>
            <p className="mt-3 text-slate-600">This quiz may have been removed, or the link may be incorrect.</p>
            <Link href="/create" className="mt-6 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700">Create your own quiz</Link>
          </div>
        </main>
      </FloatingLayout>
    );
  }

  // Explicitly select public fields. NEVER send correctAnswer to the browser.
  const publicQuiz = {
    _id: String(quiz._id),
    creatorName: quiz.creatorName,
    quizTitle: quiz.quizTitle || "",
    questions: quiz.questions.map((question) => ({
      id: question.id ?? null,
      question: question.question,
      options: question.options,
      bgColor: question.bgColor || null,
    })),
  };

  return (
    <FloatingLayout activeTheme="light">
      <div className="relative z-10 w-full">
        <PlayQuizClient quiz={publicQuiz} />
        <section aria-labelledby="about-quiz" className="mx-auto max-w-3xl px-5 pb-16 text-slate-800">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            <h2 id="about-quiz" className="text-2xl font-black">About this friendship quiz</h2>
            <p className="mt-3 leading-7 text-slate-600">
              {quiz.creatorName} created this quiz to see how well friends know them. Pick one answer for each of the {quiz.questions.length} questions. When you finish, your answers are checked and your score appears on the leaderboard.
            </p>
            <h3 className="mt-7 text-lg font-bold">How to play</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-600">
              <li>Enter the name you want to appear beside your score.</li>
              <li>Read each question and choose the answer you think the creator selected.</li>
              <li>Finish all the questions to see your verified score and compare it with other players.</li>
            </ol>
            <h3 className="mt-7 text-lg font-bold">Want to challenge your own friends?</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Make your own friendship quiz, choose the correct answers and share your quiz link. Friends can play from their own devices, and you can compare their scores on your leaderboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
              <Link href="/create" className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">Create a friendship quiz</Link>
              <Link href="/privacy" className="self-center text-emerald-800 underline underline-offset-4">How quiz data is handled</Link>
            </div>
          </div>
        </section>
      </div>
    </FloatingLayout>
  );
}
