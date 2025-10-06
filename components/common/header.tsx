'use client';

import React, { useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { NavLink } from '@/components/common/nav-link';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="relative">
            <nav className="container px-2 lg:px-8 py-4 mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex">
                        <NavLink href="/" className="flex items-center gap-1 group">
                            <FileText className="size-6 sm:size-8 text-gray-800 group-hover:rotate-45 group-hover:text-rose-800 transition-all duration-100" />
                            <span className="font-semibold text-gray-800 group-hover:text-rose-800">Summarizer</span>
                        </NavLink>
                    </div>

                    {/* Mobile menu button */}
                    <button className="sm:hidden bg-transparent z-50" onClick={toggleMenu}>
                        {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:justify-center gap-8">
                        <NavLink href="/#pricing">Pricing</NavLink>
                        <SignedIn>
                            <NavLink href="/dashboard">Your Summaries</NavLink>
                        </SignedIn>
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden sm:flex sm:justify-end">
                        <SignedIn>
                            <div className="flex items-center gap-4">
                                <NavLink href="/upload">Upload PDF</NavLink>
                                <div>Pro</div>
                                <UserButton />
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <div>
                                <NavLink href="/sign-in">Sign In</NavLink>
                            </div>
                        </SignedOut>
                    </div>

                    {/* Mobile Navigation */}
                    <div
                        className={`
                        sm:hidden fixed inset-0 bg-gray-100 shadow-[0_0_50px_rgba(0,0,0,0.15)] backdrop-blur-xs z-40 transform transition-transform duration-300 ease-in-out
                        ${isMenuOpen ? 'translate-x-1/2' : 'translate-x-full'}
                    `}
                    >
                        <div className="flex flex-col items-start justify-items-start h-full gap-4 mx-8 my-16">
                            <SignedOut>
                                <NavLink href="/sign-in" onClick={toggleMenu}>
                                    Sign In
                                </NavLink>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                                <div>Pro</div>
                                <NavLink href="/dashboard" onClick={toggleMenu}>
                                    Your Summaries
                                </NavLink>
                                <NavLink href="/upload" onClick={toggleMenu}>
                                    Upload PDF
                                </NavLink>
                            </SignedIn>
                            <NavLink href="/#pricing" onClick={toggleMenu}>
                                Pricing
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
