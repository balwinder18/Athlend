"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserInfo() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await axios.get(`/api/user?email=${session.user.email}`);
          setUserData(response.data.user); // Assuming the API returns user data
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else {
        console.log("error");
      }
    };

    fetchUserData();
  }, [session]);

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{userData.name || session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{userData.email || session?.user?.email}</span>
        </div>
        <div>
          Phone: <span className="font-bold">{userData.phone || "Not provided"}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}