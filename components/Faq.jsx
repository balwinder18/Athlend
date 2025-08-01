"use client"
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
 

const Faq = () => {
  const [openIndex, setOpenIndex] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndex((previndexes)=>previndexes.includes(index)? previndexes.filter((i) => i!==index) : [...previndexes,index]);
  };

  
  const faqData = [
    {
      question: "How to book ground",
      answer: `Go to ground details check availability , proceed for slot slection and then pay.`,
    },
     {
      question: "How to cancel booking",
      answer: `For cancellation contact here +91 9318326662.`,
    },
  
  ];

  return (
    <>
   

<div id="FAQs" className="h-20 bg-[#f8f8f8]"></div>

<section className="bg-white py-10 px-4 lg:px-20">
  <div className="max-w-[1280px] mx-auto">
    <h2 className="text-center text-black mb-10 text-[20px] lg:text-[32px] playfair-display-heading">
      Frequently Asked Questions
    </h2>

    <div className="space-y-4">
      {faqData.map((item, index) => (
        <div
          key={index}
          className="border-2 border-black rounded-2xl bg-[#f8f8f8] text-black"
        >
          {/* Question Header */}
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center p-4 text-left"
          >
            <h3 className="font-roboto font-bold text-[14px] lg:text-[20px]">
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

          {/* Answer */}
          {openIndex.includes(index) && (
            <div className="border-t border-gray-200 px-4 pb-4 text-[#424242] text-[12px] lg:text-lg leading-relaxed whitespace-pre-line font-roboto">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

    </>
  );
};

export default Faq;
