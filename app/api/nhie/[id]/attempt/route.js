import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NhieQuiz from "@/models/NhieQuiz";

export async function POST(req, { params }) {
  try {
    await connectDB();
    
    // 🚨 Next.js Async Params Fix:
    // Must await params object before pulling the dynamic 'id' key
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const { friendName, answers } = await req.json();
    
    const quiz = await NhieQuiz.findById(id);
    if (!quiz) {
      return NextResponse.json({ error: "Game not found to submit score" }, { status: 404 });
    }

    // Calculate score on the backend securely
    let score = 0;
    answers.forEach(friendAnswer => {
      const originalQuestion = quiz.questions.find(q => q.id === friendAnswer.questionId);
      if (originalQuestion && originalQuestion.creatorAnswer === friendAnswer.guess) {
        score++;
      }
    });

    // Save this friend's attempt performance into your scoreboard array
    quiz.attempts.push({ 
      friendName, 
      score, 
      totalQuestions: quiz.questions.length 
    });
    await quiz.save();

    return NextResponse.json({ success: true, score, total: quiz.questions.length });
  } catch (error) {
    console.error("Attempt Submission Error:", error);
    return NextResponse.json({ error: "Failed to submit attempt", details: error.message }, { status: 500 });
  }
}