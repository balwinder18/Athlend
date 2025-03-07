"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Locationdetect = () => {
  const { data: session, status } = useSession();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  
  useEffect(() => {
    console.log("Session:", session);
    console.log("Status:", status);
  }, [session, status]);

  const getLocation = async () => {
    
    if (status !== "authenticated" || !session?.user?.email) {
      setError("You must be logged in to use this feature.");
      return;
    }

  
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);
        console.log("Location fetched:", { latitude, longitude });

      
        await handleUpdate(latitude, longitude, session);
      },
      (error) => {
        setError(error.message);
        setLocation(null);
      }
    );
  };

  const handleUpdate = async (lat, lon, session) => {
    try {
      setLoading(true);
      setApiResponse(null);

      
      const useremail = session.user?.email;
      if (!useremail) {
        throw new Error("User ID not found in session.");
      }

      
      const response = await fetch("/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat, lon, email: useremail }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiResponse({ success: true, message: data.message });
      } else {
        setApiResponse({ success: false, message: data.message });
      }
    } catch (error) {
      console.error("Error updating location:", error);
      setApiResponse({ success: false, message: "An error occurred while updating location." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full bg-transparent rounded-lg text-center bottom-0 fixed">
      <h2 className="text-lg font-bold">Detect My Location</h2>

      
      {status !== "authenticated" && (
        <p className="mt-3 text-red-600"> You must be logged in to use this feature.</p>
      )}

      
      <button
        onClick={getLocation}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        disabled={loading || status !== "authenticated"}
      >
        {loading ? "Loading..." : "Get My Location"}
      </button>

      
      {location && (
        <p className="mt-3 text-green-600">
          📍 Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}

      
      {error && <p className="mt-3 text-red-600">❌ {error}</p>}

      
      {apiResponse && (
        <p className={`mt-3 ${apiResponse.success ? "text-green-600" : "text-red-600"}`}>
          {apiResponse.success ? "✅" : "❌"} {apiResponse.message}
        </p>
      )}
    </div>
  );
};

export default Locationdetect;