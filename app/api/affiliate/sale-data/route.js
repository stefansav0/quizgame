import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AffiliateClick from "@/models/AffiliateClick";

const ALLOWED_ORIGIN =
  "https://admin.getknowify.com";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

// =========================================================
// OPTIONS - CORS PREFLIGHT
// =========================================================

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

// =========================================================
// GET SALES DATA
// =========================================================

export async function GET() {
  try {
    await connectDB();

    // =====================================================
    // DATE HELPERS
    // =====================================================

    const now = new Date();

    // Today
    const startOfToday = new Date(now);

    startOfToday.setHours(
      0,
      0,
      0,
      0
    );

    // Monday of current week
    const startOfWeek = new Date(now);

    const day =
      startOfWeek.getDay();

    const diff =
      day === 0
        ? 6
        : day - 1;

    startOfWeek.setDate(
      startOfWeek.getDate() - diff
    );

    startOfWeek.setHours(
      0,
      0,
      0,
      0
    );

    // First day of month
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // =====================================================
    // TOTAL CLICKS
    // =====================================================

    const totalClicks =
      await AffiliateClick.countDocuments();

    // =====================================================
    // TOTAL PURCHASES
    // =====================================================

    const totalSales =
      await AffiliateClick.countDocuments({
        status: "purchased",
      });

    // =====================================================
    // TODAY SALES
    // =====================================================

    const todaySales =
      await AffiliateClick.countDocuments({
        status: "purchased",
        purchasedAt: {
          $gte: startOfToday,
        },
      });

    // =====================================================
    // WEEK SALES
    // =====================================================

    const weekSales =
      await AffiliateClick.countDocuments({
        status: "purchased",
        purchasedAt: {
          $gte: startOfWeek,
        },
      });

    // =====================================================
    // MONTH SALES
    // =====================================================

    const monthSales =
      await AffiliateClick.countDocuments({
        status: "purchased",
        purchasedAt: {
          $gte: startOfMonth,
        },
      });

    // =====================================================
    // REVENUE + COMMISSION
    // =====================================================

    const revenueResult =
      await AffiliateClick.aggregate([
        {
          $match: {
            status: "purchased",
          },
        },

        {
          $group: {
            _id: null,

            totalRevenue: {
              $sum: "$saleAmount",
            },

            totalCommission: {
              $sum: "$commission",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueResult[0]
        ?.totalRevenue || 0;

    const totalCommission =
      revenueResult[0]
        ?.totalCommission || 0;

    // =====================================================
    // CONVERSION RATE
    // =====================================================

    const conversionRate =
      totalClicks > 0
        ? (
            (totalSales /
              totalClicks) *
            100
          ).toFixed(2)
        : "0.00";

    // =====================================================
    // RECENT SALES
    // =====================================================

    const sales =
      await AffiliateClick.find({
        status: {
          $in: [
            "purchased",
            "refunded",
            "chargeback",
          ],
        },
      })
        .sort({
          updatedAt: -1,
        })
        .limit(100)
        .lean();

    // =====================================================
    // RESPONSE
    // =====================================================

    return NextResponse.json(
      {
        success: true,

        stats: {
          totalClicks,
          totalSales,

          todaySales,
          weekSales,
          monthSales,

          totalRevenue,
          totalCommission,

          conversionRate,
        },

        sales,
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );

  } catch (error) {
    console.error(
      "❌ Affiliate sale-data error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load affiliate data",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}