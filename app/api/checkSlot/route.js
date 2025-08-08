
import { NextResponse } from 'next/server';
import Bookings from '../../../database/models/BookingModel';

export async function POST(req) {
  try {
    const { groundId, date, startTime, endTime } = await req.json();

    if (!groundId || !date || !startTime || !endTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    
    const overlapping = await Bookings.findOne({
      groundId,
      bookingdate: date,
      status: 'booked',
      startTime: { $lt: endTime },
      endTime: { $gt: startTime }
    });

    if (overlapping) {
      return NextResponse.json({ isAvailable: false, message: 'Slot already booked.' }, { status: 200 });
    } else {
      return NextResponse.json({ isAvailable: true, message: 'Slot is available.' }, { status: 200 });
    }
  } catch (error) {
    console.error("Error checking slot:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}