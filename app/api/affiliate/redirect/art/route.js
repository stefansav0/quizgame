import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AffiliateClick from "@/models/AffiliateClick";

const AFFILIATE_URL =
  "https://elevenmarketingdigital.com/the-art-of-natural-attraction/#aff=digiravi";

export async function GET(request) {
  try {
    await connectDB();

    const userAgent =
      request.headers.get("user-agent") || "";

    const referrer =
      request.headers.get("referer") || "";

    // =====================================================
    // DEVICE
    // =====================================================

    let device = "unknown";

    if (/tablet|ipad/i.test(userAgent)) {
      device = "tablet";
    } else if (
      /mobile|android|iphone/i.test(userAgent)
    ) {
      device = "mobile";
    } else {
      device = "desktop";
    }

    // =====================================================
    // VERCEL GEO INFORMATION
    // =====================================================

    const country =
      request.headers.get(
        "x-vercel-ip-country"
      ) || "Unknown";

    const countryCode =
      request.headers.get(
        "x-vercel-ip-country"
      ) || "XX";

    const city =
      request.headers.get(
        "x-vercel-ip-city"
      ) || "Unknown";

    // =====================================================
    // RECORD CLICK
    // =====================================================

    await AffiliateClick.create({
      product: "The Art of Natural Attraction",

      source: "homepage-banner",

      device,

      userAgent,

      referrer,

      country,

      countryCode,

      city,
    });

    // =====================================================
    // REDIRECT
    // =====================================================

    return NextResponse.redirect(
      AFFILIATE_URL,
      302
    );

  } catch (error) {
    console.error(
      "Affiliate redirect error:",
      error
    );

    // Tracking failure should never stop
    // the visitor from reaching the product.

    return NextResponse.redirect(
      AFFILIATE_URL,
      302
    );
  }
}