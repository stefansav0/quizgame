
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Math.max(
      1,
      parseInt(searchParams.get("page") || "1", 10) || 1
    );

    const limit = Math.min(
      100,
      Math.max(
        1,
        parseInt(searchParams.get("limit") || "50", 10) || 50
      )
    );

    const skip = (page - 1) * limit;

    // Fetch existing website and Expo app quizzes.
    // No visibility filter because the current Quiz
    // schema does not contain a visibility field.
    const filter = {};

    const [quizzes, total] = await Promise.all([
      Quiz.find(filter)
        .select(
          "_id creatorName quizTitle location language createdAt updatedAt"
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Quiz.countDocuments(filter),
    ]);

    return NextResponse.json(
      {
        success: true,
        quizzes,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Get quizzes error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch quizzes",
      },
      { status: 500 }
    );
  }
}
