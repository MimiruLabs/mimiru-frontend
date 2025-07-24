import { BaseRepository } from './base.repository';
import { Genre } from '@/types/db';

type GenreWithTitleCount = Genre & {
  title_genres?: Array<{
    count: number;
  }>;
};

export class GenresRepository extends BaseRepository<Genre> {
  constructor() {
    super('genres');
  }

  // Find genre by name
  async findByName(name: string): Promise<Genre | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('name', name)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch genre by name: ${error.message}`);
    }
    return data;
  }

  // Get genres with title count
  async findWithTitleCount(): Promise<GenreWithTitleCount[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        title_genres (
          count
        )
      `);
    
    if (error) throw new Error(`Failed to fetch genres with title count: ${error.message}`);
    return data || [];
  }

  // Search genres by name
  async search(query: string): Promise<Genre[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('name', `%${query}%`)
      .order('name', { ascending: true });
    
    if (error) throw new Error(`Failed to search genres: ${error.message}`);
    return data || [];
  }
}

// Export singleton instance
export const genresRepository = new GenresRepository();
