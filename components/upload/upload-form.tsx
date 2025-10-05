'use client';

import React from 'react';
import { UploadFormInput } from '@/components/upload/upload-form-input';

export const UploadForm: React.FC = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <UploadFormInput onSubmit={handleSubmit} />
        </div>
    );
};
