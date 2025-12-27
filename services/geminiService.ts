import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export interface ValuationResult {
    value: string;
}


const getAi = () => {
    // API key is automatically injected by the environment
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getValuation = async (itemName: string): Promise<ValuationResult> => {
    const ai = getAi();
    try {
        const prompt = `Provide an estimated market value for the collectible item: "${itemName}".
        Keep the response concise. Start with the estimated value range (e.g., $50 - $75 USD), then provide a brief one or two-sentence justification.
        Format the response in plain text. Do not use markdown.`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const value = response.text;

        return { value };
    } catch (error) {
        console.error(`Error fetching valuation for ${itemName}:`, error);
        throw new Error('Failed to communicate with Gemini API.');
    }
};