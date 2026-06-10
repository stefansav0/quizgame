import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NhieQuiz from "@/models/NhieQuiz";

export async function POST(req, { params }) {
  try {
    await connectDB();
    
    // Await params for Next.js 15+ compatibility
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const { friendName, answers } = await req.json();
    
    const quiz = await NhieQuiz.findById(id);
    if (!quiz) {
      return NextResponse.json({ error: "Game not found to submit score" }, { status: 404 });
    }

    let score = 0;
    const detailedResults = []; // 🔥 We create an array to hold the exact guess data

    // Calculate score and build the detailed breakdown
    answers.forEach(friendAnswer => {
      const originalQuestion = quiz.questions.find(q => q.id === friendAnswer.questionId);
      
      if (originalQuestion) {
        const isCorrect = originalQuestion.creatorAnswer === friendAnswer.guess;
        if (isCorrect) score++;

        // Push the specific breakdown into our new array
        detailedResults.push({
          statement: originalQuestion.statement,
          guess: friendAnswer.guess,
          correctAnswer: originalQuestion.creatorAnswer,
          isCorrect: isCorrect
        });
      }
    });

    // Save this friend's attempt WITH the detailed results
    quiz.attempts.push({ 
      friendName, 
      score, 
      totalQuestions: quiz.questions.length,
      detailedResults 
    });
    
    await quiz.save();

    return NextResponse.json({ success: true, score, total: quiz.questions.length });
  } catch (error) {
    console.error("Attempt Submission Error:", error);
    return NextResponse.json({ error: "Failed to submit attempt", details: error.message }, { status: 500 });
  }
}