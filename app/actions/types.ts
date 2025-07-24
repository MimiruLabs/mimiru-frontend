// Common types for all server actions
export type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type PaginationResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type SearchParams = {
  query?: string;
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};
