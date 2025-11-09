import React from 'react';
import { toast } from 'sonner';
import { CircleX, CloudUpload, ScanText, CheckCircleIcon, NotepadText } from 'lucide-react';

// Toast configurations
export const createToast = {
    error: (title: string, description: string) =>
        toast.error(title, {
            description: <div className="text-gray-800">{description}</div>,
            icon: <CircleX size={18} className="text-red-800" />
        }),

    uploadInProgress: () =>
        toast('Uploading PDF', {
            description: <div className="text-gray-800">We are uploading your file.</div>,
            icon: <CloudUpload size={18} className="text-blue-800" />
        }),

    uploadSuccess: () =>
        toast('Upload completed successfully', {
            description: (
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <CheckCircleIcon size={18} className="text-green-800" />
                        <div className="text-gray-800">Your file has been uploaded.</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ScanText size={18} className="text-blue-800" />
                        <div className="text-gray-800">AI is now analyzing your document.</div>
                    </div>
                </div>
            )
        }),

    uploadError: () =>
        toast.error('File upload failed', {
            description: <div className="text-gray-800">Please try again or use a different file.</div>,
            icon: <CircleX size={18} className="text-red-800" />
        }),

    summarySaved: () =>
        toast.success('Summary saved successfully', {
            description: <div className="text-gray-800">Your PDF summary has been saved.</div>,
            icon: <NotepadText size={18} className="text-green-800" />
        })
};
