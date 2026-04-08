import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const systemPrompts = {
  pyq: `You are an expert MAKAUT (Maulana Abul Kalam Azad University of Technology) exam answer writer.
When given a question, write a complete, well-structured answer in the standard 7-mark university exam format.
Format your answer with:
- A clear introduction (2-3 lines)
- Main body with numbered points or subsections
- Diagrams mentioned as [DIAGRAM: description] if relevant
- A brief conclusion
Keep answers exam-ready, precise, and within 400-500 words. Use simple language suitable for B.Tech students.`,

  notes: `You are an expert MAKAUT syllabus notes creator.
When given a subject and unit, generate concise, exam-ready notes.
Format:
- Unit title and key topics list
- Each topic explained in 3-5 bullet points
- Important formulas or definitions in **bold**
- End with "Most Important for Exam:" section with 3-5 key points
Keep notes short, scannable, and focused on what gets marks in MAKAUT exams.`,

  predictor: `You are an expert MAKAUT exam question predictor with deep knowledge of past exam patterns.
When given a subject (and optionally semester/year), predict the most likely important questions.
Format your response as:
- **Very High Probability** (3-4 questions most likely to appear)
- **High Probability** (4-5 questions likely to appear)  
- **Good to Prepare** (3-4 questions worth preparing)
For each question, add a brief note on why it's important (e.g., "asked 3 times in past 5 years").
Focus on MAKAUT B.Tech syllabus patterns.`,
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

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: message }],
    });

    const text = response.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    return Response.json({ result: text });
  } catch (err) {
    console.error("AI API error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
