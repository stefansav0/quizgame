
import mongoose from "mongoose";

// Individual quiz question
const QuestionSchema = new mongoose.Schema({
  id: { type: Number },

  question: {
    type: String,
    required: true,
  },

  options: {
    type: [String],
    required: true,
  },

  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },

  bgColor: {
    type: String,
  },
});

// Main Friendship Quiz
const QuizSchema = new mongoose.Schema(
  {
    creatorName: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "English",
    },

    quizTitle: {
      type: String,
      default: "",
    },

    questions: {
      type: [QuestionSchema],
      default: [],
    },

    // Random installation ID from the Expo app.
    // Legacy website quizzes can omit this.
    ownerId: {
      type: String,
      default: undefined,
    },

    // SHA-256 hash of the secret ownership token.
    // Never store the original token here.
    ownerTokenHash: {
      type: String,
      select: false,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

// Enforce one quiz per registered installation ID.
// Legacy quizzes without ownerId are excluded.
QuizSchema.index(
  { ownerId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      ownerId: { $type: "string" },
    },
  }
);

export default mongoose.models.Quiz ||
  mongoose.model("Quiz", QuizSchema);
