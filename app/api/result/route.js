import { connectDB } from "@/lib/mongodb";
import Result from "@/models/Result";

export async function POST(req) {

  await connectDB();

  const data = await req.json();

  const result = await Result.create(data);

  return Response.json(result);
}