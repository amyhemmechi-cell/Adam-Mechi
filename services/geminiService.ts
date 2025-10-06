
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder check. The environment variable is expected to be set.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    audit: {
      type: Type.OBJECT,
      properties: {
        brandIdentity: { type: Type.STRING },
        contentInventory: { type: Type.STRING },
        strengthsWeaknesses: { type: Type.STRING },
      },
    },
    readiness: {
      type: Type.OBJECT,
      properties: {
        festivalSuccessPotential: {
          type: Type.OBJECT,
          properties: {
            rating: { type: Type.INTEGER },
            justification: { type: Type.STRING },
          },
        },
        platformInterest: {
          type: Type.OBJECT,
          properties: {
            rating: { type: Type.INTEGER },
            justification: { type: Type.STRING },
          },
        },
      },
    },
    vision: {
      type: Type.OBJECT,
      properties: {
        home: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            metaDescription: { type: Type.STRING },
            layout: { type: Type.STRING },
            content: { type: Type.STRING },
            cta: { type: Type.STRING },
          },
        },
        projects: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            metaDescription: { type: Type.STRING },
            layout: { type: Type.STRING },
            content: { type: Type.STRING },
            projectsList: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  logline: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
              },
            },
            albumSeries: {
              type: Type.OBJECT,
              properties: {
                intro: { type: Type.STRING },
                albums: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      concept: { type: Type.STRING },
                    },
                  },
                },
              },
            },
          },
        },
        about: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            metaDescription: { type: Type.STRING },
            layout: { type: Type.STRING },
            content: { type: Type.STRING },
          },
        },
        contact: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            metaDescription: { type: Type.STRING },
            layout: { type: Type.STRING },
            content: { type: Type.STRING },
          },
        },
      },
    },
  },
};


const buildPrompt = (url: string): string => {
  return `
    Analyze the following website in extreme detail: ${url}

    Your task is to act as a world-class digital storytelling strategist and festival submission expert. Generate a JSON object that strictly adheres to the provided schema. Do not include any markdown, comments, or explanatory text outside of the JSON object itself.

    Follow these instructions precisely for each section:
    1.  **Full Website Audit**:
        -   Summarize the brand identity, mission, tone, and visual style.
        -   Identify all content: projects, messages, contact methods.
        -   Evaluate strengths and weaknesses (design, UX, language, professionalism).

    2.  **Festival & Platform Readiness Assessment**:
        -   Assess the likelihood of acceptance at top festivals (e.g., Red Sea, Annecy, Amnesty).
        -   Rate "Festival Success Potential" from 0–100% and explain why.
        -   Assess interest from platforms like Netflix, MBC, or YouTube Originals. Rate their interest level (0–10) and justify.

    3.  **Create a New, High-End Website Vision**:
        -   Design a new site vision matching international festival standards.
        -   The aesthetic must be a minimalist, powerful, and cinematic black and white color scheme.
        -   Structure the vision into Home, Projects, About, and Contact pages.
        -   For each page, write the exact text, a description of the layout, and navigation flow.
        -   For the 'Projects' page, professionally rebrand and describe existing projects as fictional narratives (e.g., 'Neural Pact' as an AI drama).
        -   Include a section for "Album Series" (e.g., Zayn, Free Palestine, Free Samara) presented as digital narrative albums.

    4.  **Generate Full Content**:
        -   Write all text in polished, professional English.
        -   Provide meta-descriptions, titles, and calls-to-action.
        -   Ensure every element reflects sophistication, vision, and global appeal.
    `;
};

export const fetchWebsiteAnalysis = async (url: string): Promise<AnalysisResponse> => {
  const prompt = buildPrompt(url);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });
    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    return parsedData as AnalysisResponse;

  } catch (error) {
    console.error("Error fetching or parsing Gemini response:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
