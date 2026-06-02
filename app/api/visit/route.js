import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Visit from "@/models/Visit";

// ==========================================
// CORS CONFIGURATION
// ==========================================
// In production, replace "*" with your specific frontend URLs for better security.
// Example: const ALLOWED_ORIGINS = "https://user-frontend.com, https://admin-dashboard.com"
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

    const { pagePath, country, timeSpent, sessionId } = body;

    const newVisit = await Visit.create({
      pagePath: pagePath || "/",
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
      { success: false },
      { status: 500, headers: corsHeaders }
    );
  }
}