'use client';

import { useState, useEffect } from 'react';
import { 
  getChaptersByTitleVersion,
  getChapterById,
  getChapterWithPages,
  getNextChapter,
  getPreviousChapter,
  getLatestChapters,
  createChapter,
  updateChapter,
  deleteChapter
} from '@/app/actions/chapters.actions';
import { Chapter } from '@/types/db';

// Hook for fetching chapters by title version
export function useChaptersByTitleVersion(titleVersionId: number | null) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChapters = async () => {
    if (!titleVersionId) return;
    
    setLoading(true);
    setError(null);
    
    const result = await getChaptersByTitleVersion(titleVersionId);
    
    if (result.success) {
      setChapters(result.data || []);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchChapters();
  }, [titleVersionId]);

  return {
    chapters,
    loading,
    error,
    refetch: fetchChapters,
  };
}

// Hook for fetching a single chapter
export function useChapter(id: number | null) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChapter = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    const result = await getChapterById(id);
    
    if (result.success) {
      setChapter(result.data || null);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchChapter();
  }, [id]);

  return {
    chapter,
    loading,
    error,
    refetch: fetchChapter,
  };
}

// Hook for fetching chapter with pages
export function useChapterWithPages(id: number | null) {
  const [chapter, setChapter] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChapter = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    const result = await getChapterWithPages(id);
    
    if (result.success) {
      setChapter(result.data || null);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchChapter();
  }, [id]);

  return {
    chapter,
    loading,
    error,
    refetch: fetchChapter,
  };
}

// Hook for chapter navigation
export function useChapterNavigation(
  titleVersionId: number | null,
  currentChapterNumber: number | null
) {
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);
  const [prevChapter, setPrevChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNavigation = async () => {
    if (!titleVersionId || currentChapterNumber === null) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [nextResult, prevResult] = await Promise.all([
        getNextChapter(titleVersionId, currentChapterNumber),
        getPreviousChapter(titleVersionId, currentChapterNumber)
      ]);
      
      setNextChapter(nextResult.success ? (nextResult.data || null) : null);
      setPrevChapter(prevResult.success ? (prevResult.data || null) : null);
      
      if (!nextResult.success || !prevResult.success) {
        setError('Failed to fetch navigation data');
      }
    } catch (err) {
      setError('Failed to fetch navigation data');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchNavigation();
  }, [titleVersionId, currentChapterNumber]);

  return {
    nextChapter,
    prevChapter,
    loading,
    error,
    refetch: fetchNavigation,
  };
}

// Hook for latest chapters
export function useLatestChapters(limit: number = 10) {
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChapters = async () => {
    setLoading(true);
    setError(null);
    
    const result = await getLatestChapters(limit);
    
    if (result.success) {
      setChapters(result.data || []);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchChapters();
  }, [limit]);

  return {
    chapters,
    loading,
    error,
    refetch: fetchChapters,
  };
}

// Hook for creating chapters
export function useCreateChapter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (chapterData: Omit<Chapter, 'id'>) => {
    setLoading(true);
    setError(null);
    
    const result = await createChapter(chapterData);
    
    setLoading(false);
    
    if (!result.success) {
      setError(result.error || 'Failed to create chapter');
      return null;
    }
    
    return result.data;
  };

  return { create, loading, error };
}

// Hook for updating chapters
export function useUpdateChapter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: number, chapterData: Partial<Omit<Chapter, 'id' | 'created_at'>>) => {
    setLoading(true);
    setError(null);
    
    const result = await updateChapter(id, chapterData);
    
    setLoading(false);
    
    if (!result.success) {
      setError(result.error || 'Failed to update chapter');
      return null;
    }
    
    return result.data;
  };

  return { update, loading, error };
}

// Hook for deleting chapters
export function useDeleteChapter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteItem = async (id: number) => {
    setLoading(true);
    setError(null);
    
    const result = await deleteChapter(id);
    
    setLoading(false);
    
    if (!result.success) {
      setError(result.error || 'Failed to delete chapter');
      return false;
    }
    
    return true;
  };

  return { delete: deleteItem, loading, error };
}
