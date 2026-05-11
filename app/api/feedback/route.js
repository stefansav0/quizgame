import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, rating, message } = body;

    // Basic validation
    if (!name || !rating || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    // Save to database
    const newFeedback = await Feedback.create({
      name,
      rating,
      message,
    });

    return NextResponse.json(
      { success: true, message: "Feedback submitted successfully!", data: newFeedback },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Feedback Submission Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}