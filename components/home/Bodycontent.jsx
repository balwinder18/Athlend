import React from 'react'
import { FaSearch } from "react-icons/fa";
import logo from '../../public/images/Atheland cover.jpg'
import Image from 'next/image';

const Bodycontent = () => {
  return (
    <>
    
    <div className="relative flex justify-center w-full h-[400px]"> {/* Set height */}
      <Image
        src={logo} // Replace with actual image path
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
        <div className="flex items-center bg-white shadow-md rounded-full p-2 px-4 w-full max-w-4xl border">
        
          {/* Where Section */}
          <div className="flex flex-col flex-1 p-2 rounded-lg">
            <label className="text-[20px] font-semibold text-gray-600">Start finding courts nearby</label>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* Check-in Section */}
          <div className="flex flex-col flex-1 p-2 rounded-lg transition-all duration-300 hover:shadow-lg">
            <label className="text-xs font-semibold text-gray-600">What u want to play</label>
            <input type="text" placeholder="Add dates" className="text-sm bg-transparent focus:outline-none"/>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* Check-out Section */}
          <div className="flex flex-col flex-1 p-2 rounded-lg transition-all duration-300 hover:shadow-lg">
            <label className="text-xs font-semibold text-gray-600">Location</label>
            <input type="text" placeholder="Add dates" className="text-sm bg-transparent focus:outline-none"/>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* Search Button */}
          <button className="ml-3 bg-pink-500 text-white rounded-full p-3 flex items-center justify-center transition-all duration-300 hover:shadow-lg">
            <FaSearch className="text-white text-sm" />
          </button>
        </div>
      </div>
    </div>

    
    </>
  )
}

export default Bodycontent