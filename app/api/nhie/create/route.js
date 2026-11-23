
import { NextResponse } from "next/server";
import { randomBytes, createHash } from "node:crypto";
import { connectDB } from "@/lib/mongodb";
import NhieQuiz from "@/models/NhieQuiz";

export const runtime = "nodejs";

const TOTAL_QUESTIONS = 10;
const VALID_ANSWERS = new Set(["I Have", "Never"]);

export async function POST(req) {
  try {
    const body = await req.json();

    const creatorName =
      typeof body.creatorName === "string"
        ? body.creatorName.trim()
        : "";

    if (!creatorName || creatorName.length > 80) {
      return NextResponse.json(
        { success: false, error: "Enter a valid creator name." },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(body.questions) ||
      body.questions.length !== TOTAL_QUESTIONS
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Exactly 10 questions are required.",
        },
        { status: 400 }
      );
    }

    const questionIds = new Set();

    const questions = [];

    for (const question of body.questions) {
      const id = question?.id;
      const statement =
        typeof question?.statement === "string"
          ? question.statement.trim()
          : "";

      if (
        !Number.isInteger(id) ||
        id < 1 ||
        id > TOTAL_QUESTIONS ||
        questionIds.has(id) ||
        !statement ||
        statement.length > 500 ||
        !VALID_ANSWERS.has(question?.creatorAnswer)
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "One or more questions are invalid.",
          },
          { status: 400 }
        );
      }

      questionIds.add(id);

      questions.push({
        id,
        statement,
        creatorAnswer: question.creatorAnswer,
        bgColor:
          typeof question.bgColor === "string" &&
          /^#[0-9a-fA-F]{6}$/.test(question.bgColor)
            ? question.bgColor
            : "#D1FAE5",
      });
    }

    const ownerToken = randomBytes(32).toString("hex");

    const ownerTokenHash = createHash("sha256")
      .update(ownerToken)
      .digest("hex");

    await connectDB();

    const newQuiz = await NhieQuiz.create({
      creatorName,
      quizTitle: `${creatorName}'s Never Have I Ever 👀`,
      location:
        typeof body.location === "string"
          ? body.location.slice(0, 100)
          : "",
      language:
        typeof body.language === "string"
          ? body.language.slice(0, 30)
          : "",
      questions,
      attempts: [],
      ownerTokenHash,
    });

    return NextResponse.json(
      {
        success: true,
        quizId: newQuiz._id.toString(),
        ownerToken,
      },
      {
        status: 201,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("NHIE creation error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create NHIE quiz.",
      },
      { status: 500 }
    );
  }
}
