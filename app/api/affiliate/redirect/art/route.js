import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AffiliateClick from "@/models/AffiliateClick";
import crypto from "crypto";

const AFFILIATE_URL =
  "https://elevenmarketingdigital.com/the-art-of-natural-attraction/#aff=digiravi";

export async function GET(request) {
  try {
    await connectDB();

    // =====================================================
    // GENERATE UNIQUE CLICK ID
    // =====================================================

    const clickId = crypto.randomUUID();

    console.log("🆔 Affiliate Click ID:", clickId);

    // =====================================================
    // REQUEST INFORMATION
    // =====================================================

    const userAgent =
      request.headers.get("user-agent") || "";

    const referrer =
      request.headers.get("referer") || "";

    // =====================================================
    // DEVICE DETECTION
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

    const countryCode =
      request.headers.get("x-vercel-ip-country") || "XX";

    const country =
      countryCode !== "XX"
        ? countryCode
        : "Unknown";

    const city =
      request.headers.get("x-vercel-ip-city") || "Unknown";

    // =====================================================
    // RECORD CLICK
    // =====================================================

    const click = await AffiliateClick.create({
      clickId,

      product: "The Art of Natural Attraction",

      source: "homepage-banner",

      device,

      userAgent,

      referrer,

      country,

      countryCode,

      city,

      status: "clicked",

      transactionId: "",
      orderId: "",
      productId: "",

      saleAmount: 0,
      commission: 0,

      currency: "",

      transactionType: "",
      billingStatus: "",
      billingType: "",
      orderType: "",

      affiliateId: "",
      affiliateName: "",

      isTest: false,

      purchasedAt: null,
    });

    console.log(
      "✅ Affiliate click saved:",
      click._id.toString()
    );

    console.log(
      "🆔 Click ID:",
      clickId
    );

    console.log(
      "🌍 Country:",
      countryCode
    );

    console.log(
      "📱 Device:",
      device
    );

    // =====================================================
    // ADD CLICK ID TO VENDOR URL
    // =====================================================

    const redirectUrl = new URL(AFFILIATE_URL);

    redirectUrl.searchParams.set(
      "cid",
      clickId
    );

    console.log(
      "🔗 Redirect URL:",
      redirectUrl.toString()
    );

    // =====================================================
    // REDIRECT
    // =====================================================

    return NextResponse.redirect(
      redirectUrl.toString(),
      302
    );

  } catch (error) {
    console.error(
      "❌ Affiliate redirect error:",
      error
    );

    // Fallback: still send visitor to product
    return NextResponse.redirect(
      AFFILIATE_URL,
      302
    );
  }
}