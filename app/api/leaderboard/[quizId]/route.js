
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import Score from "@/models/Score";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid quiz ID" },
        { status: 400 }
      );
    }

    await connectDB();

    const quiz = await Quiz.findById(id)
      .select("questions")
      .lean();

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    const scores = await Score.find({ quizId: id })
      .sort({ score: -1, createdAt: 1 })
      .limit(50)
      .lean();

    const results = scores.map((entry) => ({
      id: entry._id.toString(),
      playerName: entry.playerName,
      score: entry.score,
      totalQuestions: entry.totalQuestions,
      percentage: entry.totalQuestions
        ? Math.round(
            (entry.score / entry.totalQuestions) * 100
          )
        : 0,
      createdAt: entry.createdAt,
      answers: (quiz.questions || []).map(
        (question, index) => {
          const selectedIndex =
            entry.selectedAnswers?.[index];

          const validSelection =
            Number.isInteger(selectedIndex) &&
            selectedIndex >= 0 &&
            selectedIndex < question.options.length;

          return {
            question: question.question,
            selected: validSelection
              ? question.options[selectedIndex]
              : null,
            correct:
              question.options[question.correctAnswer] ??
              null,
            isCorrect:
              validSelection &&
              selectedIndex === question.correctAnswer,
          };
        }
      ),
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Leaderboard error:", error);

    return NextResponse.json(
      { error: "Unable to load leaderboard" },
      { status: 500 }
    );
  }
}