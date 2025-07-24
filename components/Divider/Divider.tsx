import { cn } from '@/utils'
import React from 'react'

interface DividerProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'subtle' | 'accent'
}

const Divider = ({ 
  className,
  orientation = 'horizontal',
  size = 'md',
  color = 'default'
}: DividerProps) => {
  const sizeClasses = {
    sm: orientation === 'horizontal' ? 'h-px' : 'w-px',
    md: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
    lg: orientation === 'horizontal' ? 'h-1' : 'w-1'
  }

  const colorClasses = {
    default: 'bg-zinc-600',
    subtle: 'bg-zinc-700',
    accent: 'bg-zinc-500'
  }

  const orientationClasses = {
    horizontal: 'w-full',
    vertical: 'h-full'
  }

  return (
    <div
      className={cn(
        'rounded-full',
        sizeClasses[size],
        colorClasses[color],
        orientationClasses[orientation],
        className
      )}
    />
  )
}

export { Divider } 