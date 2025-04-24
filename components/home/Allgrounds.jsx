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
  const [searchground, setSearchground] = useState("");
  const [searchlocation, setSearchlocation] = useState("");
  const [filtereddata , setFiltereddata] = useState([]);






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
    console.log(searchground);
  }, [searchground]);

  useEffect(() => {
    console.log(searchlocation);
  }, [searchlocation]);


  const filteredground = () => {
    const hasNameSearch = searchground.trim() !== '';
    const hasLocationSearch = searchlocation.trim() !== '';
    
    setFiltereddata(
      grounds.filter(item => {
        const nameMatches = !hasNameSearch || 
                           item.name.toLowerCase().includes(searchground.toLowerCase());
        
        const locationMatches = !hasLocationSearch || 
                               item.location.toLowerCase().includes(searchlocation.toLowerCase());
  
        
        if (hasNameSearch && hasLocationSearch) {
          return nameMatches && locationMatches;
        } else if (hasNameSearch) {
          return nameMatches; 
        } else if (hasLocationSearch) {
          return locationMatches; 
        }
        return true;
      })
    );
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
            <input type="text" placeholder="Add dates" className="text-sm bg-transparent focus:outline-none" onChange={(e) => setSearchground(e.target.value)} />
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


<div className="top-0 left-0 w-full h-full flex items-center justify-center z-10">
  <div className="mt-[-64px] mb-[20px] z-0 flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-2xl sm:rounded-full p-3 sm:p-2 w-full max-w-4xl mx-auto border border-gray-200">
  <div className="hidden w-full whitespace-nowrap lg:flex xl:flex 2xl:flex flex-col flex-1 p-2 rounded-lg">
            <label className="text-[20px] font-semibold text-gray-600">Start finding courts nearby</label>
          </div>
    {/* Main Search Field - Always visible */}
    <div className="w-full sm:flex-1 p-2 sm:pl-4">
      {/* <label className="block text-xs font-medium text-gray-500 mb-1 sm:hidden">What u want to play</label> */}
      <div className="flex flex-col">
       
        <label className="text-xs font-semibold text-gray-600">What u want to play</label>
        <input
          type="text"
          placeholder="Start finding grounds"
          className="text-base sm:text-lg bg-transparent focus:outline-none placeholder-gray-400"
          onChange={(e) => setSearchground(e.target.value)}
        />
      </div>
    </div>
         
    
   
  

    {/* Divider - Hidden on mobile */}
    <div className="hidden sm:block w-px h-10 bg-gray-200 mx-2"></div>

    {/* Location Filter - Collapsible on mobile */}
    <div className="w-full sm:w-auto sm:flex-1 p-2 border-t sm:border-t-0 mt-2 sm:mt-0">
      <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
      <div className="flex items-center">
        {/* <FaMapMarkerAlt className="text-gray-400 mr-2 text-sm" /> */}
        <input
          type="text"
          placeholder="Nearby"
          className="w-full text-sm bg-transparent focus:outline-none"
          onChange={(e) => setSearchlocation(e.target.value)}
        />
      </div>
    </div>

    {/* Search Button - Adapts to screen size */}
    <button
      onClick={filteredground}
      className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl sm:rounded-full py-3 px-6 sm:py-2 sm:px-4 flex items-center justify-center transition-colors duration-200 shadow-sm hover:shadow-md"
    >
      <FaSearch className="sm:hidden mr-2" />
      <span>Search</span>
    </button>
  </div>
</div>

      <h1 className="text-2xl text-black font-bold mb-6">All Available Grounds</h1>
      {grounds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filtereddata.length > 0 ? filtereddata : grounds).map((ground) => (
            ground.Approval === "yes" && (

              <div
                key={ground._id}
                className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
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
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">{ground.name}</h2>

                    <span className="flex items-center text-green-500 text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Available
                    </span>

                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{ground.description}</p>

                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{ground.location}</span>
                  </div>

                  <Link
                    href={`/grounds/${ground._id}`}
                    className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors mt-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>



            )
          ))}



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
