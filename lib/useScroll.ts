'use client'
import { useCallback, useEffect, useState } from 'react';

interface UseScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}

export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);

      // Clear previous timeout
      clearTimeout(timeoutId);

      // Set scrolling to false after scroll ends
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = useCallback((options: UseScrollOptions = {}) => {
    window.scrollTo({
      top: 0,
      behavior: options.behavior || 'smooth',
      ...options,
    });
  }, []);

  const scrollToElement = useCallback((
    element: HTMLElement | string,
    options: UseScrollOptions = {}
  ) => {
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element;

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: options.behavior || 'smooth',
        block: options.block || 'start',
        inline: options.inline || 'nearest',
      });
    }
  }, []);

  const scrollToPosition = useCallback((
    position: number,
    options: UseScrollOptions = {}
  ) => {
    window.scrollTo({
      top: position,
      behavior: options.behavior || 'smooth',
    });
  }, []);

  return {
    scrollY,
    isScrolling,
    scrollToTop,
    scrollToElement,
    scrollToPosition,
  };
}; 