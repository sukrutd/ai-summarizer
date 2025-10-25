/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI } from '@google/genai';
import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';

const genAI = new GoogleGenAI({});

export async function generateSummaryFromGemini(textToSummarize: string) {
    // Combine the prompt and the text into a single, detailed instruction.
    const fullPrompt = `${SUMMARY_SYSTEM_PROMPT}\n\n--- TEXT TO SUMMARIZE ---\n\n${textToSummarize}`;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: fullPrompt,
            config: { temperature: 0.2 }
        });

        return response.text?.trim() ?? '';
    } catch (error: any) {
        const isRateLimitError = error.status === 429 || error.message.includes('RESOURCE_EXHAUSTED');
        const errorMessage = isRateLimitError ? 'RATE_LIMIT_EXCEEDED' : 'An error occurred while generating summary';
        throw new Error(errorMessage);
    }
}
