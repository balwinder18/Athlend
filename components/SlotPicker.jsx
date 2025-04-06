// app/components/SlotPicker.jsx
'use client';

import { useState, useEffect } from 'react';
import { format, parseISO, addDays } from 'date-fns';
import { formatLocalTime } from '@/app/utils/date';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import axios from 'axios';


const SlotPicker = ({ groundId, amount }) => {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
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

  const createorder =async (slot)=>{
    if (!session?.user?.id) {
      alert('Please sign in to book a slot');
      return;
    }
    try {
      const response = await fetch('/api/createOrder',{
        method:"POST",
        body:JSON.stringify({amount:amount*100})
      })
    const data = await response.json();
       console.log(data);


       const paymentdata = {
        key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ,
        order_id : data.id,
      
         handler : async function(response){
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
              const idOrder =response.razorpay_order_id;
              if (data.isOk) {
                handleBooking(slot,idOrder);
                alert("Payment successful");
              } else {
                alert("Payment failed");
              }
            
         }
      }

      const payment =await  new window.Razorpay(paymentdata);
      await payment.open();


    
    } catch (error) {
      
    }

  }

  const handleBooking = async (slot,idOrder) => {
    if (!session?.user?.id) {
      alert('Please sign in to book a slot');
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
          date:selectedDate,
          orderId:idOrder
        })
      });
      
      if (res.ok) {
        alert('Booking successful!');
        fetchSlots();
      } else {
        const error = await res.json();
        alert(error.error || 'Booking failed');
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('An error occurred during booking');
    }
  };

  useEffect(() => {
   console.log(selectedDate);
  }, [selectedDate])
  

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Script type='text/javascript' src="https://checkout.razorpay.com/v1/checkout.js"/>
      <input
        type="date"
        value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
        onChange={(e) => {
          const newValue = e.target.value;
          setSelectedDate(newValue ? (newValue) : new Date()); 
         
        }}
        min={format(new Date(), 'yyyy-MM-dd')} 
        max={format(addDays(new Date(), 6), 'yyyy-MM-dd')} 
        className="mb-4 p-2 border rounded"
      />

      {loading && <div className="text-center">Loading slots...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      
      <div className="grid grid-cols-4 gap-2">
        {slots.map((slot) => (
          <button
            key={slot.start}
            onClick={() => createorder(slot)}
            disabled={!slot.available}
            className={`p-2 text-sm rounded ${
              slot.available
                ? 'bg-green-200 hover:bg-green-300'
                : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            {slot.start} -{' '}
            {slot.end}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotPicker;