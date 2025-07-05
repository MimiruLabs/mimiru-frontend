import { MainLayout } from '@/layouts/MainLayout'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayoutWrapper({ children }: MainLayoutProps) {
  return <MainLayout>{children}</MainLayout>;
}
        