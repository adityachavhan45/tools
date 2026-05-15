import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.0-flash";

export async function POST(request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "Unable to convert right now. Please try again." },
        { status: 500 }
      );
    }

    const { text } = await request.json();
    const input = typeof text === "string" ? text.trim() : "";

    if (!input) {
      return Response.json(
        { error: "Please enter text to convert to JavaScript code." },
        { status: 400 }
      );
    }

    const prompt = `You are an expert JavaScript generator.
Convert the user's input into accurate, production-quality JavaScript code.

Rules:
* Output only JavaScript code (no markdown, no explanation)
* Ensure code is valid, runnable, and properly formatted
* Keep logic accurate to user intent
* Add brief inline comments only when necessary for clarity
* Prefer clean modern JavaScript syntax

Text:
${input}`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    const aiText = result.response?.text?.().trim();

    if (!aiText) {
      return Response.json(
        { error: "Unable to convert right now. Please try again." },
        { status: 502 }
      );
    }

    const cleaned = aiText
      .replace(/^```(?:javascript|js)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    return Response.json({ code: cleaned });
  } catch (error) {
    console.error("text-to-javascript route error:", error);
    return Response.json(
      { error: "Unable to convert right now. Please try again." },
      { status: 500 }
    );
  }
}
