'use client';

import { ROUTES } from '@/constants';
import { signIn } from './actions';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { PasswordInput } from '@/components/PasswordInput';
import { TextInput } from '@/components/TextInput';
import { FormError } from '@/components/FormError';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof schema>;

export default function SignInPage() {
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setFormError(null);
    startTransition(async () => {
      const result = await signIn(data);
      if (result && typeof result.error === 'string') setFormError(result.error);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" autoComplete="on" noValidate>
          <AnimatePresence>
            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <FormError message={formError || undefined} />
              </motion.div>
            )}
          </AnimatePresence>
          <TextInput
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            disabled={isPending}
            required
            autoFocus
            error={errors.email?.message}
            {...register('email')}
            icon={
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11A2.5 2.5 0 0119.5 20h-15A2.5 2.5 0 012 17.5v-11z" stroke="currentColor" strokeWidth="1.5" /><path d="M22 6.5l-10 7-10-7" stroke="currentColor" strokeWidth="1.5" /></svg>
            }
          />
          <PasswordInput
            label="Password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
            error={errors.password?.message}
            disabled={isPending}
            required
            placeholder="Password"
          />
          <div className="flex items-center justify-between mt-2 mb-1">
            <label className="flex items-center gap-2 text-zinc-400 text-sm select-none">
              <input type="checkbox" className="accent-blue-600 rounded focus:ring-2 focus:ring-blue-500" disabled={isPending} />
              Remember me
            </label>
            <Link href="#" className="text-zinc-400 hover:underline text-sm">Forgot password?</Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending && (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
            )}
            {isPending ? 'Signing In...' : 'Sign In'}
          </button>
          <div className="flex justify-between mt-2 text-sm">
            <Link href={ROUTES.SIGN_UP} className="text-blue-400 hover:underline">Don&apos;t have an account? Sign Up</Link>
          </div>
          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
            <span className="text-zinc-500 text-xs">or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          </div>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 hover:bg-zinc-700 transition-colors"
            disabled
            aria-disabled="true"
            tabIndex={-1}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21.805 10.023h-9.78v3.954h5.627c-.242 1.25-1.45 3.67-5.627 3.67-3.39 0-6.16-2.8-6.16-6.26s2.77-6.26 6.16-6.26c1.93 0 3.23.77 3.97 1.43l2.71-2.62C16.13 2.98 14.29 2 12.025 2 6.48 2 2 6.48 2 12s4.48 10 10.025 10c5.78 0 9.6-4.06 9.6-9.78 0-.66-.07-1.2-.17-1.7z" fill="#4285F4" /><path d="M3.153 6.615l3.26 2.39C7.7 7.6 9.66 6.1 12.025 6.1c1.93 0 3.23.77 3.97 1.43l2.71-2.62C16.13 2.98 14.29 2 12.025 2c-3.13 0-5.8 1.28-7.57 3.28l-1.3 1.33z" fill="#34A853" /><path d="M12.025 22c2.22 0 4.07-.73 5.43-1.98l-2.5-2.04c-.7.5-1.65.8-2.93.8-2.25 0-4.16-1.52-4.84-3.62l-3.23 2.49C5.8 20.72 8.47 22 12.025 22z" fill="#FBBC05" /><path d="M21.805 10.023h-9.78v3.954h5.627c-.242 1.25-1.45 3.67-5.627 3.67-3.39 0-6.16-2.8-6.16-6.26s2.77-6.26 6.16-6.26c1.93 0 3.23.77 3.97 1.43l2.71-2.62C16.13 2.98 14.29 2 12.025 2 6.48 2 2 6.48 2 12s4.48 10 10.025 10c5.78 0 9.6-4.06 9.6-9.78 0-.66-.07-1.2-.17-1.7z" fill="#4285F4" /></svg>
            Google (coming soon)
          </button>
    </form>
  );
}
