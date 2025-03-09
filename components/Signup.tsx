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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email (only @gmail.com allowed)"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

        <input
          type="tel"
          name="phone"
          placeholder="Phone (10 digits only)"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Sign Up
        </button>
      </form>

      <div className="ml-4">
        {step === 1 && !otpverified && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Verify Email</h3>
            <button 
              onClick={handleSendOTP}
              className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Enter OTP</h3>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <button 
              onClick={handleVerifyOTP}
              className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;