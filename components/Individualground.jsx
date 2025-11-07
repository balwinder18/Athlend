'use client'

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {ChevronLeft, ChevronRight, MapPin, CalendarDays, Clock, CheckCircle, XCircle, ArrowLeft, Trash2, Edit, Share2, Star, Users, Mail, Phone, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa';
import SlotPicker from './SlotPicker';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

const Individualground = () => {
  const [error, setError] = useState(null);
  const [ground, setGround] = useState(null);
  const[images , setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isediting, setIsediting] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const router = useRouter();
  const { id } = useParams();
  const { data: session } = useSession();
  const userid = session?.user?.id;

  const fetchGroundDetail = async () => {
    try {
      const response = await axios.get(`/api/groundDetails/${id}`);
      setGround(response.data);
      setImages(response.data.imageUrl);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroundDetail();
  }, []);

  const handleDelete = () => {
    toast.error("Contact administrator to delete a ground!", { position: "top-right" });
    setDeleteModal(false);
  };

  const handleEdit = () => setIsediting(!isediting);

  const handleChange = (e) => setGround({ ...ground, [e.target.name]: e.target.value });

  const handleupdate = async () => {
    if (!session) return;
    try {
      const res = await axios.put(`/api/uploadGrounds`, { id, grounddata: ground });
      if (res.data.message) {
        toast.success(res.data.message, { position: "top-right" });
      }
      setIsediting(!isediting);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse text-gray-500">Loading ground details...</div>
    </div>
  );

  if (error) return (
    <div className="p-10 text-center">
      <div className="text-red-600 text-lg font-semibold">Error: {error}</div>
    </div>
  );

  if (!ground) return (
    <div className="p-10 text-center">
      <div className="text-gray-600 text-lg">Ground Not Found</div>
    </div>
  );

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Navbar />

      <div className="bg-white min-h-screen">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20 pb-12">
            {/* Back Link */}
            <div className="mb-4">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to all grounds
              </Link>
            </div>

            {/* Image Carousel - Reduced Height */}
            <div className="rounded-xl overflow-hidden shadow-md bg-white mb-4">
              <div className="relative h-[220px] w-full bg-gray-100">
                {images.length > 0 ? (
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={images[current]}
                      alt={ground.groundName}
                      className="h-full w-full object-cover transition-all duration-500"
                    />

                    {/* Navigation Buttons */}
                    <button
                      onClick={prevSlide}
                      className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white shadow-lg transition-all"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <button
                      onClick={nextSlide}
                      className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white shadow-lg transition-all"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-3 w-full flex justify-center space-x-1.5">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrent(idx)}
                          className={`transition-all duration-300 rounded-full ${
                            current === idx ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/60"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Approval Badge */}
                    <div className="absolute top-3 right-3">
                      {ground.Approval === "yes" ? (
                        <span className="bg-green-500 text-white px-2.5 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> Approved
                        </span>
                      ) : (
                        <span className="bg-yellow-500 text-white px-2.5 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Pending
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <MapPin className="h-12 w-12" />
                  </div>
                )}
              </div>
            </div>

            {/* Ground Title & Location */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">{ground.name}</h1>
                  <div className="flex items-center text-gray-600 gap-1">
                    <MapPin className="h-4 w-4" /> 
                    <span className="text-sm">{ground.location}</span>
                  </div>
                </div>

                {userid == ground.userId && (
                  <div className="flex gap-2 ml-3">
                    {isediting ? (
                      <button 
                        onClick={handleupdate} 
                        className="p-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600 transition-all"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    ) : (
                      <button 
                        onClick={handleEdit} 
                        className="p-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition-all"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => setDeleteModal(true)} 
                      className="p-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Available Slots Section */}
            <div className="border border-gray-300 rounded-xl p-5 mb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-gray-700" />
                Available Slots
              </h3>
              <SlotPicker groundId={id} groundName={ground.name} amount={ground.pricing} />
            </div>

            {/* About Section */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About this ground</h2>
              {isediting ? (
                <textarea
                  name="description"
                  value={ground.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                />
              ) : (
                <p className="text-gray-700 text-sm leading-relaxed">{ground.description}</p>
              )}
            </div>

            {/* Info Sections */}
            <div className="space-y-4 mb-4">
              {/* Facilities */}
              <div className="pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5" /> Facilities
                </h3>
                <ul className="space-y-2">
                  {ground.facilities && ground.facilities.length > 0 ? (
                    ground.facilities.map((facility, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                        <div className="mt-1.5 w-1.5 h-1.5 bg-gray-700 rounded-full flex-shrink-0"></div>
                        <span>{facility}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm italic">No facilities listed</p>
                  )}
                </ul>
              </div>

              {/* Capacity & Pricing */}
              <div className="pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5" /> Capacity & Pricing
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Capacity</span>
                    <span className="text-gray-900 font-medium">{ground.capacity || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Price per slot</span>
                    <div className="flex items-center gap-1 text-gray-900 font-semibold">
                      <FaRupeeSign className="h-3.5 w-3.5" />
                      <span>{ground.pricing || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Mail className="h-5 w-5" /> Contact
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="break-all">{ground.email || "No email"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{ground.phone || "No phone"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Airbnb Style */}
        <div className="hidden lg:block pt-24 pb-16">
          <div className="max-w-[1280px] mx-auto px-10">
            {/* Back Link */}
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to all grounds
              </Link>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-gray-900 mb-3">{ground.name}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-700">
                    <MapPin className="h-4 w-4" />
                    <span className="underline">{ground.location}</span>
                  </div>
                  {ground.Approval === "yes" ? (
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <CheckCircle className="h-4 w-4" /> Approved
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600 font-medium">
                      <Clock className="h-4 w-4" /> Pending Approval
                    </span>
                  )}
                </div>

                {userid == ground.userId && (
                  <div className="flex gap-2">
                    {isediting ? (
                      <button 
                        onClick={handleupdate} 
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm font-medium flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Save
                      </button>
                    ) : (
                      <button 
                        onClick={handleEdit} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-medium flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                    )}
                    <button 
                      onClick={() => setDeleteModal(true)} 
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Image Grid - Airbnb Style */}
            <div className="mb-12 relative">
              {images.length > 0 ? (
                <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] rounded-xl overflow-hidden">
                  {/* Main large image */}
                  <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => { setCurrent(0); setShowGallery(true); }}>
                    <img
                      src={images[0]}
                      alt={ground.name}
                      className="w-full h-full object-cover hover:brightness-95 transition-all"
                    />
                  </div>

                  {/* Four smaller images */}
                  {images.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="relative group cursor-pointer" onClick={() => { setCurrent(idx + 1); setShowGallery(true); }}>
                      <img
                        src={img}
                        alt={`${ground.name} ${idx + 2}`}
                        className="w-full h-full object-cover hover:brightness-90 transition-all"
                      />
                    </div>
                  ))}

                  {/* Show all photos button */}
                  {images.length > 1 && (
                    <button 
  onClick={() => { setCurrent(0); setShowGallery(true); }}
  className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-sm border border-gray-800 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-white hover:scale-105 active:scale-100 transition-all flex items-center gap-2.5 shadow-lg z-10 group"
>
  <svg 
    className="w-4 h-4 text-gray-800 group-hover:text-black transition-colors" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  <span className="text-gray-800 group-hover:text-black">See all photos</span>
</button>

                  )}
                </div>
              ) : (
                <div className="h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
                  <MapPin className="h-20 w-20 text-gray-400" />
                </div>
              )}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-5 gap-24">
              {/* Left Column - Details (3/5 width) */}
              <div className="col-span-3 space-y-8">
                {/* About Section */}
                <div className="pb-8 border-b border-gray-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this ground</h2>
                  {isediting ? (
                    <textarea
                      name="description"
                      value={ground.description}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="5"
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed text-base">{ground.description}</p>
                  )}
                </div>

                {/* Facilities */}
                <div className="pb-8 border-b border-gray-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="h-6 w-6" /> Facilities
                  </h2>
                  {isediting ? (
                    <input
                      type="text"
                      name="facilities"
                      value={ground.facilities}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <ul className="space-y-3">
                      {ground.facilities && ground.facilities.length > 0 ? (
                        ground.facilities.map((facility, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700">
                            <div className="mt-1.5 w-1.5 h-1.5 bg-gray-700 rounded-full flex-shrink-0"></div>
                            <span>{facility}</span>
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">No facilities listed</p>
                      )}
                    </ul>
                  )}
                </div>

                {/* Capacity & Pricing */}
                <div className="pb-8 border-b border-gray-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="h-6 w-6" /> Capacity & Pricing
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Capacity</span>
                      <span className="text-gray-900 font-medium">{ground.capacity || "Not specified"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price per slot</span>
                      <div className="flex items-center gap-1 text-gray-900 font-semibold">
                        <FaRupeeSign className="h-4 w-4" />
                        <span>{ground.pricing || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="pb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="h-6 w-6" /> Contact
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <span className="break-all">{ground.email || "No email"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <span>{ground.phone || "No phone"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Sticky Booking Card (2/5 width - wider) */}
              <div className="col-span-2">
                <div className="sticky top-28">
                  <div className="border border-gray-300 rounded-xl shadow-xl p-8 min-w-[420px] mr-8">
                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <FaRupeeSign className="h-5 w-5 text-gray-900 mt-1" />
                        <span className="text-2xl font-semibold text-gray-900">{ground.pricing || "N/A"}</span>
                        <span className="text-gray-600 ml-1">per slot</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>Max capacity: {ground.capacity || "Not specified"}</span>
                      </div>
                    </div>

                    {/* Booking Section */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        Select your slot
                      </h3>
                      <SlotPicker groundId={id} groundName={ground.name} amount={ground.pricing} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-black">
            <div className="text-white text-sm">
              {current + 1} / {images.length}
            </div>
            <button
              onClick={() => setShowGallery(false)}
              className="text-white hover:text-gray-300 transition-colors p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Image */}
          <div className="flex-1 relative flex items-center justify-center p-8">
            <img
              src={images[current]}
              alt={`${ground.name} - Image ${current + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 text-gray-900 p-3 rounded-full hover:bg-white shadow-xl transition-all disabled:opacity-50"
                  disabled={current === 0}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 text-gray-900 p-3 rounded-full hover:bg-white shadow-xl transition-all disabled:opacity-50"
                  disabled={current === images.length - 1}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="bg-black p-6 overflow-x-auto">
            <div className="flex gap-3 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`flex-shrink-0 transition-all ${
                    current === idx ? 'ring-2 ring-white opacity-100' : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">Delete Ground</h3>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete this ground? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Individualground;
