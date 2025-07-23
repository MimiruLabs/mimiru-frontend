# Features Directory Structure

This directory contains all feature-based modules organized by domain and functionality.

## Structure Overview

```
features/
├── pages/           # Public-facing pages
├── titles/          # Title-related features
├── dashboard/       # Admin dashboard features
├── auth/            # Authentication features (future)
└── shared/          # Shared feature utilities (future)
```

## Feature Organization

Each feature follows this consistent structure:

```
feature-name/
├── components/      # React components
├── hooks/          # Custom hooks
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── index.ts        # Barrel exports
```

## Domain Features

### Pages (`/pages`)
- **home/**: Homepage components and sections
- **about/**: About page components

### Titles (`/titles`)
- **list/**: Title listing and browsing
- **detail/**: Individual title details

### Dashboard (`/dashboard`)
- **overview/**: Main dashboard overview
- **titles/**: Title management
- **chapters/**: Chapter management  
- **pages/**: Page management
- **genres/**: Genre management
- **users/**: User management
- **title-versions/**: Title version management

## Benefits of This Structure

1. **Domain-Driven**: Features are organized by business domain
2. **Scalable**: Easy to add new features and domains
3. **Maintainable**: Clear separation of concerns
4. **Testable**: Each feature can be tested in isolation
5. **Reusable**: Shared components and utilities are easily accessible
6. **Type-Safe**: Consistent TypeScript patterns across features

## Usage

Import features using barrel exports:

```typescript
// Import page components
import { HomePage, AboutPage } from '@/features/pages';

// Import title features
import { TitlesPage, TitleDetailPage } from '@/features/titles';

// Import dashboard features
import { DashboardOverview, TitlesDashboard } from '@/features/dashboard';
```

## Adding New Features

1. Create a new directory under the appropriate domain
2. Add the standard subdirectories (components, hooks, types, utils)
3. Create an index.ts file with barrel exports
4. Update the parent domain's index.ts file
5. Update the main features/index.ts file if needed
