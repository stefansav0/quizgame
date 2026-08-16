import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AffiliateClick from "@/models/AffiliateClick";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // Digistore24 parameters
    const clickId = searchParams.get("click_id") || "";
    const transactionType =
      searchParams.get("transaction_type") || "";

    const amountAffiliate = parseFloat(
      searchParams.get("amount_affiliate") || "0"
    );

    const orderId = searchParams.get("order_id") || "";
    const transactionId =
      searchParams.get("transaction_id") || "";

    const productId =
      searchParams.get("product_id") || "";

    const productName =
      searchParams.get("product_name") || "";

    const currency =
      searchParams.get("currency") || "";

    const billingStatus =
      searchParams.get("billing_status") || "";

    const billingType =
      searchParams.get("billing_type") || "";

    const orderType =
      searchParams.get("order_type") || "";

    const affiliateId =
      searchParams.get("affiliate_id") || "";

    const affiliateName =
      searchParams.get("affiliate_name") || "";

    const country =
      searchParams.get("country") || "Unknown";

    const isTest =
      searchParams.get("is_test") === "1";

    console.log("=================================");
    console.log("DIGISTORE24 POSTBACK");
    console.log("Click ID:", clickId);
    console.log("Transaction:", transactionType);
    console.log("Order:", orderId);
    console.log("Amount:", amountAffiliate);
    console.log("=================================");

    // Click ID is required to connect
    // the sale to the original visitor.
    if (!clickId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing click_id",
        },
        { status: 400 }
      );
    }

    // Find the original banner click
    const click = await AffiliateClick.findOne({
      clickId,
    });

    if (!click) {
      console.error(
        "Affiliate click not found:",
        clickId
      );

      return NextResponse.json(
        {
          success: false,
          message: "Click ID not found",
        },
        { status: 404 }
      );
    }

    // Determine status
    let status = "clicked";

    if (transactionType === "payment") {
      status = "payment";
    } else if (transactionType === "refund") {
      status = "refund";
    } else if (transactionType === "chargeback") {
      status = "chargeback";
    }

    // Update original click
    click.status = status;

    click.transactionId = transactionId;
    click.orderId = orderId;
    click.productId = productId;

    click.saleAmount = amountAffiliate;

    click.commission = amountAffiliate;

    click.currency = currency;

    click.transactionType =
      transactionType;

    click.billingStatus =
      billingStatus;

    click.billingType =
      billingType;

    click.orderType =
      orderType;

    click.affiliateId =
      affiliateId;

    click.affiliateName =
      affiliateName;

    click.isTest = isTest;

    if (
      transactionType === "payment" &&
      !click.purchasedAt
    ) {
      click.purchasedAt = new Date();
    }

    if (country && country !== "Unknown") {
      click.country = country;
    }

    await click.save();

    console.log(
      "✅ Affiliate click updated:",
      clickId
    );

    return NextResponse.json({
      success: true,
      message: "Postback received successfully",
      clickId,
      status,
    });
  } catch (error) {
    console.error(
      "❌ Digistore24 postback error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}