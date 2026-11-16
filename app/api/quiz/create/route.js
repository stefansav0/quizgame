
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import { NextResponse } from "next/server";
import { randomBytes, createHash } from "node:crypto";

export const runtime = "nodejs";

function hashToken(token) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

function isValidOwnerId(value) {
  return (
    typeof value === "string" &&
    /^[a-f0-9]{32,128}$/i.test(value)
  );
}

export async function POST(req) {
  try {
    const body = await req.json();

    const creatorName =
      typeof body.creatorName === "string"
        ? body.creatorName.trim()
        : "";

    const quizTitle =
      typeof body.quizTitle === "string"
        ? body.quizTitle.trim()
        : "";

    const location =
      typeof body.location === "string"
        ? body.location.trim()
        : "";

    const language =
      typeof body.language === "string"
        ? body.language.trim()
        : "en";

    // Optional installation ID.
    // Existing website clients can omit it.
    const hasOwnerId =
      body.ownerId !== undefined &&
      body.ownerId !== null;

    const ownerId = hasOwnerId ? body.ownerId : null;

    if (hasOwnerId && !isValidOwnerId(ownerId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid installation ID",
        },
        { status: 400 }
      );
    }

    if (
      creatorName.length < 1 ||
      creatorName.length > 40
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid creator name",
        },
        { status: 400 }
      );
    }

    if (
      quizTitle.length > 100 ||
      location.length > 100 ||
      language.length > 20
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid quiz details",
        },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(body.questions) ||
      body.questions.length < 1 ||
      body.questions.length > 20
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Quiz must contain 1 to 20 questions",
        },
        { status: 400 }
      );
    }

    const validQuestions = body.questions.every((q) => {
      if (!q || typeof q !== "object") return false;

      if (
        typeof q.question !== "string" ||
        q.question.trim().length < 1 ||
        q.question.length > 300
      ) {
        return false;
      }

      if (
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        q.options.length > 6
      ) {
        return false;
      }

      if (
        !q.options.every(
          (option) =>
            typeof option === "string" &&
            option.trim().length >= 1 &&
            option.length <= 150
        )
      ) {
        return false;
      }

      return (
        Number.isInteger(q.correctAnswer) &&
        q.correctAnswer >= 0 &&
        q.correctAnswer < q.options.length
      );
    });

    if (!validQuestions) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid questions or answers",
        },
        { status: 400 }
      );
    }

    const questions = body.questions.map(
      (q, index) => ({
        id: index + 1,
        question: q.question.trim(),
        options: q.options.map((option) =>
          option.trim()
        ),
        correctAnswer: q.correctAnswer,
        bgColor:
          typeof q.bgColor === "string" &&
          /^#[0-9a-fA-F]{6}$/.test(q.bgColor)
            ? q.bgColor
            : "#7C3AED",
      })
    );

    await connectDB();

    // If this installation already has a quiz,
    // do not allow another.
    if (ownerId) {
      const existingQuiz = await Quiz.findOne({
        ownerId,
      }).select("_id");

      if (existingQuiz) {
        return NextResponse.json(
          {
            success: false,
            code: "QUIZ_ALREADY_EXISTS",
            error:
              "You already have an active quiz. Delete it before creating another.",
            quizId: existingQuiz._id.toString(),
          },
          { status: 409 }
        );
      }
    }

    // Create a secret token for quiz management.
    // The original token is returned only once.
    const ownerToken = ownerId
      ? randomBytes(32).toString("hex")
      : null;

    const quizData = {
      creatorName,
      quizTitle,
      location,
      language,
      questions,
    };

    if (ownerId) {
      quizData.ownerId = ownerId;
      quizData.ownerTokenHash = hashToken(ownerToken);
    }

    const quiz = await Quiz.create(quizData);

    return NextResponse.json(
      {
        success: true,
        quizId: quiz._id.toString(),
        ...(ownerToken ? { ownerToken } : {}),
      },
      { status: 201 }
    );
  } catch (error) {
    // The unique ownerId index protects against
    // simultaneous creation requests.
    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          code: "QUIZ_ALREADY_EXISTS",
          error:
            "An active quiz already exists for this installation.",
        },
        { status: 409 }
      );
    }

    console.error("Create quiz error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create quiz",
      },
      { status: 500 }
    );
  }
}
