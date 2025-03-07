import { NextResponse } from 'next/server';
import {connecttodatabase} from '../../../database/db';
import User from '../../../database/models/UserModels';



export async function POST(req:Request){
    try {
        await connecttodatabase();

        const {lat , lon  , email} = await req.json();

      if (!email || !lat || !lon) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
          }

          const user = await User.findOne({ email });

          if(!user){
            return NextResponse.json({ success: false, message: "user not found" }, { status: 400 });
          }

          user.location.lattitude = lat;
          user.location.longitude = lon;
          await user.save();

          console.log('User location updated successfully:', user);

          return NextResponse.json(
            { success: true, message: "Location updated successfully" },
            { status: 200 }
          );
    } catch (error) {
        console.error('Error updating user location:', error);
        return NextResponse.json(
            { success: false, message: "An error occurred while updating location" },
            { status: 500 }
          );
    }

}