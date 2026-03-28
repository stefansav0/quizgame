import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import Score from "@/models/Score"; // Make sure to import Score so we can delete old attempts!

// ==========================================
// 1. GET ROUTE: Fetch the Quiz by ID
// ==========================================
export async function GET(req, { params }) {
  try {
    // Await params for Next.js 15+ compatibility
    const resolvedParams = await params;
    const { id } = resolvedParams;

    await connectDB();

    const quiz = await Quiz.findById(id).lean();

    if (!quiz) {
      return Response.json({ error: "Sorry, but we could not find that quiz." }, { status: 404 });
    }

    return Response.json(quiz, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ==========================================
// 2. DELETE ROUTE: Permanently erase the Quiz
// ==========================================
export async function DELETE(req, { params }) {
  try {
    // Await params for Next.js 15+ compatibility
    const resolvedParams = await params;
    const { id } = resolvedParams;

    await connectDB();

    // 1. Find the quiz and delete it
    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return Response.json({ error: "Quiz not found or already deleted." }, { status: 404 });
    }

    // 2. Delete all scores associated with this quiz to keep your database clean!
    await Score.deleteMany({ quizId: id });

    return Response.json({ message: "Quiz completely deleted from database." }, { status: 200 });

  } catch (error) {
    console.error("Failed to delete quiz:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}