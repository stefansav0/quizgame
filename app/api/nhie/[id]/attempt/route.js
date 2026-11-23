
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NhieQuiz from "@/models/NhieQuiz";

const VALID_ANSWERS = new Set([
  "I Have",
  "Never",
]);

function respond(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request, { params }) {
  try {
    const { id } = await params;

    if (
      typeof id !== "string" ||
      !/^[a-f0-9]{24}$/i.test(id)
    ) {
      return respond(
        { success: false, error: "Invalid game ID." },
        400
      );
    }

    const body = await request.json();

    const friendName =
      typeof body.friendName === "string"
        ? body.friendName.trim()
        : "";

    if (
      !friendName ||
      friendName.length > 60
    ) {
      return respond(
        {
          success: false,
          error: "Enter a valid player name.",
        },
        400
      );
    }

    if (!Array.isArray(body.answers)) {
      return respond(
        {
          success: false,
          error: "Answers must be an array.",
        },
        400
      );
    }

    await connectDB();

    const quiz = await NhieQuiz.findById(id)
      .select("questions")
      .lean();

    if (!quiz) {
      return respond(
        { success: false, error: "Game not found." },
        404
      );
    }

    const questions = quiz.questions || [];
    const answers = body.answers;

    if (
      questions.length === 0 ||
      answers.length !== questions.length
    ) {
      return respond(
        {
          success: false,
          error:
            "You must answer every question exactly once.",
        },
        400
      );
    }

    const questionMap = new Map(
      questions.map((question) => [
        question.id,
        question,
      ])
    );

    const answeredIds = new Set();

    let score = 0;
    const detailedResults = [];

    for (const answer of answers) {
      const questionId = answer?.questionId;
      const guess = answer?.guess;

      if (
        !Number.isInteger(questionId) ||
        answeredIds.has(questionId) ||
        !questionMap.has(questionId) ||
        !VALID_ANSWERS.has(guess)
      ) {
        return respond(
          {
            success: false,
            error:
              "Invalid, duplicate, or missing question answer.",
          },
          400
        );
      }

      answeredIds.add(questionId);

      const originalQuestion =
        questionMap.get(questionId);

      const isCorrect =
        originalQuestion.creatorAnswer === guess;

      if (isCorrect) {
        score++;
      }

      detailedResults.push({
        statement: originalQuestion.statement,
        guess,
        correctAnswer:
          originalQuestion.creatorAnswer,
        isCorrect,
      });
    }

    const updateResult =
      await NhieQuiz.updateOne(
        { _id: quiz._id },
        {
          $push: {
            attempts: {
              friendName,
              score,
              totalQuestions: questions.length,
              detailedResults,
              date: new Date(),
            },
          },
        }
      );

    if (updateResult.matchedCount !== 1) {
      return respond(
        {
          success: false,
          error: "Game no longer exists.",
        },
        404
      );
    }

    return respond({
      success: true,
      score,
      total: questions.length,
      totalQuestions: questions.length,
    });
  } catch (error) {
    console.error(
      "NHIE attempt submission error:",
      error
    );

    return respond(
      {
        success: false,
        error: "Unable to submit answers.",
      },
      500
    );
  }
}
