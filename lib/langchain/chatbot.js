// import { ChatGroq } from "@langchain/groq";
// import { initializeAgentExecutorWithOptions } from "langchain/agents";
// import { checkAvailableSlotsTool } from "./tools";

// export const createHelpBot = async () => {
//   const llm = new ChatGroq({
//     apiKey: process.env.GROQ_API_KEY,
//     model: "llama3-8b-8192", 
//     temperature: 0.3,
//   });

//   const executor = await initializeAgentExecutorWithOptions(
//     [checkAvailableSlotsTool],
//     llm,
//     {
//       agentType: "zero-shot-react-description", // still works here
//       verbose: true,
//     }
//   );

//   return executor;
// };


// export const createHelpBot = async () => {
//   const llm = new ChatGroq({
//     apiKey: process.env.GROQ_API_KEY,
//     model: "llama3-8b-8192",
//     temperature: 0.3,
//   });

//   const executor = await initializeAgentExecutorWithOptions(
//     [checkAvailableSlotsTool],
//     llm,
//     {
//       agentType: "zero-shot-react-description",
//       verbose: true,
//       handleParsingErrors: (error) => {
//         return `Please provide a date in YYYY-MM-DD format (e.g., "2025-06-25") or say "today".`;
//       }
//     }
//   );

//   return executor;
// };


import { ChatGroq } from "@langchain/groq";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { connecttodatabase } from "@/database/db";

export const getDBSnapshot = async () => {
  const db = await connecttodatabase();

  const grounds = await db.collection("grounds").find({}).toArray();
  const bookings = await db.collection("bookings").find({}).toArray();

  // Convert DB snapshot to readable context
  const contextText = `
Grounds:
${grounds.map(g => `- ${g.name} (${g.location}): capacity=${g.capacity}, price=${g.pricePerSlot}, slotDuration=${g.slotDuration}`).join("\n")}

Bookings:
${bookings.map(b => `- GroundID=${b.groundId}, Date=${b.bookingdate}, Time=${b.startTime}-${b.endTime}`).join("\n")}
  `.trim();

  return contextText;
};

export const createPrompt = async (contextText) => {
  return ChatPromptTemplate.fromMessages([
    ["system", `You are a helpful assistant for a sports ground booking platform. Use the following database info to answer:\n\n${contextText}`],
    ["human", "{input}"],
  ]);
};

export const createChatBot = async () => {
  const contextText = await getDBSnapshot();
  const prompt = await createPrompt(contextText);
  const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY || "",
    model: "llama3-8b-8192",
  });

  // 🟢 This is where your error was – one of the elements (probably prompt) was invalid
  return RunnableSequence.from([
    async (input) => ({ input, context: contextText }),
    prompt,
    llm,
  ]);
};
