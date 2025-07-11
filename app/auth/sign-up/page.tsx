'use client';

import { ROUTES } from '@/constants';
import { signUp } from './actions';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { PasswordInput } from '@/components/PasswordInput';
import { TextInput } from '@/components/TextInput';
import { FormError } from '@/components/FormError';
import { AnimatedContainer } from '@/components/AnimatedContainer';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number')
    .regex(/[^A-Za-z0-9]/, 'Must contain a special character'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setFormError(null);
    startTransition(async () => {
      const result = await signUp(data);
      if (result && typeof result.error === 'string') setFormError(result.error);
    });
  };

  // Password strength feedback (simple)
  const password = watch('password', '');
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const passwordStrength = hasLength && hasUpper && hasNumber && hasSpecial
    ? 'Strong'
    : hasLength && ((hasUpper && hasNumber) || (hasUpper && hasSpecial) || (hasNumber && hasSpecial))
    ? 'Medium'
    : password.length > 0
    ? 'Weak'
    : '';

  return (
    <AnimatedContainer duration={0.5}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      >
        {/* Logo/Brand */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-700 flex items-center justify-center mb-2 shadow-lg">
            {/* Replace with your logo if desired */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#fff" /><path d="M7 12l3 3 7-7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">Create your account</h1>
          <p className="text-zinc-400 text-base">Sign up to get started with Mimiru.</p>
        </div>
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
            autoComplete="new-password"
            {...register('password')}
            error={errors.password?.message}
            disabled={isPending}
            required
            placeholder="Password"
          />
          <PasswordInput
            label="Confirm Password"
            id="confirmPassword"
            autoComplete="new-password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            disabled={isPending}
            required
            placeholder="Confirm Password"
          />
          {/* Password strength indicator */}
          <div className="flex flex-col gap-1 mb-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className={
                    passwordStrength === 'Strong'
                      ? 'h-full bg-green-500 transition-all duration-300 w-full'
                      : passwordStrength === 'Medium'
                      ? 'h-full bg-yellow-400 transition-all duration-300 w-2/3'
                      : passwordStrength === 'Weak'
                      ? 'h-full bg-red-500 transition-all duration-300 w-1/3'
                      : 'h-full bg-zinc-800 w-0'
                  }
                />
              </div>
              <span className={
                passwordStrength === 'Strong'
                  ? 'text-green-400 font-semibold'
                  : passwordStrength === 'Medium'
                  ? 'text-yellow-400 font-semibold'
                  : passwordStrength === 'Weak'
                  ? 'text-red-400 font-semibold'
                  : 'text-zinc-400'
              }>
                {passwordStrength || ' '}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2 text-xs mt-1">
              <li className={hasLength ? 'text-green-400' : 'text-zinc-400'}>
                {hasLength ? '✓' : '✗'} 8+ chars
              </li>
              <li className={hasUpper ? 'text-green-400' : 'text-zinc-400'}>
                {hasUpper ? '✓' : '✗'} Uppercase
              </li>
              <li className={hasNumber ? 'text-green-400' : 'text-zinc-400'}>
                {hasNumber ? '✓' : '✗'} Number
              </li>
              <li className={hasSpecial ? 'text-green-400' : 'text-zinc-400'}>
                {hasSpecial ? '✓' : '✗'} Special
              </li>
            </ul>
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
            {isPending ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div className="flex justify-between mt-2 text-sm">
            <Link href={ROUTES.SIGN_IN} className="text-blue-400 hover:underline">Already have an account? Sign In</Link>
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
      </motion.div>
    </AnimatedContainer>
  );
}
