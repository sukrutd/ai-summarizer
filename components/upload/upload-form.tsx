'use client';

import React from 'react';
import { z } from 'zod';
import { useUploadThing } from '@/utils/uploadthing';
import { UploadFormInput } from '@/components/upload/upload-form-input';

const schema = z.object({
    file: z
        .instanceof(File, { message: 'Invalid file' })
        .refine(
            (file) => file.size <= 20 * 1024 * 1024,
            'File size must be less than 20M.'
        )
        .refine(
            (file) => file.type.startsWith('application/pdf'),
            'File must be a PDF.'
        )
});

export const UploadForm: React.FC = () => {
    const { startUpload } = useUploadThing('pdfUploader', {
        onClientUploadComplete: () => {
            console.log('uploaded successfully!');
        },
        onUploadBegin: (fileName) => {
            console.log('upload has begun for', fileName);
        },
        onUploadError: (error) => {
            console.log('error occurred while uploading', error);
        }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;

        // Validate the file using the schema
        const result = schema.safeParse({ file });

        if (!result.success) {
            const errorMessage =
                z.flattenError(result.error)?.fieldErrors?.file?.[0] ||
                'Invalid file';
            console.log(errorMessage);
            return;
        }

        // Start the upload
        const response = await startUpload([file]);

        if (!response) {
            return;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <UploadFormInput onSubmit={handleSubmit} />
        </div>
    );
};
