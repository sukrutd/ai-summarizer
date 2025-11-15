/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { ClientUploadedFileData } from 'uploadthing/types';
import { fetchAndExtractPdfText } from '@/utils/langchain';
import { generateSummaryFromGemini } from '@/utils/gemini-ai';
import { formatFileNameAsTitle } from '@/utils/format-utils';
import { getDatabaseConnection } from '@/lib/db';

type UploadResponse = ClientUploadedFileData<{ userId: string; file: { name: string; url: string } }>[];

interface ProcessResult {
    success: boolean;
    message: string;
    data?: Record<string, any>;
}

const createSuccessResponse = (data: Record<string, any>, message: string): ProcessResult => ({
    success: true,
    message,
    data
});

const createErrorResponse = (message: string): ProcessResult => ({ success: false, message });

interface PdfSummary {
    userId?: string;
    fileName: string;
    fileUrl: string;
    summary: string;
    title: string;
}

export async function generatePdfSummaryAction(uploadResponse?: UploadResponse): Promise<ProcessResult> {
    // Early return if no upload response
    if (!uploadResponse) {
        return createErrorResponse('Failed to upload file.');
    }

    const { serverData: { file: { url: fileUrl, name: fileName } = {} } = {} } = uploadResponse[0];

    // Early return if no file name or URL
    if (!fileName || !fileUrl) {
        return createErrorResponse('Failed to upload file.');
    }

    try {
        // Extract text from PDF
        const pdfText = await fetchAndExtractPdfText(fileUrl);

        // Generate summary using Gemini AI
        const summary = await generateSummaryFromGemini(pdfText);

        // Format title from file name
        const title = formatFileNameAsTitle(fileName);

        return createSuccessResponse({ summary, title, fileUrl, fileName }, 'Summary generated successfully.');
    } catch {
        return createErrorResponse('Failed to generate summary.');
    }
}

async function savePdfSummary({ userId, fileName, fileUrl, summary, title }: PdfSummary) {
    try {
        const sql = await getDatabaseConnection();
        return await sql`INSERT INTO pdf_summaries (
                user_id,
                original_file_url,
                file_name,
                summary,
                title
            ) VALUES (
                ${userId},
                ${fileUrl},
                ${fileName},
                ${summary},
                ${title}
            )
        `;
    } catch (error) {
        console.log('Error saving PDF summary:', error);
    }
}

export async function storePdfSummaryAction({ fileName, fileUrl, summary, title }: PdfSummary): Promise<ProcessResult> {
    let savedSummary: any;

    try {
        const { userId } = await auth();
        if (!userId) {
            return createErrorResponse('User not found.');
        }

        savedSummary = await savePdfSummary({ userId, fileName, fileUrl, summary, title });
        if (!savedSummary) {
            return createErrorResponse('Failed to save PDF summary.');
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to save PDF summary.';
        return createErrorResponse(errorMessage);
    }

    // Revalidate the cache
    revalidatePath(`/summaries/${savedSummary.id}`);

    return createSuccessResponse(savedSummary, 'PDF summary saved successfully.');
}
