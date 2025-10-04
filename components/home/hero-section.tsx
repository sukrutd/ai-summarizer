import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => {
    return (
        <section className="mx-auto flex flex-col items-center justify-center px-8 py-16 max-w-7xl">
            <Badge
                variant="outline"
                className="border-rose-800 bg-white text-rose-800 hover:bg-gradient-to-r hover:from-rose-100 hover:to-rose-300 px-6 py-2 border-2 rounded-full transition-colors duration-200"
            >
                <div className="flex items-center">
                    <Sparkles className="size-6 mr-2 animate-pulse" />
                    <p className="text-base">Powered by AI</p>
                </div>
            </Badge>

            <h1 className="py-2 text-center">
                Transform PDF documents into concise summaries instantly!
            </h1>

            <h2 className="py-2 px-4 lg:px-0 lg:max-w-4xl text-center text-gray-800">
                Extract key insights and get a beautiful summary reel of the
                document in seconds.
            </h2>

            <div className="py-2">
                <Button
                    variant={'link'}
                    className="text-white text-base lg:text-lg px-8 lg:px-12 py-6 rounded-full bg-linear-to-r from-slate-900 to-rose-600 hover:from-rose-600 hover:to-slate-900 hover:no-underline transition-colors duration-200"
                >
                    <Link href="/#pricing" className="flex items-center gap-2">
                        <span>Try Summarizer</span>
                        <ArrowRight className="size-6 animate-pulse" />
                    </Link>
                </Button>
            </div>
        </section>
    );
};
