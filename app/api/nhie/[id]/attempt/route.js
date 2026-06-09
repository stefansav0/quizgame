import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NhieQuiz from "@/models/NhieQuiz";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { friendName, answers } = await req.json();
    
    const quiz = await NhieQuiz.findById(params.id);
    if (!quiz) return NextResponse.json({ error: "Game not found" }, { status: 404 });

    // Compare friend's guesses against the actual creator answers
    let score = 0;
    answers.forEach(friendAnswer => {
      const originalQuestion = quiz.questions.find(q => q.id === friendAnswer.questionId);
      if (originalQuestion && originalQuestion.creatorAnswer === friendAnswer.guess) {
        score++;
      }
    });

    // Save the attempt to the database
    quiz.attempts.push({ friendName, score, totalQuestions: quiz.questions.length });
    await quiz.save();

    return NextResponse.json({ success: true, score, total: quiz.questions.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit attempt" }, { status: 500 });
  }
}