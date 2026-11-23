
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NhieQuiz from "@/models/NhieQuiz";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (
      typeof id !== "string" ||
      !/^[a-f0-9]{24}$/i.test(id)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid game ID." },
        { status: 400 }
      );
    }

    await connectDB();

    const quiz = await NhieQuiz.findById(id)
      .select(
        "creatorName quizTitle questions.id attempts.friendName attempts.score attempts.totalQuestions attempts.date"
      )
      .lean();

    if (!quiz) {
      return NextResponse.json(
        { success: false, error: "Game not found." },
        { status: 404 }
      );
    }

    const totalQuestions =
      quiz.questions?.length || 10;

    const attempts = quiz.attempts || [];

    const leaderboard = attempts
      .map((attempt, index) => {
        const rawScore = Number(attempt.score);

        return {
          id: attempt._id?.toString() ||
            String(index + 1),

          friendName:
            typeof attempt.friendName === "string"
              ? attempt.friendName
              : "Friend",

          score: Number.isFinite(rawScore)
            ? Math.min(
                totalQuestions,
                Math.max(0, rawScore)
              )
            : 0,

          totalQuestions,

          date: attempt.date || null,
        };
      })
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return (
          new Date(a.date || 0).getTime() -
          new Date(b.date || 0).getTime()
        );
      })
      .slice(0, 50);

    return NextResponse.json(
      {
        success: true,
        quizId: quiz._id.toString(),
        creatorName: quiz.creatorName,
        quizTitle: quiz.quizTitle,
        totalPlays: attempts.length,
        totalQuestions,
        leaderboard,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "NHIE leaderboard error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load leaderboard.",
      },
      { status: 500 }
    );
  }
}
