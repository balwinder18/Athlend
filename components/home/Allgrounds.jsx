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
  const [cricketGrounds, setCricketGrounds] = useState([]);
  




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

setCricketGrounds(groundsArray.filter((ground) => ground.sport.toLowerCase().includes("cricket")));
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

<div
  className={`z-40 transition-all duration-300 ease-in-out ${
    scrolled
      ? 'fixed top-20 md:top-3 mt-[-5px] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] lg:w-[50%]  max-w-3xl md:shadow-lg md:backdrop-blur-md px-4 py-1 rounded-full'
      : 'relative w-full max-w-5xl px-4 sm:px-6 pb-4 lg:mt-20 mt-14 mx-auto'
  }`}
>
  <div
    className={`flex flex-row items-center border border-gray-200 bg-white w-full transition-all duration-300 ease-in-out ${
      scrolled ? 'p-2 rounded-full' : 'p-3 sm:p-4 rounded-2xl sm:rounded-full'
    }`}
  >
    {!scrolled && (
      <div className="hidden lg:flex flex-col justify-center pr-6 border-r border-gray-300 mr-6">
        <label className="text-[18px] font-semibold text-gray-700">
          Start finding courts nearby
        </label>
      </div>
    )}

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

    <button
      onClick={filteredground}
      className="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl py-2 px-3 sm:px-6 transition-all duration-200 ml-2"
    >
      <FaSearch className="inline-block w-4 h-4" />
      <span className="hidden sm:inline ml-2">Search</span>
    </button>
  </div>
</div>

     
     
{nearbyGrounds.length > 0 && filtereddata.length === 0 && (
  <>
   <div className="flex items-center justify-between mb-4">
  <h1 className="text-2xl text-black font-bold">Popular grounds Near you</h1>

  <div className="flex items-center gap-2">
    <button
      onClick={() => {
        const el = document.getElementById("scroll-container");
        if (el) el.scrollBy({ left: -250, behavior: "smooth" });
      }}
      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
    >
      <svg
        className="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      onClick={() => {
        const el = document.getElementById("scroll-container");
        if (el) el.scrollBy({ left: 250, behavior: "smooth" });
      }}
      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
    >
      <svg
        className="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>


    <div id="scroll-container" className="flex overflow-x-auto gap-4 pb-6 scroll-smooth">
      {nearbyGrounds.map(ground => (
        ground.Approval === "yes" && (
          <Link
                href={`/grounds/${ground._id}`}
                className=""
              >
              <div
  key={ground._id}
  className="min-w-[250px] max-w-[250px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
>
  {/* Image container */}
  <div className="relative w-full h-[180px]">
    {ground.imageUrl ? (
      <img
        src={ground.imageUrl}
        alt="Ground image"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <MapPin className="h-10 w-10 text-blue-300" />
      </div>
    )}

    {/* Heart icon */}
    <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:scale-105 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5 text-gray-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a5.5 5.5 0 017.778 0L12 6.939l-.096-.096a5.5 5.5 0 017.778 7.778L12 21.06l-7.682-7.682a5.5 5.5 0 010-7.778z"
        />
      </svg>
    </button>
  </div>

  {/* Text Content */}
  <div className="p-3">
    <h3 className="text-[15px] font-semibold text-gray-900 truncate">
      {ground.name}
    </h3>

    <p className="text-[13px] text-gray-500 mt-1 truncate">
      {ground.location}
    </p>

    <p className="text-[13px] text-gray-700 mt-1">
      ₹{ground.pricing} /30min <span className="inline-block align-middle">★</span> {ground.sport}
    </p>
  </div>
</div>

            </Link>
        )
      ))}
    </div>
  </>
)}



{cricketGrounds.length > 0 && filtereddata.length === 0 && (
  <>
      <div className="flex items-center justify-between mb-4">
  <h1 className="text-2xl text-black font-bold">Cricket grounds</h1>

  <div className="flex items-center gap-2">
    <button
      onClick={() => {
        const el = document.getElementById("scroll2");
        if (el) el.scrollBy({ left: -250, behavior: "smooth" });
      }}
      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
    >
      <svg
        className="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      onClick={() => {
        const el = document.getElementById("scroll2");
        if (el) el.scrollBy({ left: 250, behavior: "smooth" });
      }}
      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
    >
      <svg
        className="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>


    <div id='scroll2' className="flex overflow-x-auto gap-4 pb-6 scroll-smooth">
      {cricketGrounds.map(
        ground => (
        ground.Approval === "yes" && (
           <Link
                href={`/grounds/${ground._id}`}
                className=""
              >
                <div
  key={ground._id}
  className="min-w-[250px] max-w-[250px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
>
  {/* Image container */}
  <div className="relative w-full h-[180px]">
    {ground.imageUrl ? (
      <img
        src={ground.imageUrl}
        alt="Ground image"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <MapPin className="h-10 w-10 text-blue-300" />
      </div>
    )}

    {/* Heart icon */}
    <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:scale-105 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5 text-gray-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a5.5 5.5 0 017.778 0L12 6.939l-.096-.096a5.5 5.5 0 017.778 7.778L12 21.06l-7.682-7.682a5.5 5.5 0 010-7.778z"
        />
      </svg>
    </button>
  </div>

  {/* Text Content */}
  <div className="p-3">
    <h3 className="text-[15px] font-semibold text-gray-900 truncate">
      {ground.name}
    </h3>

    <p className="text-[13px] text-gray-500 mt-1 truncate">
      {ground.location}
    </p>

    <p className="text-[13px] text-gray-700 mt-1">
      ₹{ground.pricing} /30min <span className="inline-block align-middle">★</span> {ground.sport}
    </p>
  </div>
</div>
            </Link>
        )
      ))}
    </div>
  </>
)}


     
        <div className="flex items-center justify-between mb-4">
  <h1 className="text-2xl text-black font-bold">All available grounds</h1>

  <div className="flex items-center gap-2">
    <button
      onClick={() => {
        const el = document.getElementById("scroll3");
        if (el) el.scrollBy({ left: -250, behavior: "smooth" });
      }}
      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
    >
      <svg
        className="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      onClick={() => {
        const el = document.getElementById("scroll3");
        if (el) el.scrollBy({ left: 250, behavior: "smooth" });
      }}
      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
    >
      <svg
        className="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>


{grounds.length > 0 ? (
  <div id='scroll3' className="overflow-x-auto pb-2">
    <div className="flex space-x-4 min-w-full">
      {(filtereddata.length > 0 ? filtereddata : grounds).map(
        (ground) =>
          ground.Approval === "yes" && (
            <Link
                href={`/grounds/${ground._id}`}
                className=""
              >
          <div
  key={ground._id}
  className="min-w-[250px] max-w-[250px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
>
  {/* Image container */}
  <div className="relative w-full h-[180px]">
    {ground.imageUrl ? (
      <img
        src={ground.imageUrl}
        alt="Ground image"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <MapPin className="h-10 w-10 text-blue-300" />
      </div>
    )}

    {/* Heart icon */}
    <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:scale-105 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5 text-gray-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a5.5 5.5 0 017.778 0L12 6.939l-.096-.096a5.5 5.5 0 017.778 7.778L12 21.06l-7.682-7.682a5.5 5.5 0 010-7.778z"
        />
      </svg>
    </button>
  </div>

  {/* Text Content */}
  <div className="p-3">
    <h3 className="text-[15px] font-semibold text-gray-900 truncate">
      {ground.name}
    </h3>

    <p className="text-[13px] text-gray-500 mt-1 truncate">
      {ground.location}
    </p>

    <p className="text-[13px] text-gray-700 mt-1">
      ₹{ground.pricing} /30min <span className="inline-block align-middle">★</span> {ground.sport}
    </p>
  </div>
</div>

            </Link>
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
