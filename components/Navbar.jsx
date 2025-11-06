"use client"; 

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button') 
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  
  return (
    <>
      <nav className="hidden fixed w-full z-10 shadow-md p-4 lg:flex justify-between items-center bg-[#f8f8f8]">
       
        <Link href="/" className="flex-shrink-0">
           <svg
      xmlns="http://www.w3.org/2000/svg"
      width="180"
      height="50"
      viewBox="0 0 720 210"
      role="img"
      aria-label="Athlend logo"
    >
      <title>Athlend</title>
      <defs>
        <style>
          {`
            .brand { fill:#03B94A; }
            .word {
              fontFamily: "Inter", "Poppins", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
              fontWeight: 700;
            }
          `}
        </style>

        <mask id="cutQuarter">
          <rect x="0" y="0" width="210" height="210" fill="black" />
          <circle cx="105" cy="105" r="90" fill="white" />
          <rect x="105" y="105" width="90" height="90" fill="black" />
        </mask>
      </defs>

      {/* Icon */}
      <g transform="translate(10,10)">
        <rect
          x="0"
          y="0"
          width="190"
          height="190"
          className="brand"
          mask="url(#cutQuarter)"
        />
      </g>

      {/* Wordmark */}
      <text x="230" y="150" fontSize="130" className="brand word">
        Athlend
      </text>
    </svg>
        </Link>

        
        <div className="text-center mx-10 flex-1">
          <h1 className="text-[20px] mb-1 text-black leading-tight font-semibold">
            Find Your Perfect Playing Field
          </h1>
          <p className="text-[18px] text-black tracking-wide">
            PAY LESS, PLAY MORE
          </p>
        </div>

        {/* Fixed width container for consistent alignment */}
        <div className="flex items-center gap-4" style={{ width: '280px', justifyContent: 'flex-end' }}>
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
              className="text-black font-medium text-[15px] bg-white border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 hover:shadow-md transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </nav>

     {/* mobile */}
    {/* mobile */}
<nav className="lg:hidden w-full fixed z-20 bg-[#f8f8f8] shadow-md py-4 px-2 flex justify-between items-center">
  <Link href='/' className="flex-shrink-0">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 720 210"
      role="img"
      aria-label="Athlend logo"
      className="h-6 w-auto md:h-12"
    >
      <title>Athlend</title>
      <defs>
        <style>
          {`
            .brand { fill:#03B94A; }
            .word {
              fontFamily: "Inter", "Poppins", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
              fontWeight: 700;
            }
          `}
        </style>
      </defs>

      {/* Icon - Smaller 3/4 circle aligned with text */}
      <g transform="translate(25,25)">
        {/* Top-right quarter */}
        <path d="M 80,80 L 80,0 A 80,80 0 0,1 160,80 Z" className="brand" />
        
        {/* Top-left quarter */}
        <path d="M 80,80 L 0,80 A 80,80 0 0,1 80,0 Z" className="brand" />
        
        {/* Bottom-left quarter */}
        <path d="M 80,80 L 0,80 A 80,80 0 0,0 80,160 Z" className="brand" />
      </g>

      {/* Wordmark */}
      <text x="200" y="150" fontSize="130" className="brand word">
        Athlend
      </text>
    </svg>
  </Link>

  {/* Center tagline - removed mr-5 and added proper flex-1 */}
  <div className="text-center flex-1 ml-2">
    <h1 className="text-[12px] mb-1 text-black leading-tight font-semibold">
      Find Your Perfect Playing Field
    </h1>
    <p className="text-[10px] text-black tracking-wide">
      PAY LESS, PLAY MORE
    </p>
  </div>

  {/* Fixed width container for mobile - matches logo width */}
  <div className="flex-shrink-0" style={{ width: '100px', display: 'flex', justifyContent: 'flex-end' }}>
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
  </div>
</nav>


      {isMobileMenuOpen && (
       <div className="fixed inset-0 z-50">
  {/* Backdrop */}
  <div 
    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" 
    onClick={() => setIsMobileMenuOpen(false)} 
  />
  
  {/* Menu Panel */}
  <div 
    ref={mobileMenuRef} 
    className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-all duration-300 ease-out"
  >
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {session?.user?.name?.charAt(0) || 'G'}
          </span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
      </div>
      <button
        onClick={() => setIsMobileMenuOpen(false)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        <X size={20} className="text-gray-600" />
      </button>
    </div>

    {/* Menu Content */}
    <div className="flex-1 flex flex-col p-6">
      {session ? (
        <>
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="rounded-xl p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Welcome back!
              </h3>
              <p className="text-gray-600 text-sm">
                {session.user?.name}
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-3 mb-8">
            <Link
              href='/profile'
              className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-gray-900">My Profile</span>
                <p className="text-sm text-gray-500">View and edit profile</p>
              </div>
            </Link>

            <Link
              href="/newground"
              className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-10 h-10  rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-gray-900">Rent Your Ground</span>
                <p className="text-sm text-gray-500">List your property</p>
              </div>
            </Link>

             <Link
              href="/profile#mybookings"
              className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-10 h-10  rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-gray-900">My Bookings</span>
              </div>
            </Link>
          </div>

          {/* Logout Button */}
          <div className="mt-auto">
            <button
              onClick={() => {
                signOut();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-red-50 transition-colors duration-200 group"
            >
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="font-medium text-red-600">Logout</span>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Guest Welcome */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Welcome to Athlend
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Sign in to access all features
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>

         
       
        </>
      )}
    </div>

    {/* Footer */}
    <div className="p-6 border-t border-gray-100">
      <p className="text-xs text-gray-400 text-center">
        © 2025 Athlend. All rights reserved.
      </p>
    </div>
  </div>
</div>
      )}
    </>
    
    
  );
}
