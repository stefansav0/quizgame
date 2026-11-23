
import mongoose from "mongoose";

const NhieQuestionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    statement: { type: String, required: true },
    creatorAnswer: {
      type: String,
      required: true,
      enum: ["I Have", "Never"],
    },
    bgColor: { type: String, default: "#D1FAE5" },
  },
  { _id: false }
);

const NhieResultSchema = new mongoose.Schema(
  {
    statement: String,
    guess: String,
    correctAnswer: String,
    isCorrect: Boolean,
  },
  { _id: false }
);

const NhieAttemptSchema = new mongoose.Schema({
  friendName: String,
  score: Number,
  totalQuestions: Number,
  date: { type: Date, default: Date.now },
  detailedResults: [NhieResultSchema],
});

const NhieSchema = new mongoose.Schema({
  creatorName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 80,
  },

  quizTitle: String,
  location: String,
  language: String,

  questions: [NhieQuestionSchema],
  attempts: [NhieAttemptSchema],

  // Optional for existing website challenges.
  // Never return this value in public API responses.
  ownerTokenHash: {
    type: String,
    select: false,
    default: undefined,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.NhieQuiz ||
  mongoose.model("NhieQuiz", NhieSchema);
