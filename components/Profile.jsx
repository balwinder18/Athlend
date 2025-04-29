// "use client";

// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { signOut } from "next-auth/react";
// import { useEffect, useState } from "react";

// import { UploadButton } from "../lib/uploadthing";
// import axios from "axios";



// export default function ProfilePage() {


//   const [image , setImage] = useState("");
//   const { data: session } = useSession();


//   if (!session) {
//     redirect("/login");
//   }

//   const [isEditing, setIsEditing] = useState(false);
//   const [user, setUser] = useState({
//     name: session.user?.name ,
//     email: session.user?.email ,
//     phone: session.user?.phone ,

//   });

//   const handleclick =()=>{
//      redirect("/newground");
//   }
//   const handleclick2 =()=>{
//     redirect("/yourGround");
//  }


//  const handleuploadtodb =async(res)=> {
//   try {
//     console.log("Response from UploadThing:", res);

//     if (!res || res.length === 0) {
//       console.error("No files uploaded or response is empty");
//       alert("No files uploaded or response is empty");
//       return;
//     }

//     const url = res[0].url;
//     const email = session.user?.email;

//     console.log("URL:", url);
//     console.log("Email:", email);

//     const response = await axios.post("/api/uploadimage", {
//       imageUrl: url,
//       email: email,
//     });

//     console.log("Backend Response:", response);

//     if (response.status === 200) {
//       console.log("Updated successfully");
//     } else {
//       console.log("Error updating to the database");
//     }

//    await getImage(email);
//    console.log(image)
//   } catch (error) {
//     console.error("Error:", error);
//   }


//  }

//  const getImage = async (email)=>{

//   try {

//     const res = await axios.get(`/api/getUserImage?email=${email}`)

//     console.log("image api data ", res);
//     setImage(res.data.imageUrl);
//   } catch (error) {
//     console.error("image api erroror", error);

//   }
//  }

//  useEffect(() => {
//   getImage(user.email);
//  }, []);


//   const handleEdit = () => setIsEditing(!isEditing);
//   const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

//       <header className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Profile</h1>
//         <p className="text-gray-500 dark:text-gray-400">Manage your details and events</p>
//       </header>


//       <div className=" mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">


//           <div className="flex flex-col items-center gap-4">
//             <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-700">
//               <img 
//                 src={image} 
//                 alt="Profile" 
//                 className="w-full h-full object-cover" 
//               />
//             </div>

//             <UploadButton
//         endpoint="imageUploader"
//         onClientUploadComplete={(res) => {

//           console.log("Files: ", res);

//           alert("Upload Completed");
//           handleuploadtodb(res);

//         }}
//         onUploadError={(error) => {

//           alert(`ERROR! ${error.message}`);
//         }}
//       />


//           </div>
//           <div className="flex flex-col items-center gap-4">

//           <div className="text-center">
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="name"
//                 value={user.name}
//                 onChange={handleChange}
//                 className="text-xl font-semibold text-gray-800 dark:text-white bg-transparent border-b focus:outline-none text-center"
//               />
//             ) : (
//               <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.name}</h2>
//             )}


//               <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>

//           </div>


//           <div className="text-gray-600 dark:text-gray-300">
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="phone"
//                 value={user.phone}
//                 onChange={handleChange}
//                 className="bg-transparent border-b focus:outline-none text-center"
//               />
//             ) : (
//               <p>📞 Phone: <span className="font-bold">{user.phone}</span></p>
//             )}
//           </div>


//           <div className="flex gap-4">
//             <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
//               {isEditing ? "Save Changes" : "Edit Profile"}
//             </button>
//             <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
//               Log Out
//             </button>
//           </div>
//         </div>
//       </div>


//       <div className="mx-auto mt-10 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Manage Your Events</h2>
//         <p className="text-gray-600 dark:text-gray-300">Create, view, and manage your events.</p>

//         <div className="mt-4 flex gap-4">
//           <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg" onClick={handleclick}>Create Event</button>
//           <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg" onClick={handleclick2} >View Events</button>
//         </div>
//       </div>
//     </div>
//     );
//   };








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

export default function ProfilePage() {
  const [image, setImage] = useState(avatar);
  const { data: session } = useSession();

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
        alert("No files uploaded or response is empty");
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

      setImage(res.data.imageUrl);
    } catch (error) {
      console.error("image api erroror", error);
    }
  };

  useEffect(() => {
    getImage(user.email);
  }, []);


  const handleEdit = () => {
    
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleupdate = async () => {
    try {
      const email = await session.user.email;
      if (!email) {
        alert("No email found in session");
        return;
      }
      const res = await axios.put(`/api/userdata`, {
        email,
        userdata: user,

      })
      if (res.data.message) {
        alert(res.data.message);
        console.log("Updated user:", res.data.user);
        // Optionally update local state here
      }

    } catch (error) {
      console.log(error);

    }

  }

  const fetchuserdata = async () => {
    try {
      const email =  session.user.email;
      if (!email) {
        alert("No email found in session");
        return;
      }
      const res = await axios.get(`/api/userdata?email=${email}`)
      if (res.data) {
      
        setUser(res.data);
        
      }

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchuserdata();
  }, [])


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

        <div className="flex">
          <div className="hidden md:flex md:w-64 md:flex-col fixed h-full bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4 bg-green-500 rounded-xl">
                <h1 className="text-xl font-bold">MyDashboard</h1>
              </div>
              <div className="mt-8 flex-1 flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  <a href="/profle" className="bg-blue-50 dark:bg-gray-700 text-green-500 dark:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <FiUser className="mr-3 h-5 w-5" />
                    Profile
                  </a>
                  <a onClick={handleclick} className="text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <FiPlus className="mr-3 h-5 w-5" />
                    Upload Grounds
                  </a>
                  <a onClick={handleclick2} className="text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                    <FiList className="mr-3 h-5 w-5" />
                    Your Grounds
                  </a>
                </nav>
              </div>
              <div className="p-4">
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-md"
                >
                  <FiLogOut className="mr-2 h-4 w-4" />
                  Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:ml-64 flex-1">
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              <header className="mb-8 border-b pb-6 dark:border-gray-700">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, {user.name}</p>
              </header>

              {/* Simplified content area */}
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <div className="flex flex-col md:flex-row">
                  {/* Profile Photo Section */}
                  <div className="md:w-1/3 flex justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 mx-auto mb-4">
                        <img
                          src={image}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-3 bg-green-500 hover:bg-green-700 rounded-2xl">
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            console.log("Files: ", res);
                            alert("Upload Completed");
                            handleuploadtodb(res);
                          }}
                          onUploadError={(error) => {
                            alert(`ERROR! ${error.message}`);
                          }}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile Details Section */}
                  <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Profile Information</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="name"
                              value={user.name}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                            />
                          ) : (
                            <p className="mt-1 text-gray-800 dark:text-white">{user.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                          <p className="mt-1 text-gray-800 dark:text-white">{user.email}</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="phone"
                              value={user.phone}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                              placeholder="Add phone number"
                            />
                          ) : (
                            <p className="mt-1 text-gray-800 dark:text-white">{user.phone || "No phone number"}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <div onClick={handleEdit} >
                        {isEditing ? (
                          <button onClick={handleupdate} className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${isEditing ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>Save Changes</button>
                        ) : (
                          <button className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${isEditing ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>Edit</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Events Section */}
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Manage Your Grounds</h2>
                  {/* <div className="flex space-x-4">
                    <button
                      onClick={handleclick}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FiPlus className="inline-block mr-2 h-4 w-4" />
                      Upload Ground
                    </button>
                    <button
                      onClick={handleclick2}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <FiList className="inline-block mr-2 h-4 w-4" />
                      View Grounds
                    </button>
                  </div> */}
                </div>

                <div className="text-center  border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">

                  {/* <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No events found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new event.</p> */}

                  <YourGrounds />
                </div>
              </div>

              {/* Mobile Navigation - Only visible on small screens */}
              <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg md:hidden">
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
          </div>
        </div>
      </div>
    </>
  );
}