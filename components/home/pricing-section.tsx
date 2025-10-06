import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingPlan {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly price: number;
    readonly items: string[];
    readonly paymentLink?: string;
}

const pricingPlans: PricingPlan[] = [
    {
        id: 'basic',
        name: 'Basic',
        description: 'Perfect for occasional use',
        price: 5,
        items: ['5 PDF summaries per month', 'Standard processing speed', 'Email support', 'Plain text export'],
        paymentLink: 'https://www.buymeacoffee.com'
    },
    {
        id: 'pro',
        name: 'Pro',
        description: 'For professionals and teams',
        price: 20,
        items: ['Unlimited PDF summaries', 'Priority processing', '24/7 support', 'Markdown export'],
        paymentLink: 'https://www.buymeacoffee.com'
    }
];

const PricingCard: React.FC<PricingPlan> = ({ id, name, description, price, items, paymentLink }) => {
    return (
        <div
            className={cn(
                'relative lg:flex-1 p-4 border-2 border-gray-600 rounded-2xl hover:scale-105 hover:transition-all duration-200',
                id === 'pro' && 'border-rose-800'
            )}
        >
            <div className="flex flex-col gap-4 lg:gap-8">
                <div className="flex flex-col">
                    <p className="text-xl font-medium capitalize">{name}</p>
                    <p className="text-base mt-2">{description}</p>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-3xl tracking-tight font-semibold">${price}</p>
                    <div className="flex flex-col justify-end">
                        <div className="text-sm uppercase font-semibold">USD</div>
                        <div className="text-sm">/month</div>
                    </div>
                </div>

                <div className="text-base leading-relaxed space-y-2">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-1 whitespace-nowrap">
                            <CheckIcon size={18} className={id === 'pro' ? 'text-rose-800' : 'text-green-800'} />
                            <span>{item}</span>
                        </li>
                    ))}
                </div>

                {paymentLink && (
                    <div className="flex items-center justify-center space-y-2">
                        <Link
                            href={paymentLink}
                            className="w-full rounded-full flex items-center justify-center bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-00 hover:to-rose-800 text-white transition-colors font-medium px-4 py-2"
                        >
                            <span>Buy Now</span>
                            <ArrowRight size={18} className="mx-1" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export const PricingSection: React.FC = () => {
    return (
        <section className="mx-auto p-8">
            <div className="max-w-5xl xl:max-w-6xl">
                <h2 className="text-rose-800 text-center uppercase mb-8">Pricing</h2>
                <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8">
                    {pricingPlans.map((plan) => (
                        <PricingCard key={plan.id} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};
