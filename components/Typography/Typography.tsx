import { cn } from '@/lib/utils'
import React from 'react'

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'body' 
  | 'body-sm' 
  | 'body-lg' 
  | 'caption' 
  | 'overline'

type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'

interface TypographyProps {
  variant?: TypographyVariant
  weight?: TypographyWeight
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

const Typography = ({ 
  variant = 'body', 
  weight = 'normal', 
  children, 
  className,
  as
}: TypographyProps) => {
  const Component = as || getDefaultElement(variant)

  const variantStyles = {
    h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
    h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
    h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
    h4: 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl',
    h5: 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl',
    h6: 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl',
    'body-lg': 'text-base sm:text-lg md:text-xl lg:text-2xl',
    body: 'text-sm sm:text-base md:text-lg lg:text-xl',
    'body-sm': 'text-xs sm:text-sm md:text-base lg:text-lg',
    caption: 'text-xs sm:text-sm md:text-base',
    overline: 'text-xs sm:text-xs md:text-sm uppercase tracking-wider'
  }

  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  }

  const props = {
    className: cn(
      variantStyles[variant],
      weightStyles[weight],
      'leading-relaxed',
      className
    ),
    children
  }

  return React.createElement(Component, props)
}

const getDefaultElement = (variant: TypographyVariant): React.ElementType => {
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return variant
    case 'body':
    case 'body-sm':
    case 'body-lg':
      return 'p'
    case 'caption':
      return 'span'
    case 'overline':
      return 'span'
    default:
      return 'p'
  }
}

export { Typography } 