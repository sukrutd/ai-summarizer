import React from 'react';
import { BrainCircuit, FileOutput, FileText, MoveRight } from 'lucide-react';

interface Step {
    readonly label: string;
    readonly description: string;
    readonly icon: React.ReactNode;
}

const steps: Step[] = [
    {
        label: 'Upload your PDF',
        description: 'Simply drag and drop your PDF file or click to upload it from your device.',
        icon: <FileText size={64} strokeWidth={1.5} />
    },
    {
        label: 'AI Analysis',
        description: 'Our advanced AI analyzes the content of your PDF to extract key insights.',
        icon: <BrainCircuit size={64} strokeWidth={1.5} />
    },
    {
        label: 'Get Summary',
        description: 'Receive a clear and concise summary of your PDF document.',
        icon: <FileOutput size={64} strokeWidth={1.5} />
    }
];

const StepItem: React.FC<Step> = ({ label, description, icon }) => {
    return (
        <div className="relative p-4 bg-white/5 border-2 border-white/10 rounded-2xl hover:border-rose-800/10 backdrop-blur-xs transition-colors">
            <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex items-center justify-center size-20 rounded-2xl bg-linear-to-r from-rose-800/10 to-rose-200/10 group-hover:from-rose-600/10">
                    <div className="text-rose-800 p-4">{icon}</div>
                </div>
                <h4 className="font-semibold text-lg">{label}</h4>
                <p>{description}</p>
            </div>
        </div>
    );
};

export const HowItWorksSection: React.FC = () => {
    return (
        <section className="mx-auto p-8">
            <div className="p-4 max-w-7xl">
                <div className="text-center mb-8">
                    <h2 className="uppercase mb-4 text-rose-800">How it works?</h2>
                    <h3 className="lg:max-w-4xl mx-auto">
                        Transform any PDF into an easy-to-digest summary in three simple steps
                    </h3>
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-3 max-w-6xl py-6">
                    {steps.map((step, index) => (
                        <div key={index} className="relative flex items-stretch">
                            <StepItem {...step} />
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                    <MoveRight size={32} strokeWidth={1.5} className="text-rose-800" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
