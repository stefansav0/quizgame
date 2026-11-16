import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    await connectDB();

    const quizzes = await Quiz.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(
      quizzes,
      { status: 200 }
    );

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}