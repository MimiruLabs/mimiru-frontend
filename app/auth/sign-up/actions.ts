'use server';

import { ROUTES } from '@/constants';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { redirect } from 'next/navigation';

export async function signUp(data: { email: string; password: string }) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  if (!error) {
    redirect(ROUTES.HOME);
  }
  // Always show generic error for security
  return { error: 'Could not sign up. Please try again.' };
} 