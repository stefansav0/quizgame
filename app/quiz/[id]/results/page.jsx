import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import Score from "@/models/Score";
import Link from "next/link";

export default async function ResultsPage({ params }) {
  // 1. Await params for Next.js 15+ compatibility
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 2. Connect to Database
  await connectDB();

  // 3. Fetch the Quiz details
  const quiz = await Quiz.findById(id).lean();

  if (!quiz) {
    return (
      <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center text-white font-sans text-2xl font-bold">
        Quiz not found! 🕵️‍♂️
      </div>
    );
  }

  // 4. Fetch all scores for this specific quiz, sorted by highest score first
  const scores = await Score.find({ quizId: id })
    .sort({ score: -1, createdAt: 1 })
    .lean();

  return (
    <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10">
      <div className="w-full max-w-lg relative bg-[#232433] rounded-3xl p-8 shadow-2xl border border-slate-700/50">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-2 text-emerald-400">
            {quiz.creatorName}'s Dashboard
          </h1>
          <p className="text-slate-400">
            Here is everyone who has taken your quiz so far!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="flex justify-between items-center bg-black/20 p-4 rounded-2xl mb-8 border border-white/5">
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Total Players</p>
            <p className="text-2xl font-black text-white">{scores.length}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Total Questions</p>
            <p className="text-2xl font-black text-white">{quiz.questions.length}</p>
          </div>
        </div>

        {/* The Leaderboard */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {scores.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed border-slate-700 rounded-2xl">
              <p className="text-slate-400 mb-2 text-4xl">👻</p>
              <p className="text-slate-300 font-medium">No one has played yet!</p>
              <p className="text-sm text-slate-500 mt-1">Share your link to get started.</p>
            </div>
          ) : (
            scores.map((entry, idx) => (
              <div 
                key={entry._id.toString()} 
                className="flex justify-between items-center p-4 rounded-xl bg-[#1a1b26] border border-slate-700 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                    idx === 0 ? "bg-yellow-400 text-yellow-900 shadow-[0_0_15px_rgba(250,204,21,0.5)]" :
                    idx === 1 ? "bg-slate-300 text-slate-800" :
                    idx === 2 ? "bg-amber-600 text-amber-100" :
                    "bg-slate-800 text-slate-400"
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <span className="font-bold text-white block">{entry.playerName}</span>
                    <span className="text-xs text-slate-500">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="font-black text-xl text-emerald-400 block">
                    {entry.score} <span className="text-sm text-emerald-600">pts</span>
                  </span>
                  <span className="text-xs text-slate-500">
                    {Math.round((entry.score / quiz.questions.length) * 100)}% Accuracy
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Link 
            href={`/quiz/${id}`}
            className="flex-1 text-center bg-slate-700 text-white font-bold py-4 rounded-xl hover:bg-slate-600 transition-colors"
          >
            Play Quiz
          </Link>
          <Link 
            href="/"
            className="flex-1 text-center bg-emerald-500 text-emerald-950 font-bold py-4 rounded-xl hover:bg-emerald-400 transition-colors shadow-lg"
          >
            Create New
          </Link>
        </div>

      </div>
    </div>
  );
}