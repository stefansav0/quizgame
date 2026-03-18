import { connectDB } from "@/lib/mongodb";
import Quiz from "@/models/Quiz";

export async function GET(req, { params }) {

  await connectDB();

  const quiz = await Quiz.findById(params.id);

  return Response.json(quiz);
}