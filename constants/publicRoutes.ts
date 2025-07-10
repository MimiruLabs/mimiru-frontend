import { ROUTES } from './routes'

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
  ROUTES.ROOT,
  ROUTES.HOME,
  ROUTES.TITLES,
  ROUTES.ABOUT,
  ROUTES.AUTH,
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
] as const

// Routes that are always accessible (even when not authenticated)
export const ALWAYS_PUBLIC_ROUTES = [
  ROUTES.ROOT,
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.AUTH,
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
] as const

// Routes that require authentication
export const PROTECTED_ROUTES = [
  // Add protected routes here in the future
  // Example: '/dashboard', '/profile', '/settings'
] as const

// Routes that are accessible to authenticated users only
export const AUTHENTICATED_ONLY_ROUTES = [
  // Add authenticated-only routes here in the future
  // Example: '/user/profile', '/user/settings'
] as const

// Helper function to check if a route is public
export const isPublicRoute = (pathname: string): boolean => {
  return (PUBLIC_ROUTES as readonly string[]).includes(pathname)
}

// Helper function to check if a route is always public
export const isAlwaysPublicRoute = (pathname: string): boolean => {
  return (ALWAYS_PUBLIC_ROUTES as readonly string[]).includes(pathname)
}

// Helper function to check if a route is protected
export const isProtectedRoute = (pathname: string): boolean => {
  return (PROTECTED_ROUTES as readonly string[]).includes(pathname)
}

// Helper function to check if a route requires authentication
export const requiresAuthentication = (pathname: string): boolean => {
  return (AUTHENTICATED_ONLY_ROUTES as readonly string[]).includes(pathname)
}

// Route protection configuration
export const ROUTE_PROTECTION_CONFIG = {
  // Redirect unauthenticated users to this route
  UNAUTHENTICATED_REDIRECT: ROUTES.HOME,
  
  // Redirect authenticated users to this route after login
  AUTHENTICATED_REDIRECT: ROUTES.HOME,
  
  // Routes that should be accessible to everyone
  PUBLIC: PUBLIC_ROUTES,
  
  // Routes that require authentication
  PROTECTED: PROTECTED_ROUTES,
  
  // Routes that are only for authenticated users
  AUTHENTICATED_ONLY: AUTHENTICATED_ONLY_ROUTES,
} as const 