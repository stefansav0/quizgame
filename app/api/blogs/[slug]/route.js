import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ==========================================
// GET: FETCH SINGLE BLOG BY ID
// ==========================================
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params; // Next.js 15+ param unwrap

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json({ success: true, blog }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Fetch Single Blog Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch blog" }, { status: 500, headers: corsHeaders });
  }
}

// ==========================================
// PUT: UPDATE BLOG
// ==========================================
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true } // Returns the updated document
    );

    if (!updatedBlog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json({ success: true, blog: updatedBlog }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Update Blog Error:", error);
    return NextResponse.json({ success: false, error: "Failed to update blog" }, { status: 500, headers: corsHeaders });
  }
}

// ==========================================
// DELETE: REMOVE BLOG
// ==========================================
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json({ success: true, message: "Blog deleted successfully" }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 500, headers: corsHeaders });
  }
}