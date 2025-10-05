'use client';

import React from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { CircleX, CloudUpload, ScanText } from 'lucide-react';
import { useUploadThing } from '@/utils/uploadthing';
import { UploadFormInput } from '@/components/upload/upload-form-input';

const schema = z.object({
    file: z
        .instanceof(File, { message: 'Invalid file' })
        .refine((file) => file.size <= 20 * 1024 * 1024, 'File size must be less than 20M.')
        .refine((file) => file.type.startsWith('application/pdf'), 'File must be a PDF.')
});

export const UploadForm: React.FC = () => {
    const { startUpload } = useUploadThing('pdfUploader', {
        onClientUploadComplete: () => {
            console.log('Uploaded successfully!');
        },
        onUploadBegin: (fileName) => {
            console.log('Upload has begun for:', fileName);
        },
        onUploadError: (error) => {
            toast.error(`Error occurred while uploading`, {
                description: error.message,
                icon: <CircleX size={18} className="text-red-800" />
            });
        }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;

        // Validate the file using the schema
        const result = schema.safeParse({ file });

        if (!result.success) {
            const errorMessage = z.flattenError(result.error)?.fieldErrors?.file?.[0];
            toast.error('Something went wrong', {
                description: errorMessage || 'Invalid file',
                icon: <CircleX size={18} className="text-red-800" />
            });
            return;
        }

        toast('Uploading PDF', {
            description: 'We are uploading your file.',
            icon: <CloudUpload size={18} className="text-blue-800" />
        });

        // Start the file upload
        const response = await startUpload([file]);

        if (!response) {
            toast.error('Something went wrong', {
                description: 'Please use a different file.',
                icon: <CircleX size={18} className="text-red-800" />
            });
            return;
        }

        toast('Processing PDF', {
            description: 'AI is analyzing your document.',
            icon: <ScanText size={18} className="text-rose-800" />
        });
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <UploadFormInput onSubmit={handleSubmit} />
        </div>
    );
};
