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



const SlotPicker = ({ groundId, amount,groundName }) => {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const today = startOfDay(new Date());  
  const maxDate = addDays(today, 3);


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
  autoClose: 3000,
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
  <div className='flex flex-col'>
    <div className="font-bold">Booking Successful</div>
  <div className="text-sm">Check mail for booking details</div>
  </div>,
  {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: false,
    closeButton: true,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
  }
);
        fetchSlots();
      } else {
        const error = await res.json();
         toast.error("Booking failed", {
  position: "top-right",
  autoClose: 3000,
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
            onClick={() => createorder(slot)}
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
    </div>
  );
};

export default SlotPicker;