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
          <div className="max-w-4xl mx-auto px-6 py-12">
     
            <p className="text-center text-gray-500 mb-10">
          Last updated: September 13, 2025
        </p>
      <p className="mb-6 text-gray-700">
        Welcome to <span className="font-semibold">athlend.com</span>, a
        platform operated by <span className="font-semibold">A Plus Technologies</span> 
        for booking and renting sports grounds. By using our platform, you agree to
        the following terms:
      </p>

      <div className="space-y-8">
        {/* 1. Booking & Use */}
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Booking & Use</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Bookings are valid only for the specified date, time, and purpose
              selected. Extensions are not automatic.
            </li>
            <li>
              Users must follow all rules set by facility owners, including dress
              code and equipment restrictions.
            </li>
            <li>
              Athlend.com is a facilitator; facilities are owned and operated by
              third parties.
            </li>
            <li>No booking may be transferred, sublet, or resold.</li>
          </ul>
        </section>

        {/* 2. Damage & Liability */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            2. Damage, Liability & Indemnity
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Users are responsible for any damage to grounds, property, or
              equipment during their booking.
            </li>
            <li>
              Users indemnify and hold harmless Athlend.com, A Plus Technologies,
              and facility owners against injury, damage, loss, or disputes.
            </li>
            <li>
              Athlend.com and owners disclaim liability for injuries, losses, or
              accidents.
            </li>
            <li>No insurance coverage is provided for personal injury or loss.</li>
          </ul>
        </section>

        {/* 3. Equipment */}
        <section>
          <h2 className="text-xl font-semibold mb-3">3. Equipment</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Users may bring personal equipment if it complies with facility
              rules.
            </li>
            <li>
              Users are fully responsible for equipment safety and compliance.
            </li>
          </ul>
        </section>

        {/* 4. User Conduct */}
        <section>
          <h2 className="text-xl font-semibold mb-3">4. User Conduct</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Respectful, responsible behavior is required at all times.</li>
            <li>
              Harassment, abuse, substance use, smoking, or misconduct leads to
              termination without refund.
            </li>
            <li>Facility owner/manager decisions are final.</li>
          </ul>
        </section>

        {/* 5. Payment */}
        <section>
          <h2 className="text-xl font-semibold mb-3">5. Payment</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>All payments must be completed at the time of booking.</li>
            <li>Prices include applicable GST and local taxes.</li>
            <li>
              Additional charges (security, cleaning, damages) may be applied by
              facilities.
            </li>
          </ul>
        </section>

        {/* 6. Cancellation & Refund */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            6. Cancellation & Refund Policy
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>More than 24h before: 90% refund (after fees).</li>
            <li>24–12h before: 50% refund (after fees).</li>
            <li>12–6h before: 25% refund (after fees).</li>
            <li>Less than 6h: No refund.</li>
            <li>
              Refunds are processed within 7–10 business days to the original
              payment method.
            </li>
            <li>
              Rescheduling requests must be made at least 24h in advance, subject
              to availability.
            </li>
          </ul>
        </section>

        {/* 7. Age & Responsibility */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            7. Age & Supervisory Responsibility
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Adults booking for minors must supervise them and are accountable
              for their conduct and safety.
            </li>
            <li>
              Users must comply with local child safety laws and facility rules.
            </li>
          </ul>
        </section>

        {/* 8. Privacy */}
        <section>
          <h2 className="text-xl font-semibold mb-3">8. Privacy & Data</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              User data is collected and stored securely as per our Privacy Policy.
            </li>
            <li>
              Data will only be shared as required for booking or legal purposes.
            </li>
          </ul>
        </section>

        {/* 9. Changes */}
        <section>
          <h2 className="text-xl font-semibold mb-3">9. Changes to Terms</h2>
          <p className="text-gray-700">
            Athlend.com may update these terms at any time. Users will be notified
            of material changes via website or email.
          </p>
        </section>

        {/* 10. Disputes */}
        <section>
          <h2 className="text-xl font-semibold mb-3">10. Dispute Resolution</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Disputes will first be attempted to be resolved through mediation.</li>
            <li>
              If unresolved, jurisdiction lies with courts in Faridabad, India.
            </li>
          </ul>
        </section>

        {/* 11. Liability */}
        <section>
          <h2 className="text-xl font-semibold mb-3">11. Limitation of Liability</h2>
          <p className="text-gray-700">
            Athlend’s liability will not exceed the total booking fees paid for a
            specific booking. Neither party is liable for indirect, incidental, or
            punitive damages.
          </p>
        </section>

        {/* 12. Force Majeure */}
        <section>
          <h2 className="text-xl font-semibold mb-3">12. Force Majeure</h2>
          <p className="text-gray-700">
            Athlend/facility owners are not liable for cancellations caused by
            events beyond reasonable control (e.g., natural disasters, strikes,
            pandemics). In such cases, users will receive a reschedule or full
            refund.
          </p>
        </section>

        {/* 13. Facility Partner */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            13. Facility Partner Clause
          </h2>
          <p className="text-gray-700">
            Facilities are listed only after a written agreement/MOU with the
            owner. Owners confirm legality, permissions, insurance, and safety
            compliance. Athlend acts only as a platform and does not operate
            facilities.
          </p>
        </section>

        {/* 14. Facility Rules */}
        <section>
          <h2 className="text-xl font-semibold mb-3">
            14. Additional Facility Rules
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Entry only during booked slot and only for listed users.</li>
            <li>
              Activities limited to booked sports use—no parties, cooking, food,
              banners, music, or promotions unless approved.
            </li>
            <li>
              Dress/footwear must comply with facility rules (e.g., non-marking
              shoes).
            </li>
            <li>
              Management may deny entry, terminate booking, or fine for violations.
            </li>
          </ul>
        </section>
      </div>
    </div>
          )}
          
          {activeTab === 'privacy' && (
         <section className="px-6 py-12 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
       
        <p className="text-center text-gray-500 mb-10">
          Last updated: September 13, 2025
        </p>

        {/* Intro */}
        <p className="mb-6">
          A Plus Technologies ("we," "us," or "our") operating the website{" "}
          <span className="font-medium">athlend.com</span> ("Site") respects
          your privacy and is committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, store,
          and safeguard your information when you use our services to book and
          rent sports grounds.
        </p>
        <p className="mb-6">
          The data controller for athlend.com is{" "}
          <span className="font-medium">A Plus Technologies</span>. For privacy
          questions or to exercise your rights (access, correction, deletion),
          contact our Privacy Officer at{" "}
          <a
            href="mailto:team@athlend.com"
            className="text-blue-600 hover:underline"
          >
            team@athlend.com
          </a>
          . We will acknowledge requests within 7 business days and respond
          substantively within 30 days.
        </p>

        {/* Sections */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Information We Collect</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
            </ul>
            <p className="mt-2">
              Payment information is collected securely by our third-party
              payment gateway and is not stored on our servers. We do not
              collect location data or use cookies at this time.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">How We Collect Information</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Directly from you when you register on our Site.</li>
              <li>During your booking transactions and interactions with our services.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Use of Your Information</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Facilitate your bookings and manage your account.</li>
              <li>Communicate booking confirmations, updates, and support.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Third-party Payment Processors</h3>
            <p>
              We do not store your payment card details. Payment processing is
              handled by our third-party payment gateway (e.g., Paytm/PhonePe);
              by completing a payment you accept that we will share necessary
              payment and contact details with that provider to process the
              transaction. See Paytm/PhonePe Terms & Privacy for more details.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Data Sharing</h3>
            <p>
              We do not share your personal data with any third parties except
              our trusted payment gateways which handle payment processing
              separately.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Data Storage and Security</h3>
            <p>
              Your data is securely stored on protected servers using{" "}
              <span className="font-medium">MongoDB technology</span> with
              appropriate technical and organizational measures to prevent
              unauthorized access, loss, or misuse.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Retention</h3>
            <p>
              Account and booking records are kept for the life of your account
              and for 7 years after account deletion for legal/compliance and
              tax purposes (or insert your preferred retention).
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Children</h3>
            <p>
              Users under 18 must be booked by an adult. We do not knowingly
              collect personal information from children without parental
              consent. If you are booking on behalf of a minor, you must provide
              guardian contact details and emergency contact at booking.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Your Rights</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Access and review your personal data.</li>
              <li>Request corrections or updates to your information.</li>
              <li>
                Request deletion of your data, subject to legal or operational
                requirements.
              </li>
            </ul>
            <p className="mt-2">
              Please contact us at{" "}
              <a
                href="mailto:support@athlend.com"
                className="text-blue-600 hover:underline"
              >
                support@athlend.com
              </a>{" "}
              to exercise these rights.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Cookies and Tracking</h3>
            <p>
              Currently, our Site does not use cookies or any other tracking
              technologies.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Changes to This Privacy Policy</h3>
            <p>
              We may update this policy periodically to reflect changes in our
              practices or legal requirements. Updates will be posted on this
              page with a revised "Last updated" date.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <p>
              For questions or concerns about this Privacy Policy or how we
              handle your data, please contact us at:{" "}
              <a
                href="mailto:support@athlend.com"
                className="text-blue-600 hover:underline"
              >
                support@athlend.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
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

