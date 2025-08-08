

import { createChatBot } from "@/lib/langchain/chatbot";

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
