import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPrompts = {
  pyq: `You are an expert MAKAUT exam answer writer...`,
  notes: `You are an expert MAKAUT syllabus notes creator...`,
  predictor: `You are an expert MAKAUT exam question predictor...`,
};

export async function POST(req) {
  try {
    const { mode, message } = await req.json();

    if (!mode || !message) {
      return Response.json({ error: "Missing mode or message" }, { status: 400 });
    }

    const systemPrompt = systemPrompts[mode];
    if (!systemPrompt) {
      return Response.json({ error: "Invalid mode" }, { status: 400 });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free & fast
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
    });

    const text = response.choices[0].message.content;
    return Response.json({ result: text });

  } catch (err) {
    console.error("Groq API error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}