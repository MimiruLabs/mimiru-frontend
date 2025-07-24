import { BaseRepository } from './base.repository';
import { Chapter } from '@/types/db';

type ChapterWithPages = Chapter & {
  pages?: Array<{
    id: number;
    page_number: number;
    image_url: string;
  }>;
};

type ChapterWithTitleInfo = Chapter & {
  title_versions?: {
    title_id: number;
    language: string;
    titles?: {
      title: string;
    };
  };
};

export class ChaptersRepository extends BaseRepository<Chapter> {
  constructor() {
    super('chapters');
  }

  // Find chapters by title version ID
  async findByTitleVersion(titleVersionId: number): Promise<Chapter[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('title_version_id', titleVersionId)
      .order('chapter_number', { ascending: true });
    
    if (error) throw new Error(`Failed to fetch chapters by title version: ${error.message}`);
    return data || [];
  }

  // Get chapter with its pages
  async findWithPages(chapterId: number): Promise<ChapterWithPages | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        pages (
          id,
          page_number,
          image_url
        )
      `)
      .eq('id', chapterId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch chapter with pages: ${error.message}`);
    }
    return data;
  }

  // Find next chapter
  async findNext(titleVersionId: number, currentChapterNumber: number): Promise<Chapter | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('title_version_id', titleVersionId)
      .gt('chapter_number', currentChapterNumber)
      .order('chapter_number', { ascending: true })
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch next chapter: ${error.message}`);
    }
    return data;
  }

  // Find previous chapter
  async findPrevious(titleVersionId: number, currentChapterNumber: number): Promise<Chapter | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('title_version_id', titleVersionId)
      .lt('chapter_number', currentChapterNumber)
      .order('chapter_number', { ascending: false })
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch previous chapter: ${error.message}`);
    }
    return data;
  }

  // Get latest chapters across all titles
  async findLatest(limit: number = 10): Promise<ChapterWithTitleInfo[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        title_versions (
          title_id,
          language,
          titles (
            id,
            title,
            cover_url
          )
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw new Error(`Failed to fetch latest chapters: ${error.message}`);
    return data || [];
  }
}

// Export singleton instance
export const chaptersRepository = new ChaptersRepository();
