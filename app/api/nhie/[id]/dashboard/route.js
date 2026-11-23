
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {
  createHash,
  timingSafeEqual,
} from "node:crypto";

import { connectDB } from "@/lib/mongodb";
import NhieQuiz from "@/models/NhieQuiz";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function respond(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function verifyOwnerToken(token, storedHash) {
  if (
    typeof token !== "string" ||
    !/^[a-f0-9]{64}$/i.test(token) ||
    typeof storedHash !== "string" ||
    !/^[a-f0-9]{64}$/i.test(storedHash)
  ) {
    return false;
  }

  const suppliedHash = createHash("sha256")
    .update(token)
    .digest();

  const expectedHash = Buffer.from(
    storedHash,
    "hex"
  );

  return timingSafeEqual(
    suppliedHash,
    expectedHash
  );
}

export async function GET(request, { params }) {
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

    const ownerToken =
      request.headers.get("x-owner-token");

    if (!ownerToken) {
      return respond(
        {
          success: false,
          error: "Ownership token is required.",
        },
        401
      );
    }

    await connectDB();

    const quiz = await NhieQuiz.findById(id)
      .select("+ownerTokenHash")
      .lean();

    if (!quiz) {
      return respond(
        { success: false, error: "Game not found." },
        404
      );
    }

    if (
      !verifyOwnerToken(
        ownerToken,
        quiz.ownerTokenHash
      )
    ) {
      return respond(
        {
          success: false,
          error: "You are not authorized to view this dashboard.",
        },
        403
      );
    }

    const totalQuestions = Array.isArray(
      quiz.questions
    )
      ? quiz.questions.length
      : 0;

    const attempts = Array.isArray(
      quiz.attempts
    )
      ? quiz.attempts
      : [];

    const formattedAttempts = attempts.map(
      (attempt, index) => {
        const rawScore = Number(attempt.score);

        const score = Number.isFinite(rawScore)
          ? Math.min(
              totalQuestions,
              Math.max(0, rawScore)
            )
          : 0;

        return {
          id: attempt._id?.toString() ||
            String(index + 1),

          friendName:
            typeof attempt.friendName === "string"
              ? attempt.friendName
              : "Friend",

          score,

          totalQuestions,

          date: attempt.date || null,

          detailedResults: Array.isArray(
            attempt.detailedResults
          )
            ? attempt.detailedResults.map(
                (result) => ({
                  statement: result.statement,
                  guess: result.guess,
                  correctAnswer:
                    result.correctAnswer,
                  isCorrect:
                    result.isCorrect === true,
                })
              )
            : [],
        };
      }
    );

    const totalPlays =
      formattedAttempts.length;

    const totalScore =
      formattedAttempts.reduce(
        (sum, attempt) => sum + attempt.score,
        0
      );

    const averageScore =
      totalPlays > 0
        ? Math.round(
            (totalScore / totalPlays) * 10
          ) / 10
        : 0;

    const highestScore =
      totalPlays > 0
        ? Math.max(
            ...formattedAttempts.map(
              (attempt) => attempt.score
            )
          )
        : 0;

    const leaderboard = [
      ...formattedAttempts,
    ]
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return (
          new Date(a.date || 0).getTime() -
          new Date(b.date || 0).getTime()
        );
      })
      .slice(0, 50)
      .map(
        ({
          id,
          friendName,
          score,
          totalQuestions,
          date,
        }) => ({
          id,
          friendName,
          score,
          totalQuestions,
          date,
        })
      );

    const recentAttempts = [
      ...formattedAttempts,
    ]
      .sort(
        (a, b) =>
          new Date(b.date || 0).getTime() -
          new Date(a.date || 0).getTime()
      )
      .slice(0, 30);

    return respond({
      success: true,

      quizId: quiz._id.toString(),
      creatorName: quiz.creatorName,
      quizTitle: quiz.quizTitle,
      createdAt: quiz.createdAt,

      totalQuestions,
      totalPlays,
      averageScore,
      highestScore,

      stats: {
        totalPlays,
        averageScore,
        highestScore,
        totalQuestions,
      },

      leaderboard,
      recentAttempts,
    });
  } catch (error) {
    console.error(
      "NHIE dashboard API error:",
      error
    );

    return respond(
      {
        success: false,
        error: "Unable to load dashboard.",
      },
      500
    );
  }
}
