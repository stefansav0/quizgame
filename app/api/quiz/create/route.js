import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Parse the frontend data
    const body = await req.json();

    // 3. Save to database
    const quiz = await Quiz.create(body);

    // 4. Return the MongoDB _id to the frontend
    return NextResponse.json({
      success: true,
      quizId: quiz._id
    }, { status: 201 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create quiz" },
      { status: 500 }
    );
  }
}