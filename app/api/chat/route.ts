import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  // Initiate the streaming process
  const stream = streamText({
    model: openrouter("meta-llama/llama-3.2-3b-instruct:free"),
    prompt: message,
  });

  // Collect the streamed text chunks
  let fullText = "";
  for await (const chunk of stream) {
    fullText += chunk;
  }

  // Return the full accumulated text as JSON
  return new Response(
    JSON.stringify({ text: fullText }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}