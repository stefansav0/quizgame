
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import Score from "@/models/Score";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid quiz ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const playerName =
      typeof body.playerName === "string"
        ? body.playerName.trim()
        : "";

    if (playerName.length < 1 || playerName.length > 40) {
      return NextResponse.json(
        { error: "Enter a name between 1 and 40 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    const quiz = await Quiz.findById(id).lean();

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    const questions = quiz.questions || [];
    const selectedAnswers = body.selectedAnswers;

    if (
      questions.length === 0 ||
      !Array.isArray(selectedAnswers) ||
      selectedAnswers.length !== questions.length
    ) {
      return NextResponse.json(
        { error: "Invalid or incomplete answers" },
        { status: 400 }
      );
    }

    const validAnswers = selectedAnswers.every(
      (answer, index) =>
        Number.isInteger(answer) &&
        answer >= 0 &&
        answer < questions[index].options.length
    );

    if (!validAnswers) {
      return NextResponse.json(
        { error: "One or more selected answers are invalid" },
        { status: 400 }
      );
    }

    const score = questions.reduce(
      (total, question, index) =>
        total +
        (selectedAnswers[index] === question.correctAnswer
          ? 1
          : 0),
      0
    );

    const savedScore = await Score.create({
      quizId: quiz._id,
      playerName,
      score,
      totalQuestions: questions.length,
      selectedAnswers,
    });

    return NextResponse.json(
      {
        success: true,
        score: savedScore.score,
        totalQuestions: savedScore.totalQuestions,
        scoreId: savedScore._id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Score save error:", error);

    return NextResponse.json(
      { error: "Unable to save your score" },
      { status: 500 }
    );
  }
}

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

    const scores = await Score.find({ quizId: id })
      .sort({ score: -1, createdAt: 1 })
      .limit(50)
      .select("playerName score totalQuestions createdAt")
      .lean();

    return NextResponse.json({
      success: true,
      scores,
    });
  } catch (error) {
    console.error("Score fetch error:", error);

    return NextResponse.json(
      { error: "Unable to load leaderboard" },
      { status: 500 }
    );
  }
}