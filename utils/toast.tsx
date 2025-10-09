import React from 'react';
import { toast } from 'sonner';
import { CircleX, CloudUpload, ScanText } from 'lucide-react';

// Toast configurations
export const createToast = {
    error: (title: string, description: string) =>
        toast.error(title, { description, icon: <CircleX size={18} className="text-red-800" /> }),

    uploadInProgress: () =>
        toast('Uploading PDF', {
            description: 'We are uploading your file.',
            icon: <CloudUpload size={18} className="text-blue-800" />
        }),

    parsingInProgress: () =>
        toast('Processing PDF', {
            description: 'AI is analyzing your document.',
            icon: <ScanText size={18} className="text-rose-800" />
        })
};
