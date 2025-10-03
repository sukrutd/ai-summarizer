import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
    const isLoggedIn = false; // Replace with actual authentication logic

    return (
        <header>
            <nav className="container flex items-center justify-between px-2 lg:px-8 py-4 mx-auto">
                <div className="flex">
                    <Link href="/" className="flex items-center gap-1">
                        <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-800 hover:rotate-12 transition duration-200 ease-in-out" />
                        <span className="font-bold text-gray-800">
                            Summarizer
                        </span>
                    </Link>
                </div>
                <div className="flex lg:items-center lg:justify-center gap-4 lg:gap-8">
                    <Link href="/#pricing">Pricing</Link>
                    {isLoggedIn && (
                        <Link href="/dashboard">Your Summaries</Link>
                    )}
                </div>
                <div className="flex lg:justify-end">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-2">
                            <Link href="/upload">Upload a PDF</Link>
                            <div>Pro</div>
                            <Button>User</Button>
                        </div>
                    ) : (
                        <div>
                            <Link href="/sign-in">Sign In</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
