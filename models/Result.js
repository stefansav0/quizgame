import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  quizId: String,
  playerName: String,
  score: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Result ||
  mongoose.model("Result", ResultSchema);