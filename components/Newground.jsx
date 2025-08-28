
'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState } from 'react'
import { toast } from "react-toastify";
import { UploadButton } from "../lib/uploadthing";
import { X, ImagePlus, Check } from 'lucide-react';
import Navbar from './Navbar';

const Newground = () => {
  const { data: session } = useSession();
  const [imageurl, setImageurl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!session) {
    toast.error("Please login first");
    redirect('/');
  }
  
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    name: '',
    location: '',
    images: "",
    description: '',
    userId: session.user?.id,
    capacity:"",
     hourlyRate:"",
     contactEmail:"",
     contactPhone:"",
     facilities:"",
     sport:""
     
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.name.trim()) {
      toast.error("Ground name is required");
      setIsSubmitting(false);
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Location is required");
      setIsSubmitting(false);
      return;
    }

    if (!imageurl) {
      toast.error("Please upload an image");
      setIsSubmitting(false);
      return;
    }

    try { 
      const response = await axios.post('/api/uploadGrounds', {
        name: formData.name,
        location: formData.location,
        description: formData.description,
        userId: formData.userId,
        imageUrl: imageurl,
        capacity:formData.capacity,
        pricing:formData.hourlyRate,
        phone:formData.contactPhone,
        email:formData.contactEmail,
        facilities:formData.facilities,
        sport:formData.sport
      });

      toast.success("Ground registered successfully!");
      setFormData({ name: '', location: '', images: [], description: '' });
      setImageurl("");
      router.push('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || "Error registering ground");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateImage = (res) => {
    setImageurl(res[0].url);
    toast.success("Image uploaded successfully!");
  };

  const clearImage = () => {
    setImageurl("");
  };

  return (
    <>
    
    <div className="min-h-screen pt-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className=" mt-20 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mb-10">
          Upload Ground Details
        </h1>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Ground Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-300 group-hover:border-blue-400"
              placeholder="Enter ground name"
              required
            />
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text" 
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-300 group-hover:border-blue-400"
              placeholder="Enter ground location"
              required
            />
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Sport
            </label>
            <input
              type="text" 
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-300 group-hover:border-blue-400"
              placeholder="Enter ground location"
              required
            />
          </div>


          <div className="group">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Capacity (Number of Players)
        </label>
        <input
          type="number"
          name="capacity"
          min="1"
          value={formData.capacity}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-300 group-hover:border-blue-400"
          placeholder="Enter maximum capacity"
          required
        />
      </div>

      {/* Pricing */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Pricing Information
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Rate for 30min (₹)</label>
            <input
              type="number"
              name="hourlyRate"
              min="0"
              value={formData.hourlyRate}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-300"
              placeholder="Hourly rate"
              required
            />
          </div>
         
        </div>
      </div>

      {/* Contact Information */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Contact Information
        </label>
        <div className="space-y-4">
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-300"
            placeholder="Contact email"
            required
          />
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-300"
            placeholder="Contact phone number"
            required
            maxLength={10}
  pattern="[0-9]{10}"
          />
        </div>
      </div>

          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Ground Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 hover:border-blue-500 transition duration-300">
              {imageurl ? (
                <div className="relative">
                  <img 
                    src={imageurl} 
                    alt="Uploaded ground" 
                    className="max-h-64 rounded-lg object-cover"
                  />
                  <button 
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 mt-3 bg-black rounded-2xl justify-center items-center">
                    <UploadButton 
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        handleUpdateImage(res);
                      }}
                      onUploadError={(error) => {
                        toast.error(`Upload Error: ${error.message}`);
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 4MB</p>
                </div>
              )}
            </div>
          </div>

          <div className="group flex flex-row justify-between">
         <div className='flex lg:flex-col xl:flex-col 2xl:flex-col'>
         <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Facilities
            </label>
            <textarea
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-300 group-hover:border-blue-400"
              rows="4"
              placeholder="Enter ground description"
            ></textarea>
         </div>
           <div className='flex flex-col'>
           <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition duration-300 group-hover:border-blue-400"
              rows="4"
              placeholder="Enter ground description"
            ></textarea>
           </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Check className="h-5 w-5 mr-2" />
                <span>Submit Ground Details</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Newground