import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

// ==========================================
// CORS HEADERS
// ==========================================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

// ==========================================
// OPTIONS
// ==========================================
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// ==========================================
// GET SINGLE BLOG
// ==========================================
export async function GET(request, { params }) {
  try {
    await connectDB();

    // ✅ FIX: Await params before destructuring (Required for Next.js)
    const { slug } = await params;

    // Optional: Log it to your terminal to ensure it's reading correctly
    console.log("Looking for blog with slug:", slug); 

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog not found",
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
        blog,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("❌ Fetch Blog Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        fullError: String(error),
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// ==========================================
// UPDATE BLOG
// ==========================================
export async function PUT(request, { params }) {
  try {
    await connectDB();

    // ✅ FIX: Await params
    const { slug } = await params;

    const body = await request.json();

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog not found",
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
        message: "Blog updated successfully",
        blog: updatedBlog,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("❌ Update Blog Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        fullError: String(error),
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// ==========================================
// DELETE BLOG
// ==========================================
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    // ✅ FIX: Await params
    const { slug } = await params;

    const deletedBlog = await Blog.findOneAndDelete({
      slug,
    });

    if (!deletedBlog) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog not found",
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
        message: "Blog deleted successfully",
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("❌ Delete Blog Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        fullError: String(error),
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}