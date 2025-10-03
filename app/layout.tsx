import type { Metadata } from 'next';
import { Roboto_Mono as RobotoMono } from 'next/font/google';
import './globals.css';

const robotoMono = RobotoMono({
    weight: ['200', '300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap'
});

const title = 'Summarizer: AI-powered PDF Summarization';
const description =
    'Save time, boost productivity and extract key insights from PDF documents with just one click. Transform PDF documents into clear, concise summaries instantly with advanced AI technology.';

export const metadata: Metadata = { title, description };

export default function RootLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${robotoMono.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
