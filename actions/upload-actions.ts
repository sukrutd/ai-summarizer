'use server';

import { ClientUploadedFileData } from 'uploadthing/types';
import { fetchAndExtractPdfText } from '@/utils/langchain';
import { generateSummaryFromGemini } from '@/utils/gemini-ai';

type UploadResponse = ClientUploadedFileData<{ userId: string; file: { name: string; url: string } }>[];

interface ProcessResult {
    success: boolean;
    message: string;
    data: string | null;
}

const createSuccessResponse = (
    data: string | null = null,
    message: string = 'Summary generated successfully.'
): ProcessResult => ({
    success: true,
    message,
    data
});

const createErrorResponse = (message: string = 'File upload failed.'): ProcessResult => ({
    success: false,
    message,
    data: null
});

export async function generatePdfSummary(uploadResponse: UploadResponse | undefined): Promise<ProcessResult | string> {
    // Early return if no upload response
    if (!uploadResponse) {
        return createErrorResponse();
    }

    const { serverData: { file: { url: fileUrl } = {} } = {} } = uploadResponse[0];

    // Early return if no file URL
    if (!fileUrl) {
        return createErrorResponse();
    }

    try {
        // Extract text from PDF
        const pdfText = await fetchAndExtractPdfText(fileUrl);

        // Generate summary using Gemini AI
        const summary = await generateSummaryFromGemini(pdfText);
        return createSuccessResponse(summary);
    } catch {
        return createErrorResponse('Failed to generate summary.');
    }
}
