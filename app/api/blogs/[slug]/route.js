import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ==========================================
// GET: FETCH ALL BLOGS
// ==========================================
export async function GET() {
  try {
    await connectDB();
    // Fetch all blogs, sorted by newest first
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, blogs }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Fetch Blogs Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" }, 
      { status: 500, headers: corsHeaders }
    );
  }
}

// ==========================================
// POST: CREATE NEW BLOG (With Auto-Slug)
// ==========================================
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const { title, author, status, coverImage, content } = body;

    // Validation
    if (!title || !author || !content) {
      return NextResponse.json(
        { success: false, error: "Title, author, and content are required fields." }, 
        { status: 400, headers: corsHeaders }
      );
    }

    // 1. Generate an SEO-friendly slug from the title
    let baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")     // Remove special characters
      .replace(/[\s_-]+/g, "-")      // Replace spaces/underscores with hyphens
      .replace(/^-+|-+$/g, "");      // Remove leading/trailing hyphens

    // 2. Append a random suffix to ensure uniqueness (prevent duplicates)
    const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

    // 3. Create the document in MongoDB
    const newBlog = await Blog.create({
      title,
      slug: uniqueSlug,
      author,
      status: status || "draft",
      coverImage: coverImage || "",
      content,
    });

    return NextResponse.json(
      { success: true, blog: newBlog }, 
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Create Blog Error:", error);
    
    // Check for duplicate key error (if slug somehow exists)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A post with a similar title already exists. Try changing the title." }, 
        { status: 409, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to create blog post. Check server logs." }, 
      { status: 500, headers: corsHeaders }
    );
  }
}