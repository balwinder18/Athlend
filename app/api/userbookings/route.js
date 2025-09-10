import { NextResponse } from 'next/server';
import Bookings from '../../../database/models/BookingModel';
import { connecttodatabase } from '@/database/db';

export async function GET(req) {

  
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
  
  await connecttodatabase();
    const bookings = await Bookings.find({ userId }).populate('groundId').limit(50).lean();
    return NextResponse.json(bookings);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
