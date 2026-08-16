import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AffiliateClick from "@/models/AffiliateClick";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      product = "The Art of Natural Attraction",
      source = "homepage-banner",
    } = body;

    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || "";

    // Detect device
    let device = "unknown";

    if (/tablet|ipad/i.test(userAgent)) {
      device = "tablet";
    } else if (/mobile|android|iphone/i.test(userAgent)) {
      device = "mobile";
    } else {
      device = "desktop";
    }

    const click = await AffiliateClick.create({
      product,
      source,
      device,
      userAgent,
      referrer,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Affiliate click recorded",
        clickId: click._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Affiliate tracking error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to record affiliate click",
      },
      { status: 500 }
    );
  }
}