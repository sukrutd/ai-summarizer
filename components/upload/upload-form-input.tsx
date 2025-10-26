'use client';

import React from 'react';
import { LoaderCircleIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

export const UploadFormInput = React.forwardRef<HTMLInputElement, UploadFormInputProps>(
    ({ onSubmit, isLoading }, ref) => {
        return (
            <form className="py-4" onSubmit={onSubmit}>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <Input
                        ref={ref}
                        id="file"
                        name="file"
                        type="file"
                        accept="application/pdf"
                        disabled={isLoading}
                        required
                    />
                    <Button className="w-full sm:w-auto" disabled={isLoading}>
                        {isLoading && <LoaderCircleIcon size={18} className="text-white animate-spin" />}
                        <span>Upload your PDF</span>
                    </Button>
                </div>
            </form>
        );
    }
);

UploadFormInput.displayName = 'UploadFormInput';
