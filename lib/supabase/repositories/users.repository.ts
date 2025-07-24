import { BaseRepository } from './base.repository';
import { UserProfile } from '@/types/db';

export class UsersRepository extends BaseRepository<UserProfile> {
  constructor() {
    super('user_profiles');
  }

  // Find user by string ID (since user IDs are UUIDs)
  async findByStringId(id: string): Promise<UserProfile | null> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
    return data;
  }

  // Override create for string IDs
  async createProfile(item: Omit<UserProfile, 'joined_at'>): Promise<UserProfile> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .insert({
        ...item,
        joined_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw new Error(`Failed to create user profile: ${error.message}`);
    return data;
  }

  // Override update for string IDs
  async updateProfile(id: string, item: Partial<Omit<UserProfile, 'id' | 'joined_at'>>): Promise<UserProfile> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .update(item)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(`Failed to update user profile: ${error.message}`);
    return data;
  }

  // Find user by username
  async findByUsername(username: string): Promise<UserProfile | null> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('username', username)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch user by username: ${error.message}`);
    }
    return data;
  }

  // Find users by role
  async findByRole(role: 'reader' | 'author' | 'translator' | 'admin'): Promise<UserProfile[]> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('role', role)
      .eq('is_active', true)
      .order('joined_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch users by role: ${error.message}`);
    return data || [];
  }

  // Find active users
  async findActive(): Promise<UserProfile[]> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('is_active', true)
      .order('joined_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch active users: ${error.message}`);
    return data || [];
  }

  // Search users by username or display name
  async search(query: string): Promise<UserProfile[]> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
      .eq('is_active', true)
      .order('username', { ascending: true });
    
    if (error) throw new Error(`Failed to search users: ${error.message}`);
    return data || [];
  }

  // Update user role (admin only)
  async updateRole(userId: string, role: 'reader' | 'author' | 'translator' | 'admin'): Promise<UserProfile> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .update({ role })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw new Error(`Failed to update user role: ${error.message}`);
    return data;
  }

  // Deactivate user
  async deactivate(userId: string): Promise<UserProfile> {
    const supabase = await this.getSupabase();
    const { data, error } = await supabase
      .from(this.tableName)
      .update({ is_active: false })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw new Error(`Failed to deactivate user: ${error.message}`);
    return data;
  }
}

// Export singleton instance
export const usersRepository = new UsersRepository();
