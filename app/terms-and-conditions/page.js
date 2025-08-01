"use client";
import { Suspense } from "react";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation"
import Head from "next/head";
import Navbar from '../../components/Navbar'

const SearchParamsComponent = () => {
  
  const searchParams = useSearchParams();
  const query = searchParams.get("name");
  const [activeTab, setActiveTab] = useState(query || "terms");
 
  useEffect(() => {
    setActiveTab(query || "terms");
 }, [query]);
 
  
  
  
  return (
    <>
    <Head>
     {/* <Head>
       <title>Terms and conditions - Athlend: Book your Ground</title>
        <meta
          name="description"
          content="Terms and conditions - Athlend: Book your Ground"
        />

    </Head> */}
  </Head>
    <div>

      <Navbar/>
      <div className="relative w-full h-[259px]">
        <div className="w-full h-full object-cover bg-[#f8f8f8] bg-opacity-50 cursor-pointer" />
        {/* Overlay */}
        <div className="absolute bottom-[100px] lg:left-[80px] left-[16px] px-4 py-2 rounded-md">
        {activeTab === 'terms' && (
          <p className="text-black font-bold playfair-display-heading2 lg:tracking-[-1.26px] lg:text-[42px] text-[20px] tracking-[0.2px]">
            Terms and Conditions
          </p>
        )}
        {activeTab === 'privacy' && (
          <p className="text-black font-bold playfair-display-heading2 lg:leading-[120%] lg:tracking-[-1.26px] lg:text-[42px] text-[20px] tracking-[0.2px]">
            Privacy Policy
          </p>
        )}
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto" >
      <div className="lg:ml-[80px] lg:mr-[46px] mx-[16px]">
        {/* Tabs */}
        <div className="flex border-b border-[#F2E4FC] mt-4">
          <button 
            className={`mr-[24px] ml-4 lg:mr-[48px] py-2 text-[16px] lg:leading-[120%] lg:text-[20px] ${activeTab === 'terms' ? 'border-b-2  border-[#6F2C91] font-semibold font-roboto text-[#6F2C91]' : 'text-[#000] font-roboto font-[500]'}`}
            onClick={() => setActiveTab('terms')}
          >
            Terms and Condition
          </button>
          <button 
            className={` py-2 text-[16px] lg:text-[20px] lg:leading-[120%] ${activeTab === 'privacy' ? 'border-b-2 border-[#6F2C91] font-semibold font-roboto text-[#6F2C91]' : 'text-[#000] font-roboto font-[500]'}`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy Policy
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="p-4">
          {activeTab === 'terms' && (
           <div>
  <p className='font-roboto lg:text-[20px] text-[14px] tracking-[0.2px]'>
    These terms and conditions ("Terms") govern your use of the Athlend platform ("Platform"), provided by Athlend ("we", "us", or "our"). By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree with these Terms, please refrain from using the Platform.
  </p>

  <ol className="list-decimal pl-6 mt-2 space-y-4 lg:text-[28px] text-[20px] font-[550]">
    
    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Introduction</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>
          1.1 Welcome to Athlend, a platform dedicated to enabling users to discover and book sports grounds — primarily school grounds — during non-school hours.
        </span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>
          1.2 By accessing or using the Athlend website or services, you agree to abide by the Terms outlined here.
        </span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Definitions</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.1 "User" refers to individuals or groups booking grounds through the platform.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.2 "Ground Provider" refers to schools or institutions listing their sports grounds on the platform.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.3 "We", "Us", "Our" refers to Athlend, registered as a sole proprietorship in India.</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Eligibility</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>3.1 Users must be at least 18 years of age to create an account and make bookings.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>3.2 Users below 18 may participate only under the supervision of a parent or legal guardian.</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">User Obligations</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.1 Provide accurate, complete, and up-to-date personal and payment information.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.2 Use the platform only for lawful purposes.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.3 Follow all rules and guidelines set by the ground provider.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.4 Ensure responsible conduct by all individuals included in a booking.</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Booking & Cancellation Policy</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>5.1 A booking is confirmed only upon successful payment.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>5.2 Cancellations are permitted up to 24 hours before the scheduled booking time.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>5.3 Refunds are subject to ground provider policies and may be partial or denied in case of late cancellations.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>5.4 No-shows or last-minute cancellations may incur penalties or account suspension.</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Payment Terms</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>6.1 Payments are processed through PhonePe, a trusted and secure payment gateway.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>6.2 Athlend may retain a service fee from each transaction.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>6.3 Users must not raise disputes for valid and authorized transactions.</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Ground Provider Responsibilities</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>7.1 Ensure the ground is clean, safe, and accessible at the booked time.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>7.2 Promptly inform Athlend of any unavailability due to school activities or maintenance.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>7.3 Report misuse, damage, or safety incidents within 24 hours of occurrence.</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Limitation of Liability</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>8.1 Athlend is solely a booking facilitator and is not responsible for any injury, accident, or loss incurred during ground usage.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>8.2 We are not liable for cancellations or rescheduling due to external factors.</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>8.3 Athlend is not responsible for any misconduct or negligence by users or providers.</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Account Suspension or Termination</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>9.1 We reserve the right to suspend or permanently terminate accounts for violation of these terms, fraudulent behavior, or abusive conduct toward Athlend or its partners.</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Governing Law</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>10.1 These Terms are governed by the laws of India. All legal disputes shall be resolved under the jurisdiction of the courts in Faridabad, Haryana.</span>
      </p>
    </li>

  </ol>
</div>
          )}
          
          {activeTab === 'privacy' && (
          <div>
  <p className='font-roboto lg:text-[20px] text-[14px] tracking-[0.2px]'>
    This Privacy Policy ("Policy") outlines how Athlend ("we", "us", or "our") collects, uses, and protects your personal information when you access or use our platform within India. By using Athlend, you agree to the terms described below.
  </p>

  <ol className="list-decimal pl-6 mt-2 space-y-4 lg:text-[28px] text-[20px] font-[550]">
    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Information We Collect</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>1.1 Name, Email Address, and Phone Number</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>1.2 Payment Details (processed via PhonePe; not stored on our servers)</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>1.3 Location Data (used to recommend nearby grounds)</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>1.4 Booking History and Usage Preferences</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">How We Use Your Data</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.1 To create and manage your Athlend account</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.2 To process bookings and payments securely</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.3 To suggest grounds based on your location and activity</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.4 To send confirmations, reminders, and promotional updates</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Data Security</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>3.1 All user data is encrypted and stored securely using industry standards</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>3.2 Payments are handled via PhonePe’s PCI-DSS-compliant system</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>3.3 We do not sell or share personal information with third parties for marketing</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">User Control</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.1 You can view and update your personal details through your Athlend account</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.2 You may request account and data deletion by contacting us at [support@athlend.in]</span>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>4.3 You can opt out of promotional SMS or emails through your notification settings</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Cookies & Tracking</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>5.1 We currently do not use cookies or third-party tracking tools. If this changes, users will be notified and can opt out.</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Third-Party Links</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>6.1 Athlend may contain links to external sites. We are not responsible for the privacy practices of such third-party websites.</span>
      </p>
    </li>

    <li>
      <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Policy Updates</h3>
      <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
        <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>7.1 This Privacy Policy may be updated from time to time. Significant changes will be communicated via email or in-app notifications.</span>
      </p>
    </li>
  </ol>
</div>
          )}
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

const Page = () => {
  return (
    <Suspense>
      <SearchParamsComponent />
    </Suspense>
  );
};

export default Page;

