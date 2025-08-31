

import { ChatGroq } from "@langchain/groq";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { connecttodatabase } from "@/database/db";

export const getDBSnapshot = async () => {
  const db = await connecttodatabase();
  const todayISO = new Date().toISOString().split("T")[0];

  const grounds = await db.collection("grounds")
    .find({ Approval: "yes" })
    .toArray();

  const bookings = await db.collection("bookings")
    .find({ bookingdate: { $gte: todayISO } })
    .toArray();

  const groundsText = grounds.map(g => {
    return `Ground: ${g.name} (${g.location})\n` +
           
           `  - Capacity: ${g.capacity}\n` +
           `  - Slot Duration: ${g.slotDuration} minutes\n` +
           `  - Price Per Slot: ₹${g.pricing} / ${g.slotDuration}` +
           `  - sposrts available: ${g.sport}`+
           `  - Ground Facilities: ${g.facilities}`+
           `  - Ground Contact: ${g.phone}` +
            `  - Ground Description: ${g.description}` ;
  }).join('\n\n');

  const bookingsText = bookings.map(b => {
    return `Booking: \n  - Ground ID: ${b.groundId}\n  - Date: ${b.bookingdate}\n  - Slot: ${b.startTime}–${b.endTime}`;
  }).join('\n\n');

  return `Grounds:\n${groundsText}\n\nBookings:\n${bookingsText}`;
};


export const createPrompt = async (contextText) => {
  return ChatPromptTemplate.fromMessages([
    ["system", `You are a helpful assistant for a sports ground booking platform. Use the following database info to answer:\n\n${contextText} 
      and here are the rules u should keep before answering
     

You can answer questions like:
- How many grounds are there?
- What are the available slots today?
- What is the price per slot for ground ABC?

Use the following rules to answer:
*if client is asking for slots availabe and u cannot see it in database taht means all slots are avaialble for that day.
1. NEVER provide slot details for past dates.
2. ONLY provide slot availability for today or any future date.
3. If the date is not mentioned, assume the user is asking for today's availability.
4. If there are no bookings for a ground on a specific date, and the date is today or in the future, assume all slots within the ground's operating hours are available.
5. If a ground has a booking for a date, remove the booked slot(s) from the total available slots for that day.
6. If the date is in the past, say: "I cannot provide slot details for past dates."
7.When listing items, always use a numbered list, with each item on a new line.
8.Each numbered point should be on a new line
9.Dont mention Database or Data in your answer


"NEVER mention or reason about past dates or past bookings. If such data appears, ignore it. ONLY answer based on today's or future data."



Here is the latest snapshot of the database:
{context}

Only answer based on the context. If the answer isn't found, say:
"I don't know based on the database. Please ask a relevant question."
      `],
    ["human", "{input}"],
  ]);
};

export const createChatBot = async () => {
  const contextText = await getDBSnapshot();
  const prompt = await createPrompt(contextText);
  const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY || "",
    model: "llama-3.1-8b-instant",
  });

 
  return RunnableSequence.from([
    async (input) => ({ input, context: contextText }),
    prompt,
    llm,
  ]);
};
