// Common TypeScript types for the project
export interface BaseProps {
  children?: React.ReactNode
  className?: string
}

export interface PageProps {
  params?: Record<string, string>
  searchParams?: Record<string, string | string[]>
} 