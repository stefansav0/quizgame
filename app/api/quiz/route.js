
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Math.max(
      1,
      parseInt(searchParams.get("page") || "1", 10) || 1
    );

    const limit = Math.min(
      20,
      Math.max(
        1,
        parseInt(searchParams.get("limit") || "10", 10) || 10
      )
    );

    const skip = (page - 1) * limit;

    // Only expose quizzes explicitly marked as public.
    // Add a matching visibility field to your schema first.
    const filter = { visibility: "public" };

    const [quizzes, total] = await Promise.all([
      Quiz.find(filter)
        .select("title description createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Quiz.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      quizzes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
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
