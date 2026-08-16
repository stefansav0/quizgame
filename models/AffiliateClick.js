import mongoose from "mongoose";

const AffiliateClickSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      default: "The Art of Natural Attraction",
      required: true,
    },

    source: {
      type: String,
      default: "homepage-banner",
    },

    device: {
      type: String,
      enum: ["mobile", "tablet", "desktop", "unknown"],
      default: "unknown",
    },

    userAgent: {
      type: String,
      default: "",
    },

    referrer: {
      type: String,
      default: "",
    },
    country: {
  type: String,
  default: "Unknown",
},

countryCode: {
  type: String,
  default: "XX",
},

city: {
  type: String,
  default: "Unknown",
},
clickId: {
  type: String,
  unique: true,
  sparse: true,
},

status: {
  type: String,
  default: "clicked",
},

transactionId: {
  type: String,
  default: "",
},

orderId: {
  type: String,
  default: "",
},

productId: {
  type: String,
  default: "",
},

saleAmount: {
  type: Number,
  default: 0,
},

commission: {
  type: Number,
  default: 0,
},

currency: {
  type: String,
  default: "",
},

transactionType: {
  type: String,
  default: "",
},

billingStatus: {
  type: String,
  default: "",
},

billingType: {
  type: String,
  default: "",
},

orderType: {
  type: String,
  default: "",
},

affiliateId: {
  type: String,
  default: "",
},

affiliateName: {
  type: String,
  default: "",
},

isTest: {
  type: Boolean,
  default: false,
},

purchasedAt: {
  type: Date,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AffiliateClick ||
  mongoose.model("AffiliateClick", AffiliateClickSchema);