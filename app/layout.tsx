import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';

const montserrat = Montserrat({
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin']
});

const title = 'Summarizer: AI-powered PDF Summarization';
const description =
    'Save time, boost productivity and extract key insights from PDF documents with just one click. Transform PDF documents into clear, concise summaries instantly with advanced AI technology.';

export const metadata: Metadata = { title, description };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${montserrat.className} antialiased`}>
                    <div className="relative flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                    <Toaster expand closeButton position="top-right" offset={64} visibleToasts={3} duration={3000} />
                </body>
            </html>
        </ClerkProvider>
    );
}
