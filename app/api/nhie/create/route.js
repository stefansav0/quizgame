import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NhieQuiz from "@/models/NhieQuiz";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newQuiz = await NhieQuiz.create(body);
    return NextResponse.json({ success: true, quizId: newQuiz._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create NHIE quiz" }, { status: 500 });
  }
}