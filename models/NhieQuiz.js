import mongoose from "mongoose";

const NhieSchema = new mongoose.Schema({
  creatorName: { type: String, required: true },
  quizTitle: String,
  questions: [
    {
      id: Number,
      statement: String,
      creatorAnswer: String, // "I Have" or "Never"
      bgColor: String,
    }
  ],
  attempts: [
    {
      friendName: String,
      score: Number,
      totalQuestions: Number,
      date: { type: Date, default: Date.now },
      // 🔥 NEW: Stores the exact breakdown of what they got right/wrong
      detailedResults: [
        {
          statement: String,
          guess: String,
          correctAnswer: String,
          isCorrect: Boolean
        }
      ]
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.NhieQuiz || mongoose.model("NhieQuiz", NhieSchema);