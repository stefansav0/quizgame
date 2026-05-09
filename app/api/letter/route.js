import { connectDB } from "@/lib/mongodb";
import Letter from "@/models/Letter";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    await connectDB();

    const letters = await Letter.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(
      letters,
      { status: 200 }
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}