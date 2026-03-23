import { connectDB } from "@/lib/mongodb";
import Result from "@/models/Result";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { quizId, playerName, questions, userAnswers } = body;

    // ⚠️ basic validation
    if (!quizId || !playerName || !questions || !userAnswers) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let score = 0;

    // 🔥 Build answers properly
    const answers = questions.map((q, i) => {
      const selected = userAnswers[i];
      const correct = q.options[q.correctAnswer];

      const isCorrect = selected === correct;

      if (isCorrect) score++;

      return {
        question: q.question,
        selected,
        correct,
        isCorrect,
      };
    });

    const percentage = Math.round((score / questions.length) * 100);

    // ✅ Save clean structured result
    const result = await Result.create({
      quizId,
      playerName,
      score,
      percentage,
      answers,
    });

    return Response.json(result);

  } catch (error) {
    console.error("Submit error:", error);

    return Response.json(
      { error: "Failed to submit quiz" },
      { status: 500 }
    );
  }
}