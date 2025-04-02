// app/components/SlotPicker.jsx
'use client';

import { useState, useEffect } from 'react';
import { format, parseISO, addDays } from 'date-fns';
import { formatLocalTime } from '@/app/utils/date';
import { useSession } from 'next-auth/react';


const SlotPicker = ({ groundId, timezone }) => {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSlots = async () => {
    setLoading(true);
    setError(null);
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      const res = await fetch(
        `/api/ground/availableslot/${groundId}?date=${dateString}&timezone=${encodeURIComponent(timezone)}`
      );
      
      if (!res.ok) {
        throw new Error(`Failed to fetch slots: ${res.status}`);
      }
      
      const data = await res.json();
      setSlots(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Slot fetch error:', err);
      setError('Failed to load available slots');
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [selectedDate]);

  const handleBooking = async (slot) => {
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
          endTime: slot.end
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

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <input
        type="date"
        value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
        onChange={(e) => {
          const newValue = e.target.value;
          setSelectedDate(newValue ? parseISO(newValue) : new Date()); 
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
            onClick={() => handleBooking(slot)}
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