import { connectDB } from "@/lib/mongodb";
import Letter from "@/models/Letter";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. Connect to your MongoDB database
    await connectDB();

    // 2. Parse the data sent from the "Send a Letter" form
    const body = await request.json();
    
    // 🔥 ADDED: Extract the 'theme' from the incoming data
    const { recipientName, senderName, message, theme } = body;

    // 3. Basic Validation
    if (!recipientName || !senderName || !message) {
      return NextResponse.json(
        { error: "All fields are required to seal the envelope!" }, 
        { status: 400 }
      );
    }

    // 4. Save the letter to MongoDB
    const newLetter = await Letter.create({
      recipientName,
      senderName,
      message,
      // 🔥 ADDED: Save the chosen theme (fallback to "purple" just in case)
      theme: theme || "purple", 
    });

    // 5. Send the real database ID back to the frontend
    return NextResponse.json({ 
      success: true, 
      letterId: newLetter._id 
    }, { status: 201 });

  } catch (error) {
    console.error("Letter Save Error:", error);
    return NextResponse.json(
      { error: "Failed to seal the letter. Please try again." }, 
      { status: 500 }
    );
  }
}