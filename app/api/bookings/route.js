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



export async function POST(request) {
  try {
    const { groundId, userId, startTime, endTime ,date } = await request.json();

    // Validate input
    if (!groundId || !userId || !startTime || !endTime || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

  

    
    const overlapping = await Bookings.findOne({
      groundId,
      status: 'booked',
      bookingdate: date, // ensure it's the same day
      startTime: { $lt: endTime }, // existing booking starts before the new one ends
      endTime: { $gt: startTime }  // and ends after the new one starts
    });

    if (overlapping) {
      return NextResponse.json(
        { error: 'This slot is already booked' },
        { status: 409 }
      );
    }

    // Create booking
    const booking = await Bookings.create({
      groundId,
      userId,
      startTime: startTime,
      endTime: endTime,
      bookingdate: date,
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


