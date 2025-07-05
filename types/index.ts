// Common TypeScript types for the project
export interface BaseProps {
  children?: React.ReactNode
  className?: string
}

export interface PageProps {
  params?: Promise<Record<string, string>>
  searchParams?: Promise<Record<string, string | string[]>>
} 