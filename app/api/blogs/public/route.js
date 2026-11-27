
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({
      status: "published",
    })
      .select(
        "title slug category metaDescription coverImage author createdAt"
      )
      .sort({ createdAt: -1 })
      .limit(12)
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: blogs.length,
        blogs,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=60",
          "Vercel-CDN-Cache-Control":
            "public, s-maxage=300",
        },
      }
    );
  } catch (error) {
    console.error("Public Blogs Error:", error);

    return NextResponse.json(
      { success: false, blogs: [] },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
