import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NhieQuiz from "@/models/NhieQuiz";

export async function GET(req, { params }) {
  try {
    await connectDB();
    
    // Await params for Next.js 15+ compatibility
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) return NextResponse.json({ error: "Missing game ID parameter" }, { status: 400 });

    const quiz = await NhieQuiz.findById(id);
    if (!quiz) return NextResponse.json({ error: "Game not found" }, { status: 404 });
    
    // 🚨 FIX: We hide 'creatorAnswer' to prevent cheating, 
    // but we MUST include 'attempts' so the Dashboard can see the scores!
    const sanitizedQuiz = {
      _id: quiz._id,
      creatorName: quiz.creatorName,
      quizTitle: quiz.quizTitle,
      attempts: quiz.attempts, // Added this back!
      questions: quiz.questions.map(q => ({
        id: q.id,
        statement: q.statement,
        bgColor: q.bgColor
      }))
    };
    
    return NextResponse.json(sanitizedQuiz);
  } catch (error) {
    console.error("Next.js API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    
    // Await params for Next.js 15+ compatibility
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // Permanently deletes the quiz from the MongoDB Database
    const deletedQuiz = await NhieQuiz.findByIdAndDelete(id);
    
    if (!deletedQuiz) {
      return NextResponse.json({ error: "Quiz already deleted or not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Quiz permanently deleted from backend" });
  } catch (error) {
    console.error("DELETE API Error:", error);
    return NextResponse.json({ error: "Failed to delete from database" }, { status: 500 });
  }
}