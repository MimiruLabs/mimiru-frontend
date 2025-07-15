export interface Title {
  id?: number;
  title: string;
  description?: string;
  cover_url?: string;
  status?: 'ongoing' | 'completed' | 'hiatus';
  original_language?: string;
  created_by?: string; // uuid
  created_at?: string;
  updated_at?: string;
}

export interface Genre {
  id?: number;
  name: string;
  description?: string;
}

export interface TitleGenre {
  id?: number;
  title_id: number;
  genre_id: number;
}

export interface TitleVersion {
  id?: number;
  title_id: number;
  language: string;
  version_name?: string;
  translated_by?: string; // uuid
  created_at?: string;
}

export interface Chapter {
  id?: number;
  title_version_id: number;
  chapter_number: number;
  title?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Page {
  id?: number;
  chapter_id: number;
  page_number: number;
  image_url?: string;
}

export interface UserProfile {
  id: string; // uuid
  username: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  role: 'reader' | 'author' | 'translator' | 'admin';
  is_active?: boolean;
  joined_at?: string;
}
