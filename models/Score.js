// models/Score.js
import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  quizId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Quiz', 
    required: true 
  },
  playerName: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent Mongoose from compiling the model multiple times in Next.js
const Score = mongoose.models.Score || mongoose.model("Score", ScoreSchema);

export default Score;