'use server';

import { usersRepository } from '@/lib/supabase/repositories/users.repository';
import { UserProfile } from '@/types/db';
import { revalidatePath } from 'next/cache';
import { ActionResult } from './types';

export async function getUsers(): Promise<ActionResult<UserProfile[]>> {
  try {
    const users = await usersRepository.findAll();
    return { success: true, data: users };
  } catch (error) {
    console.error('Get users error:', error);
    return { success: false, error: 'Failed to fetch users' };
  }
}

export async function getUserById(id: string): Promise<ActionResult<UserProfile | null>> {
  try {
    if (!id || id.trim().length === 0) {
      return { success: false, error: 'Invalid user ID' };
    }

    const user = await usersRepository.findByStringId(id);
    return { success: true, data: user };
  } catch (error) {
    console.error('Get user error:', error);
    return { success: false, error: 'Failed to fetch user' };
  }
}

export async function getUserByUsername(username: string): Promise<ActionResult<UserProfile | null>> {
  try {
    if (!username || username.trim().length === 0) {
      return { success: false, error: 'Invalid username' };
    }

    const user = await usersRepository.findByUsername(username.trim());
    return { success: true, data: user };
  } catch (error) {
    console.error('Get user by username error:', error);
    return { success: false, error: 'Failed to fetch user by username' };
  }
}

export async function getUsersByRole(
  role: 'reader' | 'author' | 'translator' | 'admin'
): Promise<ActionResult<UserProfile[]>> {
  try {
    const users = await usersRepository.findByRole(role);
    return { success: true, data: users };
  } catch (error) {
    console.error('Get users by role error:', error);
    return { success: false, error: 'Failed to fetch users by role' };
  }
}

export async function getActiveUsers(): Promise<ActionResult<UserProfile[]>> {
  try {
    const users = await usersRepository.findActive();
    return { success: true, data: users };
  } catch (error) {
    console.error('Get active users error:', error);
    return { success: false, error: 'Failed to fetch active users' };
  }
}

export async function searchUsers(query: string): Promise<ActionResult<UserProfile[]>> {
  try {
    if (!query || query.trim().length < 2) {
      return { success: false, error: 'Search query must be at least 2 characters long' };
    }

    const users = await usersRepository.search(query.trim());
    return { success: true, data: users };
  } catch (error) {
    console.error('Search users error:', error);
    return { success: false, error: 'Failed to search users' };
  }
}

export async function createUserProfile(userData: Omit<UserProfile, 'joined_at'>): Promise<ActionResult<UserProfile>> {
  try {
    // Business logic: validation
    if (!userData.id || userData.id.trim().length === 0) {
      return { success: false, error: 'User ID is required' };
    }

    if (!userData.username || userData.username.trim().length < 3) {
      return { success: false, error: 'Username must be at least 3 characters long' };
    }

    if (userData.username.trim().length > 50) {
      return { success: false, error: 'Username must be less than 50 characters' };
    }

    if (userData.display_name && userData.display_name.trim().length > 100) {
      return { success: false, error: 'Display name must be less than 100 characters' };
    }

    if (userData.bio && userData.bio.trim().length > 500) {
      return { success: false, error: 'Bio must be less than 500 characters' };
    }

    // Check if username already exists
    const existingUser = await usersRepository.findByUsername(userData.username.trim());
    if (existingUser) {
      return { success: false, error: 'Username already exists' };
    }

    const user = await usersRepository.createProfile({
      ...userData,
      username: userData.username.trim().toLowerCase(),
      display_name: userData.display_name?.trim() || undefined,
      bio: userData.bio?.trim() || undefined,
      role: userData.role || 'reader',
      is_active: userData.is_active ?? true,
    });

    // Revalidate relevant pages
    revalidatePath('/dashboard/users');
    
    return { success: true, data: user };
  } catch (error) {
    console.error('Create user profile error:', error);
    return { success: false, error: 'Failed to create user profile' };
  }
}

export async function updateUserProfile(
  id: string,
  userData: Partial<Omit<UserProfile, 'id' | 'joined_at'>>
): Promise<ActionResult<UserProfile>> {
  try {
    if (!id || id.trim().length === 0) {
      return { success: false, error: 'Invalid user ID' };
    }

    // Business logic: validation
    if (userData.username !== undefined) {
      if (!userData.username || userData.username.trim().length < 3) {
        return { success: false, error: 'Username must be at least 3 characters long' };
      }
      if (userData.username.trim().length > 50) {
        return { success: false, error: 'Username must be less than 50 characters' };
      }
      userData.username = userData.username.trim().toLowerCase();
    }

    if (userData.display_name !== undefined && userData.display_name && userData.display_name.trim().length > 100) {
      return { success: false, error: 'Display name must be less than 100 characters' };
    }

    if (userData.bio !== undefined && userData.bio && userData.bio.trim().length > 500) {
      return { success: false, error: 'Bio must be less than 500 characters' };
    }

    const user = await usersRepository.updateProfile(id, {
      ...userData,
      display_name: userData.display_name?.trim() || undefined,
      bio: userData.bio?.trim() || undefined,
    });

    // Revalidate relevant pages
    revalidatePath('/dashboard/users');
    revalidatePath(`/dashboard/users/${id}`);
    
    return { success: true, data: user };
  } catch (error) {
    console.error('Update user profile error:', error);
    return { success: false, error: 'Failed to update user profile' };
  }
}

export async function updateUserRole(
  userId: string,
  role: 'reader' | 'author' | 'translator' | 'admin'
): Promise<ActionResult<UserProfile>> {
  try {
    if (!userId || userId.trim().length === 0) {
      return { success: false, error: 'Invalid user ID' };
    }

    const user = await usersRepository.updateRole(userId, role);

    // Revalidate relevant pages
    revalidatePath('/dashboard/users');
    revalidatePath(`/dashboard/users/${userId}`);
    
    return { success: true, data: user };
  } catch (error) {
    console.error('Update user role error:', error);
    return { success: false, error: 'Failed to update user role' };
  }
}

export async function deactivateUser(userId: string): Promise<ActionResult<UserProfile>> {
  try {
    if (!userId || userId.trim().length === 0) {
      return { success: false, error: 'Invalid user ID' };
    }

    const user = await usersRepository.deactivate(userId);

    // Revalidate relevant pages
    revalidatePath('/dashboard/users');
    revalidatePath(`/dashboard/users/${userId}`);
    
    return { success: true, data: user };
  } catch (error) {
    console.error('Deactivate user error:', error);
    return { success: false, error: 'Failed to deactivate user' };
  }
}
