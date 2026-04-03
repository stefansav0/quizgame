import mongoose from "mongoose";

// 1. Define the structure for a single question
const QuestionSchema = new mongoose.Schema({
  id: { type: Number },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  // 🚨 CRITICAL: Must be a Number to match the frontend index (0, 1, 2, 3)
  correctAnswer: { type: Number, required: true },
  bgColor: { type: String }
});

// 2. Define the main Quiz structure
const QuizSchema = new mongoose.Schema(
  {
    creatorName: { type: String, required: true },
    location: { type: String },
    language: { type: String },
    quizTitle: { type: String },
    // Embed the questions array here
    questions: [QuestionSchema], 
  },
  // This automatically adds 'createdAt' and 'updatedAt' for you!
  { timestamps: true } 
);

// Prevent Mongoose from compiling the model multiple times in Next.js
export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);