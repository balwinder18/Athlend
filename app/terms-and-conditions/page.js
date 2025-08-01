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
                These terms and conditions ("Terms") govern your use of the Athlend platform ("Platform"), provided by Athlend Private Limited ("we", "us", or "our"). By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree with these Terms, please refrain from using the Platform.
              </p>
              
              <ol className="list-decimal pl-6 mt-2 space-y-4 lg:text-[28px] text-[20px] font-[550]">
                <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">Use of the Platform</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>1.1 The Platform, including the website and associated applications, offers an online marketplace of Grounds</span>
                 
                  </p>
                </li>
                <li>
                  <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px]">User Responsibilities</h3>
                  <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.1 Users must be at least 18 years old to use the Platform.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.2 Users must provide accurate and complete information during the registration process.</span>
                    <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>2.3 Users must respect the privacy and confidentiality of other users. Sharing personal information or harassing behaviour is strictly prohibited.</span>
                    </p></li>
                    <li>
                 </li>

                  
                   
                  
              </ol>
            </div>
          )}
          
          {activeTab === 'privacy' && (
             <div>
             <p className='font-roboto lg:text-[20px] text-[14px] lg:leading-[30px] tracking-[0.2px] mb-6'>
             This Privacy Policy outlines how Athlend Private Limited ("we," "us," or "our") collects, uses, discloses, and safeguards the personal information of users ("you" or "your") on the website. By accessing website, you agree to the terms and practices outlined in this Privacy Policy.
             </p>
             
             <ul className=" pl-6 mt-2 space-y-4 lg:text-[28px] text-[20px] font-[550]">
               <li>
                 <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px] -ml-5 lg:-ml-7">Information we collect</h3>
                 <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>a. User Provided Information: When you register on Athlend, we may collect personal information such as your name, contact details.</span>
                  
                 </p>
               </li>
               <li>
                 <h3 className="font-[550] lg:text-[28px] text-[20px] font-roboto lg:leading-[22.6px] lg:tracking-[-0.84px] tracking-[-0.6px] mb-[16px] -ml-5 lg:-ml-7">How we use your Information</h3>
                 <p className='lg:text-[20px] text-[14px] font-normal font-roboto'>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>a. </span>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>b. </span>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>c. </span>
                   <span className='mb-[32px] block -ml-5 lg:-ml-7 leading-[30px]'>d. </span>
                   </p></li>
                  
             </ul>
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

