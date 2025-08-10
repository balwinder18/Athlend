// components/DashBoard.jsx

"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Loader2, Calendar, MapPin, Clock, DollarSign, ChevronRight, ChevronDown, Plus, Ban, CheckCircle, XCircle } from 'lucide-react';
import { format, startOfMonth, endOfMonth, parse, addMinutes, isBefore } from 'date-fns';
import Link from 'next/link';
import Navbar from './Navbar';

// Helper function to generate time slots (reused from your SlotPicker)
function generateTimeSlots(operatingHours, slotDuration = 30) {
  const slots = [];
  if (!operatingHours || !operatingHours.open || !operatingHours.close) {
    return slots;
  }
  const [openHour, openMinute] = operatingHours.open.split(':').map(Number);
  const [closeHour, closeMinute] = operatingHours.close.split(':').map(Number);

  const refDate = new Date();
  refDate.setUTCHours(0, 0, 0, 0);

  const startTime = new Date(refDate);
  startTime.setUTCHours(openHour, openMinute, 0, 0);

  const endTime = new Date(refDate);
  endTime.setUTCHours(closeHour, closeMinute, 0, 0);

  let current = new Date(startTime);
  while (current < endTime) {
    const slotEnd = new Date(current.getTime() + slotDuration * 60000);
    if (slotEnd > endTime) break;

    const startTimeStr = current.toISOString().slice(11, 16);
    const endTimeStr = slotEnd.toISOString().slice(11, 16);

    slots.push({ start: startTimeStr, end: endTimeStr });
    current = slotEnd;
  }
  return slots;
}

export default function DashBoard() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownerBookings, setOwnerBookings] = useState([]);
  const [ownedGrounds, setOwnedGrounds] = useState([]);
  const [selectedGroundId, setSelectedGroundId] = useState(null);
  const [isGroundListOpen, setIsGroundListOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [viewMode, setViewMode] = useState('bookings');
  const [blockingDetails, setBlockingDetails] = useState({ date: null, startTime: '', endTime: '', reason: '' });
  const [groundOperatingHours, setGroundOperatingHours] = useState(null);
  const [blockingSlots, setBlockingSlots] = useState([]);

  // Correctly defined fetchOwnerData function
  const fetchOwnerData = async () => {
    if (status !== 'authenticated' || !session?.user?.id) {
      setLoading(false);
      setError("Please log in to view the dashboard.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const groundsResponse = await axios.get(`/api/getgrounds?userId=${session.user.id}`);
      const groundsData = groundsResponse.data;

      if (!groundsData || groundsData.length === 0 || groundsData.message === "no grounds found for this user") {
        setOwnedGrounds([]);
        setOwnerBookings([]);
        setLoading(false);
        return;
      }
      
      setOwnedGrounds(groundsData);
      if (groundsData.length > 0 && !selectedGroundId) {
        setSelectedGroundId(groundsData[0]._id);
      }

      const groundIds = groundsData.map(ground => ground._id).join(',');
      
      const parsedMonth = parse(selectedMonth, 'yyyy-MM', new Date());
      const startDate = startOfMonth(parsedMonth);
      const endDate = endOfMonth(parsedMonth);

      let queryString = `groundIds=${groundIds}`;
      queryString += `&startDate=${format(startDate, 'yyyy-MM-dd')}`;
      queryString += `&endDate=${format(endDate, 'yyyy-MM-dd')}`;
      
      const bookingsResponse = await axios.get(`/api/groundownerbookings?${queryString}`);
      const bookingsData = bookingsResponse.data;

      setOwnerBookings(bookingsData);
      
    } catch (err) {
      console.error("Error fetching owner dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerData();
  }, [session, status, selectedGroundId, selectedMonth]);

  useEffect(() => {
    if (selectedGroundId && ownedGrounds.length > 0) {
      const ground = ownedGrounds.find(g => g._id === selectedGroundId);
      if (ground) {
        setGroundOperatingHours(ground.operatingHours);
        setBlockingSlots(generateTimeSlots(ground.operatingHours));
      }
    }
  }, [selectedGroundId, ownedGrounds]);

  const bookingsForSelectedGround = selectedGroundId
    ? ownerBookings.filter(booking => {
        const bookingGroundId = typeof booking.groundId === 'object' ? booking.groundId._id : booking.groundId;
        return bookingGroundId === selectedGroundId;
      })
    : [];

  const selectedGround = ownedGrounds.find(ground => ground._id === selectedGroundId);

  const handleBlockSlot = async (e) => {
    e.preventDefault();
    if (!blockingDetails.date || !blockingDetails.startTime || !blockingDetails.endTime) {
      alert("Please select a date, start time, and end time.");
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.post('/api/blockslot', {
        groundId: selectedGroundId,
        date: format(blockingDetails.date, 'yyyy-MM-dd'),
        startTime: blockingDetails.startTime,
        endTime: blockingDetails.endTime,
        reason: blockingDetails.reason
      });

      if (response.status === 201) {
        alert("Slot blocked successfully!");
        setBlockingDetails({ date: null, startTime: '', endTime: '', reason: '' });
        fetchOwnerData();
      }
    } catch (err) {
      alert(err.response?.data?.error || "Failed to block slot.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 mt-20">
        <Loader2 className="animate-spin h-12 w-12 text-green-500" />
        <p className="ml-4 text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4 mt-20">
        <p className="ml-4 text-red-700">{error}</p>
      </div>
    );
  }

  if (ownedGrounds.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 mt-20 text-center">
        <MapPin className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Grounds Registered Yet</h2>
        <p className="text-gray-600 mb-4">It looks like you haven't uploaded any grounds. Once you do, their bookings will appear here.</p>
        <Link href="/newground" className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors">
          Register Your First Ground
        </Link>
      </div>
    );
  }

  return (
<>

<Navbar/>

<div className="bg-gray-100 p-4 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ground Owner Dashboard</h1>
      
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        <div className="lg:w-1/4 bg-white rounded-lg shadow-md p-4 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Grounds</h2>
          
          <div className="lg:hidden mb-4">
            <button 
              onClick={() => setIsGroundListOpen(!isGroundListOpen)}
              className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 rounded-md border border-gray-300 text-gray-700 font-medium"
            >
              {selectedGround ? selectedGround.name : "Select a Ground"}
              {isGroundListOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {isGroundListOpen && (
              <div className="mt-2 border border-gray-200 rounded-md bg-white shadow-lg max-h-60 overflow-y-auto">
                {ownedGrounds.map(ground => (
                  <button
                    key={ground._id}
                    onClick={() => {
                      setSelectedGroundId(ground._id);
                      setIsGroundListOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 ${
                      selectedGroundId === ground._id ? 'bg-blue-50 text-blue-700 font-semibold' : ''
                    }`}
                  >
                    {ground.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="hidden lg:block space-y-2">
            {ownedGrounds.map(ground => (
              <button
                key={ground._id}
                onClick={() => setSelectedGroundId(ground._id)}
                className={`flex items-center w-full px-4 py-2 rounded-md transition-colors duration-200 ${
                  selectedGroundId === ground._id
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapPin className="h-5 w-5 mr-3" />
                <span className="font-medium">{ground.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:w-3/4 bg-white rounded-lg shadow-md p-6">
          {selectedGroundId ? (
            <>
              <div className="flex justify-start space-x-4 mb-6 border-b pb-4">
                <button
                  onClick={() => setViewMode('bookings')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                    viewMode === 'bookings' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  <Calendar size={20} /> Show Bookings
                </button>
                <button
                  onClick={() => setViewMode('blockSlot')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                    viewMode === 'blockSlot' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  <Ban size={20} /> Block a Slot
                </button>
              </div>

              {viewMode === 'bookings' ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                    Bookings for {selectedGround ? selectedGround.name : 'Selected Ground'}
                  </h2>
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg flex flex-col md:flex-row items-center gap-4">
                      <div className="flex flex-col w-full">
                          <label htmlFor="month-picker" className="text-sm font-medium text-gray-700 mb-1">Select Month</label>
                          <input 
                              type="month"
                              id="month-picker"
                              value={selectedMonth}
                              onChange={(e) => setSelectedMonth(e.target.value)}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                      </div>
                  </div>
                  {bookingsForSelectedGround.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 rounded-lg">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No bookings found for this ground in the selected month.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {bookingsForSelectedGround.map((booking) => (
                        <div key={booking._id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center text-gray-700 mb-2">
                            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="font-medium">Date:</span> {format(new Date(booking.bookingdate), 'PPP')}
                          </div>
                          <div className="flex items-center text-gray-700 mb-2">
                            <Clock className="h-5 w-5 mr-2 text-purple-500" />
                            <span className="font-medium">Time:</span> {booking.startTime} - {booking.endTime}
                          </div>
                          <div className="flex items-center text-gray-700 mb-2">
                            <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                            <span className="font-medium">Status:</span> 
                            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                booking.status === 'booked' ? 'bg-green-100 text-green-800' :
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {booking.status.toUpperCase()}
                            </span>
                          </div>
                          {booking.userId?.name && (
                            <div className="flex items-center text-gray-700">
                              <Plus className="h-5 w-5 mr-2 text-gray-500" />
                              <span className="font-medium">Booked by:</span> {booking.userId.name} ({booking.userId.email})
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                    Block a Slot for {selectedGround ? selectedGround.name : 'Selected Ground'}
                  </h2>
                  <form onSubmit={handleBlockSlot} className="space-y-6">
                    <div>
                      <label htmlFor="block-date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input 
                        type="date"
                        id="block-date"
                        value={blockingDetails.date ? format(blockingDetails.date, 'yyyy-MM-dd') : ''}
                        onChange={(e) => setBlockingDetails(prev => ({ ...prev, date: e.target.value ? new Date(e.target.value) : null }))}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="block-time" className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                      <div className="grid grid-cols-4 gap-2">
                        {blockingSlots.map((slot, index) => (
                          <button
                            type="button"
                            key={index}
                            onClick={() => setBlockingDetails(prev => ({ ...prev, startTime: slot.start, endTime: slot.end }))}
                            className={`p-2 text-sm rounded transition-colors ${
                              blockingDetails.startTime === slot.start && blockingDetails.endTime === slot.end
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                          >
                            {slot.start} - {slot.end}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="block-reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Blocking</label>
                      <textarea
                        id="block-reason"
                        value={blockingDetails.reason}
                        onChange={(e) => setBlockingDetails(prev => ({ ...prev, reason: e.target.value }))}
                        rows="3"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Enter a reason (e.g., maintenance, private event)"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      disabled={loading}
                    >
                      {loading ? 'Blocking...' : 'Block Slot'}
                    </button>
                  </form>
                </>
              )}
            </>
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Select a Ground</h2>
              <p className="text-gray-600">Choose a ground from the left sidebar to view its bookings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </>
  );
}