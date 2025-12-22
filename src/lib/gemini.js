import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("API Key is missing! Make sure it is in your .env file.");
}
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export const runGemini = async (promptText) => {
  try {
    // Wrap the prompt in an array (safest way for the SDK, without it, it can only accept string sot for multiple inputs like image etc [])
    const result = await model.generateContent([promptText]);
    
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error talking to Gemini:", error);
    throw error;
  }
};