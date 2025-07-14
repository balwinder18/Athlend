


import { NextResponse } from 'next/server';
import Bookings from '../../../database/models/BookingModel';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const { groundId, userId, startTime, endTime ,date,orderId,groundName ,email } = await request.json();

    if (!groundId || !userId || !startTime || !endTime || !date || !orderId || !groundName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

  

    
    const overlapping = await Bookings.findOne({
      groundId,
      status: 'booked',
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
    });

   

     await transporter.sendMail({
    from: `Athlend Booking ${process.env.EMAIL_USER}`,
    to:email,
    subject: `Your QR Ticket for ${groundName} -Athlend Booking`,
    html: `
      <h2>Thank you for your booking!</h2>
      <p>You can access your QR Ticket at My bookings under My Profile page in website</p>
      
      <p>Booking ID: <b>${orderId}</b></p>
      <p>Show this QR at the venue for verification.</p>
    `,
  });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


