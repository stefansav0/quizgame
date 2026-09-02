import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ad from "@/models/Ad";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://admin.getknowify.com",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// GET all ads
export async function GET() {
  try {
    await connectDB();

    const ads = await Ad.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        ads,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("GET ADS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch advertisements",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// CREATE ad
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      title,
      advertiser,
      image,
      targetUrl,
      placement,
      startDate,
      endDate,
      status,
    } = body;

    if (
      !title ||
      !advertiser ||
      !image ||
      !targetUrl ||
      !placement ||
      !startDate ||
      !endDate
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields must be provided",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const ad = await Ad.create({
      title,
      advertiser,
      image,
      targetUrl,
      placement,
      startDate,
      endDate,
      status: status || "active",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Advertisement created successfully",
        ad,
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("CREATE AD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create advertisement",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
