
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid quiz ID",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const quiz = await Quiz.findById(id)
      .select(
        "creatorName quizTitle language questions.question questions.options questions.id questions.bgColor"
      )
      .lean();

    if (!quiz) {
      return NextResponse.json(
        {
          success: false,
          error: "Quiz not found",
        },
        { status: 404 }
      );
    }

    // Explicitly remove answer keys from the public response.
    const safeQuiz = {
      _id: quiz._id,
      creatorName: quiz.creatorName,
      quizTitle: quiz.quizTitle,
      language: quiz.language,
      questions: quiz.questions.map((q) => ({
        _id: q._id,
        id: q.id,
        question: q.question,
        options: q.options,
        bgColor: q.bgColor,
      })),
    };

    return NextResponse.json({
      success: true,
      quiz: safeQuiz,
    });
  } catch (error) {
    console.error("Quiz Play Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
