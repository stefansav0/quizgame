import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Ad from "@/models/Ad";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://admin.getknowify.com/",
  "Access-Control-Allow-Methods": "PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// UPDATE ad
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const ad = await Ad.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!ad) {
      return NextResponse.json(
        {
          success: false,
          message: "Advertisement not found",
        },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Advertisement updated successfully",
        ad,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("UPDATE AD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update advertisement",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// DELETE ad
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const ad = await Ad.findByIdAndDelete(id);

    if (!ad) {
      return NextResponse.json(
        {
          success: false,
          message: "Advertisement not found",
        },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Advertisement deleted successfully",
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("DELETE AD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete advertisement",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
