import { connectDB } from "@/lib/mongodb";
import Score from "@/models/Score";
import { NextResponse } from "next/server";

// POST: Save a player's score when they finish
export async function POST(request, { params }) {
  try {
    await connectDB();
    
    // In Next.js 15+, params is a Promise and MUST be awaited!
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const body = await request.json();
    const { playerName, score, totalQuestions } = body;

    if (!playerName) {
      return NextResponse.json({ error: "Player name is required" }, { status: 400 });
    }

    await Score.create({
      quizId: id, // Associates this score with the specific quiz
      playerName,
      score,
      totalQuestions
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Score Save Error:", error);
    return NextResponse.json({ error: "Failed to save score" }, { status: 500 });
  }
}

// GET: Fetch the top scores for the Leaderboard
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    // Await params here as well
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    // Find all scores for this quiz, sort by highest score first
    const scores = await Score.find({ quizId: id })
      .sort({ score: -1, createdAt: 1 })
      .limit(50);
      
    return NextResponse.json({ success: true, scores }, { status: 200 });
  } catch (error) {
    console.error("Leaderboard Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}