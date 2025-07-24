'use client';

import { useState, useEffect } from 'react';
import { getUserById, searchUsers, getUsersByRole } from '@/app/actions/users.actions';
import { UserProfile } from '@/types/db';

// Hook for fetching a single user
export function useUser(id: string | null) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    const result = await getUserById(id);
    
    if (result.success) {
      setUser(result.data || null);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
  };
}

// Hook for users by role
export function useUsersByRole(role: 'reader' | 'author' | 'translator' | 'admin') {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    const result = await getUsersByRole(role);
    
    if (result.success) {
      setUsers(result.data || []);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [role]);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
}

// Hook for searching users
export function useSearchUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const search = async (searchQuery: string) => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
    }
    
    if (!searchQuery.trim()) {
      setUsers([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const result = await searchUsers(searchQuery);
    
    if (result.success) {
      setUsers(result.data || []);
    } else {
      setError(result.error || 'Unknown error');
    }
    
    setLoading(false);
  };

  const clearSearch = () => {
    setQuery('');
    setUsers([]);
    setError(null);
  };

  return {
    users,
    loading,
    error,
    query,
    search,
    clearSearch,
  };
}
