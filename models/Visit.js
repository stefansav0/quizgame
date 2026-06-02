import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    pagePath: {
      type: String,
      required: true,
      default: "/",
    },
    country: {
      type: String,
      default: "Unknown",
    },
    timeSpent: {
      type: Number,
      default: 0, // In seconds
    },
    visitors: {
      type: Number,
      default: 1, // Always 1 per record to easily sum on the frontend
    },
    sessionId: {
      type: String, // Used to group sessions if needed later
    }
  },
  { timestamps: true }
);

export default mongoose.models.Visit || mongoose.model("Visit", visitSchema);