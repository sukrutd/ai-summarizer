'use client';

import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { UploadFormInput } from '@/components/upload/upload-form-input';
import { generatePdfSummary } from '@/actions/upload-actions';
import { useUploadThing } from '@/utils/uploadthing';
import { createToast } from '@/utils/toast';

// Constants
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_FILE_TYPE = 'application/pdf';

const schema = z.object({
    file: z
        .instanceof(File, { message: 'Invalid file' })
        .refine((file) => file.size <= MAX_FILE_SIZE, 'File size must be less than 20M.')
        .refine((file) => file.type.startsWith(ALLOWED_FILE_TYPE), 'File must be a PDF.')
});

export const UploadForm: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { startUpload } = useUploadThing('pdfUploader', {
        onUploadBegin: () => {
            createToast.uploadInProgress();
        },
        onClientUploadComplete: () => {
            createToast.uploadSuccess();
        },
        onUploadError: () => {
            createToast.uploadError();
        }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;

        // Validate the file using the schema
        const result = schema.safeParse({ file });

        if (!result.success) {
            const errorMessage = result.error.flatten()?.fieldErrors?.file?.[0];
            createToast.error('Something went wrong', errorMessage || 'Invalid file');
            setIsLoading(false);
            return;
        }

        // Start the file upload
        const response = await startUpload([file]);

        if (!response) {
            createToast.uploadError();
            setIsLoading(false);
            return;
        }

        // Notify user that parsing is in progress
        createToast.parsingInProgress();

        // Parse the uploaded PDF and generate a summary using langchain
        const summary = await generatePdfSummary(response);
        console.log({ summary });
        setIsLoading(false);

        // Clear the chosen file from the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <UploadFormInput onSubmit={handleSubmit} isLoading={isLoading} ref={fileInputRef} />
        </div>
    );
};
