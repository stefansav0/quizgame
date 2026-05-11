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
// GET SINGLE BLOG BY SLUG
// ==========================================
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug: slug });

    if (!blog) return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404, headers: corsHeaders });
    return NextResponse.json({ success: true, blog }, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch blog" }, { status: 500, headers: corsHeaders });
  }
}

// ==========================================
// UPDATE BLOG BY SLUG
// ==========================================
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const body = await request.json();

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug: slug },
      { $set: body },
      { new: true } 
    );

    if (!updatedBlog) return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404, headers: corsHeaders });
    return NextResponse.json({ success: true, blog: updatedBlog }, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update blog" }, { status: 500, headers: corsHeaders });
  }
}

// ==========================================
// DELETE BLOG BY SLUG
// ==========================================
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { slug } = await params;

    const deletedBlog = await Blog.findOneAndDelete({ slug: slug });

    if (!deletedBlog) return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404, headers: corsHeaders });
    return NextResponse.json({ success: true, message: "Blog deleted successfully" }, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 500, headers: corsHeaders });
  }
}