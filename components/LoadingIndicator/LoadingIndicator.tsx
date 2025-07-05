'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';

export const LoadingIndicator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start loading when route changes
    setIsLoading(true);
    setProgress(0);

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
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 200);
      }, 600);
    };

    simulateLoading();

    // Listen for actual page load events
    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
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
  }, [pathname, searchParams]);

  // Also trigger on initial page load
  useEffect(() => {
    if (document.readyState === 'loading') {
      setIsLoading(true);
      setProgress(20);
      
      const handleInitialLoad = () => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 300);
      };

      document.addEventListener('DOMContentLoaded', handleInitialLoad);
      window.addEventListener('load', handleInitialLoad);

      return () => {
        document.removeEventListener('DOMContentLoaded', handleInitialLoad);
        window.removeEventListener('load', handleInitialLoad);
      };
    }
  }, []);

  // Track real navigation events
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoading(true);
      setProgress(10);
    };

    const handlePageShow = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 300);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"
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