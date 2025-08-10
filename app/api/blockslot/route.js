

import { NextResponse } from 'next/server';
import Bookings from '../../../database/models/BookingModel';

export async function POST(req) {
  try {
    const { groundId, date, startTime, endTime, reason } = await req.json();

    if (!groundId || !date || !startTime || !endTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

   
    const overlapping = await Bookings.findOne({
      groundId,
      bookingdate: date,
      status: { $in: ['booked', 'pending', 'blocked'] },
      startTime: { $lt: endTime },
      endTime: { $gt: startTime }
    });

    if (overlapping) {
      return NextResponse.json({ error: 'This slot is already Booked. Please contact support team.' }, { status: 409 });
    }

    const newBlockedSlot = await Bookings.create({
      groundId,
      bookingdate: date,
      startTime: startTime,
      endTime: endTime,
      status: 'blocked',
      groundName: 'N/A',
      userId: 'N/A',
      orderId: 'N/A',
      qrImage: 'N/A',
      isScanned: false,
      reasonForBlocking: reason,
    });

    return NextResponse.json(newBlockedSlot, { status: 201 });
  } catch (error) {
    console.error("Error blocking slot:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}