'use client';

import { useEffect, useState } from 'react';
import { useScroll } from '@/lib/useScroll';
import { AnimatedContainer } from '@/components/AnimatedContainer';

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

export const ScrollToTop = ({ threshold = 300, className = '' }: ScrollToTopProps) => {
  const { scrollY, scrollToTop } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(scrollY > threshold);
  }, [scrollY, threshold]);

  return (
    <AnimatedContainer
      className="fixed bottom-6 right-6 z-50"
      delay={0}
      duration={0.3}
      direction="up"
      show={isVisible}
    >
      <button
        onClick={() => scrollToTop()}
        className={`
          w-12 h-12 rounded-full
          bg-zinc-800 hover:bg-zinc-700
          text-zinc-100 hover:text-white
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          transform hover:scale-110
          focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950
          ${className}
        `}
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </AnimatedContainer>
  );
}; 