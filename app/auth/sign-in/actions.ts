'use server';

import { ROUTES } from '@/constants';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';

export async function signIn(data: { email: string; password: string }) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (!error) {
    redirect(ROUTES.HOME);
  }
  // Always show generic error for security
  return { error: 'Invalid email or password' };
} 