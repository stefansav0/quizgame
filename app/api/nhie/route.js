import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/NhieQuiz";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    await connectDB();

    const nhiequizzes = await Quiz.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(
      nhiequizzes,
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