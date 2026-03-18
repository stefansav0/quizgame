import { connectDB } from "@/lib/mongodb";
import Result from "@/models/Result";

export async function GET(req, { params }) {

  await connectDB();

  const results = await Result
    .find({ quizId: params.quizId })
    .sort({ score: -1 });

  return Response.json(results);
}