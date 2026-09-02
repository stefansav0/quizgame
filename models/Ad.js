import mongoose from "mongoose";

const AdSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    advertiser: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    targetUrl: {
      type: String,
      required: true,
    },

    placement: {
      type: String,
      enum: [
        "HOME_TOP",
        "HOME_MIDDLE",
        "HOME_BOTTOM",
        "ARTICLE_TOP",
        "ARTICLE_MIDDLE",
        "ARTICLE_BOTTOM",
      ],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    impressions: {
      type: Number,
      default: 0,
    },

    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Ad || mongoose.model("Ad", AdSchema);