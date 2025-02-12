"use client"; // Mark as a client component
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import SignupForm from './Signup'

export default function Navbar() {
  const { data: session } = useSession();
  const [ismodalopen ,setIsmodalopen] = useState(false);

  return (
   <>
   
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800">MyLogo</div>
      
      {/* Login Button */}
     
     <button onClick={() => setIsmodalopen(!ismodalopen)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Login
      </button>
     
    </nav>

    {/* {ismodalopen && (
      <SignupForm/>
    )} */}
  

   </>
   
  );
}