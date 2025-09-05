'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, QrCode, X } from 'lucide-react';

export default function MyBookings({ isLoading ,userId }) {
  const [selectedQR, setSelectedQR] = useState(null);
  const [bookings,setBookings] = useState(null); 
  const [loadingBookings, setLoadingBookings] = useState(true); 



   useEffect(() => {
     const fetchBookings = async () => {
      if (!userId) {
        setLoadingBookings(false); 
        return;
      }

      setLoadingBookings(true);
      try {
        const bookingData = await axios.get(`/api/userbookings?userId=${userId}`);
        if (bookingData.data) {
          setBookings(bookingData.data);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setBookings([]);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [userId]); 

  if (loadingBookings) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!bookings) {
    return <p className="text-gray-500">No bookings found.</p>;
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };



    

  return (
    <>
   <div className="space-y-6 p-4">
      {bookings.map((b) => (
        <div
          key={b._id}
          className="group relative overflow-hidden p-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-green-300 dark:hover:border-green-600"
        >
          {/* Gradient accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
          
          {/* Main content */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 space-y-3">
              {/* Ground name with icon */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                  {b.groundName}
                </h3>
              </div>

              {/* Date and time info */}
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{formatDate(b.bookingdate)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{b.startTime} - {b.endTime}</span>
                </div>
              </div>
            </div>

            {/* QR Button */}
            {b.qrImage && (
  <>
  <button
                onClick={() => setSelectedQR(b.qrImage)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
              >
                <QrCode className="w-5 h-5" />
                Show QR Code
              </button>

             <a
    href={`/invoice/${b.orderId}`} 
    
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
  >
     View Invoice
  </a>
  </>


            )}
            
            {!b.qrImage && (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-xl">
                <QrCode className="w-5 h-5" />
                No QR Available
              </div>
            )}
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-50/0 to-green-50/50 dark:from-green-900/0 dark:to-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
        </div>
      ))}

      {/* Enhanced QR Code Modal */}
      {selectedQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-sm w-full transform scale-95 animate-in fade-in duration-200"
            style={{
              animation: 'modalAppear 0.3s ease-out forwards'
            }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <QrCode className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Booking QR Code
                </h3>
              </div>
              <button
                onClick={() => setSelectedQR(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* QR Code display */}
            <div className="p-8 text-center">
              <div className="inline-block p-4 bg-white rounded-xl shadow-inner border-2 border-gray-100">
                <img 
                  src={selectedQR} 
                  alt="QR Code" 
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Show this QR code at the venue for entry
              </p>
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setSelectedQR(null)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Add download functionality here if needed
                  console.log('Download QR code');
                }}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

    
    </div>
    </>
  );
}