'use client'
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otpverified, setOtpverified] = useState(false);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(formData.email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, ""); 
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "email") {
        setEmail(value);
      }
    }
  };

  const handleEmailBlur = () => {
    if (!formData.email.endsWith("@gmail.com")) {
      setEmailError("Only Gmail addresses (@gmail.com) are allowed.");
    } else {
      setEmailError("");
    }
  };

  const handleSendOTP = async () => {
    const response = await fetch('/api/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email }),
    });

    if (response.ok) {
      setStep(2); // Move to OTP verification step
    } else {
      alert('Failed to send OTP');
    }
  };

  const handleVerifyOTP = async () => {
    const response = await fetch('/api/otp', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, otp }),
    });

    if (response.ok) {
      alert('OTP verified successfully!');
      setOtpverified(true);
      setStep(1);
    } else {
      alert('Invalid OTP');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError) {
      alert("Please provide correct gmail.");
      return;
    }
    
    if(otpverified){
      try {
        const response = await axios.post("/api/signup", formData);
        console.log("user registered succes")
        setFormData({ name: "", email: "", phone: "", password: "" });
        router.push('/login');
      } catch (error:any) {
        alert(error.response?.data?.message || "Error signing up");
      }
    } else {
      alert('verify otp first!');
      handleSendOTP();
    }
  };

  return (
    // <div className="flex justify-center items-center h-screen bg-gray-100">
    //   <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
    //     <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

    //     <input
    //       type="text"
    //       name="name"
    //       placeholder="Name"
    //       value={formData.name}
    //       onChange={handleChange}
    //       className="w-full p-2 mb-2 border rounded"
    //       required
    //     />

    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="Email (only @gmail.com allowed)"
    //       value={formData.email}
    //       onChange={handleChange}
    //       onBlur={handleEmailBlur}
    //       className="w-full p-2 mb-2 border rounded"
    //       required
    //     />
    //     {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

    //     <input
    //       type="tel"
    //       name="phone"
    //       placeholder="Phone (10 digits only)"
    //       value={formData.phone}
    //       onChange={handleChange}
    //       className="w-full p-2 mb-2 border rounded"
    //       required
    //     />

    //     <div className="relative mb-4">
    //       <input
    //         type={showPassword ? "text" : "password"}
    //         name="password"
    //         placeholder="Password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         className="w-full p-2 border rounded"
    //         required
    //       />
    //       <button
    //         type="button"
    //         onClick={() => setShowPassword(!showPassword)}
    //         className="absolute right-2 top-2 text-gray-500"
    //       >
    //         {showPassword ? "Hide" : "Show"}
    //       </button>
    //     </div>

    //     <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
    //       Sign Up
    //     </button>
    //   </form>

    //   <div className="ml-4">
    //     {step === 1 && !otpverified && (
    //       <div className="bg-white p-6 rounded-lg shadow-md">
    //         <h3 className="text-xl font-bold mb-4">Verify Email</h3>
    //         <button 
    //           onClick={handleSendOTP}
    //           className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
    //         >
    //           Send OTP
    //         </button>
    //       </div>
    //     )}

    //     {step === 2 && (
    //       <div className="bg-white p-6 rounded-lg shadow-md">
    //         <h3 className="text-xl font-bold mb-4">Enter OTP</h3>
    //         <input
    //           type="text"
    //           placeholder="Enter OTP"
    //           value={otp}
    //           onChange={(e) => setOtp(e.target.value)}
    //           className="w-full p-2 mb-2 border rounded"
    //         />
    //         <button 
    //           onClick={handleVerifyOTP}
    //           className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
    //         >
    //           Verify OTP
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </div>


//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col md:flex-row justify-center items-center p-4 gap-6">
//   {/* Main Sign Up Form */}
//   <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
//     <div className="text-center mb-6">
//       <h2 className="text-3xl font-extrabold text-gray-800">Create Account</h2>
//       <p className="mt-2 text-gray-600">Join us today</p>
//     </div>

//     <div className="space-y-4">
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           placeholder="John Doe"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           placeholder="example@gmail.com"
//           value={formData.email}
//           onChange={handleChange}
//           onBlur={handleEmailBlur}
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
//           required
//         />
//         {emailError && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             {emailError}
//           </p>
//         )}
//       </div>

//       <div>
//         <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//         <input
//           type="tel"
//           id="phone"
//           name="phone"
//           placeholder="1234567890"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             id="password"
//             name="password"
//             placeholder="••••••••"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 pr-10"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
//           >
//             {showPassword ? (
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//               </svg>
//             ) : (
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
//       >
//         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//         </svg>
//         Sign Up
//       </button>
//     </div>
//   </form>

//   {/* OTP Verification Section */}
//   <div className="w-full max-w-md">
//     {step === 1 && !otpverified && (
//       <div className="bg-white p-8 rounded-2xl shadow-xl">
//         <div className="text-center mb-6">
//           <h3 className="text-2xl font-bold text-gray-800">Verify Your Email</h3>
//           <p className="mt-2 text-gray-600">We'll send a verification code</p>
//         </div>
//         <button 
//           onClick={handleSendOTP}
//           className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//           </svg>
//           Send OTP
//         </button>
//       </div>
//     )}

//     {step === 2 && (
//       <div className="bg-white p-8 rounded-2xl shadow-xl">
//         <div className="text-center mb-6">
//           <h3 className="text-2xl font-bold text-gray-800">Enter Verification Code</h3>
//           <p className="mt-2 text-gray-600">Check your email for the OTP</p>
//         </div>
//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="6-digit code"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200 text-center tracking-widest"
//             maxLength={6}
//           />
//           <button 
//             onClick={handleVerifyOTP}
//             className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//             Verify OTP
//           </button>
//         </div>
//       </div>
//     )}
//   </div>
// </div>

<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4">
  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
    <div className="text-center mb-6">
      <h2 className="text-3xl font-extrabold text-gray-800">Create Account</h2>
      <p className="mt-2 text-gray-600">Join us today</p>
    </div>

    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="flex gap-2">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
            required
            disabled={otpverified}
          />
          
        </div>
        {!otpverified && !emailError && (
            <button
              type="button"
              onClick={handleSendOTP}
              className="text-blue-800 text-sm rounded-lg transition duration-200 whitespace-nowrap"
            >
              Send OTP
            </button>
          )}
        {emailError && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {emailError}
          </p>
        )}
      </div>

      {!otpverified && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
              maxLength={6}
            />
            
          </div>
          <button
              type="button"
              onClick={handleVerifyOTP}
              className="text-blue-800 text-sm rounded-lg transition duration-200 whitespace-nowrap"
            >
              Verify OTP
            </button>
          <p className="text-sm text-gray-500">Check your email for the verification code</p>
        </div>
      )}

      {otpverified && (
        <div className="flex items-center text-emerald-600">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Email verified successfully</span>
        </div>
      )}

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="1234567890"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {otpverified && (
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Complete Sign Up
        </button>
      )}
    </div>
  </form>
</div>
  );
};

export default SignupForm;