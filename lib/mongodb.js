import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env.local");
}

/**
 * Global cache (important for Next.js hot reload)
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {

  // ✅ If already connected, return
  if (cached.conn) {
    console.log("🟢 MongoDB already connected");
    return cached.conn;
  }

  // ✅ If no connection promise, create one
  if (!cached.promise) {

    const opts = {
      bufferCommands: false,
    };

    console.log("🟡 Connecting to MongoDB...");

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {

        console.log("✅ MongoDB Connected Successfully");

        return mongooseInstance;
      })
      .catch((error) => {

        console.error("❌ MongoDB Connection Failed:", error);

        throw error;
      });
  }

  // ✅ Await connection
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}