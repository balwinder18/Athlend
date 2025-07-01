// // tools.js
// import { connecttodatabase } from "../../database/db";

// export const getDBSnapshot = async () => {
//   const db = await connecttodatabase();

//  const todayISO = new Date().toISOString().split("T")[0];

// const grounds = await db.collection("grounds")
//   .find({ Approval: "yes" }) 
//   .toArray();

// const bookings = await db.collection("bookings")
//   .find({ bookingdate: { $gte: todayISO } }) 
//   .toArray();

//   return {
//     grounds: grounds.map(g => ({
//       id: g._id.toString(),
//       name: g.name,
//       location: g.location,
//       capacity: g.capacity,
//       slotDuration: g.operatingHours?.slotDuration,
//       pricePerSlot: g.operatingHours?.pricePerSlot,
//     })),
//     bookings: bookings.map(b => ({
//       id: b._id.toString(),
//       groundId: b.groundId,
//       slot: `${b.startTime}–${b.endTime}`,
//       date: b.bookingdate,
//     })),
//   };
// };
