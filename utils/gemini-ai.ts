import { GoogleGenAI } from '@google/genai';
import { SUMMARY_SYSTEM_PROMPT, SUMMARY_INSTRUCTION_PROMPT } from '@/utils/prompts';

const genAI = new GoogleGenAI({});

export async function generateSummaryFromGemini(textToSummarize: string) {
    const prompt = [
        {
            role: 'user',
            parts: [
                { text: SUMMARY_SYSTEM_PROMPT },
                { text: SUMMARY_INSTRUCTION_PROMPT },
                { text: `--- TEXT TO SUMMARIZE ---\n\n${textToSummarize}` }
            ]
        }
    ];

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash-lite',
            contents: prompt,
            config: {
                temperature: 0.7,
                maxOutputTokens: 2000
            }
        });

        if (!response || !response.text) {
            throw new Error('Failed to generate summary.');
        }

        return response.text.trim();
    } catch {
        throw new Error('Failed to generate summary.');
    }
}
