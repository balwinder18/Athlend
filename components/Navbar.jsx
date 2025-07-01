"use client"; // Ensures this runs on the client side

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AthlendLogo from '../public/images/AthlendLogo.webp'
import { Menu, X } from 'lucide-react';
import logoathlend from '../public/images/logoathlend.png'
import athlendsvg from '../public/images/athlendsvg.svg'
import athlendlogonew from '../public/images/athlendlogonew.png'
import athlendlogo from '../public/images/athlendlogo.jpg'
import logofinal from '../public/images/logofinal.jpg'
export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  

  return (
    <>
    {/* <nav className="hidden shadow-md p-4 lg:flex xl:flex 2xl:flex justify-between items-center">
      
    <Link href='/'><Image src={AthlendLogo} alt="Athlend" height={60} width={80} /></Link>

    
      {session ? (
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-black">
           {session && (
            <Link href='/profile'> Welcome, {session.user?.name}!</Link>
           )}
          </h1>
          <Link href='/profile'>
          <button
           className="px-4 py-2 text-black rounded-2xl border-b-4"
          >
            Dashboard
          </button>
          </Link>
          <button
            onClick={() => signOut()}
            className="px-4 py-2  text-black rounded-2xl border-b-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 text-black rounded-2xl border-b-4"
        >
          Login
        </Link>
      )}
    </nav> */}





<nav className="hidden fixed w-full z-10 shadow-md p-4 lg:flex justify-between items-center bg-[#f8f8f8]">
  {/* Logo on the left */}
  <Link href="/" className="flex-shrink-0">
    <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="10"
        y="35"
        font-family="Arial, Helvetica, sans-serif"
        font-size="36"
        font-weight="bold"
        fill="#39FF14"
      >
        athlend
      </text>
    </svg>
  </Link>

  {/* Center Title */}
  <div className="text-center mx-10 flex-1">
    <h1 className="text-[20px] mb-1 text-black leading-tight font-semibold">
      Find Your Perfect Playing Field
    </h1>
    <p className="text-[18px] text-black tracking-wide">
      PAY LESS, PLAY MORE
    </p>
  </div>

  {/* Right section */}
  <div className="flex items-center gap-4 flex-shrink-0">
   <div className="text-black font-medium text-[15px]">
  <Link 
    href="/newground"
    className="bg-white border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 hover:shadow-md transition-all duration-300"
  >
    Rent your ground!
  </Link>
</div>

    {session ? (
    <button 
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    className="p-2 text-black"
  >
    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
  ) : (
     <Link
          href="/login"
          className="bg-white border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 hover:shadow-md transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Login
        </Link>
  )}
  </div>

  {/* {session ? (
    <div className="flex items-center gap-4">
      <h1 className="text-lg font-semibold text-black">
        <Link href='/profile'>Welcome, {session.user?.name}!</Link>
      </h1>
      <Link href='/profile'>
        <button className="px-4 py-2 text-black rounded-2xl border-b-4 hover:bg-gray-100 transition-colors">
          My profile
        </button>
      </Link>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 text-black rounded-2xl border-b-4 hover:bg-gray-100 transition-colors"
      >
        Logout
      </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="px-4 py-2 text-black rounded-2xl border-b-4 hover:bg-gray-100 transition-colors"
    >
      Login
    </Link>
  )} */}


  
</nav>

{/* Mobile Navbar (shown on small screens) */}
<nav className="lg:hidden w-full fixed z-20 bg-[#f8f8f8] shadow-md py-4 px-2 flex justify-between items-center">
  <Link href='/'>
      <svg width="70" height="20" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
   
  
  <text
    x="10"
    y="35"
    font-family="Arial, Helvetica, sans-serif"
    font-size="50"
    font-weight="bold"
    fill="#39FF14" 
  >
    athlend
  </text>
</svg>
  </Link>


   <div className="text-center mr-5  flex-1">
    <h1 className="text-[12px] mb-1 text-black leading-tight font-semibold">
      Find Your Perfect Playing Field
    </h1>
    <p className="text-[10px] text-black tracking-wide">
      PAY LESS, PLAY MORE
    </p>
  </div>

  {session ? (
    <button 
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    className="p-2 text-black"
  >
    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
  ) : (
     <Link
          href="/login"
          className="px-2 py-2 text-black rounded-2xl bg-white border-b-4 text-[15px]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Login
        </Link>
  )}
</nav>

{/* Mobile Menu (slides in) */}
{isMobileMenuOpen && (
  <div className="fixed inset-0 z-50">
    {/* Background Overlay (for mobile only) */}
    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-30" onClick={() => setIsMobileMenuOpen(false)} />

    {/* Sidebar Menu */}
    <div className="absolute right-0 top-0 h-full w-full lg:w-[300px] bg-white shadow-xl flex flex-col items-center justify-start pt-10 space-y-6 transition-all duration-300">
      {/* Close Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(false)}
        className="absolute top-4 right-4 p-2"
      >
        <X size={24} />
      </button>

      {/* Content */}
      {session ? (
        <>
          <h1 className="text-xl font-semibold text-black mt-4">
            Welcome, {session.user?.name}!
          </h1>
          <Link 
            href='/profile' 
            className="px-6 py-3 text-black rounded-2xl border-b-4 text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Profile
          </Link>
          <button
            onClick={() => {
              signOut();
              setIsMobileMenuOpen(false);
            }}
            className="px-6 py-3 text-black rounded-2xl border-b-4 text-lg"
          >
            Logout
          </button>
          <div className="lg:hidden text-black font-medium text-[15px]">
  <Link 
    href="/newground"
    className="bg-white border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 hover:shadow-md transition-all duration-300"
  >
    Rent your ground!
  </Link>
</div>
        </>
      ) : (
        <Link
          href="/login"
          className="px-6 py-3 text-black rounded-2xl border-b-4 text-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Login
        </Link>
      )}
    </div>
  </div>
)}

</>


    
    
  );
}
