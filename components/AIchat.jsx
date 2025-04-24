// app/components/ChatSupport.jsx
'use client'
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const chatRef = useRef(null);
  const athlendRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello 👋 How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    // Add user message immediately
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [userMessage]
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Ensure we have proper response format
      if (!data.content) {
        throw new Error('Invalid response format from API');
      }

      setMessages(prev => [...prev, data]);
      
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Your existing GSAP animations
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
        className="w-80 h-96 bg-white shadow-lg rounded-xl mt-4 overflow-hidden opacity-0 translate-y-[300px] flex flex-col"
      >
        {!showChat ? (
          <div
            ref={athlendRef}
            className="flex items-center justify-center h-full bg-green-900 text-white text-3xl font-bold"
          >
            ATHLEND
          </div>
        ) : (
          <>
            <div className="bg-green-600 text-white p-4 font-bold">ATHLEND</div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-green-100 text-green-900 ml-8' 
                      : 'bg-gray-100 text-gray-900 mr-8'
                  }`}
                >
                  <strong>{msg.role === 'user' ? 'You:' : 'Assistant:'}</strong> {msg.content}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {error && (
              <div className="p-2 bg-red-100 text-red-700 text-sm">
                Error: {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-2 border-t flex items-center">
              <input
                type="text"
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Type your message..."
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="ml-2 bg-green-600 text-white p-2 rounded disabled:bg-green-300"
              >
                {isLoading ? '...' : '→'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatSupport;