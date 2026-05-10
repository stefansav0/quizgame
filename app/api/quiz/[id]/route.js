import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";
import Score from "@/models/Score";

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

  return Response.json(
    {},
    {
      headers: corsHeaders,
    }
  );
}

// ==========================================
// GET ROUTE: Fetch Quiz By ID
// ==========================================
export async function GET(
  req,
  { params }
) {

  try {

    // Next.js 15+
    const { id } = await params;

    // Connect DB
    await connectDB();

    // Find quiz
    const quiz =
      await Quiz.findById(id).lean();

    // Not found
    if (!quiz) {

      return Response.json(
        {
          success: false,
          error:
            "Sorry, quiz not found.",
        },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    // Success
    return Response.json(
      {
        success: true,
        quiz,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );

  } catch (error) {

    console.error(
      "Fetch Quiz Error:",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          "Internal Server Error",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// ==========================================
// DELETE ROUTE: Delete Quiz + Scores
// ==========================================
export async function DELETE(
  req,
  { params }
) {

  try {

    // Next.js 15+
    const { id } = await params;

    // Connect DB
    await connectDB();

    // Delete Quiz
    const deletedQuiz =
      await Quiz.findByIdAndDelete(id);

    // Quiz not found
    if (!deletedQuiz) {

      return Response.json(
        {
          success: false,
          error:
            "Quiz not found or already deleted.",
        },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    // Delete associated scores
    await Score.deleteMany({
      quizId: id,
    });

    // Success response
    return Response.json(
      {
        success: true,
        message:
          "Quiz and related scores deleted successfully.",
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );

  } catch (error) {

    console.error(
      "Delete Quiz Error:",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          "Failed to delete quiz.",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}