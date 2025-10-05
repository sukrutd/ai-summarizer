'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const UploadFormInput: React.FC<UploadFormInputProps> = ({
    onSubmit
}) => {
    return (
        <form className="py-4" onSubmit={onSubmit}>
            <div className="flex items-center gap-2">
                <Input
                    type="file"
                    id="file"
                    name="file"
                    accept="aaplication/pdf"
                    required
                />
                <Button>Upload your PDF</Button>
            </div>
        </form>
    );
};
