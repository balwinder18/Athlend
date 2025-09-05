// app/api/invoice/[bookingId]/route.ts
// app/api/invoice/[id]/route.ts
import { NextResponse } from "next/server";
import {connecttodatabase} from "@/database/db";
import Bookings from "@/database/models/BookingModel";

export async function GET(
     req: Request,
  context: { params: Promise<{ bookingid: string }> }
) {
  await connecttodatabase();

  const { bookingid } = await context.params;

  const booking = await Bookings.findOne({ orderId: bookingid });
  console.log("Booking result:", booking);

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({
    invoiceId: booking._id.toString().slice(-6).toUpperCase(), // short invoice code
    invoiceDate: booking.bookingdate,
    groundName: booking.groundName,
    userId: booking.userId,
    startTime: booking.startTime,
    endTime: booking.endTime,
    gross: booking.gross || booking.amount,
    discount: booking.discount,
    sgst: booking.sgst,
    cgst: booking.cgst,
    taxable: booking.taxable,
    total: booking.amount,
    orderId: booking.orderId,
    email : booking.email
    
  });
}
