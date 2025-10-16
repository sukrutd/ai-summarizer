'use server';

import { ClientUploadedFileData } from 'uploadthing/types';
import { fetchAndExtractPdfText } from '@/utils/langchain';

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

    try {
        const pdfText = await fetchAndExtractPdfText(fileUrl);
        console.log('Extracted PDF Text:', pdfText);
    } catch {
        return {
            success: false,
            message: 'File upload failed',
            data: null
        };
    }
}
