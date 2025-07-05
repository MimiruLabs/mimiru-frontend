// Application Routes Constants
export const ROUTES = {
  // Main routes
  ROOT: '/',
  HOME: '/home',
  TITLES: '/titles',
  ABOUT: '/about',
  
  // Dynamic routes
  TITLE_DETAIL: (titleId: string) => `/titles/${titleId}`,
} as const

// Route names for navigation
export const ROUTE_NAMES = {
  ROOT: 'Home',
  HOME: 'Home',
  TITLES: 'Titles', 
  ABOUT: 'About Us',
} as const

// Route metadata for SEO and navigation
export const ROUTE_METADATA = {
  [ROUTES.ROOT]: {
    title: 'Home',
    description: 'Welcome to Mimiru',
  },
  [ROUTES.HOME]: {
    title: 'Home',
    description: 'Welcome to Mimiru',
  },
  [ROUTES.TITLES]: {
    title: 'Titles',
    description: 'Browse all titles',
  },
  [ROUTES.ABOUT]: {
    title: 'About Us',
    description: 'Learn more about Mimiru',
  },
} as const 