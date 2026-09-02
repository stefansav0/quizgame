import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ad from "@/models/Ad";

export async function POST(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const ad = await Ad.findByIdAndUpdate(
      id,
      {
        $inc: {
          clicks: 1,
        },
      },
      {
        new: true,
      }
    );

    if (!ad) {
      return NextResponse.json(
        {
          success: false,
          message: "Advertisement not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      clicks: ad.clicks,
    });
  } catch (error) {
    console.error("CLICK TRACKING ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to record click",
      },
      { status: 500 }
    );
  }
}