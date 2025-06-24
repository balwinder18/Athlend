// // app/api/chat/route.js
// import { OpenAI } from 'openai';

// // Initialize with proper error handling
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// export async function POST(request) {
//   try {
//     // Verify API key is present
//     if (!process.env.OPENAI_API_KEY) {
//       throw new Error('OpenAI API key is missing from environment variables');
//     }

//     const { messages } = await request.json();
    
//     if (!messages) {
//       return Response.json(
//         { error: 'Messages are required' },
//         { status: 400 }
//       );
//     }

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages,
//       temperature: 0.7,
//     });

//     return Response.json(completion.choices[0].message);

//   } catch (error) {
//     console.error('Full error details:', error);
//     return Response.json(
//       { 
//         error: error.message,
//         details: error.response?.data || error.stack 
//       },
//       { status: 500 }
//     );
//   }
// }


// app/api/chat/route.js
// app/api/chat/route.js
// export async function POST(req) {
//   const { messages } = await req.json();

//   if (!process.env.OPENROUTER_API_KEY) {
//     return Response.json(
//       { error: "OpenRouter API key is missing" },
//       { status: 401 }
//     );
//   }

//   const systemMessage = {
//     role: "system",
//     content: `You are SportyBot, an AI assistant specialized in sports ground bookings. Your capabilities include:
//     - Helping users check ground availability
//     - Explaining booking procedures
//     - Describing facility amenities
//     - Processing booking requests
//     - Answering pricing questions
    
//     For any non-booking related questions, politely respond with:
//     "I specialize in sports ground bookings. Please ask about availability, pricing, or facilities."`
//   };

//   try {
//     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": "https://sportle-chi.vercel.app/", // Required
//         "X-Title": "My Chat App" // Recommended
//       },
//       body: JSON.stringify({
//         model: "mistralai/mistral-7b-instruct:free",
//         messages: [systemMessage, ...messages] 
//       })
//     });

//     const data = await res.json();

//     if (!res.ok) throw new Error(data.error?.message || "API request failed");

//     let responseContent = data.choices[0]?.message?.content || "";
//     const isBookingRelated = /book|availab|pric|facilit|sport|ground|field/i.test(responseContent);

     
//     if (!isBookingRelated) {
//       responseContent = "I specialize in sports ground bookings. How can I assist with your booking today?";
//     }

//     return Response.json({
//       role: "assistant",
//       content: responseContent
//     });


//   } catch (error) {
//     return Response.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { createChatBot } from "@/lib/langchain/chatBot";

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const latest = messages[messages.length - 1]?.content || "Hello";

    const chain = await createChatBot();
    const result = await chain.invoke(latest);

    return Response.json({ reply: result.content });
  } catch (err) {
    console.error("API error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
