import mongoose from "mongoose";

// 🔥 Each answer structure
const AnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  selected: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

// 🔥 Main Result Schema
const ResultSchema = new mongoose.Schema({
  quizId: {
    type: String,
    required: true,
  },
  playerName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },

  // ✅ NEW: store all answers
  answers: {
    type: [AnswerSchema],
    default: [],
  },

  // ✅ BONUS: percentage (optional but useful)
  percentage: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Result ||
  mongoose.model("Result", ResultSchema);