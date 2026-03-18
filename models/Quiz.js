import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});

const QuizSchema = new mongoose.Schema({
  creatorName: String,
  questions: [QuestionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Quiz ||
  mongoose.model("Quiz", QuizSchema);