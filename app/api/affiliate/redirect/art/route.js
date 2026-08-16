import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AffiliateClick from "@/models/AffiliateClick";

const AFFILIATE_URL =
  "https://elevenmarketingdigital.com/the-art-of-natural-attraction/#aff=digiravi";

export async function GET(request) {
  try {
    await connectDB();

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

    // Record click
    await AffiliateClick.create({
      product: "The Art of Natural Attraction",
      source: "homepage-banner",
      device,
      userAgent,
      referrer,
    });

    // Redirect to affiliate page
    return NextResponse.redirect(AFFILIATE_URL, 302);

  } catch (error) {
    console.error("Affiliate redirect error:", error);

    // Even if tracking fails, don't prevent the visitor
    // from reaching the affiliate page.
    return NextResponse.redirect(AFFILIATE_URL, 302);
  }
}