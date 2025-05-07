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





<nav className="hidden shadow-md p-4 lg:flex justify-between items-center">
  <Link href='/'>
    <Image src={athlendlogo} alt="Athlend" height={100} width={100} className="rounded-xl"/>
  </Link>

  {session ? (
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
  )}
</nav>

{/* Mobile Navbar (shown on small screens) */}
<nav className="lg:hidden shadow-md p-4 flex justify-between items-center">
  <Link href='/'>
    <Image src={athlendlogo} alt="Athlend" height={70} width={70} className="rounded-xl"/>
  </Link>

  <button 
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    className="p-2 text-black"
  >
    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
</nav>

{/* Mobile Menu (slides in) */}
{isMobileMenuOpen && (
  <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8">
    <button 
      onClick={() => setIsMobileMenuOpen(false)}
      className="absolute top-4 right-4 p-2"
    >
      <X size={24} />
    </button>

    {session ? (
      <>
        <h1 className="text-xl font-semibold text-black">
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
)}
</>


    
    
  );
}
