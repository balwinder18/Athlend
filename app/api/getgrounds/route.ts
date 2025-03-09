"use server"
import { connecttodatabase } from "@/database/db";
import Grounds from "@/database/models/GroundsModel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get('userId');
      
      if (!userId) {
        return NextResponse.json({ error: "userId is required" }, { status: 400 });
      }

      await connecttodatabase();
      const grounds = await Grounds.find({ userId: userId });
      if (!grounds || grounds.length === 0) {
        return NextResponse.json({ error: "no grounds found for this user" }, { status: 404 });
      }
  
      return NextResponse.json(grounds, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error fetching grounds" }, { status: 500 });
    }
  }