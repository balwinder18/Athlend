'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyBookings({ userId }) {
  const [bookings, setBookings] = useState([]);
    const [selectedQR, setSelectedQR] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    axios.get(`/api/userbookings?userId=${userId}`).then(res => {
      setBookings(res.data);
      
    });
    setIsLoading(false);
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
    );
  }
  if (!bookings.length && !isLoading) {
    return <p className="text-gray-500">No bookings found.</p>;
  }
 

 
  return (
    <>
      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-900"
          >
            <h3 className="font-semibold text-lg">{b.groundName}</h3>
            <p className="text-sm text-gray-600">{b.bookingdate}</p>
            <p className="text-sm text-gray-600"> {b.startTime} - {b.endTime}</p>
            
          {b.qrImage && (
              <button
                onClick={() => setSelectedQR(b.qrImage)}
                className="mt-2 px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Show QR
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal for QR display */}
      {selectedQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <img src={selectedQR} alt="QR Code" className="w-48 mx-auto mb-4" />
            <button
              onClick={() => setSelectedQR(null)}
              className="mt-2 px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
