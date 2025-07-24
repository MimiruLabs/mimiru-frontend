'use client';

import { useState, useEffect } from 'react';
import { 
  getTitles, 
  getTitleById, 
  getTitlesPaginated,
  getTitlesByStatus,
  searchTitles,
  createTitle,
  updateTitle,
  deleteTitle
} from '@/app/actions/titles.actions';
import { Title } from '@/types/db';
import { ActionResult, PaginationResult } from '@/app/actions/types';

// Hook for fetching all titles
export function useTitles() {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTitles = async () => {
    setLoading(true);
    setError(null);
    
    const result = await getTitles();
    
    if (result.success) {
      setTitles(result.data || []);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchTitles();
  }, []);

  return {
    titles,
    loading,
    error,
    refetch: fetchTitles,
  };
}

// Hook for fetching a single title
export function useTitle(id: number | null) {
  const [title, setTitle] = useState<Title | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTitle = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    const result = await getTitleById(id);
    
    if (result.success) {
      setTitle(result.data || null);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchTitle();
  }, [id]);

  return {
    title,
    loading,
    error,
    refetch: fetchTitle,
  };
}

// Hook for paginated titles
export function usePaginatedTitles(initialPage: number = 1, limit: number = 10) {
  const [data, setData] = useState<PaginationResult<Title> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const fetchTitles = async (page: number) => {
    setLoading(true);
    setError(null);
    
    const result = await getTitlesPaginated(page, limit);
    
    if (result.success) {
      setData(result.data || null);
      setCurrentPage(page);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchTitles(currentPage);
  }, [currentPage, limit]);

  const goToPage = (page: number) => {
    if (page > 0 && (!data || page <= data.totalPages)) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (data && currentPage < data.totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return {
    data,
    loading,
    error,
    currentPage,
    goToPage,
    nextPage,
    prevPage,
    refetch: () => fetchTitles(currentPage),
  };
}

// Hook for titles by status
export function useTitlesByStatus(status: 'ongoing' | 'completed' | 'hiatus') {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTitles = async () => {
    setLoading(true);
    setError(null);
    
    const result = await getTitlesByStatus(status);
    
    if (result.success) {
      setTitles(result.data || []);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchTitles();
  }, [status]);

  return {
    titles,
    loading,
    error,
    refetch: fetchTitles,
  };
}

// Hook for searching titles
export function useSearchTitles() {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const search = async (searchQuery: string) => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
    }
    
    if (!searchQuery.trim()) {
      setTitles([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const result = await searchTitles(searchQuery);
    
    if (result.success) {
      setTitles(result.data || []);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  const clearSearch = () => {
    setQuery('');
    setTitles([]);
    setError(null);
  };

  return {
    titles,
    loading,
    error,
    query,
    search,
    clearSearch,
  };
}

// Hook for creating titles
export function useCreateTitle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (titleData: Omit<Title, 'id'>) => {
    setLoading(true);
    setError(null);
    
    const result = await createTitle(titleData);
    
    setLoading(false);
    
    if (!result.success) {
      setError(result.error || 'Failed to create title');
      return null;
    }
    
    return result.data;
  };

  return { create, loading, error };
}

// Hook for updating titles
export function useUpdateTitle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: number, titleData: Partial<Omit<Title, 'id' | 'created_at'>>) => {
    setLoading(true);
    setError(null);
    
    const result = await updateTitle(id, titleData);
    
    setLoading(false);
    
    if (!result.success) {
      setError(result.error || 'Failed to update title');
      return null;
    }
    
    return result.data;
  };

  return { update, loading, error };
}

// Hook for deleting titles
export function useDeleteTitle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItem = async (id: number) => {
    setLoading(true);
    setError(null);
    
    const result = await deleteTitle(id);
    
    setLoading(false);
    
    if (!result.success) {
      setError(result.error || 'Failed to delete title');
      return false;
    }
    
    return true;
  };

  return { delete: deleteItem, loading, error };
}
