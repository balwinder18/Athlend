// app/api/bookings/route.js
// import { NextResponse } from 'next/server';
// import Bookings from '../../../database/models/BookingModel';



// export async function POST(request) {
//   try {
//     const { groundId, userId, startTime, endTime } = await request.json();

//     // Validate input
//     if (!groundId || !userId || !startTime || !endTime) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Convert time strings to full dates (today's date + time)
//     const today = new Date();
//     const [startHours, startMinutes] = startTime.split(':').map(Number);
//     const [endHours, endMinutes] = endTime.split(':').map(Number);

//     const startDate = new Date(today);
//     startDate.setHours(startHours, startMinutes, 0, 0);

//     const endDate = new Date(today);
//     endDate.setHours(endHours, endMinutes, 0, 0);

//     // Check for overlapping bookings
//     const overlapping = await Bookings.findOne({
//       groundId,
//       status: 'booked',
//       startTime: { $lt: endDate },
//       endTime: { $gt: startDate }
//     });

//     if (overlapping) {
//       return NextResponse.json(
//         { error: 'This slot is already booked' },
//         { status: 409 }
//       );
//     }

//     // Create booking
//     const booking = await Bookings.create({
//       groundId,
//       userId,
//       startTime: startDate,
//       endTime: endDate,
//       status: 'booked'
//     });

//     return NextResponse.json(booking, { status: 201 });
//   } catch (error) {
//     console.error('Booking error:', error);
//     return NextResponse.json(
//       { error: error.message || 'Internal server error' }, // Include error message
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from 'next/server';
import Bookings from '../../../database/models/BookingModel';



// export async function POST(request) {
//   try {
//     const { groundId, userId, startTime, endTime } = await request.json();

//     // Validate input
//     if (!groundId || !userId || !startTime || !endTime) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Check for overlapping bookings
//     const overlapping = await Bookings.findOne({
//       groundId,
//       status: 'booked',
//       startTime: { $lt: new Date(endTime) },
//       endTime: { $gt: new Date(startTime) }
//     });

//     if (overlapping) {
//       return NextResponse.json(
//         { error: 'This slot is already booked' },
//         { status: 409 }
//       );
//     }

//     // Create booking
//     const booking = await Bookings.create({
//       groundId,
//       userId,
//       startTime: new Date(startTime),
//       endTime: new Date(endTime),
//       status: 'booked'
//     });

//     return NextResponse.json(booking, { status: 201 });
//   } catch (error) {
//     console.error('Booking error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }





import { toDate, utcToZonedTime } from 'date-fns-tz';
// 'toDate' replaces the old 'zonedTimeToUtc'

export async function POST(request) {
  try {
    const { groundId, userId, startTime, endTime } = await request.json();

    // Convert IST to UTC using modern date-fns-tz
    const utcStart = toDate(startTime, { timeZone: 'Asia/Kolkata' });
    const utcEnd = toDate(endTime, { timeZone: 'Asia/Kolkata' });

    // Rest of your existing code
    const overlapping = await Bookings.findOne({
      groundId,
      status: 'booked',
      startTime: { $lt: utcEnd },
      endTime: { $gt: utcStart }
    });

    const booking = await Bookings.create({
      groundId,
      userId,
      startTime: utcStart,
      endTime: utcEnd,
      status: 'booked'
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