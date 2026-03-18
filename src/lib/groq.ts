import Groq from "groq-sdk";
import { ResumeFormate } from "../types/resume";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

if (!API_KEY) {
  console.error("API Key is missing! Make sure it is in your .env file.");
}

const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true  // Allows Groq to work in browser
});

export const runGroq = async (promptText: string): Promise<ResumeFormate> => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: promptText
        }
      ],
      model: "llama-3.3-70b-versatile",  // Best free model
      temperature: 0.7,
      response_format: {type: "json_object"}
    });
    const text = completion.choices[0].message.content;
    if (!text) throw new Error("Groq returned an empty response");
    return JSON.parse(text) as ResumeFormate;
  } catch (error) {
    console.error("Error talking to Groq:", error);
    throw error;
  }
};