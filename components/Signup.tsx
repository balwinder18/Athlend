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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/\D/g, ""); 
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEmailBlur = () => {
    if (!formData.email.endsWith("@gmail.com")) {
      setEmailError("Only Gmail addresses (@gmail.com) are allowed.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError) {
      alert("Please provide correct gmail.");
      return;
    }
    
    try {
      const response = await axios.post("/api/signup", formData);
      console.log("user registered succes")
      setFormData({ name: "", email: "", phone: "", password: "" });
      router.push('/login');
    } catch (error:any) {
      alert(error.response?.data?.message || "Error signing up");
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
    </div>
  );
};

export default SignupForm;