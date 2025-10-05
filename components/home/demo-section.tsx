import React from 'react';
import { Pizza } from 'lucide-react';

export const DemoSection: React.FC = () => {
    return (
        <section className="mx-auto p-8">
            <div className="p-4 max-w-7xl">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gray-100 border border-gray-400/20">
                        <Pizza className="size-6 text-rose-600" />
                    </div>

                    <h3 className="lg:max-w-4xl text-center">
                        Watch how Summarizer transforms{' '}
                        <span className="bg-linear-to-r from-rose-500 to-rose-800 bg-clip-text text-transparent">
                            this Next.js PDF
                        </span>{' '}
                        into an easy-to-read-summary!
                    </h3>
                </div>

                <div className="flex items-center justify-center">
                    {/* Summary Viewer */}
                </div>
            </div>
        </section>
    );
};
