import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import { NextResponse } from "next/server";

// ==========================================
// CORS HEADERS (Crucial for API stability)
// ==========================================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}

// ==========================================
// GET: FETCH FEEDBACK FOR ADMIN DASHBOARD
// ==========================================
export async function GET(request) {
  try {
    await connectDB();
    
    // Sort by newest first
    const feedbackList = await Feedback.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, count: feedbackList.length, data: feedbackList }, 
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("❌ Fetch Feedback Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch feedback" }, 
      { status: 500, headers: corsHeaders }
    );
  }
}

// ==========================================
// POST: SUBMIT NEW FEEDBACK
// ==========================================
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Extract all fields supported by our new Schema
    const { name, email, type, message, rating } = body;

    // ==========================================
    // VALIDATION
    // ==========================================
    // We only require the message. Name and email are optional for anonymous feedback.
    if (!message) {
      return NextResponse.json(
        { success: false, error: "A feedback message is required." },
        { status: 400, headers: corsHeaders }
      );
    }

    // ==========================================
    // SAVE TO DATABASE
    // ==========================================
    const newFeedback = await Feedback.create({
      name: name?.trim() || "Anonymous", // Fallback if they leave it blank
      email: email?.trim() || "",
      type: type || "general",
      message: message.trim(),
      rating: rating || null,
    });

    return NextResponse.json(
      { success: true, message: "Feedback submitted successfully!", data: newFeedback },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("❌ Feedback Submission Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500, headers: corsHeaders }
    );
  }
}