import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';


const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  const { email} = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email or phone number is required' }, { status: 400 });
  }

  const otp = generateOTP();

  try {
    if (email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Athlend - Your OTP Code for Login',
        text: `Your OTP is: ${otp}`,
      });
      otpStore.set(email, otp); 
    }


    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}

export async function PUT(req) {
  const { email, otp } = await req.json();

  const storedOTP = otpStore.get(email);

  if (storedOTP === otp) {
    otpStore.delete(email);
    return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
  }
}
