import { connecttodatabase } from "@/database/db";
import User from "@/database/models/UserModels";
import { NextResponse } from "next/server";



export async function GET(req :Request) {
    try {


        const { searchParams} = new URL(req.url);
        let email = searchParams.get('email');

       
        await connecttodatabase();

        const user = await User.findOne({email : email});
        if(!user || user.length === 0 ){
            return NextResponse.json({message:"user not founddddd length is 0"}, { status: 404 });
            
        }

        return NextResponse.json(user, { status: 200 });
       

       

    } catch (error) {
        return NextResponse.json({message:"error in getimage api"}, { status: 500 });
       
        
    }
}