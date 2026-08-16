import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AffiliateClick from "@/models/AffiliateClick";

const allowedOrigins = [
  "https://admin.getknowify.com",
  "http://localhost:3000",
];

function getCorsHeaders(request) {
  const origin = request.headers.get("origin");

  const allowedOrigin = allowedOrigins.includes(origin)
    ? origin
    : "https://admin.getknowify.com";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// =========================================================
// OPTIONS
// =========================================================

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

// =========================================================
// GET
// =========================================================

export async function GET(request) {
  try {
    await connectDB();

    const corsHeaders = getCorsHeaders(request);

    // =====================================================
    // DATES
    // =====================================================

    const now = new Date();

    // Today
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    // Monday of current week
    const startOfWeek = new Date(now);

    const day = startOfWeek.getDay();

    const diff = day === 0 ? 6 : day - 1;

    startOfWeek.setDate(
      startOfWeek.getDate() - diff
    );

    startOfWeek.setHours(0, 0, 0, 0);

    // First day of month
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // =====================================================
    // COMMON FILTER
    // =====================================================

    const productFilter = {
      product: "The Art of Natural Attraction",
    };

    // =====================================================
    // TOTAL
    // =====================================================

    const totalClicks =
      await AffiliateClick.countDocuments(
        productFilter
      );

    // =====================================================
    // TODAY
    // =====================================================

    const todayClicks =
      await AffiliateClick.countDocuments({
        ...productFilter,
        createdAt: {
          $gte: startOfToday,
        },
      });

    // =====================================================
    // WEEK
    // =====================================================

    const weekClicks =
      await AffiliateClick.countDocuments({
        ...productFilter,
        createdAt: {
          $gte: startOfWeek,
        },
      });

    // =====================================================
    // MONTH
    // =====================================================

    const monthClicks =
      await AffiliateClick.countDocuments({
        ...productFilter,
        createdAt: {
          $gte: startOfMonth,
        },
      });

    // =====================================================
    // DAILY CLICKS
    // =====================================================

    const dailyClicks =
      await AffiliateClick.aggregate([
        {
          $match: productFilter,
        },

        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },

            clicks: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            _id: 1,
          },
        },
      ]);

    // =====================================================
    // DEVICE CLICKS
    // =====================================================

    const deviceClicks =
      await AffiliateClick.aggregate([
        {
          $match: productFilter,
        },

        {
          $group: {
            _id: {
              $ifNull: ["$device", "unknown"],
            },

            clicks: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            clicks: -1,
          },
        },
      ]);

    // =====================================================
    // SOURCE CLICKS
    // =====================================================

    const sourceClicks =
      await AffiliateClick.aggregate([
        {
          $match: productFilter,
        },

        {
          $group: {
            _id: {
              $ifNull: ["$source", "unknown"],
            },

            clicks: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            clicks: -1,
          },
        },
      ]);

    // =====================================================
    // COUNTRY CLICKS
    // =====================================================

    const countryClicks =
      await AffiliateClick.aggregate([
        {
          $match: productFilter,
        },

        {
          $group: {
            _id: {
              $ifNull: ["$countryCode", "XX"],
            },

            country: {
              $first: {
                $ifNull: ["$country", "Unknown"],
              },
            },

            clicks: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            clicks: -1,
          },
        },
      ]);

    // =====================================================
    // RECENT CLICKS
    // =====================================================

    const recentClicks =
      await AffiliateClick.find(
        productFilter
      )
        .sort({
          createdAt: -1,
        })
        .limit(50)
        .lean();

    // =====================================================
    // RESPONSE
    // =====================================================

    return NextResponse.json(
      {
        success: true,

        stats: {
          totalClicks,
          todayClicks,
          weekClicks,
          monthClicks,
        },

        dailyClicks,

        deviceClicks,

        sourceClicks,

        countryClicks,

        recentClicks,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(
      "Affiliate stats error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load affiliate statistics",
      },
      {
        status: 500,
        headers: getCorsHeaders(request),
      }
    );
  }
}