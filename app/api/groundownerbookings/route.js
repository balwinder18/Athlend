// app/api/groundownerbookings/route.js

import { NextResponse } from 'next/server';
import Bookings from '../../../database/models/BookingModel';
import { connecttodatabase } from '../../../database/db';

export async function GET(req) {
  try {
    await connecttodatabase();

    const { searchParams } = new URL(req.url);
    const groundIdsParam = searchParams.get('groundIds');
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    if (!groundIdsParam) {
      return NextResponse.json({ error: 'groundIds are required' }, { status: 400 });
    }

    const groundIds = groundIdsParam.split(',');
    let query = { groundId: { $in: groundIds } };

    // Corrected logic: Compare dates as strings directly.
    if (startDateParam && endDateParam) {
      query.bookingdate = { $gte: startDateParam, $lte: endDateParam };
    }
    
    const bookings = await Bookings.find(query)
      .populate('groundId')
      .populate('userId');  
    
    return NextResponse.json(bookings);
  } catch (err) {
    console.error("Error fetching ground owner bookings:", err);
    return NextResponse.json({ error: 'Failed to fetch ground owner bookings' }, { status: 500 });
  }
}