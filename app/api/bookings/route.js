


import { NextResponse } from 'next/server';
import Bookings from '../../../database/models/BookingModel';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';
import {connecttodatabase} from '../../../database/db'


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {

  try {
     await connecttodatabase();
    const { groundId, userId, startTime, endTime ,date,orderId,groundName ,email , amount } = await request.json();

    if (!groundId || !userId || !startTime || !endTime || !date || !orderId || !groundName || !email || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

  

    
    const overlapping = await Bookings.findOne({
      groundId,
      status: { $in: ['booked', 'blocked', 'pending'] },
      bookingdate: date, 
      startTime: { $lt: endTime }, 
      endTime: { $gt: startTime }  
    });

    if (overlapping) {
      return NextResponse.json(
        { error: 'This slot is already booked' },
        { status: 409 }
      );
    }

    
    const qrImage = await QRCode.toDataURL(orderId);

    
    const booking = await Bookings.create({
      groundId,
      userId,
      startTime: startTime,
      endTime: endTime,
      bookingdate: date,
      status: 'booked',
      orderId:orderId,
      groundName,
      qrImage,
      isScanned: false,
      amount : amount,
      email : email
    });

   
const res = NextResponse.json(booking, { status: 201 });
  
transporter.sendMail({
  from: `Athlend Booking <${process.env.EMAIL_USER}>`,
  to: email,
  subject: `Your QR Ticket for ${groundName} - Athlend Booking`,
  html: `
    <h2>Thank you for your booking!</h2>
    <p>You can access your QR Ticket at My bookings under My Profile page in website</p>
    <p>Booking ID: <b>${orderId}</b></p>
    <p>Show QR Ticket at the venue for verification.</p>
  `
}).then(() => console.log("Email sent"))
  .catch(err => console.error("Email error:", err));

    return res;
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


