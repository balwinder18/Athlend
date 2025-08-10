"use client"
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
 




 const faqData = [
  {
    question: "How do I book a sports ground through Athlend?",
    answer: "Booking is simple. Just choose your sport, preferred location, and available time slot. Once selected, complete the secure payment process to confirm your reservation instantly."
  },
  {
    question: "Who can book a ground on Athlend?",
    answer: "Athlend is open to everyone — whether you're a student, working professional, amateur team, or sports enthusiast. If you want to play, we’re here to connect you to the right space."
  },
  {
    question: "Can I book for one-time events or ongoing practice sessions?",
    answer: "Yes. You can make single-use bookings or block recurring slots for regular practice sessions — weekly, monthly, or custom plans."
  },
  {
    question: "Is it safe to use school grounds after hours?",
    answer: "Absolutely. All listed grounds operate under safety protocols provided by the school. Many have on-site staff, surveillance, or secure entry systems to ensure a safe playing environment."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes. Cancellations and reschedules are allowed within the cancellation window, which is shown during booking. Full refund or partial refund terms will apply based on timing."
  },
  {
    question: "Are there any hidden or additional charges?",
    answer: "None. What you see is what you pay. The booking fee shown includes all applicable taxes and service charges. No surprises at checkout."
  },
  {
    question: "Are equipment or coaches available at the venue?",
    answer: "Some venues offer rental equipment or certified coaches at an extra cost. These options will be visible during the booking process if available."
  },
  {
    question: "Do you offer memberships or subscriptions?",
    answer: "We're working on exclusive plans for frequent users, including discounted bundles and premium perks. Stay tuned for early access!"
  },
  {
    question: "Why should our school list its ground on Athlend?",
    answer: "Athlend helps your school generate additional revenue, engage with the community, and promote sports culture — all while utilizing unused ground time without interrupting school operations."
  },
  {
    question: "How do we register our school ground on Athlend?",
    answer: "Just fill out a quick onboarding form. Our team will contact you, verify details, and guide you through the setup process. We'll handle listings, bookings, and visibility."
  },
  {
    question: "Can we control who books and when?",
    answer: "Yes. You’ll get full control through a dedicated dashboard — manage time slots, set rules, approve or reject bookings, and monitor usage in real time."
  },
  {
    question: "Can we block dates for school events or holidays?",
    answer: "Definitely. You can block specific dates, times, or full-day schedules anytime — whether it’s for annual functions, maintenance, or exams."
  },
  {
    question: "How do we receive payments from Athlend?",
    answer: "Payouts are processed weekly or monthly, as per your preference. You’ll receive a transparent usage report and secure bank transfer with every cycle."
  }
];


const Faq = () => {
  const [openIndex, setOpenIndex] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const visibleFAQs = showAll ? faqData : faqData.slice(0, 5);

  
 


  return (
    <>
   

<div id="FAQs" className="h-20"></div>

<section className="bg-white py-5 px-4 lg:px-20">
  <div className="max-w-[1280px] mx-auto">
    <h2 className="text-center text-black mb-10 text-[20px] lg:text-[32px] playfair-display-heading">
      Frequently Asked Questions
    </h2>

    <div className="space-y-4">
        {visibleFAQs.map((item, index) => (
        <div
          key={index}
          className="border-2 border-black rounded-2xl bg-[#f8f8f8] text-black"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center p-4 text-left"
          >
            <h3 className="font-roboto text-[14px] lg:text-[20px]">
              {item.question}
            </h3>

            <span
              className={`transition-transform duration-300 flex items-center justify-center w-10 h-10 rounded-full ${
                openIndex.includes(index) ? "rotate-180" : "rotate-0"
              }`}
            >
              <IoIosArrowDown className="text-xl" />
            </span>
          </button>

          {openIndex.includes(index) && (
            <div className="border-t border-gray-200 px-4 pb-4 text-[#424242] text-[12px] lg:text-lg leading-relaxed whitespace-pre-line font-roboto">
              {item.answer}
            </div>
          )}
        </div>
      ))}

      
     {faqData.length > 5 && (
  <div className="flex justify-center mt-2">
    <button
      onClick={() => setShowAll(!showAll)}
      className="text-sm text-green-600 font-semibold hover:underline"
    >
      {showAll ? "See Less" : "See More"}
    </button>
  </div>
)}

   
    </div>
  </div>
</section>

    </>
  );
};

export default Faq;
