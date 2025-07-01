'use client'
import { useState, useEffect } from 'react';
import { MapPin, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch } from "react-icons/fa";
const Allgrounds = () => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchSport, setSearchSport] = useState("");
  const [searchlocation, setSearchlocation] = useState("");
  const [filtereddata , setFiltereddata] = useState([]);
  const [nearbyGrounds, setNearbyGrounds] = useState([]);
  




  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);



  useEffect(() => {
    const fetchAllGrounds = async () => {
      try {
        const response = await fetch('/api/getallgrounds');
        if (!response.ok) {
          throw new Error('Failed to fetch grounds');
        }

        const data = await response.json();
        const groundsArray = Array.isArray(data) ? data : [data];
        setGrounds(groundsArray);
        setNearbyGrounds(
  groundsArray.filter(
    (ground) => ground.location?.toLowerCase().includes("faridabad")
  )
);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching grounds:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAllGrounds();
  }, []);
  useEffect(() => {
    console.log(searchSport);
  }, [searchSport]);

  useEffect(() => {
    console.log(searchlocation);
  }, [searchlocation]);


  const filteredground = () => {
  const trimmedSport = searchSport.trim().toLowerCase();
  const trimmedLocation = searchlocation.trim().toLowerCase();

  if(!trimmedSport && !trimmedLocation ){
    setFiltereddata([]);
    return;
  }

  const filtered = grounds.filter(item => {
    const sportMatch = trimmedSport === "" || item.sport?.toLowerCase().includes(trimmedSport);
    const locationMatch = trimmedLocation === "" || item.location?.toLowerCase().includes(trimmedLocation);
    return sportMatch && locationMatch;
  });

  setFiltereddata(filtered);
};

useEffect(() => {
  console.log(filtereddata);
}, [filtereddata]);


  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">

      {/* <div className="top-0 left-0 w-full h-full flex items-center justify-center z-10">
        <div className="flex items-center bg-white shadow-md rounded-full p-2 px-4 w-full max-w-4xl border mt-[-64px] mb-[20px] z-10">

          
          <div className="flex flex-col flex-1 p-2 rounded-lg">
            <label className="text-[20px] font-semibold text-gray-600">Start finding courts nearby</label>
          </div>

          <div className="w-px h-8 bg-gray-300"></div>

          
          <div className="flex flex-col flex-1 p-2 rounded-lg transition-all duration-300 hover:shadow-lg">
            <label className="text-xs font-semibold text-gray-600">What u want to play</label>
            <input type="text" placeholder="Add dates" className="text-sm bg-transparent focus:outline-none" onChange={(e) => setsearchSport(e.target.value)} />
          </div>

          
          <div className="w-px h-8 bg-gray-300"></div>

          <div className="flex flex-col flex-1 p-2 rounded-lg transition-all duration-300 hover:shadow-lg">
            <label className="text-xs font-semibold text-gray-600">Location</label>
            <input type="text" placeholder="Add dates" className="text-sm bg-transparent focus:outline-none" onChange={(e) => setSearchlocation(e.target.value)} />
          </div>

         
          <div className="w-px h-8 bg-gray-300"></div>

          
          <button onClick={filteredground} className="ml-3 bg-pink-500 text-white rounded-full p-3 flex items-center justify-center transition-all duration-300 hover:shadow-lg">
            <FaSearch className="text-white text-sm" />
          </button>
        </div>
      </div> */}


<div
  className={`z-40 transition-all duration-300 ease-in-out ${
    scrolled
      ? 'fixed top-24 md:top-3 mt-[-5px] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] lg:w-[50%]  max-w-3xl shadow-lg backdrop-blur-md px-4 py-1 rounded-full'
      : 'relative w-full max-w-5xl px-4 sm:px-6 pb-4 lg:mt-20 mt-14'
  }`}
>
  <div
    className={`flex flex-row items-center border border-gray-200 bg-white w-full transition-all duration-300 ease-in-out ${
      scrolled ? 'p-2 rounded-full' : 'p-3 sm:p-4 rounded-2xl sm:rounded-full'
    }`}
  >
    {/* Left Tagline (only when not scrolled) */}
    {!scrolled && (
      <div className="hidden lg:flex flex-col justify-center pr-6 border-r border-gray-300 mr-6">
        <label className="text-[18px] font-semibold text-gray-700">
          Start finding courts nearby
        </label>
      </div>
    )}

    {/* Sports Field */}
    <div className={`flex-1 min-w-[120px] ${scrolled ? 'sm:mr-4 pl-2' : 'sm:mr-4'}`}>
      <label className="lg:block hidden text-xs font-semibold text-gray-600 mb-1">
        What you want to play
      </label>
      <label className="block lg:hidden text-xs font-semibold text-gray-600 mb-1 mr-1">
        Sport
      </label>
      <input
        type="text"
        placeholder="Football, Cricket"
        className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-sm placeholder-gray-400 py-1"
        onChange={(e) => setSearchSport(e.target.value)}
      />
    </div>

    {/* Location Field */}
    <div className="flex-1 md:min-w-[120px] sm:mr-4">
      <label className="block text-xs font-semibold text-gray-600 mb-1">
        Location
      </label>
      <input
        type="text"
        placeholder="Faridabad"
        className="w-full bg-transparent border-b border-gray-300 focus:outline-none text-sm placeholder-gray-400 py-1"
        onChange={(e) => setSearchlocation(e.target.value)}
      />
    </div>

    {/* Search Button - Adjusted for better mobile visibility */}
    <button
      onClick={filteredground}
      className="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl py-2 px-3 sm:px-6 transition-all duration-200 ml-2"
    >
      <FaSearch className="inline-block w-4 h-4" />
      <span className="hidden sm:inline ml-2">Search</span>
    </button>
  </div>
</div>

     
     
{/* Section Title for Faridabad Grounds */}
{nearbyGrounds.length > 0 && filtereddata.length === 0 && (
  <>
    <h1 className="text-2xl text-black font-bold mb-4">Grounds in Faridabad</h1>
    <div className="flex items-center justify-between mb-4">
      <p className="text-gray-700">Filtered Results</p>
      <div className="flex items-center gap-1 text-sm text-gray-500">
        <span>Scroll</span>
        <svg className="h-4 w-4 animate-bounce-right" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>

    {/* Horizontal Scrollable Filtered Grounds */}
    <div className="flex overflow-x-auto gap-4 pb-6">
      {nearbyGrounds.map(ground => (
        ground.Approval === "yes" && (
          <div key={ground._id} className="min-w-[300px] max-w-sm bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex-shrink-0">
            <div className="relative h-40 w-full bg-blue-100 overflow-hidden">
              {ground.imageUrl ? (
                <img src={ground.imageUrl} alt="Ground image" className="absolute h-full w-full object-cover" />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-blue-300" />
                </div>
              )}
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">{ground.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-2">{ground.description}</p>
              <div className="text-gray-500 text-sm mt-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {ground.location}
              </div>
              <Link
                href={`/grounds/${ground._id}`}
                className="block text-center mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        )
      ))}
    </div>
  </>
)}


      <h1 className="text-2xl text-black font-bold mb-4">All Available Grounds</h1>

{grounds.length > 0 ? (
  <div className="overflow-x-auto pb-2">
    <div className="flex space-x-4 min-w-full">
      {(filtereddata.length > 0 ? filtereddata : grounds).map(
        (ground) =>
          ground.Approval === "yes" && (
            <div
              key={ground._id}
              className="min-w-[280px] sm:min-w-[320px] bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex-shrink-0"
            >
              <div className="relative h-40 w-full bg-blue-100 overflow-hidden">
                {ground.imageUrl ? (
                  <img
                    src={ground.imageUrl}
                    alt="Ground image"
                    className="absolute h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-blue-300" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {ground.name}
                  </h2>
                  <span className="flex items-center text-green-500 text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Available
                  </span>
                </div>
                <p className="text-gray-600 mb-3 line-clamp-2">{ground.description}</p>
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{ground.location}</span>
                </div>
                <Link
                  href={`/grounds/${ground._id}`}
                  className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          )
      )}
    </div>
  </div>
) : (
  <div className="text-center p-8 bg-gray-50 rounded-lg">
    <p className="text-gray-500">No grounds available.</p>
  </div>
)}

    </div>







  );
};

export default Allgrounds;
