// Common action types
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

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// Form states
export type FormState = {
  isSubmitting: boolean;
  errors: Record<string, string>;
  success: boolean;
};

// UI states
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
};

// Navigation types
export type NavigationItem = {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavigationItem[];
};

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// User preferences
export type UserPreferences = {
  theme: Theme;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    updates: boolean;
  };
  reading: {
    autoScroll: boolean;
    pageTransition: 'slide' | 'fade' | 'none';
    readingDirection: 'ltr' | 'rtl';
  };
};

// File upload types
export type FileUpload = {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  url?: string;
};

// API Response types
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    total?: number;
    page?: number;
    limit?: number;
  };
};

// Database operation types
export type DatabaseOperation = 'create' | 'read' | 'update' | 'delete';

// Sort options
export type SortOrder = 'asc' | 'desc';
export type SortBy<T> = keyof T | string;

export type SortOptions<T> = {
  field: SortBy<T>;
  order: SortOrder;
};

// Filter types
export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'like' | 'ilike';

export type Filter<T> = {
  field: keyof T;
  operator: FilterOperator;
  value: unknown;
};

// Query builder types
export type QueryOptions<T> = {
  select?: (keyof T)[];
  where?: Filter<T>[];
  orderBy?: SortOptions<T>;
  limit?: number;
  offset?: number;
  include?: string[];
};

// Permission types
export type Permission = 
  | 'read:titles'
  | 'write:titles'
  | 'delete:titles'
  | 'read:chapters'
  | 'write:chapters'
  | 'delete:chapters'
  | 'read:users'
  | 'write:users'
  | 'delete:users'
  | 'admin:all';

export type Role = 'reader' | 'author' | 'translator' | 'admin';

export type RolePermissions = {
  [K in Role]: Permission[];
};
