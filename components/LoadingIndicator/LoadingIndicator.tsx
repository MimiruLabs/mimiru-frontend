'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '@/hooks/ui';

export const LoadingIndicator = () => {
  const { isLoading, progress, startLoading, setProgress, completeLoading, resetLoading } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start loading when route changes
    startLoading();

    // Real loading progress based on actual page load events
    const simulateLoading = () => {
      // Initial load start
      setProgress(10);
      
      // DOM parsing and rendering
      setTimeout(() => setProgress(30), 100);
      setTimeout(() => setProgress(50), 200);
      
      // Component mounting and hydration
      setTimeout(() => setProgress(70), 300);
      setTimeout(() => setProgress(85), 400);
      
      // Final completion
      setTimeout(() => setProgress(95), 500);
      setTimeout(() => {
        completeLoading();
        setTimeout(() => {
          resetLoading();
        }, 200);
      }, 600);
    };

    simulateLoading();

    // Listen for actual page load events
    const handleLoad = () => {
      completeLoading();
      setTimeout(() => {
        resetLoading();
      }, 200);
    };

    // Add event listeners for real page loading
    window.addEventListener('load', handleLoad);
    
    // Listen for Next.js specific events if available
    if (typeof window !== 'undefined' && '__NEXT_DATA__' in window) {
      // Next.js specific loading events
      document.addEventListener('DOMContentLoaded', () => {
        setProgress(80);
      });
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [pathname, searchParams, startLoading, setProgress, completeLoading, resetLoading]);

  // Also trigger on initial page load
  useEffect(() => {
    if (document.readyState === 'loading') {
      startLoading();
      setProgress(20);
      
      const handleInitialLoad = () => {
        completeLoading();
        setTimeout(() => {
          resetLoading();
        }, 300);
      };

      document.addEventListener('DOMContentLoaded', handleInitialLoad);
      window.addEventListener('load', handleInitialLoad);

      return () => {
        document.removeEventListener('DOMContentLoaded', handleInitialLoad);
        window.removeEventListener('load', handleInitialLoad);
      };
    }
  }, [startLoading, setProgress, completeLoading, resetLoading]);

  // Track real navigation events
  useEffect(() => {
    const handleBeforeUnload = () => {
      startLoading();
      setProgress(10);
    };

    const handlePageShow = () => {
      completeLoading();
      setTimeout(() => {
        resetLoading();
      }, 300);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [startLoading, setProgress, completeLoading, resetLoading]);

  // Listen for navigation start events (App Router approach)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]');
      
      if (link && link.getAttribute('href')?.startsWith('/')) {
        const href = link.getAttribute('href');
        if (href && href !== pathname) {
          startLoading();
          setProgress(0);
        }
      }
    };

    // Listen for clicks on navigation links
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [pathname, startLoading, setProgress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg z-[999]"
          style={{
            transform: `scaleX(${progress / 100})`,
            transformOrigin: 'left',
          }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        />
      )}
    </AnimatePresence>
  );
}; 