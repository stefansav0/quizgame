import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import AffiliateClick from "@/models/AffiliateClick";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // =========================================================
    // DIGISTORE24 DATA
    // =========================================================

    const clickId =
      searchParams.get("click_id") || "";

    const country =
      searchParams.get("country") || "";

    const affiliateAmount =
      searchParams.get("affiliate_amount") || "0";

    const amountBrutto =
      searchParams.get("amount_brutto") || "0";

    const currency =
      searchParams.get("currency") || "";

    const orderId =
      searchParams.get("order_id") || "";

    const productId =
      searchParams.get("product_id") || "";

    const transactionId =
      searchParams.get("transaction_id") || "";

    const transactionType =
      searchParams.get("transaction_type") || "";

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

    const isTest =
      searchParams.get("is_test") || "";

    const datetime =
      searchParams.get("datetime") || "";

    // =========================================================
    // LOG POSTBACK
    // =========================================================

    console.log("====================================");
    console.log("📥 DIGISTORE24 POSTBACK");
    console.log("====================================");

    console.log("Click ID:", clickId);
    console.log("Transaction ID:", transactionId);
    console.log("Transaction Type:", transactionType);
    console.log("Order ID:", orderId);
    console.log("Product ID:", productId);
    console.log("Affiliate Amount:", affiliateAmount);
    console.log("Gross Amount:", amountBrutto);
    console.log("Currency:", currency);
    console.log("Country:", country);
    console.log("Is Test:", isTest);

    // =========================================================
    // BASIC VALIDATION
    // =========================================================

    if (!clickId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing click_id",
        },
        { status: 400 }
      );
    }

    if (!transactionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing transaction_id",
        },
        { status: 400 }
      );
    }

    // =========================================================
    // VALID TRANSACTION TYPES
    // =========================================================

    const validTransactionTypes = [
      "payment",
      "refund",
      "chargeback",
    ];

    if (
      transactionType &&
      !validTransactionTypes.includes(
        transactionType
      )
    ) {
      console.warn(
        "⚠️ Unknown transaction type:",
        transactionType
      );
    }

    // =========================================================
    // FIND ORIGINAL CLICK
    // =========================================================

    const click =
      await AffiliateClick.findOne({
        clickId,
      });

    if (!click) {
      console.warn(
        "⚠️ No matching affiliate click:",
        clickId
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Click ID not found",
          clickId,
        },
        { status: 404 }
      );
    }

    // =========================================================
    // DETERMINE STATUS
    // =========================================================

    let newStatus = "unknown";

    if (transactionType === "payment") {
      newStatus = "purchased";
    }

    if (transactionType === "refund") {
      newStatus = "refunded";
    }

    if (transactionType === "chargeback") {
      newStatus = "chargeback";
    }

    // =========================================================
    // UPDATE CLICK
    // =========================================================

    click.status = newStatus;

    click.transactionId =
      transactionId;

    click.orderId =
      orderId;

    click.productId =
      productId;

    // Gross customer/order amount
    click.saleAmount =
      Number(amountBrutto) || 0;

    // Your affiliate commission
    click.commission =
      Number(affiliateAmount) || 0;

    click.currency =
      currency;

    // Only overwrite country if Digistore
    // actually sends one
    if (country) {
      click.country = country;
    }

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

    click.isTest =
      isTest === "1";

    // =========================================================
    // PURCHASE DATE
    // =========================================================

    if (
      transactionType === "payment"
    ) {
      if (datetime) {
        const parsedDate =
          new Date(datetime);

        if (
          !isNaN(
            parsedDate.getTime()
          )
        ) {
          click.purchasedAt =
            parsedDate;
        } else {
          click.purchasedAt =
            new Date();
        }
      } else {
        click.purchasedAt =
          new Date();
      }
    }

    // =========================================================
    // SAVE
    // =========================================================

    await click.save();

    console.log(
      "===================================="
    );

    console.log(
      `✅ Affiliate ${newStatus}`
    );

    console.log(
      "Click ID:",
      clickId
    );

    console.log(
      "Transaction:",
      transactionId
    );

    console.log(
      "Commission:",
      affiliateAmount
    );

    console.log(
      "Sale Amount:",
      amountBrutto
    );

    console.log(
      "===================================="
    );

    // =========================================================
    // RESPONSE TO DIGISTORE24
    // =========================================================

    return NextResponse.json({
      success: true,

      message:
        "Digistore24 postback received",

      matchedClick: true,

      data: {
        clickId,

        transactionId,

        transactionType,

        orderId,

        productId,

        country,

        amountBrutto,

        affiliateAmount,

        currency,

        status:
          newStatus,

        isTest:
          isTest === "1",
      },
    });

  } catch (error) {
    console.error(
      "❌ Digistore24 sale webhook error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error",
      },
      { status: 500 }
    );
  }
}