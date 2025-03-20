import { NextResponse } from 'next/server';
import {connecttodatabase} from '../../../database/db';
import Grounds from '../../../database/models/GroundsModel'




export async function POST(req : Request) {

    

    try {
        await connecttodatabase();

        const {name,location,description , userId} = await req.json();

         if (!name || !location || !description || !userId) {
              return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
            }

           const newGround = new Grounds({name,location,description, userId});
           await newGround.save(); 



         return NextResponse.json({ success: true, message: "Ground registered successfully" }, { status: 201 });
    } catch (error:any) {
         return NextResponse.json({ success: false, message: "Server Error", error: error.message }, { status: 500 });
    }

}