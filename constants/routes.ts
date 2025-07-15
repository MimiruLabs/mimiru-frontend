// Application Routes Constants
export const ROUTES = {
  // Main routes
  ROOT: '/',
  HOME: '/home',
  TITLES: '/titles',
  ABOUT: '/about',
  AUTH: '/auth',
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  DASHBOARD: '/dashboard', // Added dashboard route
  DASHBOARD_TITLES: '/dashboard/titles',
  DASHBOARD_GENRES: '/dashboard/genres',
  DASHBOARD_TITLE_VERSIONS: '/dashboard/title-versions',
  DASHBOARD_CHAPTERS: '/dashboard/chapters',
  DASHBOARD_PAGES: '/dashboard/pages',
  DASHBOARD_USERS: '/dashboard/users',
  
  // Dynamic routes
  TITLE_DETAIL: (titleId: string) => `/titles/${titleId}`,
} as const

// Route names for navigation
export const ROUTE_NAMES = {
  ROOT: 'Home',
  HOME: 'Home',
  TITLES: 'Titles', 
  ABOUT: 'About Us',
  AUTH: 'Auth',
  SIGN_IN: 'Sign In',
  SIGN_UP: 'Sign Up',
  DASHBOARD: 'Dashboard', // Added dashboard route name
  DASHBOARD_TITLES: 'Dashboard Titles',
  DASHBOARD_GENRES: 'Dashboard Genres',
  DASHBOARD_TITLE_VERSIONS: 'Dashboard Title Versions',
  DASHBOARD_CHAPTERS: 'Dashboard Chapters',
  DASHBOARD_PAGES: 'Dashboard Pages',
  DASHBOARD_USERS: 'Dashboard Users',
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
  [ROUTES.AUTH]: {
    title: 'Auth',
    description: 'Authenticate',
  },
  [ROUTES.SIGN_IN]: {
    title: 'Sign In',
    description: 'Sign In to Mimiru',
  },
  [ROUTES.SIGN_UP]: {
    title: 'Sign Up',
    description: 'Sign Up to Mimiru',
  },
  [ROUTES.DASHBOARD]: {
    title: 'Dashboard',
    description: 'Overview of your dashboard',
  }, // Added metadata for dashboard route
} as const 