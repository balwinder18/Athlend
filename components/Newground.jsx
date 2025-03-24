'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from 'react'
import { toast } from "react-toastify";

const Newground = () => {
  const { data: session } = useSession();
  
    if (!session) {
      
      // alert("Please login first");
      toast.error("Please login first");
      redirect('/');
    }
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    name: '',
    location: '',
    images: [],
    description: '',
    userId: session.user?.id,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => { // Added handleSubmit function
    e.preventDefault();

try { 

  

      const response = await axios.post('/api/uploadGrounds',{
         name : formData.name,
         location : formData.location,
         description:formData.description,
         userId : formData.userId,
      }
      );

      console.log('Ground registered successfully');
      setFormData({ name: '', location: '', images: [], description: '' });
      router.push('/profile');
  
} catch (error) {
  // alert(error.response?.data?.message || "Error registering ground");
  console.log(error);
}
    
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">Upload Ground Details</h1>
        
        <form className="space-y-6" onSubmit={handleSubmit}> {/* Updated form to call handleSubmit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ground Name
            </label>
            <input
              type="text"
              name="name" // Added name attribute
              value={formData.groundName} // Controlled input
              onChange={handleChange} // Added onChange handler
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter ground name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text" 
              name="location" // Added name attribute
              value={formData.location} // Controlled input
              onChange={handleChange} // Added onChange handler
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter ground location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ground Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload images</span>
                    <input 
                      type="file" 
                      name="images" // Added name attribute
                      className="sr-only" 
                      multiple 
                      accept="image/*"
                      onChange={handleChange} // Added onChange handler
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description" // Added name attribute
              value={formData.description} // Controlled input
              onChange={handleChange} // Added onChange handler
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter ground description"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit Ground Details
          </button>
        </form>
      </div>
    </div>
  )
}

export default Newground