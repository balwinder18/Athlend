





import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Clock, CheckCircle, XCircle, Plus, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

const YourGrounds = () => {
  const { data: session } = useSession();
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); 

  const router = useRouter();

  useEffect(() => {
    const fetchGrounds = async () => {
  
      if (!session) {
        return;
      }

      try {
        const userId = session.user.id;
        if (!userId) {
          throw new Error('User ID not found');
        }

        const response = await fetch(`/api/getgrounds?userId=${userId}`);
        

        const data = await response.json();
        if(data.message == "no grounds found for this user"){
          setGrounds([]);
          setLoading(false);
          return;  
        }
       

        const groundsArray = Array.isArray(data) ? data : [data];
        setGrounds(groundsArray);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching grounds:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGrounds();
  }, [session]); 

  const filteredGrounds = () => {
    if (filter === 'approved') {
      return grounds.filter(ground => ground.Approval === "yes");
    }
    if (filter === 'pending') {
      return grounds.filter(ground => ground.Approval === "no");
    }
    return grounds;
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-8 rounded-lg shadow-md bg-white border-l-4 border-red-500">
          <XCircle className="h-8 w-8 mx-auto text-red-500 mb-4" />
          <p className="text-red-500 font-medium mb-2">Error Occurred</p>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 pt-24 ">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Grounds</h1>
            <p className="text-gray-600 mt-1">Manage your registered sports grounds</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  filter === 'all' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border border-gray-300`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 text-sm font-medium ${
                  filter === 'approved' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border-t border-b border-r border-gray-300`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  filter === 'pending' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border-t border-b border-r border-gray-300`}
              >
                Pending
              </button>
            </div>
            
            <Link 
              href="/newground" 
              className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Ground</span>
            </Link>
          </div>
        </div>

        {filteredGrounds().length > 0 ? (
          <>
          
                 <button 
                  onClick={() => router.push("/dashboard")}
                  className="mb-2 px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  
                  <span>Go To Grounds DashBoard</span>
                </button> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGrounds().map((ground) => (
              
             
             <Link
                href={`/grounds/${ground._id}`}
                className=""
              >
              <div
  key={ground._id}
  className="min-w-[250px] max-w-[250px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
>
  {/* Image container */}
  <div className="relative w-full h-[180px]">
    {ground.imageUrl ? (
      <img
        src={ground.imageUrl}
        alt="Ground image"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <MapPin className="h-10 w-10 text-blue-300" />
      </div>
    )}

    {/* Heart icon */}
    <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:scale-105 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="h-5 w-5 text-gray-700"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a5.5 5.5 0 017.778 0L12 6.939l-.096-.096a5.5 5.5 0 017.778 7.778L12 21.06l-7.682-7.682a5.5 5.5 0 010-7.778z"
        />
      </svg>
    </button>
  </div>

  {/* Text Content */}
  <div className="p-3">
    <h3 className="text-[15px] font-semibold text-gray-900 truncate">
      {ground.name}
    </h3>

    <p className="text-[13px] text-gray-500 mt-1 truncate">
      {ground.location}
    </p>

    <p className="text-[13px] text-gray-700 mt-1">
      ₹{ground.pricing} /30min <span className="inline-block align-middle">★</span> {ground.sport}
    </p>
  </div>
</div>

            </Link>
             
             
             
                         
            ))}
          </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-10 text-center max-w-lg mx-auto">
            <div className="bg-green-50 p-4 rounded-full mb-4">
              <MapPin className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No grounds found</h3>
            <p className="text-gray-600 mb-6">You haven't registered any sports grounds yet.</p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default YourGrounds;