import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true 
    },
    category: { 
      type: String, 
      required: true,
      trim: true 
    },
    keywords: { 
      type: String, 
      default: "",
      trim: true 
    },
    metaDescription: { 
      type: String, 
      required: true,
      maxLength: 250, // Keeps it strictly within safe SEO limits
      trim: true 
    },
    author: { 
      type: String, 
      required: true,
      trim: true 
    },
    status: { 
      type: String, 
      enum: ["draft", "published"], 
      default: "draft" 
    },
    coverImage: { 
      type: String, 
      default: "" 
    },
    content: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true }
);

// Prevent Next.js hot-reloading from compiling the model multiple times
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema, "blogs");

export default Blog;