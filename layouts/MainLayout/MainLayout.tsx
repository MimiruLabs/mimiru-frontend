import React from 'react'
import { Container } from '@/components/Container'
import { MainLayoutHeader } from '@/layouts/MainLayout/components/Header'
import { Footer } from '@/layouts/MainLayout/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { BaseProps } from '@/types'

const MainLayout = ({ children }: BaseProps) => {
  return (
    <div className="min-h-screen flex flex-col relative scroll-smooth">
      <MainLayoutHeader />
      <main className="flex-1">
          {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export { MainLayout } 