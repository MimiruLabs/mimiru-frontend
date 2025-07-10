'use client';

import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  progress: number;
  startLoading: () => void;
  setProgress: (progress: number) => void;
  completeLoading: () => void;
  resetLoading: () => void;
}

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  progress: 0,
  startLoading: () => set({ isLoading: true, progress: 0 }),
  setProgress: (progress: number) => set({ progress }),
  completeLoading: () => set({ progress: 100 }),
  resetLoading: () => set({ isLoading: false, progress: 0 }),
})); 