import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

// ==========================================
// CORS HEADERS
// ==========================================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods":
    "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization",
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
// GET ALL BLOGS
// ==========================================
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: blogs.length,
        blogs,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("❌ Fetch Blogs Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// ==========================================
// CREATE BLOG
// ==========================================
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      title,
      author,
      status,
      coverImage,
      content,
    } = body;

    // ==========================================
    // VALIDATION
    // ==========================================
    if (!title || !author || !content) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Title, author, and content are required",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // ==========================================
    // GENERATE SLUG
    // ==========================================
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const randomSuffix = Math.random()
      .toString(36)
      .substring(2, 6);

    const slug = `${baseSlug}-${randomSuffix}`;

    // ==========================================
    // CREATE BLOG
    // ==========================================
    const newBlog = await Blog.create({
      title,
      slug,
      author,
      status: status || "published",
      coverImage: coverImage || "",
      content,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        blog: newBlog,
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("❌ Create Blog Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}