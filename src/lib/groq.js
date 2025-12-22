import Groq from "groq-sdk";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

if (!API_KEY) {
  console.error("API Key is missing! Make sure it is in your .env file.");
}

const groq = new Groq({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true  // Allows Groq to work in browser
});

export const runGroq = async (promptText) => {
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
    });
    
    const text = completion.choices[0].message.content;
    return text;
  } catch (error) {
    console.error("Error talking to Groq:", error);
    throw error;
  }
};