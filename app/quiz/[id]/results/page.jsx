import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import Score from "@/models/Score"; // Make sure this matches your schema name (Score or Result)
import Link from "next/link";
import DashboardList from "./DashboardList";

export default async function ResultsPage({ params }) {
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

  const scores = await Score.find({ quizId: id })
    .sort({ score: -1, createdAt: 1 })
    .lean();

  // 🔥 BULLETPROOF DATA FORMATTING
  const formattedScores = scores.map((entry) => {
    let detailedAnswers = [];

    // Map the selected index numbers to the actual text from the quiz
    if (entry.selectedAnswers && entry.selectedAnswers.length > 0 && quiz.questions) {
      detailedAnswers = quiz.questions.map((q, idx) => {
        
        // 1. Safely grab what the user picked and force it to be a Number
        const rawSelected = entry.selectedAnswers[idx];
        const selectedIdx = rawSelected !== null && rawSelected !== undefined ? Number(rawSelected) : -1;

        // 2. Safely grab the correct answer and force it to be a Number
        const correctIdx = q.correctAnswer !== undefined && q.correctAnswer !== null ? Number(q.correctAnswer) : 0;

        // 3. Math comparison (No more string/number mismatch bugs!)
        const isCorrect = selectedIdx === correctIdx;
        
        // 4. Safely grab the text from the options array so it is never blank
        const selectedText = selectedIdx >= 0 && q.options[selectedIdx] ? q.options[selectedIdx] : "Skipped";
        const correctText = q.options[correctIdx] || q.options[0]; 

        return {
          question: q.question,
          selectedText: selectedText,
          correctText: correctText,
          isCorrect: isCorrect,
        };
      });
    }

    return {
      _id: entry._id.toString(),
      playerName: entry.playerName,
      score: entry.score,
      // Safely parse the date just in case lean() returns a string instead of a Date object
      createdAt: entry.createdAt ? new Date(entry.createdAt).toISOString() : new Date().toISOString(),
      answers: detailedAnswers, // Pass the perfectly formatted answers down!
    };
  });

  return (
    <div className="min-h-screen bg-[#1a1b26] flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10">
      <div className="w-full max-w-lg relative bg-[#232433] rounded-3xl p-8 shadow-2xl border border-slate-700/50">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-2 text-emerald-400">
            {quiz.creatorName}'s Dashboard
          </h1>
          <p className="text-slate-400">
            Click "View Answers" to see exactly what they guessed!
          </p>
        </div>

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

        {/* RENDER THE LIST */}
        <DashboardList 
          scores={formattedScores} 
          totalQuestions={quiz.questions.length} 
        />

        <div className="mt-8 flex gap-4">
          <Link 
            href={`/quiz/${id}`}
            className="flex-1 text-center bg-slate-700 text-white font-bold py-4 rounded-xl hover:bg-slate-600 transition-colors"
          >
            Play Quiz
          </Link>
          <Link 
            href="/create"
            className="flex-1 text-center bg-emerald-500 text-emerald-950 font-bold py-4 rounded-xl hover:bg-emerald-400 transition-colors shadow-lg"
          >
            Create New
          </Link>
        </div>

      </div>
    </div>
  );
}