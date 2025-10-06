import React from 'react';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const UploadHeader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-2">
                <Badge
                    variant="outline"
                    className="border-rose-800 bg-white text-rose-800 hover:bg-gradient-to-r hover:from-rose-100 hover:to-rose-300 px-6 py-2 border-2 rounded-full transition-colors duration-200 "
                >
                    <div className="flex items-center">
                        <Sparkles className="size-6 mr-2 animate-pulse" />
                        <p className="text-base">AI-Powered Content Creation</p>
                    </div>
                </Badge>
            </div>

            <h1>Start uploading your PDFs</h1>

            <p className="text-center max-w-2xl text-muted-foreground leading-relaxed m-4">
                Upload your PDF and let our AI do the magic!
            </p>
        </div>
    );
};
