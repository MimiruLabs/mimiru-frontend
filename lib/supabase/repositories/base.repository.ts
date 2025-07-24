import { createSupabaseServerClient } from '@/lib/supabaseServer';

export class BaseRepository<T> {
  protected async getSupabase() {
    return await createSupabaseServerClient();
  }
  
  constructor(protected tableName: string) {}

  async findAll(): Promise<T[]> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*');
    
    if (error) throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`);
    return data || [];
  }

  async findById(id: number): Promise<T | null> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') { // Not found is ok
      throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`);
    }
    return data;
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .insert(item)
      .select()
      .single();
    
    if (error) throw new Error(`Failed to create ${this.tableName}: ${error.message}`);
    return data;
  }

  async update(id: number, item: Partial<Omit<T, 'id'>>): Promise<T> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .update(item)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(`Failed to update ${this.tableName}: ${error.message}`);
    return data;
  }

  async delete(id: number): Promise<void> {
    const supabase = await this.getSupabase();
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(`Failed to delete ${this.tableName}: ${error.message}`);
  }

  async count(): Promise<number> {
    const supabase = await this.getSupabase();
    const { count, error } = await supabase
      .from(this.tableName)
      .select('*', { count: 'exact', head: true });
    
    if (error) throw new Error(`Failed to count ${this.tableName}: ${error.message}`);
    return count || 0;
  }
}
