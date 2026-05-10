import { connectDB } from "@/lib/mongodb";
import Score from "@/models/Score";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods":
    "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization",
};

// ==========================================
// OPTIONS ROUTE (CORS SUPPORT)
// ==========================================
export async function OPTIONS() {

  return NextResponse.json(
    {},
    {
      headers: corsHeaders,
    }
  );
}

// ==========================================
// POST ROUTE: SAVE PLAYER SCORE
// ==========================================
export async function POST(
  request,
  { params }
) {

  try {

    // Connect DB
    await connectDB();

    // Next.js 15+
    const { id } = await params;

    // Parse body
    const body =
      await request.json();

    console.log(
      "Data received from frontend:",
      body
    );

    // Extract data
    const {
      playerName,
      score,
      totalQuestions,
      selectedAnswers,
    } = body;

    // Validation
    if (!playerName) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Player name is required",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // Create score
    const newScore =
      await Score.create({

        quizId: id,

        playerName,

        score,

        totalQuestions,

        selectedAnswers:
          selectedAnswers || [],
      });

    console.log(
      "Data saved to MongoDB:",
      newScore
    );

    // Success response
    return NextResponse.json(
      {
        success: true,
        message:
          "Score saved successfully",
        score: newScore,
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    );

  } catch (error) {

    console.error(
      "Score Save Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to save score",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// ==========================================
// GET ROUTE: FETCH LEADERBOARD
// ==========================================
export async function GET(
  request,
  { params }
) {

  try {

    // Connect DB
    await connectDB();

    // Next.js 15+
    const { id } = await params;

    // Fetch leaderboard
    const scores =
      await Score.find({
        quizId: id,
      })
        .sort({
          score: -1,
          createdAt: 1,
        })
        .limit(50);

    // Success response
    return NextResponse.json(
      {
        success: true,
        scores,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );

  } catch (error) {

    console.error(
      "Leaderboard Fetch Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch leaderboard",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}