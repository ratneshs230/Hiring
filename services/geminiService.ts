
import { GoogleGenAI } from "@google/genai";
import { FormData } from "../types.ts";

export const getAiAnalysis = async (data: FormData) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze this student's application for GramTech Labs.
    GramTech Labs is a technical skill development startup in Lucknow focusing on app building and automation.
    Student Data:
    - Name: ${data.name}
    - Course: ${data.course}
    - Interests/Experience: ${data.interests}

    Provide a short, encouraging feedback message (max 3 sentences) addressed to the student about why their background or interest makes them a potentially great fit for the program.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        maxOutputTokens: 200,
        // When maxOutputTokens is set, thinkingBudget must also be set for Gemini 3 models.
        thinkingConfig: { thinkingBudget: 100 },
        temperature: 0.7,
      },
    });

    return response.text || "Thank you for your application! We'll review your details shortly.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Thank you for applying to GramTech Labs! We are excited to review your profile.";
  }
};
