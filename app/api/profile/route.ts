import { connecttodatabase } from "@/database/db";
import User from "@/database/models/UserModels";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      await connecttodatabase();
      const user = await User.findOne(); // Fetch the first user (modify as needed)
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error fetching profile" }, { status: 500 });
    }
  }