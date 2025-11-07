"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { UploadButton } from "../lib/uploadthing";
import axios from "axios";
import { FiUser, FiMail, FiPhone, FiEdit, FiLogOut, FiPlus, FiList, FiCamera } from "react-icons/fi";
import YourGrounds from '../components/YourGrounds'
import Navbar from "./Navbar";
import avatar from '../public/images/avatar.png'
import Image from "next/image";
import Mybookings from '../components/Mybookings';
import { toast } from "react-toastify";
import { Edit3, Save, User, Mail, Phone, Camera, Upload } from 'lucide-react';

export default function ProfilePage() {
  const [image, setImage] = useState(avatar);
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]); 
  const [loadingBookings, setLoadingBookings] = useState(true);

  if (!session) {
    redirect("/login");
  }

  const id = session.user.id;

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: session.user?.name,
    email: session.user?.email,
    phone: session.user?.phone,
  });

  const handleclick = () => {
    redirect("/newground");
  };

  const handleclick2 = () => {
    redirect("/yourGround");
  };

  const handleuploadtodb = async (res) => {
    try {
      if (!res || res.length === 0) {
        console.error("No files uploaded or response is empty");
        toast.error("No files uploaded or response is empty", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const url = res[0].url;
      const email = session.user?.email;

      const response = await axios.post("/api/uploadimage", {
        imageUrl: url,
        email: email,
      });

      if (response.status === 200) {
        console.log("Updated successfully");
      } else {
        console.log("Error updating to the database");
      }

      await getImage(email);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getImage = async (email) => {
    try {
      const res = await axios.get(`/api/getUserImage?email=${email}`);
      if (res.data) {
      setImage(res.data);
    } 
    } catch (error) {
      console.error("image api erroror", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleupdate = async () => {
    try {
      const email = session.user.email;
      if (!email) {
        toast.error("No email found in session", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      const res = await axios.put(`/api/userdata`, {
        email,
        userdata: user,
      });
      if (res.data.message) {
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
        setIsEditing(!isEditing);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const fetchuserdata = async () => {
    try {
      const email = session.user.email;
      if (!email) {
        toast.error("No email found in session", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      const res = await axios.get(`/api/userdata?email=${email}`);
      if (res.data) {
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const bookingData = await axios.get(`/api/userbookings?userId=${session.user.id}`);
      if (bookingData.data) {
        setBookings(bookingData.data);
        
      }
    } catch (error) {
      console.log(error);
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Corrected useEffects to depend on the session
  useEffect(() => {
    if (session?.user?.email) {
      getImage(session.user.email);
      fetchuserdata();
      fetchBookings();
    }
  }, [session]);

  return (
  <>
  <Navbar />
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div className="flex relative">
      {/* Sidebar - Changed from fixed to sticky */}
      <div className="hidden md:block md:w-64 flex-shrink-0">
        <div className="sticky top-20 h-[calc(100vh-5rem)] bg-white dark:bg-gray-800 shadow-lg overflow-hidden flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center flex-shrink-0 px-4 py-4  rounded-xl mx-2 mt-2">
            <h1 className="text-xl font-bold text-black">MyDashboard</h1>
          </div>
          
          {/* Scrollable Navigation */}
          <div className="flex-1 overflow-y-auto mt-4 px-2">
            <nav className="space-y-1 pb-4">
              <a href="/profle" className="bg-blue-50 dark:bg-gray-700 text-green-500 dark:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <FiUser className="mr-3 h-5 w-5" />
                Profile
              </a>
              <a onClick={handleclick} className="text-gray-600 cursor-pointer hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <FiPlus className="mr-3 h-5 w-5" />
                Upload Grounds
              </a>
              <a onClick={handleclick2} className="text-gray-600 cursor-pointer hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <FiList className="mr-3 h-5 w-5" />
                Your Grounds
              </a>
            </nav>
          </div>
          
          {/* Logout Button - Sticky at bottom of sidebar */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <FiLogOut className="mr-2 h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content - Removed ml-64 since sidebar is not fixed */}
      <div className="flex-1 pt-24 w-full pb-20 md:pb-8">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          {/* Simplified content area */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
              {/* Header with gradient background */}
              <div className="h-32 bg-gradient-to-r from-green-400 via-green-500 to-green-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-white text-5xl font-bold tracking-widest uppercase">
                    ATHLEND
                  </h1>
                </div>
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:left-8 md:transform-none">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-white max-w-full">
                      <img
                        src={image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Camera icon with upload button overlay */}
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer">
                      <Camera className="w-4 h-4 text-white pointer-events-none" />
                      {/* Upload button positioned absolutely over camera icon */}
                      <div className="absolute inset-0">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            console.log("Files: ", res);
                            toast.success("Upload Completed", {
                              position: "top-right",
                              autoClose: 3000,
                            });
                            handleuploadtodb(res);
                          }}
                          onUploadError={(error) => {
                            toast.error(`ERROR! ${error.message}`, {
                              position: "top-right",
                              autoClose: 3000,
                            });
                          }}
                          className="w-full h-full opacity-0 cursor-pointer"
                          appearance={{
                            button: "w-full h-full opacity-0 cursor-pointer absolute inset-0",
                            container: "w-full h-full",
                            allowedContent: "hidden"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="pt-20 md:pt-16 px-6 md:px-8 pb-8">
                <div className="flex flex-col md:flex-row md:gap-8 gap-3">
                  {/* Profile Details Section */}
                  <div className="flex-1 md:pl-0">
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="md:text-2xl text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          Profile Information
                        </h2>
                        
                        {/* Edit/Save Button */}
                        <button
                          onClick={isEditing ? handleupdate : handleEdit}
                          className={`inline-flex items-center gap-2 md:px-6 px-2 md:py-3 py-1 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 ${
                            isEditing 
                              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-300 dark:focus:ring-red-800' 
                              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white focus:ring-green-300 dark:focus:ring-green-800'
                          }`}
                        >
                          {isEditing ? (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          ) : (
                            <>
                              <Edit3 className="w-4 h-4" />
                              Edit Profile
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-6">
                        {/* Full Name Field */}
                        <div className="group">
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                            <User className="w-4 h-4" />
                            Full Name
                          </label>
                          {isEditing ? (
                            <div className="relative">
                              <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-green-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none transition-all duration-200"
                                placeholder="Enter your full name"
                              />
                              <div className="absolute inset-y-0 right-3 flex items-center">
                                <Edit3 className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-600 transition-all duration-200">
                              <p className="text-gray-900 dark:text-white font-medium">{user.name || "Not provided"}</p>
                            </div>
                          )}
                        </div>

                        {/* Email Field */}
                        <div className="group">
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                          </label>
                          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-600 transition-all duration-200 relative">
                            <p className="text-gray-900 dark:text-white font-medium">{user.email}</p>
                            <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">Email cannot be changed</p>
                        </div>

                        {/* Phone Field */}
                        <div className="group">
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                            <Phone className="w-4 h-4" />
                            Phone Number
                          </label>
                          {isEditing ? (
                            <div className="relative">
                              <input
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-green-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none transition-all duration-200"
                                placeholder="Add phone number"
                              />
                              <div className="absolute inset-y-0 right-3 flex items-center">
                                <Edit3 className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-600 transition-all duration-200">
                              <p className="text-gray-900 dark:text-white font-medium">
                                {user.phone || (
                                  <span className="text-gray-500 dark:text-gray-400 italic">No phone number added</span>
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom gradient accent */}
              <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
            </div>
          </div>

          {/* Events Section */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Manage Your Grounds</h2>
            </div>

            <div className="text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <YourGrounds />
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">My Bookings</h2>
              <Mybookings bookingData={bookings} />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Navigation - Only visible on small screens */}
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg md:hidden z-50 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around">
        <button className="flex flex-col items-center py-3 px-4 text-green-600 dark:text-blue-400">
          <FiUser className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </button>
        <button onClick={handleclick} className="flex flex-col items-center py-3 px-4 text-gray-600 dark:text-gray-400">
          <FiPlus className="h-6 w-6" />
          <span className="text-xs mt-1">Add Ground</span>
        </button>
        <button onClick={handleclick2} className="flex flex-col items-center py-3 px-4 text-gray-600 dark:text-gray-400">
          <FiList className="h-6 w-6" />
          <span className="text-xs mt-1">View Grounds</span>
        </button>
        <button onClick={() => signOut()} className="flex flex-col items-center py-3 px-4 text-red-600 dark:text-red-400">
          <FiLogOut className="h-6 w-6" />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>
    </div>
  </div>
</>


  );
}
