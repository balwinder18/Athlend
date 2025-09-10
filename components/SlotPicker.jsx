// app/components/SlotPicker.jsx
'use client';

import { useState, useEffect } from 'react';
import { format, parseISO, addDays ,startOfDay} from 'date-fns';
import { formatLocalTime } from '@/app/utils/date';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import axios from 'axios';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {  isBefore, isAfter } from 'date-fns';
import { toast } from "react-toastify";
import CheckboxTerms from './CheckboxTerms'



const SlotPicker = ({ groundId, amount,groundName }) => {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState();
  const [slots, setSlots] = useState([]);
  const [slotToBooked , setSlotToBooked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const today = startOfDay(new Date());  
  const maxDate = addDays(today, 3);

  const [confirmbooking , setConfirmboooking] = useState(false);
const [agreed, setAgreed] = useState(false);

  const fetchSlots = async () => {
    setLoading(true);
    setError(null);
    try {

      const dateString = new Date(selectedDate).toISOString().split('T')[0];

      const res = await fetch(
        `/api/ground/availableslot/${groundId}?date=${dateString}`
      );

      if (!res.ok) {
        throw new Error(`pls select Date: ${res.status}`);
      }

      const data = await res.json();
      setSlots(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Slot fetch error:', err);
      setError('Select Date First');
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const createorder = async (slot) => {
   
   setConfirmboooking(false);
    if (!session?.user?.id) {
       toast.error("Please Sign in first", {
  position: "top-right",
  autoClose: 3000,
});
      return;
    }

    
    try {


       const checkRes = await axios.post('/api/checkSlot', {
        groundId,
        date: selectedDate,
        startTime: slot.start,
        endTime: slot.end
      });

      if (!checkRes.data.isAvailable) {
        toast.error("Sorry, this slot was just booked. Please select another one.", {
          position: "top-right",
          autoClose: 3000,
        });
        fetchSlots();
        return;
      }

      
      const response = await fetch('/api/createOrder', {
        method: "POST",
        body: JSON.stringify({ amount: amount * 100 })
      })
      const data = await response.json();
      console.log(data);


      const paymentdata = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.id,

        handler: async function (response) {
          //verify


          const res = await fetch("/api/verifyOrder", {
            method: "POST",
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const data = await res.json();
          console.log(data);
          const idOrder = response.razorpay_order_id;
          if (data.isOk) {
            handleBooking(slot, idOrder);
            toast.success("Payment successful!", {
      position: "top-right",
      autoClose: 3000,
    });
          } else {
           toast.error("Payment failed", {
  position: "top-right",
  // autoClose: 3000,
});
          }

        }
      }

      const payment = await new window.Razorpay(paymentdata);
      await payment.open();



    } catch (error) {

    }

  }

  const handleBooking = async (slot, idOrder) => {
    if (!session?.user?.id) {
      toast.info("🔒 Please sign in to book a slot", {
  position: "top-center",
  autoClose: 3000,
});
      return;
    }

    try {






      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groundId,
          userId: session.user.id,
          startTime: slot.start,
          endTime: slot.end,
          date: selectedDate,
          orderId: idOrder,
          groundName,
          email:session.user.email,
          amount : amount
        })
      });

      if (res.ok) {
     toast.success(
  <div className="flex flex-col">
    <span className="font-bold">Booking Successful!</span>
    <span className="text-sm">Check your email for booking details.</span>
    <span className="text-sm">You can also view your bookings in <b>My Bookings</b> under your profile.</span>
  </div>,
  {
    position: "top-right",
    autoClose: false,  
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    closeButton: true,
  }
);
        fetchSlots();
      } else {
        const error = await res.json();
         toast.error("Booking failed", {
  position: "top-right",
  // autoClose: 3000,
});
        
      }
    } catch (err) {
      console.error('Booking error:', err);
      toast.error("An error occurred during booking", {
  position: "top-right",
  autoClose: 3000,
});
       
      
    }
  };

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate])


  const bookingconfirmation = (slot)=>{
    setSlotToBooked(slot);
    setConfirmboooking(true);

  }


  return (
    <div className="lg:p-4 max-w-2xl flex justify-center flex-col mx-auto">
      <Script type='text/javascript' src="https://checkout.razorpay.com/v1/checkout.js" />
      <DayPicker
        mode="single"
  selected={selectedDate ? new Date(selectedDate) : undefined}
  onSelect={(date) => {
    if (date) {
      setSelectedDate(format(date, 'yyyy-MM-dd'));
    }
  }}
  numberOfMonths={1}
  className="mb-4"
  modifiers={{
    available: (date) =>
      !isBefore(startOfDay(date), today) &&
      !isAfter(startOfDay(date), maxDate),
  }}
  modifiersClassNames={{
    available: 'bg-green-200 hover:bg-green-200 rounded-full',
    selected: 'bg-green-500 text-white rounded-full',
    today: 'border border-green-400 rounded-full',
  }}
  disabled={(date) =>
    isBefore(startOfDay(date), today) || isAfter(startOfDay(date), maxDate)
  }
      />

      {loading && <div className="text-center">Loading slots...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      
      {selectedDate && (
  <div className="text-lg font-semibold mb-4 text-center text-gray-800">
    Slots for {format(parseISO(selectedDate), 'MMMM d, yyyy')}
  </div>
)}

      <div className="grid grid-cols-4 gap-2">
        
        
        {slots.map((slot) => (
          
          <button
            key={slot.start}
            onClick={() => bookingconfirmation(slot)}
            disabled={!slot.available}
            className={`p-2 text-sm rounded ${slot.available
                ? 'bg-green-200 hover:bg-green-300'
                : 'bg-gray-200 cursor-not-allowed'
              }`}
          >
            {slot.start.slice(0, 5)} -{' '}
             {slot.end.slice(0, 5)}
          </button>
        ))}
      </div>

  {confirmbooking && 
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-4 transform transition-all duration-300 ease-out scale-100 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirm Booking</h2>
            <p className="text-gray-500">
              Please review your booking details before confirming
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">Ground</span>
                </div>
                <span className="text-gray-900 font-semibold">{groundName}</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">Date</span>
                </div>
                <span className="text-gray-900 font-semibold">{selectedDate.split('-').reverse().join('-')}</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="font-medium text-gray-700">Time Slot</span>
                </div>
                <span className="text-gray-900 font-semibold">{slotToBooked.start} – {slotToBooked.end}</span>
              </div>
              
              <div className="border-t border-gray-300 pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">Total Amount</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-md">
                    ₹{amount}
                  </div>
                </div>
              </div>
            </div>
          </div>


          <CheckboxTerms checked={agreed} onChange={setAgreed} />

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setConfirmboooking(false)}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
               disabled={!agreed}
              onClick={() => createorder(slotToBooked)}
             className={`lex-1 px-6 py-3 rounded-xl text-white ${
          agreed ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
        }`}
            
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    
  }
    

    </div>
  );
};

export default SlotPicker;