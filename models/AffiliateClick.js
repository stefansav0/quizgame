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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AffiliateClick ||
  mongoose.model("AffiliateClick", AffiliateClickSchema);