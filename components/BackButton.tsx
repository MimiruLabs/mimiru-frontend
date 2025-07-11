'use client';

import { useNavigation } from "@/lib/useNavigation";

export const BackButton = () => {
  const { router } = useNavigation();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-6 flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      Back
    </button>
  );
}; 