
import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
    index: true,
  },

  playerName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
  },

  score: {
    type: Number,
    required: true,
    min: 0,
  },

  totalQuestions: {
    type: Number,
    required: true,
    min: 1,
  },

  selectedAnswers: {
    type: [Number],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Speeds up leaderboard queries for a quiz.
ScoreSchema.index({
  quizId: 1,
  score: -1,
  createdAt: 1,
});

const Score =
  mongoose.models.Score ||
  mongoose.model("Score", ScoreSchema);

export default Score;
