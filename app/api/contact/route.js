import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";

// 🧠 Simple in-memory rate limit (per IP)
const rateLimit = new Map();

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, message } = body;

    const ip =
      req.headers.get("x-forwarded-for") ||
      "unknown-ip";

    // 🚫 RATE LIMIT (max 3 requests per minute)
    const now = Date.now();
    const userData = rateLimit.get(ip) || { count: 0, time: now };

    if (now - userData.time < 60000) {
      if (userData.count >= 3) {
        return Response.json(
          { error: "Too many requests. Try later." },
          { status: 429 }
        );
      }
      userData.count += 1;
    } else {
      userData.count = 1;
      userData.time = now;
    }

    rateLimit.set(ip, userData);

    // ❌ VALIDATION
    if (!name || !email || !message) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return Response.json(
        { error: "Message too short" },
        { status: 400 }
      );
    }

    // 📧 EMAIL FORMAT CHECK
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // 💾 SAVE TO DB
    await Message.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date(),
    });

    // 📧 MAIL TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✨ CLEAN PROFESSIONAL EMAIL TEMPLATE
    await transporter.sendMail({
      from: `"Quiz Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact from ${name}`,
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2 style="color:#10b981;">New Contact Message</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <hr style="margin:20px 0"/>

          <p><strong>Message:</strong></p>
          <p style="background:#f4f4f4;padding:10px;border-radius:8px">
            ${message}
          </p>

          <hr style="margin:20px 0"/>

          <p style="font-size:12px;color:gray">
            Sent from your Quiz Website 🚀
          </p>
        </div>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}