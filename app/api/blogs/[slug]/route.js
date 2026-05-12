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

    // Await params before destructuring (Required for Next.js 15+)
    const { slug } = await params;

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

    const { slug } = await params;
    const body = await request.json();

    // If the user is trying to update the slug, we must sanitize it first
    if (body.slug) {
      body.slug = body.slug
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    // Attempt to update the document
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug }, // Find by the original slug in the URL
      { $set: body }, // Set the new fields (including the new SEO fields)
      { new: true, runValidators: true } // Return updated doc, enforce schema limits (like maxLength)
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

    // Catch Duplicate Slug Errors on Update
    if (error.code === 11000 && error.keyPattern?.slug) {
      return NextResponse.json(
        {
          success: false,
          error: "Another blog post already uses this URL slug. Please choose a different one.",
        },
        {
          status: 409,
          headers: corsHeaders,
        }
      );
    }

    // Catch Validation Errors (e.g., metaDescription exceeds 250 characters)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: messages,
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

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