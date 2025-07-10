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
} as const 