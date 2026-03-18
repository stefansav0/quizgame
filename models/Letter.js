import mongoose from "mongoose";

const LetterSchema = new mongoose.Schema({
  recipientName: { type: String, required: true },
  senderName: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent Mongoose from compiling the model multiple times in Next.js
const Letter = mongoose.models.Letter || mongoose.model("Letter", LetterSchema);

export default Letter;