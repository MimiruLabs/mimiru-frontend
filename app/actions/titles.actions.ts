'use server';

import { titlesRepository } from '@/lib/supabase/repositories/titles.repository';
import { Title } from '@/types/db';
import { revalidatePath } from 'next/cache';
import { ActionResult, PaginationResult } from './types';

export async function getTitles(): Promise<ActionResult<Title[]>> {
  try {
    const titles = await titlesRepository.findAll();
    return { success: true, data: titles };
  } catch (error) {
    console.error('Get titles error:', error);
    return { success: false, error: 'Failed to fetch titles' };
  }
}

export async function getTitleById(id: number): Promise<ActionResult<Title | null>> {
  try {
    if (!id || id <= 0) {
      return { success: false, error: 'Invalid title ID' };
    }

    const title = await titlesRepository.findById(id);
    return { success: true, data: title };
  } catch (error) {
    console.error('Get title error:', error);
    return { success: false, error: 'Failed to fetch title' };
  }
}

export async function getTitlesPaginated(
  page: number = 1, 
  limit: number = 10
): Promise<ActionResult<PaginationResult<Title>>> {
  try {
    if (page <= 0 || limit <= 0) {
      return { success: false, error: 'Invalid pagination parameters' };
    }

    const result = await titlesRepository.findPaginated(page, limit);
    const totalPages = Math.ceil(result.total / limit);
    
    return { 
      success: true, 
      data: {
        ...result,
        page,
        limit,
        totalPages
      }
    };
  } catch (error) {
    console.error('Get paginated titles error:', error);
    return { success: false, error: 'Failed to fetch paginated titles' };
  }
}

export async function getTitlesByStatus(
  status: 'ongoing' | 'completed' | 'hiatus'
): Promise<ActionResult<Title[]>> {
  try {
    const titles = await titlesRepository.findByStatus(status);
    return { success: true, data: titles };
  } catch (error) {
    console.error('Get titles by status error:', error);
    return { success: false, error: 'Failed to fetch titles by status' };
  }
}

export async function searchTitles(query: string): Promise<ActionResult<Title[]>> {
  try {
    if (!query || query.trim().length < 2) {
      return { success: false, error: 'Search query must be at least 2 characters long' };
    }

    const titles = await titlesRepository.search(query.trim());
    return { success: true, data: titles };
  } catch (error) {
    console.error('Search titles error:', error);
    return { success: false, error: 'Failed to search titles' };
  }
}

type TitleWithGenres = Title & {
  title_genres?: Array<{
    genres?: {
      id: number;
      name: string;
    };
  }>;
};

export async function getTitlesWithGenres(): Promise<ActionResult<TitleWithGenres[]>> {
  try {
    const titles = await titlesRepository.findWithGenres();
    return { success: true, data: titles };
  } catch (error) {
    console.error('Get titles with genres error:', error);
    return { success: false, error: 'Failed to fetch titles with genres' };
  }
}

export async function createTitle(titleData: Omit<Title, 'id'>): Promise<ActionResult<Title>> {
  try {
    // Business logic: validation
    if (!titleData.title || titleData.title.trim().length < 3) {
      return { success: false, error: 'Title must be at least 3 characters long' };
    }

    if (titleData.title.trim().length > 255) {
      return { success: false, error: 'Title must be less than 255 characters' };
    }

    if (titleData.description && titleData.description.length > 1000) {
      return { success: false, error: 'Description must be less than 1000 characters' };
    }

    // Set timestamps
    const now = new Date().toISOString();
    const newTitle = await titlesRepository.create({
      ...titleData,
      title: titleData.title.trim(),
      description: titleData.description?.trim() || undefined,
      status: titleData.status || 'ongoing',
      created_at: now,
      updated_at: now,
    });

    // Revalidate relevant pages
    revalidatePath('/dashboard/titles');
    revalidatePath('/titles');
    
    return { success: true, data: newTitle };
  } catch (error) {
    console.error('Create title error:', error);
    return { success: false, error: 'Failed to create title' };
  }
}

export async function updateTitle(
  id: number, 
  titleData: Partial<Omit<Title, 'id' | 'created_at'>>
): Promise<ActionResult<Title>> {
  try {
    if (!id || id <= 0) {
      return { success: false, error: 'Invalid title ID' };
    }

    // Business logic: validation
    if (titleData.title !== undefined) {
      if (!titleData.title || titleData.title.trim().length < 3) {
        return { success: false, error: 'Title must be at least 3 characters long' };
      }
      if (titleData.title.trim().length > 255) {
        return { success: false, error: 'Title must be less than 255 characters' };
      }
      titleData.title = titleData.title.trim();
    }

    if (titleData.description !== undefined && titleData.description && titleData.description.length > 1000) {
      return { success: false, error: 'Description must be less than 1000 characters' };
    }

    // Set update timestamp
    const updatedTitle = await titlesRepository.update(id, {
      ...titleData,
      updated_at: new Date().toISOString(),
    });

    // Revalidate relevant pages
    revalidatePath('/dashboard/titles');
    revalidatePath('/titles');
    revalidatePath(`/titles/${id}`);
    
    return { success: true, data: updatedTitle };
  } catch (error) {
    console.error('Update title error:', error);
    return { success: false, error: 'Failed to update title' };
  }
}

export async function deleteTitle(id: number): Promise<ActionResult<void>> {
  try {
    if (!id || id <= 0) {
      return { success: false, error: 'Invalid title ID' };
    }

    await titlesRepository.delete(id);

    // Revalidate relevant pages
    revalidatePath('/dashboard/titles');
    revalidatePath('/titles');
    
    return { success: true };
  } catch (error) {
    console.error('Delete title error:', error);
    return { success: false, error: 'Failed to delete title' };
  }
}
