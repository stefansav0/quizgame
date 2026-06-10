import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Visit from "@/models/Visit";

// 🌟 FIX 1: FORCE NEXT.JS TO BYPASS THE SERVER CACHE ON EVERY REQUEST
export const dynamic = "force-dynamic";

// ==========================================
// CORS CONFIGURATION
// ==========================================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  // 🌟 BONUS FIX: Prevent browsers from caching the API response on the client side
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
};

// Handle Preflight Requests
export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

// ==========================================
// GET: ADMIN DASHBOARD FETCH
// ==========================================
export async function GET() {
  try {
    await connectDB();
    const visits = await Visit.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, visits: visits },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Database Fetch Error:", error);
    return NextResponse.json(
      { success: false, visits: [] },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ==========================================
// POST: USER FRONTEND TRACKER
// ==========================================
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // 🌟 FIX 2: Added 'pageTitle' to the destructuring pull here so it doesn't crash
    const { pagePath, pageTitle, country, timeSpent, sessionId } = body;

    const newVisit = await Visit.create({
      pagePath: pagePath || "/",
      pageTitle: pageTitle || "Unknown Page", 
      country: country || "Unknown",
      timeSpent: timeSpent || 0,
      visitors: 1,
      sessionId: sessionId || "anonymous",
    });

    return NextResponse.json(
      { success: true, visit: newVisit },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Tracking Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}