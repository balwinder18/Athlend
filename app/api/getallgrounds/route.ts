"use server"
import { connecttodatabase } from "@/database/db";
import Grounds from "@/database/models/GroundsModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      await connecttodatabase();
      const grounds = await Grounds.find();
      if (!grounds) {
        return NextResponse.json({ error: "no grounds found" }, { status: 404 });
      }
  
      return NextResponse.json( grounds , { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error fetching grounds" }, { status: 500 });
    }
  }