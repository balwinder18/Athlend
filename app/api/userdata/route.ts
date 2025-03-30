"use server"
import { connecttodatabase } from "@/database/db";
import User from "@/database/models/UserModels";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try {
      const { searchParams } = new URL(req.url);
      const email = searchParams.get('email');
      
      if (!email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }
      
      await connecttodatabase();
      const user = await User.findOne({ email }).select('-password');
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error fetching profile" }, { status: 500 });
    }
  }


  export async function PUT(req:Request){
    try {
      await connecttodatabase();

      const {email,userdata} = await req.json();
      if (!email || !userdata) {
        return NextResponse.json(
          { error: "Email and user data are required" },
          { status: 400 }
        );
      }
  

      const updatedUser = await User.findOneAndUpdate(
        { email }, 
        userdata,   
        { new: true, runValidators: true } 
      );

      if (!updatedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({message:"User updated"}, { status: 200 });


    } catch (error) {
      return NextResponse.json({ error: "Error updating profile" }, { status: 500 });
    }
  }
  