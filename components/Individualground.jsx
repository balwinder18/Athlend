'use client'

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, CalendarDays, Clock, CheckCircle, XCircle, ArrowLeft, Trash2, Edit, Share2, Star, Users, Mail, Phone } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa';
import SlotPicker from './SlotPicker';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

const Individualground = () => {
  const [error, setError] = useState(null);
  const [ground, setGround] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isediting, setIsediting] = useState(false);

  const router = useRouter();
  const { id } = useParams();
  const { data: session } = useSession();
  const userid = session?.user?.id;

  const fetchGroundDetail = async () => {
    try {
      const response = await axios.get(`/api/groundDetails/${id}`);
      setGround(response.data);
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

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;

  if (error) return <div className="p-10 text-center text-red-600">Error: {error}</div>;

  if (!ground) return <div className="p-10 text-center">Ground Not Found</div>;

  return (
    <>
      <Navbar />

     <div className="bg-gray-50 min-h-screen">
        {/* Mobile Layout - Keep as original */}
        <div className="block lg:hidden">
          <div className="max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-12">
            {/* Back Link */}
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center text-gray-700 hover:text-black transition">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to all grounds
              </Link>
            </div>

            {/* Hero Section */}
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white mb-10">
              <div className="relative h-[200px] w-full bg-gray-100">
                {ground.imageUrl ? (
                  <img src={ground.imageUrl} alt={ground.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <MapPin className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  {ground.Approval === "yes" ? (
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm shadow">
                      <CheckCircle className="h-4 w-4 inline mr-1" /> Approved
                    </span>
                  ) : (
                    <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm shadow">
                      <Clock className="h-4 w-4 inline mr-1" /> Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Title / Actions */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-semibold">{ground.name}</h1>
                    <p className="flex items-center text-gray-500 mt-1">
                      <MapPin className="h-4 w-4 mr-1" /> {ground.location}
                    </p>
                  </div>

                  {userid == ground.userId && (
                    <div className="flex gap-3 mt-4 md:mt-0">
                      {isediting ? (
                        <button onClick={handleupdate} className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">Save</button>
                      ) : (
                        <button onClick={handleEdit} className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"><Edit/></button>
                      )}
                      <button onClick={() => setDeleteModal(true)} className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"><Trash2/></button>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mt-6 border-t pt-6">
                  <h2 className="text-xl font-medium mb-3">About this ground</h2>
                  {isediting ? (
                    <textarea
                      name="description"
                      value={ground.description}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{ground.description}</p>
                  )}
                </div>
              </div>
            </div>


            {/* Availability */}
            <div className="bg-white rounded-xl shadow p-6 mt-8 mb-8">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <CalendarDays className="h-5 w-5 text-blue-500 mr-2" />  Book Your Slot
              
              </h3>
              <SlotPicker groundId={id} groundName={ground.name} amount={ground.pricing} />
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Facilities */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Star className="h-5 w-5 text-blue-500 mr-2" /> Facilities
                </h3>
                {isediting ? (
                  <input
                    type="text"
                    name="facilities"
                    value={ground.facilities}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                  />
                ) : (
                  <p>{ground.facilities || "No facilities listed"}</p>
                )}
              </div>

              {/* Capacity & Pricing */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Users className="h-5 w-5 text-blue-500 mr-2" /> Capacity & Pricing
                </h3>
                <p><span className="text-gray-500 text-sm">Capacity:</span> {ground.capacity || "Not specified"}</p>
                <p className="mt-2 flex items-center">
                  <FaRupeeSign className="text-green-600 mr-1" />
                  {ground.pricing ? `${ground.pricing} per slot` : "Not specified"}
                </p>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Mail className="h-5 w-5 text-blue-500 mr-2" /> Contact
                </h3>
                <p className="mb-2 text-gray-700">{ground.email || "No email"}</p>
                <p className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2" /> {ground.phone || "No phone"}
                </p>
              </div>
            </div>

            
          </div>
        </div>

        {/* Desktop Layout - Left: Ground Details (Scrollable), Right: Booking (Fixed) */}
        <div className="hidden lg:flex h-screen pt-16">
          {/* Left Side - Ground Details (Scrollable) */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-8 py-8">
              {/* Back Link */}
              <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-gray-700 hover:text-black transition">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to all grounds
                </Link>
              </div>

              {/* Hero Section */}
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white mb-8">
                <div className="relative h-[400px] w-full bg-gray-100">
                  {ground.imageUrl ? (
                    <img src={ground.imageUrl} alt={ground.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      <MapPin className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    {ground.Approval === "yes" ? (
                      <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm shadow">
                        <CheckCircle className="h-4 w-4 inline mr-1" /> Approved
                      </span>
                    ) : (
                      <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm shadow">
                        <Clock className="h-4 w-4 inline mr-1" /> Pending
                      </span>
                    )}
                  </div>
                </div>

                {/* Title / Actions */}
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-semibold">{ground.name}</h1>
                      <p className="flex items-center text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" /> {ground.location}
                      </p>
                    </div>

                    {userid == ground.userId && (
                      <div className="flex gap-3">
                        {isediting ? (
                          <button onClick={handleupdate} className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">Save</button>
                        ) : (
                          <button onClick={handleEdit} className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"><Edit/></button>
                        )}
                        <button onClick={() => setDeleteModal(true)} className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"><Trash2/></button>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mt-6 border-t pt-6">
                    <h2 className="text-xl font-medium mb-3">About this ground</h2>
                    {isediting ? (
                      <textarea
                        name="description"
                        value={ground.description}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        rows="4"
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{ground.description}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 gap-6 mb-8">
                {/* Facilities */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <Star className="h-5 w-5 text-blue-500 mr-2" /> Facilities
                  </h3>
                  {isediting ? (
                    <input
                      type="text"
                      name="facilities"
                      value={ground.facilities}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3"
                    />
                  ) : (
                    <p className="text-gray-700">{ground.facilities || "No facilities listed"}</p>
                  )}
                </div>

                {/* Capacity & Pricing */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <Users className="h-5 w-5 text-blue-500 mr-2" /> Capacity & Pricing
                  </h3>
                  <div className="space-y-3">
                    <p><span className="text-gray-500 text-sm font-medium">Capacity:</span> <span className="text-gray-800">{ground.capacity || "Not specified"}</span></p>
                    <p className="flex items-center">
                      <span className="text-gray-500 text-sm font-medium mr-2">Price:</span>
                      <FaRupeeSign className="text-green-600 mr-1" />
                      <span className="text-gray-800">{ground.pricing ? `${ground.pricing} per slot` : "Not specified"}</span>
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <Mail className="h-5 w-5 text-blue-500 mr-2" /> Contact Information
                  </h3>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <span className="text-gray-500 text-sm font-medium">Email:</span><br />
                      {ground.email || "No email provided"}
                    </p>
                    <p className="flex items-center text-gray-700">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      {ground.phone || "No phone provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Section (Fixed) */}
          <div className="w-96 rounded-xl mr-4 mt-[80px] bg-white border-l border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold flex items-center">
                <CalendarDays className="h-5 w-5 text-blue-500 mr-2" /> 
                Book Your Slot
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <SlotPicker groundId={id} groundName={ground.name} amount={ground.pricing} />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Ground</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this ground? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
