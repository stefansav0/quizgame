import { connectDB } from "@/lib/mongodb";
import Letter from "@/models/Letter";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods":
    "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization",
};

// OPTIONS handler for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: corsHeaders,
    }
  );
}

export async function POST(request) {

  try {

    // Connect MongoDB
    await connectDB();

    // Parse request body
    const body = await request.json();

    const {
      recipientName,
      senderName,
      message,
      theme,
    } = body;

    // Validation
    if (
      !recipientName ||
      !senderName ||
      !message
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "All fields are required to seal the envelope!",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // Create Letter
    const newLetter = await Letter.create({
      recipientName,
      senderName,
      message,
      theme: theme || "purple",
    });

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Letter created successfully",
        letterId: newLetter._id,
        letter: newLetter,
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    );

  } catch (error) {

    console.error(
      "Letter Save Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to seal the letter. Please try again.",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}