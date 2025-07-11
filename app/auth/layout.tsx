import { AuthLayout } from '@/layouts/AuthLayout';
import { BackButton } from '@/components/BackButton';
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayoutWrapper({ children }: AuthLayoutProps) {
  return (
    <AuthLayout>
      <BackButton />
      {children}
    </AuthLayout>
  );
}
        