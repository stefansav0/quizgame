
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

function json(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function validToken(token, storedHash) {
  if (
    typeof token !== "string" ||
    !/^[a-f0-9]{64}$/i.test(token) ||
    typeof storedHash !== "string" ||
    !/^[a-f0-9]{64}$/i.test(storedHash)
  ) {
    return false;
  }

  const calculated = createHash("sha256")
    .update(token)
    .digest();

  const expected = Buffer.from(storedHash, "hex");

  return timingSafeEqual(calculated, expected);
}

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return json({ error: "Invalid game ID." }, 400);
    }

    await connectDB();

    const quiz = await NhieQuiz.findById(id)
      .select(
        "_id creatorName quizTitle questions.id questions.statement questions.bgColor createdAt"
      )
      .lean();

    if (!quiz) {
      return json({ error: "Game not found." }, 404);
    }

    return json({
      _id: quiz._id,
      creatorName: quiz.creatorName,
      quizTitle: quiz.quizTitle,
      createdAt: quiz.createdAt,
      questions: quiz.questions.map((q) => ({
        id: q.id,
        statement: q.statement,
        bgColor: q.bgColor,
      })),
    });
  } catch (error) {
    console.error("NHIE GET error:", error);

    return json({ error: "Unable to load game." }, 500);
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return json({ error: "Invalid game ID." }, 400);
    }

    const ownerToken = req.headers.get("x-owner-token");

    await connectDB();

    const quiz = await NhieQuiz.findById(id)
      .select("+ownerTokenHash")
      .lean();

    if (!quiz) {
      return json({ error: "Game not found." }, 404);
    }

    if (!quiz.ownerTokenHash) {
      return json(
        {
          error:
            "This is a legacy challenge without ownership credentials. Please contact support for verified deletion.",
        },
        403
      );
    }

    if (!validToken(ownerToken, quiz.ownerTokenHash)) {
      return json(
        { error: "You are not authorized to delete this game." },
        403
      );
    }

    const deleted = await NhieQuiz.findOneAndDelete({
      _id: id,
      ownerTokenHash: quiz.ownerTokenHash,
    });

    if (!deleted) {
      return json({ error: "Game not found." }, 404);
    }

    return json({
      success: true,
      message: "Challenge deleted successfully.",
    });
  } catch (error) {
    console.error("NHIE DELETE error:", error);

    return json(
      { error: "Unable to delete challenge." },
      500
    );
  }
}
