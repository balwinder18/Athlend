
"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/login");
  }

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: session.user?.name ,
    email: session.user?.email ,
    phone: session.user?.phone ,
  });

  const handleclick =()=>{
     redirect("/newground");
  }
  const handleclick2 =()=>{
    redirect("/yourGround");
 }

  const handleEdit = () => setIsEditing(!isEditing);
  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your details and events</p>
      </header>

      {/* Profile Card */}
      <div className=" mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
       
          {/* Profile Image */}
          <div className=" flex justify-center w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-700">
            <img src={session.user?.image || "/default-avatar.png"} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col items-center gap-4">
          {/* Profile Info */}
          <div className="text-center">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="text-xl font-semibold text-gray-800 dark:text-white bg-transparent border-b focus:outline-none text-center"
              />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.name}</h2>
            )}

            
              <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
            
          </div>

          {/* Phone Number */}
          <div className="text-gray-600 dark:text-gray-300">
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="bg-transparent border-b focus:outline-none text-center"
              />
            ) : (
              <p>📞 Phone: <span className="font-bold">{user.phone}</span></p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
            <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Manage Events Section */}
      <div className="mx-auto mt-10 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Manage Your Events</h2>
        <p className="text-gray-600 dark:text-gray-300">Create, view, and manage your events.</p>

        {/* Buttons for Managing Events */}
        <div className="mt-4 flex gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg" onClick={handleclick}>Create Event</button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg" onClick={handleclick2} >View Events</button>
        </div>
      </div>
    </div>
    );
  };

  
