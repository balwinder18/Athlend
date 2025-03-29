
import { connecttodatabase } from "@/database/db";
import Grounds from "@/database/models/GroundsModel";
import { NextResponse } from "next/server";
import { Types } from 'mongoose';

export async function GET(req, { params }) {
    try {
        await connecttodatabase();

        const id =await params.id;
        if (!id) {
            return NextResponse.json(
                { message: "provide ground id" },
                { status: 500 }
            );
        }

        const data = await Grounds.findById(id);
        if (!data) {
            return NextResponse.json(
                { message: "ground details not found" },
                { status: 400 }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 404 });
    }
}




export async function DELETE(req ,{params}) {
    try {
      await connecttodatabase();
      
     
      const { id } = params;
      
      if (!id) {
        return NextResponse.json(
          { success: false, message: "Invalid ground ID" },
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      const result = await Grounds.deleteOne({ _id: new Types.ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return NextResponse.json(
          { success: false, message: "Ground not found" },
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      return NextResponse.json({ success: true, message: "Ground deleted successfully" },
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
  
    } catch (error) {
      console.error("Delete Error:", error);
      return NextResponse.json(
        { 
          success: false, 
          message: "Failed to delete ground",
         
        },
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }