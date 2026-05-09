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

export async function DELETE(request, { params }) {

  try {

    // Connect DB
    await connectDB();

    // Get ID
    const { id } = params;

    // Delete letter
    const deletedLetter =
      await Letter.findByIdAndDelete(id);

    // Not found
    if (!deletedLetter) {

      return NextResponse.json(
        {
          success: false,
          error: "Letter not found",
        },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    // Success
    return NextResponse.json(
      {
        success: true,
        message: "Letter deleted successfully",
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );

  } catch (error) {

    console.error("Delete Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete letter",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}