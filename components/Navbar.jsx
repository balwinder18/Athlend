"use client"; // Ensures this runs on the client side

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  
  

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800">MyLogo</div>

      {/* Authenticated User */}
      {session ? (
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">
           {session && (
            <Link href='/profile'> Welcome, {session.user?.name}!</Link>
           )}
          </h1>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Login
        </Link>
      )}
    </nav>
  );
}
