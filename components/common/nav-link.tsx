'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
    readonly href: string;
    readonly children: React.ReactNode;
    readonly className?: string;
    readonly onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children, className, onClick }) => {
    const pathname = usePathname();
    const isActive = href !== '/' && pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                'text-sm sm:text-base text-gray-600 font-medium hover:text-rose-800 hover:font-semibold transition-all duration-200',
                className,
                isActive && 'text-rose-800 font-semibold'
            )}
        >
            {children}
        </Link>
    );
};
