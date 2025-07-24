// Re-export database types
export type * from '@/types/db';

// Re-export common types  
export type * from './common';

// Hook return types
export type UseQueryResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export type UseMutationResult<T, K = unknown> = {
  mutate: (data: K) => Promise<T | null>;
  loading: boolean;
  error: string | null;
};

export type UsePaginationResult<T> = {
  data: {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  refetch: () => Promise<void>;
};

// Component prop types
export type WithChildren<T = Record<string, unknown>> = T & {
  children?: React.ReactNode;
};

export type WithClassName<T = Record<string, unknown>> = T & {
  className?: string;
};
