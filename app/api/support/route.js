// app/api/support/route.js
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';


const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

export async function POST(request) {
  try {
    const { message, chatHistory } = await request.json();

    
    const systemMessage = {
      role: "system",
      content: `You are a helpful assistant for a school ground rental platform. You help users find and book school grounds for events, sports, and other activities.

Information about our service:
- We connect local schools with community members who want to rent facilities
- Available facilities include sports fields
- Bookings require at least 2 hours advance notice
- Payment is processed securely through our platform
- NO Cancellations 

Keep responses concise and helpful regarding booking processes, availability, pricing, and facilities.`
    };

    const formattedHistory = chatHistory.map(msg => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.text
    }));

   
    const messages = [
      systemMessage,
      ...formattedHistory, 
      { role: "user", content: message }
    ];

  
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return NextResponse.json({ 
      response: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error in AI support system:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}