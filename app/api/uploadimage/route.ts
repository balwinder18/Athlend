import { connecttodatabase } from "@/database/db";
import User from '../../../database/models/UserModels';
import { NextResponse } from "next/server";



export async function POST(req: Request) {

    try {
        await connecttodatabase();

        const { email, imageUrl } = await req.json();

        if (!imageUrl|| !email) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });

        }

        const user = await User.findOne({ email });

        if(!user){
            return NextResponse.json({ success: false, message: "user not found" }, { status: 400 });
          }

          user.imageUrl = imageUrl;

          await user.save();

          console.log("image upload in mongo db");


          return NextResponse.json({success: true , message:"image upload in db"} , {status:200});





    } catch (error) {

        console.error('Error updating image in db', error);
        return NextResponse.json(
            { success: false, message: "An error occurred while updating location" },
            { status: 500 }
          );

    }

}