
// app/api/slots/[groundId]/route.js
import { NextResponse } from 'next/server';
import Bookings from '../../../../../database/models/BookingModel';
import Grounds from '../../../../../database/models/GroundsModel';

function generateTimeSlots(date, operatingHours, slotDuration = 30) {
  const slots = [];
  const [openHour, openMinute] = operatingHours.open.split(':').map(Number);
  const [closeHour, closeMinute] = operatingHours.close.split(':').map(Number);

  // Create a date in IST (UTC+5:30)
  const startTime = new Date(date);
  startTime.setUTCHours(openHour - 5, openMinute - 30, 0, 0); // Convert IST to UTC

  const endTime = new Date(date);
  endTime.setUTCHours(closeHour - 5, closeMinute - 30, 0, 0);

  let current = new Date(startTime);
  while (current < endTime) {
    const slotEnd = new Date(current.getTime() + slotDuration * 60000);
    if (slotEnd > endTime) break;

    slots.push({
      start: new Date(current),
      end: new Date(slotEnd)
    });
    current = slotEnd;
  }

  return slots;
}
export async function GET(request, { params }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  // const timezone = searchParams.get('timezone'); Not used currently but could be for timezone adjustments

  if (!date) {
    return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
  }

  try {
    const ground = await Grounds.findById(id);
    if (!ground) return NextResponse.json({ error: 'Ground not found' }, { status: 404 });

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    const allSlots = generateTimeSlots(dateObj, ground.operatingHours);
    
    const bookedSlots = await Bookings.find({
      groundId: id,
      startTime: { $lt: allSlots[allSlots.length - 1].end },
      endTime: { $gt: allSlots[0].start },
      status: 'booked'
    });

    const availableSlots = await Promise.all(
      allSlots.map(async (slot) => {
        const isBooked = await Bookings.exists({
          groundId: id,
          status: 'booked',
          startTime: { $lt: slot.end },
          endTime: { $gt: slot.start }
        });
        return {
          start: slot.start,
          end: slot.end,
          available: !isBooked
        };
      })
    );

    return NextResponse.json(availableSlots);
  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}