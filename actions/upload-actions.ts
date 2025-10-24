'use server';

import { ClientUploadedFileData } from 'uploadthing/types';
import { fetchAndExtractPdfText } from '@/utils/langchain';
import { generateSummaryFromGemini } from '@/utils/gemini-ai';

type UploadResponse = ClientUploadedFileData<{ userId: string; file: { name: string; url: string } }>[];

export async function generatePdfSummary(uploadResponse: UploadResponse | undefined) {
    if (!uploadResponse) {
        return {
            success: false,
            message: 'File upload failed',
            data: null
        };
    }

    const { serverData: { userId, file: { url: fileUrl, name: fileName } = {} } = {} } = uploadResponse[0];

    if (!fileUrl) {
        return {
            success: false,
            message: 'File upload failed',
            data: null
        };
    }

    let pdfText = '';
    try {
        pdfText = await fetchAndExtractPdfText(fileUrl);
    } catch {
        return {
            success: false,
            message: 'File upload failed',
            data: null
        };
    }

    let summary = '';
    try {
        summary = await generateSummaryFromGemini(pdfText);
    } catch {
        throw new Error('Failed to generate summary! ');
    }

    return summary;
}
