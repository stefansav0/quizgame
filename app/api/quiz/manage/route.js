
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import Score from "@/models/Score";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {
  createHash,
  timingSafeEqual,
} from "node:crypto";

export const runtime = "nodejs";

function hashToken(token) {
  return createHash("sha256")
    .update(token)
    .digest();
}

function verifyToken(token, storedHash) {
  if (
    typeof token !== "string" ||
    !/^[a-f0-9]{64}$/i.test(token) ||
    typeof storedHash !== "string" ||
    !/^[a-f0-9]{64}$/i.test(storedHash)
  ) {
    return false;
  }

  return timingSafeEqual(
    hashToken(token),
    Buffer.from(storedHash, "hex")
  );
}

async function getOwnedQuiz(body) {
  const quizId = body?.quizId;
  const ownerToken = body?.ownerToken;

  if (
    typeof quizId !== "string" ||
    !mongoose.isValidObjectId(quizId)
  ) {
    return null;
  }

  const quiz = await Quiz.findById(quizId)
    .select("+ownerTokenHash");

  if (
    !quiz ||
    !verifyToken(ownerToken, quiz.ownerTokenHash)
  ) {
    return null;
  }

  return quiz;
}

function unauthorized() {
  return NextResponse.json(
    {
      success: false,
      error: "Quiz not found or access denied.",
    },
    { status: 403 }
  );
}

// ==========================================
// LOAD OWNER DASHBOARD
// ==========================================

export async function POST(request) {
  try {
    const body = await request.json();

    await connectDB();

    const quiz = await getOwnedQuiz(body);

    if (!quiz) return unauthorized();

    const [statistics] = await Score.aggregate([
      {
        $match: {
          quizId: quiz._id,
        },
      },
      {
        $group: {
          _id: null,
          totalPlays: { $sum: 1 },
          averageScore: { $avg: "$score" },
          highestScore: { $max: "$score" },
          averagePercentage: {
            $avg: {
              $cond: [
                { $gt: ["$totalQuestions", 0] },
                {
                  $multiply: [
                    {
                      $divide: [
                        "$score",
                        "$totalQuestions",
                      ],
                    },
                    100,
                  ],
                },
                0,
              ],
            },
          },
        },
      },
    ]);

    const results = await Score.find({
      quizId: quiz._id,
    })
      .sort({ score: -1, createdAt: 1 })
      .select(
        "playerName score totalQuestions createdAt"
      )
      .lean();

    return NextResponse.json({
      success: true,
      quiz: {
        _id: quiz._id.toString(),
        creatorName: quiz.creatorName,
        quizTitle: quiz.quizTitle,
        createdAt: quiz.createdAt,
        questionCount: quiz.questions.length,
      },
      statistics: {
        totalPlays: statistics?.totalPlays ?? 0,
        averageScore: Number(
          (statistics?.averageScore ?? 0).toFixed(2)
        ),
        highestScore: statistics?.highestScore ?? 0,
        averagePercentage: Number(
          (statistics?.averagePercentage ?? 0).toFixed(1)
        ),
      },
      results: results.map((result) => ({
        _id: result._id.toString(),
        playerName: result.playerName,
        score: result.score,
        totalQuestions: result.totalQuestions,
        createdAt: result.createdAt,
      })),
    });
  } catch (error) {
    console.error("Quiz dashboard error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to load dashboard.",
      },
      { status: 500 }
    );
  }
}

// ==========================================
// DELETE OWNED QUIZ AND SCORES
// ==========================================

export async function DELETE(request) {
  let session;

  try {
    const body = await request.json();

    await connectDB();

    // Recheck ownership inside the transaction,
    // before deleting the quiz and its scores.
    session = await mongoose.startSession();

    let deleted = false;

    await session.withTransaction(async () => {
      const quiz = await Quiz.findById(body.quizId)
        .select("+ownerTokenHash")
        .session(session);

      if (
        !quiz ||
        !verifyToken(
          body.ownerToken,
          quiz.ownerTokenHash
        )
      ) {
        return;
      }

      await Score.deleteMany(
        { quizId: quiz._id },
        { session }
      );

      const result = await Quiz.deleteOne(
        { _id: quiz._id },
        { session }
      );

      deleted = result.deletedCount === 1;
    });

    if (!deleted) return unauthorized();

    return NextResponse.json({
      success: true,
      message: "Quiz and results deleted.",
    });
  } catch (error) {
    console.error("Delete quiz error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to delete quiz.",
      },
      { status: 500 }
    );
  } finally {
    if (session) {
      await session.endSession();
    }
  }
}
