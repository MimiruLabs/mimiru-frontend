'use client';

import React from 'react';
import { useNavigation } from '@/lib/useNavigation';
import { cn } from '@/utils/cn';

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  children,
  className,
  delay = 0,
  onClick,
}) => {
  const { navigateWithLoading } = useNavigation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }
    
    // Navigate with loading
    navigateWithLoading(href, delay);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'transition-colors duration-200 hover:text-white focus:outline-none hover:cursor-pointer',
        className
      )}
    >
      {children}
    </button>
  );
}; 