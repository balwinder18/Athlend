import { connecttodatabase } from "@/database/db";
import Grounds from "@/database/models/GroundsModel";
import { NextResponse } from "next/server";



export async function GET( req: Request,
    { params }: { params: { id: string } }){

    try {
        
        await connecttodatabase();

        const id =await params.id;
        if(!id){
            return NextResponse.json({message:"provide gorund id"} , {status :500})
        }

        const data =await Grounds.findById(id);
        if(!data){
            return NextResponse.json({message:"gorund details not found"} , {status :400})
            
        }

        return NextResponse.json(data , {status :200})
        
    } catch (error) {
        return NextResponse.json(error, {status :404})
        
    }

} 