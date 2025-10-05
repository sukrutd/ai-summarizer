import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CallToActionSection: React.FC = () => {
    return (
        <section className="mx-auto p-8">
            <div className="p-4 max-w-7xl">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <h2 className="tracking-tight">
                        Ready to save hours of reading time?
                    </h2>
                    <p className="text-center max-w-2xl text-muted-foreground leading-relaxed">
                        Transform lengthy documents into clear, actionable
                        insights with our AI-powered summarizer.
                    </p>
                    <div>
                        <Button
                            variant={'link'}
                            className="text-white text-base lg:text-lg px-8 py-6 rounded-full bg-linear-to-r from-slate-900 to-rose-600 hover:from-rose-600 hover:to-slate-900 hover:no-underline transition-colors duration-200"
                        >
                            <Link
                                href="/#pricing"
                                className="flex items-center gap-2"
                            >
                                <span>Get Started</span>
                                <ArrowRight className="size-6 animate-pulse" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
