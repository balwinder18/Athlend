'use client'

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Help = () => {
    const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleHelpClick = () => {
    setIsOpen(!isOpen);
    router.push('/AIchat');
   
  };

  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={handleHelpClick}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
      >
        <HelpCircle size={24} />
        Help
      </button>
      
    </div>
  );
};

export default Help;
