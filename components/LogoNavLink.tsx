'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants';

export const LogoNavLink = () => (
  <Link
    href={ROUTES.HOME}
    className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-700 flex items-center justify-center mb-2 shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
    aria-label="Go to Home"
  >
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#fff" />
      <path d="M7 12l3 3 7-7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Link>
); 