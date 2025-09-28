import type { Metadata } from 'next';
import { Source_Sans_3 as FontSans } from 'next/font/google';
import './globals.css';

const fontSans = FontSans({
    variable: '--font-sans',
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'Summarizer: AI-powered PDF Summarization',
    description:
        'Save time, boost productivity and extract key insights from PDF documents with just one click. Transform PDF documents into clear, concise summaries instantly with advanced AI technology.'
};

export default function RootLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${fontSans.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
