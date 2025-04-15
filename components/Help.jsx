'use client'

import { useEffect, useRef, useState } from "react";
import { HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import AIchat from './AIchat'

const Help = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  const handleHelpClick = () => {
    setIsOpen(!isOpen);
    
   
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target) &&
        !event.target.closest("button") 
      ) {
        setIsOpen(false);
      }
    };
  
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div ref={chatRef} className="fixed bottom-6 right-6">
      <button
        onClick={handleHelpClick}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
      >
        <HelpCircle size={24} />
        Help
      </button>
      

      {isOpen && (
        <AIchat/>
      ) }
    </div>
  );
};

export default Help;
