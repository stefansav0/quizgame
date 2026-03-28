import { connectDB } from "@/lib/mongodb";
import Result from "@/models/Result";

export async function GET(req, { params }) {
  try {
    // ✅ NEXT.JS 15 FIX: Await the params object before reading properties
    const resolvedParams = await params;
    const { quizId } = resolvedParams;

    await connectDB();

    const results = await Result
      .find({ quizId: quizId }) // Use the awaited quizId here
      .sort({ score: -1 })
      .lean();

    // 🔥 Format response (clean + safe)
    const formattedResults = results.map((r) => ({
      playerName: r.playerName,
      score: r.score,
      totalQuestions: r.answers?.length || 0,

      // ✅ Full answer breakdown
      answers: (r.answers || []).map((a) => ({
        question: a.question,
        selected: a.selected,
        correct: a.correct,
        isCorrect: a.isCorrect,
      })),
    }));

    return Response.json(formattedResults);

  } catch (error) {
    console.error("Leaderboard error:", error);

    return Response.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}