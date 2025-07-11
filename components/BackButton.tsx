'use client';

import { useNavigation } from "@/lib/useNavigation";

export const BackButton = () => {
  const { router } = useNavigation();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back"
      className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-zinc-900/80 border border-zinc-700 shadow-lg flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}; 