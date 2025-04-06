


import { NextResponse } from 'next/server';
import Bookings from '../../../database/models/BookingModel';



export async function POST(request) {
  try {
    const { groundId, userId, startTime, endTime ,date,orderId } = await request.json();

    if (!groundId || !userId || !startTime || !endTime || !date || !orderId) {
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

    
    const booking = await Bookings.create({
      groundId,
      userId,
      startTime: startTime,
      endTime: endTime,
      bookingdate: date,
      status: 'booked',
      orderId:orderId
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


