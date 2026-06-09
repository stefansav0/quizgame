import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NhieQuiz from "@/models/NhieQuiz";

export async function GET(req, { params }) {
  try {
    await connectDB();
    
    // 🚨 Next.js Async Params Fix:
    // In current Next.js environments, params is an implicit Promise 
    // and must be awaited before you can parse keys off of it safely.
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: "Missing game ID parameter" }, { status: 400 });
    }

    const quiz = await NhieQuiz.findById(id);
    if (!quiz) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }
    
    // We strip out 'creatorAnswer' so friends can't cheat by looking at the network tab!
    const sanitizedQuiz = {
      _id: quiz._id,
      creatorName: quiz.creatorName,
      quizTitle: quiz.quizTitle,
      questions: quiz.questions.map(q => ({
        id: q.id,
        statement: q.statement,
        bgColor: q.bgColor
      }))
    };
    
    return NextResponse.json(sanitizedQuiz);
  } catch (error) {
    console.error("Next.js API Error:", error);
    return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
  }
}