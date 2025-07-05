import { cn } from '@/lib/utils'
import React from 'react'
import { BaseProps } from '@/types'

const Container = ({ children, className }: BaseProps) => {
  return (
    <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  )
}

export { Container }