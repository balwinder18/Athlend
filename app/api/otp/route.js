import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Generate a random 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Store OTPs in memory (use a database like Redis in production)
const otpStore = new Map();

// Email transporter (Nodemailer)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Twilio client (for SMS)
// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req) {
  const { email} = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email or phone number is required' }, { status: 400 });
  }

  const otp = generateOTP();

  try {
    if (email) {
      // Send OTP via email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
      });
      otpStore.set(email, otp); // Store OTP for email
    }

    // if (phoneNumber) {
    //   // Send OTP via SMS
    //   await twilioClient.messages.create({
    //     body: `Your OTP code is: ${otp}`,
    //     from: process.env.TWILIO_PHONE_NUMBER,
    //     to: phoneNumber,
    //   });
    //   otpStore.set(phoneNumber, otp); // Store OTP for phone number
    // }

    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}

// Verify OTP
export async function PUT(req) {
  const { email, otp } = await req.json();

  const storedOTP = otpStore.get(email);

  if (storedOTP === otp) {
    otpStore.delete(email); // Clear OTP after verification
    return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
  }
}
