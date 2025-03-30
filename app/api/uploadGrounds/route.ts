import { NextResponse } from 'next/server';
import {connecttodatabase} from '../../../database/db';
import Grounds from '../../../database/models/GroundsModel'




export async function POST(req : Request) {

    try {
        await connecttodatabase();

        const {name,location,description , userId,imageUrl,capacity,pricing,phone,email,facilities} = await req.json();

         if (!name || !location || !description || !userId || !imageUrl || !capacity || !pricing || !phone || !email || !facilities) {
              return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
            }

           const newGround = new Grounds({name,location,description, userId,imageUrl,capacity,pricing,phone,email,facilities});
           await newGround.save(); 



         return NextResponse.json({ success: true, message: "Ground registered successfully" }, { status: 201 });
    } catch (error:any) {
         return NextResponse.json({ success: false, message: "Server Error", error: error.message }, { status: 500 });
    }

}


export async function PUT(req:Request){
     try {
         await connecttodatabase();
        
              const {id,grounddata} = await req.json();
              if (!id || !grounddata) {
                return NextResponse.json(
                  { error: "id and ground data are required" },
                  { status: 400 }
                );
              }
          
        
              const updatedUser = await Grounds.findByIdAndUpdate(
                id , 
                grounddata,   
                { new: true, runValidators: true } 
              );
        
              if (!updatedUser) {
                return NextResponse.json({ error: "ground not found" }, { status: 404 });
              }
        
              return NextResponse.json({message:"ground updated"}, { status: 200 });
        
        
            } catch (error) {
              return NextResponse.json({ error: "Error updating ground" }, { status: 500 });
            }
}