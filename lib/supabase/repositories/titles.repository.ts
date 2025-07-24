import { BaseRepository } from './base.repository';
import { Title } from '@/types/db';

type TitleWithGenres = Title & {
  title_genres?: Array<{
    genres?: {
      id: number;
      name: string;
    };
  }>;
};

export class TitlesRepository extends BaseRepository<Title> {
  constructor() {
    super('titles');
  }

  // Custom query for titles with specific status
  async findByStatus(status: 'ongoing' | 'completed' | 'hiatus'): Promise<Title[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch titles by status: ${error.message}`);
    return data || [];
  }

  // Paginated titles
  async findPaginated(page: number, limit: number = 10): Promise<{ data: Title[]; total: number }> {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const [dataResult, countResult] = await Promise.all([
      this.supabase
        .from(this.tableName)
        .select('*')
        .range(from, to)
        .order('created_at', { ascending: false }),
      this.supabase
        .from(this.tableName)
        .select('*', { count: 'exact', head: true })
    ]);
    
    if (dataResult.error) throw new Error(`Failed to fetch paginated titles: ${dataResult.error.message}`);
    if (countResult.error) throw new Error(`Failed to count titles: ${countResult.error.message}`);
    
    return {
      data: dataResult.data || [],
      total: countResult.count || 0
    };
  }

  // Search titles by title or description
  async search(query: string): Promise<Title[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(`Failed to search titles: ${error.message}`);
    return data || [];
  }

  // Find titles by creator
  async findByCreator(creatorId: string): Promise<Title[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('created_by', creatorId)
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch titles by creator: ${error.message}`);
    return data || [];
  }

  // Get titles with their genres
  async findWithGenres(): Promise<TitleWithGenres[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        title_genres (
          genres (
            id,
            name
          )
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch titles with genres: ${error.message}`);
    return data || [];
  }
}

// Export singleton instance
export const titlesRepository = new TitlesRepository();
