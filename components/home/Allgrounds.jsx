'use client'
import { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle, XCircle, Plus, Loader } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
const Allgrounds = () => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllGrounds = async () => {
      try {
        const response = await fetch('/api/getallgrounds');
        if (!response.ok) {
          throw new Error('Failed to fetch grounds');
        }

        const data = await response.json();
        const groundsArray = Array.isArray(data) ? data : [data];
        setGrounds(groundsArray);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching grounds:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAllGrounds();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Available Grounds</h1>
      {grounds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grounds.map((ground) => (
            ground.Approval === "yes" && (

              <div
                key={ground._id}
                className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-blue-100 flex items-center justify-center">
                {ground.imageUrl? (
                   <Image src={ground.imageUrl} alt='image' height={160} width={160}/>
                ):(
                  <MapPin className="h-12 w-12 text-blue-300" />
                ) }
                 
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">{ground.name}</h2>

                    <span className="flex items-center text-green-500 text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approved
                    </span>

                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{ground.description}</p>

                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{ground.location}</span>
                  </div>

                  <Link
                    href={`/grounds/${ground._id}`}
                    className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors mt-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>



            )
          ))}



        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No grounds available.</p>
        </div>
      )}
    </div>







  );
};

export default Allgrounds;
