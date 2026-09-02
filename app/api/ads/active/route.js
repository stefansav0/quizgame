import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ad from "@/models/Ad";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://admin.getknowify.com/",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// GET active ad
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const placement = searchParams.get("placement");

    if (!placement) {
      return NextResponse.json(
        {
          success: false,
          message: "Placement is required",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const now = new Date();

    const ad = await Ad.findOne({
      placement,
      status: "active",
      startDate: { $lte: now },
      endDate: { $gte: now },
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        ad: ad || null,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("ACTIVE AD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch active advertisement",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
