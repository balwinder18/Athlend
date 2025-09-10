"use server"
// import { connecttodatabase } from "@/database/db";
// import Grounds from "@/database/models/GroundsModel";
// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//       await connecttodatabase();
//       const grounds = await Grounds.find({ Approval: "yes" }).lean();
//       if (!grounds) {
//         return NextResponse.json({ error: "no grounds found" }, { status: 404 });
//       }
  
//       return NextResponse.json( grounds , { status: 200 });
//     } catch (error) {
//       return NextResponse.json({ error: "Error fetching grounds" }, { status: 500 });
//     }
//   }



import { connecttodatabase } from "@/database/db";
import Grounds from "@/database/models/GroundsModel";
import { NextResponse } from "next/server";

export async function GET() {
    
    try {
      await connecttodatabase();
      
      const grounds = await Grounds.find({ Approval: "yes" }).lean();
      
      if (!grounds || grounds.length === 0) {
        return NextResponse.json({ error: "No grounds found" }, { status: 404 });
      }
  
      
      return NextResponse.json(grounds, { status: 200 });
    } catch (error) {
      console.error("API Error:", error);
      return NextResponse.json({ error: "Error fetching grounds" }, { status: 500 });
    }
}