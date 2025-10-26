import React from 'react';
import { toast } from 'sonner';
import { CircleX, CloudUpload, ScanText, CheckCircleIcon } from 'lucide-react';

// Toast configurations
export const createToast = {
    error: (title: string, description: string) =>
        toast.error(title, { description, icon: <CircleX size={18} className="text-red-800" /> }),

    uploadInProgress: () =>
        toast('Uploading PDF', {
            description: 'We are uploading your file.',
            icon: <CloudUpload size={18} className="text-blue-800" />
        }),

    uploadSuccess: () =>
        toast('Upload completed successfully', {
            description: 'Your file has been uploaded.',
            icon: <CheckCircleIcon size={18} className="text-green-800" />
        }),

    uploadError: () =>
        toast.error('File upload failed.', {
            description: 'Please try again or use a different file.',
            icon: <CircleX size={18} className="text-red-800" />
        }),

    parsingInProgress: () =>
        toast('Processing PDF', {
            description: 'AI is analyzing your document.',
            icon: <ScanText size={18} className="text-blue-800" />
        })
};
