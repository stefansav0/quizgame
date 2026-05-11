import { connectDB } from "@/lib/mongodb";
import Score from "@/models/Score";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ==========================================
// GET ALL SCORES FOR ADMIN DASHBOARD
// ==========================================
export async function GET() {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Fetch all scores from MongoDB
    // .sort({ createdAt: -1 }) puts the newest scores at the top
    // .limit(100) is a good safety measure for admin panels so you don't load 10,000 records at once
    const allScores = await Score.find()
      .sort({ createdAt: -1 })
      .limit(100); 

    // 3. Return the data
    return NextResponse.json(
      {
        success: true,
        scores: allScores,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Admin Fetch Scores Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch all scores",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}