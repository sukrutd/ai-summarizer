import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/common/nav-link';

export const Header: React.FC = () => {
    const isLoggedIn = false; // Replace with actual authentication logic

    return (
        <header>
            <nav className="container flex items-center justify-between px-2 lg:px-8 py-4 mx-auto">
                <div className="flex">
                    <NavLink href="/" className="flex items-center gap-1 group">
                        <FileText className="size-6 lg:size-8 text-gray-800 group-hover:rotate-45 group-hover:text-rose-800 transition-all duration-100" />
                        <span className="font-semibold text-gray-800 group-hover:text-rose-800">
                            Summarizer
                        </span>
                    </NavLink>
                </div>
                <div className="flex lg:items-center lg:justify-center gap-4 lg:gap-8">
                    <NavLink href="/#pricing">Pricing</NavLink>
                    {isLoggedIn && (
                        <NavLink href="/dashboard">Your Summaries</NavLink>
                    )}
                </div>
                <div className="flex lg:justify-end">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-2">
                            <NavLink href="/upload">Upload a PDF</NavLink>
                            <div>Pro</div>
                            <Button>User</Button>
                        </div>
                    ) : (
                        <div>
                            <NavLink href="/sign-in">Sign In</NavLink>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};
