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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AffiliateClick ||
  mongoose.model("AffiliateClick", AffiliateClickSchema);