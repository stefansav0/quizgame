import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    // Add the slug field here:
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    coverImage: { type: String, default: "" },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema, "blogs");

export default Blog;