'use client'
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const chatRef = useRef(null);
  const athlendRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(chatRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(chatRef.current, { y: 300, opacity: 0, duration: 0.3, ease: "power3.in" });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowChat(false);
      gsap.fromTo(
        athlendRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            setTimeout(() => setShowChat(true), 1500);
          },
        }
      );
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      
<div
        ref={chatRef}
        className="w-80 h-96 bg-white shadow-lg rounded-xl mt-4 overflow-hidden opacity-0 translate-y-[300px]"
      >
        {!showChat ? (
          <div
            ref={athlendRef}
            className="flex items-center justify-center h-full bg-gray-900 text-white text-3xl font-bold"
          >
            ATHLEND
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="bg-blue-600 text-white p-4 font-bold">ATHLEND</div>
            <div className="flex-1 p-4 text-gray-800 space-y-2 overflow-y-auto">
              <p className="font-semibold text-green-700">Hello 👋</p>
              <p>How can I help you today?</p>
             
            </div>
            <div className="p-2 border-t flex items-center">
              <input
                type="text"
                className="flex-1 p-2 border rounded mr-2"
                placeholder="Ask a question..."
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded">➤</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSupport;