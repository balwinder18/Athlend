
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
  const [imageurl, setImageurl] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [facilityInput, setFacilityInput] = useState("");
  
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
     facilities:[],
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

    if (imageurl.length == 0) {
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
      setFormData({ name: '', location: '', images: [], description: '' ,facilities:[] });
      setImageurl([]);
      router.push('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || "Error registering ground");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

   const handleUpdateImage = (res) => {
  if (!res || res.length === 0) return;

  setImageurl((prev) => {
   
    const newImages = res.map((file) => file.url); 
    return [...prev, ...newImages].slice(0, 5);
  });
};
const clearImage = (url) => {
  setImageurl((prev) => prev.filter((img) => img !== url));
};

  return (
    <>
    
  <div className="pt-24 min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
  <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-10 transition-all duration-300">
    <h1 className="mt-10 text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 text-center mb-8">
      Upload Ground Details
    </h1>

    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* Ground Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Ground Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition"
          placeholder="Enter ground name"
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition"
          placeholder="Enter ground location"
          required
        />
      </div>

      {/* Sport */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Sport
        </label>
        <input
          type="text"
          name="sport"
          value={formData.sport}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition"
          placeholder="Enter sport"
          required
        />
      </div>

      {/* Capacity */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Capacity (Number of Players)
        </label>
        <input
          type="number"
          name="capacity"
          min="1"
          value={formData.capacity}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition"
          placeholder="Enter maximum capacity"
          required
        />
      </div>

      {/* Pricing */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Pricing Information
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Rate for 30min (₹)
            </label>
            <input
              type="number"
              name="hourlyRate"
              min="0"
              value={formData.hourlyRate}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition"
              placeholder="Enter rate"
              required
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Contact Information
        </label>
        <div className="space-y-4">
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition"
            placeholder="Contact email"
            required
          />
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition"
            placeholder="Contact phone number"
            required
            maxLength={10}
            pattern="[0-9]{10}"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Ground Images (max 5)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {imageurl.map((img, idx) => (
            <div key={idx} className="relative w-full aspect-square">
              <img
                src={img}
                alt={`ground-${idx}`}
                className="w-full h-full object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => clearImage(img)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {imageurl.length < 5 && (
           <div className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed rounded-lg text-gray-400 hover:border-green-500 hover:text-green-500 transition">
  <ImagePlus className="h-8 w-8 mb-2" />
  <div className="w-full px-2">
    <div className="w-full">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={handleUpdateImage}
        onUploadError={(error) =>
          toast.error(`Upload Error: ${error.message}`)
        }
        appearance={{
          button: "w-full text-sm py-2 px-3 bg-green-100 hover:bg-green-200 rounded-md text-green-700",
          container: "w-full flex justify-center",
          allowedContent: "hidden" // hides "PNG/JPG only..." text if needed
        }}
      />
    </div>
  </div>
</div>
          )}
        </div>
      </div>

      {/* Facilities */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Facilities
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={facilityInput}
            onChange={(e) => setFacilityInput(e.target.value)}
            className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter a facility (e.g. Parking)"
          />
          <button
            type="button"
            onClick={() => {
              if (facilityInput.trim()) {
                setFormData({
                  ...formData,
                  facilities: [...formData.facilities, facilityInput.trim()],
                });
                setFacilityInput("");
              }
            }}
            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.facilities.map((facility, idx) => (
            <span
              key={idx}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              {facility}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    facilities: formData.facilities.filter((_, i) => i !== idx),
                  })
                }
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white transition"
          rows="4"
          placeholder="Enter ground description"
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <span>Submitting...</span>
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