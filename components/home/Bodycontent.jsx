import React from 'react'
import { FaSearch } from "react-icons/fa";
import logo from '../../public/images/Atheland cover.jpg'
import Image from 'next/image';

const Bodycontent = () => {
  return (
    <>
    
    <div className="relative flex justify-center w-full h-[400px]"> 
      <Image
        src={logo} 
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      
     
    </div>

    
    </>
  )
}

export default Bodycontent