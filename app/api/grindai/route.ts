import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are a highly knowledgeable programming and computer science AI assistant. 
Your expertise includes software development, algorithms, data structures, system design, and best practices.
Provide clear, accurate, and practical answers with code examples when relevant.`;

export async function POST(req: Request) {
  try {
    // const { message } = await req.json();
    // if (!Array.isArray(message)) {
    //   throw new Error("Invalid input: 'message' should be an array");
    // }

 
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "system", content: SYSTEM_PROMPT },  {
        role: "user",
        content: "what is automation tool",
      },],
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 0.95,
      stream: false,
    });

    return Response.json({
      response: completion,
    });
  } catch (error: any) {
    return Response.json(
      {
        error: error.message || "Failed to generate response",
      },
      {
        status: 500,
      }
    );
  }
}
