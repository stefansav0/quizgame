import { connectDB } from "@/lib/mongodb";
import Letter from "@/models/Letter";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    // 1. Connect to database
    await connectDB();
    
    // 2. Await the params to get the letter ID from the URL
    const resolvedParams = await params; 
    const id = resolvedParams.id;
    
    // 3. Find the letter by its ID and delete it from MongoDB
    const deletedLetter = await Letter.findByIdAndDelete(id);
    
    // 4. If the letter was already deleted or doesn't exist
    if (!deletedLetter) {
      return NextResponse.json({ error: "Letter not found" }, { status: 404 });
    }

    // 5. Success!
    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}