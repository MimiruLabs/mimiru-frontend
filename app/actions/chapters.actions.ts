'use server';

import { chaptersRepository } from '@/lib/supabase/repositories/chapters.repository';
import { Chapter } from '@/types/db';
import { revalidatePath } from 'next/cache';
import { ActionResult } from './types';

export async function getChaptersByTitleVersion(
  titleVersionId: number
): Promise<ActionResult<Chapter[]>> {
  try {
    if (!titleVersionId || titleVersionId <= 0) {
      return { success: false, error: 'Invalid title version ID' };
    }

    const chapters = await chaptersRepository.findByTitleVersion(titleVersionId);
    return { success: true, data: chapters };
  } catch (error) {
    console.error('Get chapters by title version error:', error);
    return { success: false, error: 'Failed to fetch chapters' };
  }
}

export async function getChapterById(id: number): Promise<ActionResult<Chapter | null>> {
  try {
    if (!id || id <= 0) {
      return { success: false, error: 'Invalid chapter ID' };
    }

    const chapter = await chaptersRepository.findById(id);
    return { success: true, data: chapter };
  } catch (error) {
    console.error('Get chapter error:', error);
    return { success: false, error: 'Failed to fetch chapter' };
  }
}

type ChapterWithPages = Chapter & {
  pages?: Array<{
    id: number;
    page_number: number;
    image_url: string;
  }>;
};

export async function getChapterWithPages(id: number): Promise<ActionResult<ChapterWithPages>> {
  try {
    if (!id || id <= 0) {
      return { success: false, error: 'Invalid chapter ID' };
    }

    const chapter = await chaptersRepository.findWithPages(id);
    if (!chapter) {
      return { success: false, error: 'Chapter not found' };
    }
    return { success: true, data: chapter };
  } catch (error) {
    console.error('Get chapter with pages error:', error);
    return { success: false, error: 'Failed to fetch chapter with pages' };
  }
}

export async function getNextChapter(
  titleVersionId: number,
  currentChapterNumber: number
): Promise<ActionResult<Chapter | null>> {
  try {
    if (!titleVersionId || titleVersionId <= 0) {
      return { success: false, error: 'Invalid title version ID' };
    }

    if (currentChapterNumber < 0) {
      return { success: false, error: 'Invalid chapter number' };
    }

    const chapter = await chaptersRepository.findNext(titleVersionId, currentChapterNumber);
    return { success: true, data: chapter };
  } catch (error) {
    console.error('Get next chapter error:', error);
    return { success: false, error: 'Failed to fetch next chapter' };
  }
}

export async function getPreviousChapter(
  titleVersionId: number,
  currentChapterNumber: number
): Promise<ActionResult<Chapter | null>> {
  try {
    if (!titleVersionId || titleVersionId <= 0) {
      return { success: false, error: 'Invalid title version ID' };
    }

    if (currentChapterNumber <= 0) {
      return { success: false, error: 'Invalid chapter number' };
    }

    const chapter = await chaptersRepository.findPrevious(titleVersionId, currentChapterNumber);
    return { success: true, data: chapter };
  } catch (error) {
    console.error('Get previous chapter error:', error);
    return { success: false, error: 'Failed to fetch previous chapter' };
  }
}

export async function getLatestChapters(limit: number = 10): Promise<ActionResult<Chapter[]>> {
  try {
    if (limit <= 0 || limit > 50) {
      return { success: false, error: 'Limit must be between 1 and 50' };
    }

    const chapters = await chaptersRepository.findLatest(limit);
    return { success: true, data: chapters };
  } catch (error) {
    console.error('Get latest chapters error:', error);
    return { success: false, error: 'Failed to fetch latest chapters' };
  }
}

export async function createChapter(chapterData: Omit<Chapter, 'id'>): Promise<ActionResult<Chapter>> {
  try {
    // Business logic: validation
    if (!chapterData.title_version_id || chapterData.title_version_id <= 0) {
      return { success: false, error: 'Invalid title version ID' };
    }

    if (!chapterData.chapter_number || chapterData.chapter_number <= 0) {
      return { success: false, error: 'Chapter number must be greater than 0' };
    }

    if (chapterData.title && chapterData.title.trim().length > 255) {
      return { success: false, error: 'Chapter title must be less than 255 characters' };
    }

    // Set timestamps
    const now = new Date().toISOString();
    const newChapter = await chaptersRepository.create({
      ...chapterData,
      title: chapterData.title?.trim() || undefined,
      created_at: now,
      updated_at: now,
    });

    // Revalidate relevant pages
    revalidatePath('/dashboard/chapters');
    revalidatePath(`/dashboard/title-versions/${chapterData.title_version_id}`);
    
    return { success: true, data: newChapter };
  } catch (error) {
    console.error('Create chapter error:', error);
    return { success: false, error: 'Failed to create chapter' };
  }
}

export async function updateChapter(
  id: number,
  chapterData: Partial<Omit<Chapter, 'id' | 'created_at'>>
): Promise<ActionResult<Chapter>> {
  try {
    if (!id || id <= 0) {
      return { success: false, error: 'Invalid chapter ID' };
    }

    // Business logic: validation
    if (chapterData.chapter_number !== undefined && chapterData.chapter_number <= 0) {
      return { success: false, error: 'Chapter number must be greater than 0' };
    }

    if (chapterData.title !== undefined && chapterData.title && chapterData.title.trim().length > 255) {
      return { success: false, error: 'Chapter title must be less than 255 characters' };
    }

    // Set update timestamp
    const updatedChapter = await chaptersRepository.update(id, {
      ...chapterData,
      title: chapterData.title?.trim() || undefined,
      updated_at: new Date().toISOString(),
    });

    // Revalidate relevant pages
    revalidatePath('/dashboard/chapters');
    revalidatePath(`/dashboard/chapters/${id}`);
    
    return { success: true, data: updatedChapter };
  } catch (error) {
    console.error('Update chapter error:', error);
    return { success: false, error: 'Failed to update chapter' };
  }
}

export async function deleteChapter(id: number): Promise<ActionResult<void>> {
  try {
    if (!id || id <= 0) {
      return { success: false, error: 'Invalid chapter ID' };
    }

    await chaptersRepository.delete(id);

    // Revalidate relevant pages
    revalidatePath('/dashboard/chapters');
    
    return { success: true };
  } catch (error) {
    console.error('Delete chapter error:', error);
    return { success: false, error: 'Failed to delete chapter' };
  }
}
