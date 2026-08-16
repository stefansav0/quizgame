import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AffiliateClick from "@/models/AffiliateClick";

const ALLOWED_ORIGIN =
  "https://admin.getknowify.com";
  "http://localhost:3000";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const PRODUCT_NAME =
  "The Art of Natural Attraction";

// --------------------------------------------------
// OPTIONS - CORS preflight
// --------------------------------------------------

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// --------------------------------------------------
// GET - Affiliate statistics
// --------------------------------------------------

export async function GET(request) {
  try {
    await connectDB();

    const now = new Date();

    // ------------------------------------------------
    // Start of today
    // ------------------------------------------------

    const startOfDay = new Date(now);

    startOfDay.setHours(0, 0, 0, 0);

    // ------------------------------------------------
    // Start of this week
    // Sunday = first day
    // ------------------------------------------------

    const startOfWeek = new Date(now);

    startOfWeek.setDate(
      startOfWeek.getDate() -
        startOfWeek.getDay()
    );

    startOfWeek.setHours(0, 0, 0, 0);

    // ------------------------------------------------
    // Start of this month
    // ------------------------------------------------

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // ------------------------------------------------
    // TOTAL
    // ------------------------------------------------

    const totalClicks =
      await AffiliateClick.countDocuments({
        product: PRODUCT_NAME,
      });

    // ------------------------------------------------
    // TODAY
    // ------------------------------------------------

    const todayClicks =
      await AffiliateClick.countDocuments({
        product: PRODUCT_NAME,

        createdAt: {
          $gte: startOfDay,
        },
      });

    // ------------------------------------------------
    // THIS WEEK
    // ------------------------------------------------

    const weekClicks =
      await AffiliateClick.countDocuments({
        product: PRODUCT_NAME,

        createdAt: {
          $gte: startOfWeek,
        },
      });

    // ------------------------------------------------
    // THIS MONTH
    // ------------------------------------------------

    const monthClicks =
      await AffiliateClick.countDocuments({
        product: PRODUCT_NAME,

        createdAt: {
          $gte: startOfMonth,
        },
      });

    // ------------------------------------------------
    // DATE-WISE CLICKS
    // ------------------------------------------------
    //
    // Example:
    //
    // 2026-08-12 → 5
    // 2026-08-13 → 12
    // 2026-08-14 → 8
    //
    // ------------------------------------------------

    const dailyClicks =
      await AffiliateClick.aggregate([
        {
          $match: {
            product: PRODUCT_NAME,
          },
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

    // ------------------------------------------------
    // DEVICE-WISE CLICKS
    // ------------------------------------------------

    const deviceClicks =
      await AffiliateClick.aggregate([
        {
          $match: {
            product: PRODUCT_NAME,
          },
        },

        {
          $group: {
            _id: "$device",

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

    // ------------------------------------------------
    // SOURCE-WISE CLICKS
    // ------------------------------------------------

    const sourceClicks =
      await AffiliateClick.aggregate([
        {
          $match: {
            product: PRODUCT_NAME,
          },
        },

        {
          $group: {
            _id: "$source",

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

    // ------------------------------------------------
    // RECENT CLICKS
    // ------------------------------------------------

    const recentClicks =
      await AffiliateClick.find({
        product: PRODUCT_NAME,
      })
        .sort({
          createdAt: -1,
        })
        .limit(20)
        .select(
          "product source device referrer createdAt"
        )
        .lean();

    // ------------------------------------------------
    // RESPONSE
    // ------------------------------------------------

    return NextResponse.json(
      {
        success: true,

        product: PRODUCT_NAME,

        stats: {
          totalClicks,
          todayClicks,
          weekClicks,
          monthClicks,
        },

        dailyClicks,

        deviceClicks,

        sourceClicks,

        recentClicks,
      },

      {
        status: 200,

        headers: {
          ...corsHeaders,

          // Prevent browser/proxy caching
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
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

        headers: corsHeaders,
      }
    );
  }
}