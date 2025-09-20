'use client'
import { useState, useEffect } from 'react';
import { MapPin, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

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

  // useEffect(() => {
   
  // }, [searchSport]);

  // useEffect(() => {
   
  // }, [searchlocation]);


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

// useEffect(() => {
//   console.log(filtereddata);
// }, [filtereddata]);


  if (loading) {
    return <div className="flex justify-center pt-24 items-center h-64  min-h-[300px]">
    
      <div className="text-center">
        {/* Animated Sports Icon */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600 animate-spin origin-center" fill="currentColor" viewBox="0 0 20 20">
  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
</svg>
          </div>
        </div>
        
        {/* Loading Text */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Premium grounds for you</h3>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-gray-200 rounded-full mt-4 mx-auto overflow-hidden">
          <div className="h-full bg-green-600 rounded-full animate-pulse"></div>
        </div>
      </div>
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
 <div className="w-full max-w-7xl mx-auto lg:px-8 py-2">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            Popular grounds near you
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Discover amazing sports venues in your area
          </p>
        </div>
        
        {/* Navigation Buttons - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => {
              const el = document.getElementById("scroll-container");
              if (el) el.scrollBy({ left: -280, behavior: "smooth" });
            }}
            className="p-3 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700 group-hover:text-gray-900" />
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById("scroll-container");
              if (el) el.scrollBy({ left: 280, behavior: "smooth" });
            }}
            className="p-3 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 text-gray-700 group-hover:text-gray-900" />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div 
        id="scroll-container" 
        className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {nearbyGrounds.map(ground => (
          ground.Approval === "yes" && (
            <Link
              key={ground._id}
              href={`/grounds/${ground._id}`}
              className="group"
            >
              <div className="min-w-[230px] max-w-[250px] sm:min-w-[230px] sm:max-w-[230px] bg-white rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 hover:shadow-lg">
                {/* Image Container */}
                <div className="relative w-full h-[160px] sm:h-[180px] overflow-hidden">
                 {ground.imageUrl && ground.imageUrl.length > 0 ? (
  <img
    src={ground.imageUrl[0]}
    alt={ground.name}
    className="w-full h-full object-cover"
  />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <MapPin className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Heart Button */}
                  <button 
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm hover:shadow-md hover:bg-white transition-all duration-200 hover:scale-105"
                    aria-label={`Add ${ground.name} to favorites`}
                  >
                    <Heart className="h-4 w-4 text-gray-700 hover:text-red-500 transition-colors duration-200" />
                  </button>

                  {/* Sport Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-medium text-gray-700">
                      {ground.sport}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-gray-700 transition-colors">
                      {ground.name}
                    </h3>
                    
                    <p className="text-sm text-gray-500 line-clamp-1 flex items-center">
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      {ground.location}
                    </p>
                    
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center">
                        <span className="text-base sm:text-lg font-semibold text-gray-900">
                          ₹{ground.pricing}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          /30min
                        </span>
                      </div>
                      
                      <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                        <svg 
                          className="h-3 w-3 text-yellow-400 mr-1" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-700">
                          4.8
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        ))}
      </div>

      
    </div>
)}



  {cricketGrounds.length > 0 && filtereddata.length === 0 && (
        <>
          <div className="w-full max-w-7xl mx-auto  lg:px-4 py-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                  Cricket grounds
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Find the perfect cricket venues for your game
                </p>
              </div>
              
              {/* Navigation Buttons - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => {
                    const el = document.getElementById("scroll2");
                    if (el) el.scrollBy({ left: -280, behavior: "smooth" });
                  }}
                  className="p-3 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-700 group-hover:text-gray-900" />
                </button>
                
                <button
                  onClick={() => {
                    const el = document.getElementById("scroll2");
                    if (el) el.scrollBy({ left: 280, behavior: "smooth" });
                  }}
                  className="p-3 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-4 w-4 text-gray-700 group-hover:text-gray-900" />
                </button>
              </div>
            </div>

            {/* Scrollable Container */}
            <div 
              id="scroll2" 
              className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 scroll-smooth scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cricketGrounds.map(
                ground => (
                ground.Approval === "yes" && (
                   <Link
                        key={ground._id}
                        href={`/grounds/${ground._id}`}
                        className="group"
                      >
                      <div className="min-w-[230px] max-w-[250px] sm:min-w-[230px] sm:max-w-[230px] bg-white rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 hover:shadow-lg">
                        {/* Image Container */}
                        <div className="relative w-full h-[160px] sm:h-[180px] overflow-hidden">
                         {ground.imageUrl && ground.imageUrl.length > 0 ? (
  <img
    src={ground.imageUrl[0]}
    alt={ground.name}
    className="w-full h-full object-cover"
  />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                              <MapPin className="h-12 w-12 text-gray-300" />
                            </div>
                          )}
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Heart Button */}
                          <button 
                            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm hover:shadow-md hover:bg-white transition-all duration-200 hover:scale-105"
                            aria-label={`Add ${ground.name} to favorites`}
                          >
                            <Heart className="h-4 w-4 text-gray-700 hover:text-red-500 transition-colors duration-200" />
                          </button>

                          {/* Sport Badge */}
                          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-xs font-medium text-gray-700">
                              {ground.sport}
                            </span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 sm:p-5">
                          <div className="space-y-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-gray-700 transition-colors">
                              {ground.name}
                            </h3>
                            
                            <p className="text-sm text-gray-500 line-clamp-1 flex items-center">
                              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                              {ground.location}
                            </p>
                            
                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-center">
                                <span className="text-base sm:text-lg font-semibold text-gray-900">
                                  ₹{ground.pricing}
                                </span>
                                <span className="text-sm text-gray-500 ml-1">
                                  /30min
                                </span>
                              </div>
                              
                              <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                                <svg 
                                  className="h-3 w-3 text-yellow-400 mr-1" 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-xs font-medium text-gray-700">
                                  4.8
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                )
              ))}
            </div>

          </div>
        </>
      )}


     
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
           All Grounds
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Explore all!
          </p>
        </div>
        
        {/* Navigation Buttons - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => {
              const el = document.getElementById("scroll3");
              if (el) el.scrollBy({ left: -280, behavior: "smooth" });
            }}
            className="p-3 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700 group-hover:text-gray-900" />
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById("scroll3");
              if (el) el.scrollBy({ left: 280, behavior: "smooth" });
            }}
            className="p-3 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 text-gray-700 group-hover:text-gray-900" />
          </button>
        </div>
      </div>
    </div>


{grounds.length > 0 ? (
 <div className="w-full max-w-7xl mx-auto  sm:px-4 lg:px-4">
      {/* Scrollable Container */}
      <div 
        id="scroll3" 
        className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {(filtereddata.length > 0 ? filtereddata : grounds).map(
          (ground) =>
            ground.Approval === "yes" && (
              <Link
                key={ground._id}
                href={`/grounds/${ground._id}`}
                className="group"
              >
                <div className="min-w-[230px] max-w-[250px] sm:min-w-[230px] sm:max-w-[230px] bg-white rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 hover:shadow-lg">
                  {/* Image Container */}
                  <div className="relative w-full h-[160px] sm:h-[180px] overflow-hidden">
                   {ground.imageUrl && ground.imageUrl.length > 0 ? (
  <img
    src={ground.imageUrl[0]}
    alt={ground.name}
    className="w-full h-full object-cover"
  />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                        <MapPin className="h-12 w-12 text-gray-300" />
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Heart Button */}
                    <button 
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm hover:shadow-md hover:bg-white transition-all duration-200 hover:scale-105"
                      aria-label={`Add ${ground.name} to favorites`}
                    >
                      <Heart className="h-4 w-4 text-gray-700 hover:text-red-500 transition-colors duration-200" />
                    </button>

                    {/* Sport Badge */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-medium text-gray-700">
                        {ground.sport}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-gray-700 transition-colors">
                        {ground.name}
                      </h3>
                      
                      <p className="text-sm text-gray-500 line-clamp-1 flex items-center">
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                        {ground.location}
                      </p>
                      
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center">
                          <span className="text-base sm:text-lg font-semibold text-gray-900">
                            ₹{ground.pricing}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            /30min
                          </span>
                        </div>
                        
                        <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                          <svg 
                            className="h-3 w-3 text-yellow-400 mr-1" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-medium text-gray-700">
                            4.8
                          </span>
                        </div>
                      </div>
                    </div>
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
