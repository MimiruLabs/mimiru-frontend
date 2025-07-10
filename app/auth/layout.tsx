import { AuthLayout } from '@/layouts/AuthLayout';
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayoutWrapper({ children }: AuthLayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
        