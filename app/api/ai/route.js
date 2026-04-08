import Groq from "groq-sdk";
import { supabase } from "@/lib/supabase";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPrompts = {
  pyq: `You are an expert MAKAUT exam answer writer.
When given a question, write a complete, well-structured answer in the standard 7-mark university exam format.
Format your answer with:
- A clear introduction (2-3 lines)
- Main body with numbered points or subsections
- Diagrams mentioned as [DIAGRAM: description] if relevant
- A brief conclusion
Keep answers exam-ready, precise, and within 400-500 words.`,

  notes: `You are an expert MAKAUT syllabus notes creator.
When given a subject and unit, generate concise, exam-ready notes.
Format:
- Unit title and key topics list
- Each topic explained in 3-5 bullet points
- Important formulas or definitions in **bold**
- End with "Most Important for Exam:" section with 3-5 key points`,

  predictor: `You are an expert MAKAUT exam question predictor with deep knowledge of past exam patterns.
When given a subject, predict the most likely important questions.
Format your response as:
- **Very High Probability** (3-4 questions)
- **High Probability** (4-5 questions)
- **Good to Prepare** (3-4 questions)`,
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
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
    });

    const text = response.choices[0].message.content;

    // Save to Supabase
    await supabase.from("queries").insert({
      mode,
      subject: message.split("\n")[0].replace("Subject: ", ""),
      prompt: message,
      response: text,
    });

    return Response.json({ result: text });

  } catch (err) {
    console.error("API error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}