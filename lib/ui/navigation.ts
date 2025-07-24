'use client';

import { useRouter } from 'next/navigation';
import { useLoading } from './loading';

export const useNavigation = () => {
  const router = useRouter();
  const { startLoading } = useLoading();

  const navigate = (href: string, delay: number = 0) => {
    // Start loading immediately
    startLoading();
    
    // Navigate after optional delay
    setTimeout(() => {
      router.push(href);
    }, delay);
  };

  const navigateWithLoading = (href: string, delay: number = 0) => {
    navigate(href, delay);
  };

  return {
    navigate,
    navigateWithLoading,
    router,
  };
};
