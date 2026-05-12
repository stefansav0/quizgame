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

    // Destructure all the new SEO and metadata fields
    const {
      title,
      slug,
      category,
      keywords,
      metaDescription,
      author,
      status,
      coverImage,
      content,
    } = body;

    // ==========================================
    // VALIDATION
    // ==========================================
    // Make sure our new required fields are present
    if (!title || !slug || !category || !metaDescription || !author || !content) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, slug, category, meta description, author, and content are required",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // ==========================================
    // SANITIZE SLUG (Just to be safe)
    // ==========================================
    // This ensures no spaces or weird characters sneak into the DB
    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // ==========================================
    // CREATE BLOG
    // ==========================================
    const newBlog = await Blog.create({
      title,
      slug: cleanSlug,
      category,
      keywords: keywords || "", // Keywords are optional in the DB
      metaDescription,
      author,
      status: status || "draft", 
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

    // Provide a clear error if the user tries to use a slug that already exists
    if (error.code === 11000 && error.keyPattern?.slug) {
      return NextResponse.json(
        {
          success: false,
          error: "A blog post with this URL slug already exists. Please choose a different slug.",
        },
        {
          status: 409, // Conflict status code
          headers: corsHeaders,
        }
      );
    }

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