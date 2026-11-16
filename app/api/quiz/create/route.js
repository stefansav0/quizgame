
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import { NextResponse } from "next/server";

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

    if (
      creatorName.length < 1 ||
      creatorName.length > 40
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid creator name" },
        { status: 400 }
      );
    }

    if (
      quizTitle.length > 100 ||
      location.length > 100 ||
      language.length > 20
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid quiz details" },
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

    const questions = body.questions.map((q, index) => ({
      id: index + 1,
      question: q.question.trim(),
      options: q.options.map((option) => option.trim()),
      correctAnswer: q.correctAnswer,
      bgColor:
        typeof q.bgColor === "string" &&
        /^#[0-9a-fA-F]{6}$/.test(q.bgColor)
          ? q.bgColor
          : "#7C3AED",
    }));

    await connectDB();

    const quiz = await Quiz.create({
      creatorName,
      quizTitle,
      location,
      language,
      questions,
    });

    return NextResponse.json(
      {
        success: true,
        quizId: quiz._id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
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
