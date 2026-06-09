import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NhieQuiz from "@/models/NhieQuiz";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const quiz = await NhieQuiz.findById(params.id);
    if (!quiz) return NextResponse.json({ error: "Game not found" }, { status: 404 });
    
    // We strip out 'creatorAnswer' so friends can't cheat by looking at the network tab!
    const sanitizedQuiz = {
      ...quiz.toObject(),
      questions: quiz.questions.map(q => ({
        id: q.id,
        statement: q.statement,
        bgColor: q.bgColor
      }))
    };
    return NextResponse.json(sanitizedQuiz);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}