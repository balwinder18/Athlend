import { NextResponse } from 'next/server';
import User from '../../../database/models/UserModels';
import {connecttodatabase} from '../../../database/db';


import bcrypt from "bcryptjs";


connecttodatabase();


export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    
    if (!name || !email || !phone || !password ) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "Email already exists" }, { status: 400 });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, phone, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ success: true, message: "User registered successfully" }, { status: 201 });
  } catch (error:any) {
    return NextResponse.json({ success: false, message: "Server Error", error: error.message }, { status: 500 });
  }
}


