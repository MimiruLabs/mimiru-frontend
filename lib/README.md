# Lib Directory Structure

This document outlines the upgraded and organized structure of the `lib` directory.

## 📁 Directory Structure

```
lib/
├── index.ts                    # Main entry point - exports everything
├── supabase/                   # Database layer
│   ├── server.ts              # Server client export
│   └── repositories/          # Data access layer
│       ├── base.repository.ts
│       ├── titles.repository.ts
│       ├── chapters.repository.ts
│       ├── users.repository.ts
│       ├── genres.repository.ts
│       └── index.ts
├── hooks/                      # React hooks
│   ├── index.ts               # Hook exports
│   ├── useTitles.ts           # Title-related hooks
│   ├── useChapters.ts         # Chapter-related hooks
│   └── useUsers.ts            # User-related hooks
├── ui/                         # UI-specific hooks and utilities
│   ├── index.ts               # UI exports
│   ├── scroll.ts              # Scroll management hook
│   ├── loading.ts             # Loading state management
│   └── navigation.ts          # Navigation utilities
├── utils/                      # Utility functions
│   ├── index.ts               # Utility exports
│   ├── common.ts              # Common utility functions
│   ├── scroll.ts              # Scroll utility functions
│   └── validation.ts          # Validation schemas and functions
├── types/                      # Type definitions
│   ├── index.ts               # Type exports
│   └── common.ts              # Common type definitions
├── examples/                   # Usage examples
│   └── data-fetching-examples.tsx
└── DATA_FETCHING.md           # Data fetching documentation
```

## 🎯 Import Patterns

### Single Import from Main Entry
```typescript
import { 
  useTitles,           // Data hook
  useScroll,           // UI hook
  cn,                  // Utility function
  validateTitle,       // Validation function
  titlesRepository,    // Repository
  type ActionResult    // Type
} from '@/lib';
```

### Category-Specific Imports
```typescript
// Data hooks only
import { useTitles, useChapters } from '@/lib/hooks';

// UI hooks only  
import { useScroll, useLoading } from '@/lib/ui';

// Utilities only
import { cn, formatDate, debounce } from '@/lib/utils';

// Types only
import type { ActionResult, PaginationResult } from '@/lib/types';

// Repositories only
import { titlesRepository, chaptersRepository } from '@/lib/supabase/repositories';
```

## 📋 What Each Directory Contains

### `/supabase` - Database Layer
- **Purpose**: Database access and server-side client management
- **Contents**: Repositories for different entities, server client configuration
- **Usage**: Used by server actions for database operations

### `/hooks` - Data Fetching Hooks
- **Purpose**: Client-side data fetching with React hooks
- **Contents**: Custom hooks for each entity (titles, chapters, users)
- **Usage**: Used in client components for data management

### `/ui` - UI Hooks & Utilities
- **Purpose**: User interface-related hooks and utilities
- **Contents**: Scroll management, loading states, navigation helpers
- **Usage**: Used across components for UI interactions

### `/utils` - Utility Functions
- **Purpose**: Pure utility functions and helpers
- **Contents**: Common utilities, validation schemas, scroll functions
- **Usage**: Used throughout the application for various operations

### `/types` - Type Definitions
- **Purpose**: TypeScript type definitions and interfaces
- **Contents**: Common types, hook return types, component prop types
- **Usage**: Imported for type safety across the application

### `/examples` - Usage Examples
- **Purpose**: Code examples and patterns
- **Contents**: Working examples of how to use the library
- **Usage**: Reference for developers

## 🔄 Migration Guide

### Old Imports → New Imports

```typescript
// Old way
import { useLoading } from '@/lib/useLoading';
import { useScroll } from '@/lib/useScroll';
import { scrollToTop } from '@/lib/scrollUtils';
import { cn } from '@/lib/utils';

// New way (single import)
import { useLoading, useScroll, scrollToTop, cn } from '@/lib';

// Or category-specific
import { useLoading, useScroll } from '@/lib/ui';
import { scrollToTop, cn } from '@/lib/utils';
```

## ✨ Key Benefits

1. **Single Entry Point**: Import everything from `@/lib`
2. **Organized Structure**: Clear separation of concerns
3. **Better IntelliSense**: Cleaner auto-completion
4. **Easier Maintenance**: Logical grouping of related code
5. **Backward Compatibility**: Old imports still work
6. **Type Safety**: Comprehensive type exports
7. **Better Tree Shaking**: More granular imports possible

## 🚀 Usage Examples

### Data Fetching
```typescript
import { useTitles, useCreateTitle } from '@/lib';

function TitlesPage() {
  const { titles, loading, error } = useTitles();
  const { create } = useCreateTitle();
  // ...
}
```

### UI Interactions
```typescript
import { useScroll, useLoading } from '@/lib';

function MyComponent() {
  const { scrollToTop } = useScroll();
  const { isLoading } = useLoading();
  // ...
}
```

### Utilities
```typescript
import { cn, formatDate, validateTitle } from '@/lib';

function MyForm() {
  const className = cn('base-class', conditionalClass);
  const date = formatDate(new Date());
  const validation = validateTitle(data);
  // ...
}
```

### Server Actions
```typescript
import { titlesRepository } from '@/lib';

export async function getTitles() {
  const titles = await titlesRepository.findAll();
  // ...
}
```

## 📝 Best Practices

1. **Use Single Import**: Import from `@/lib` when possible
2. **Category Imports**: Use category-specific imports for better organization
3. **Type Imports**: Use `import type` for type-only imports
4. **Consistent Naming**: Follow the established naming conventions
5. **Documentation**: Add JSDoc comments for new utilities
6. **Testing**: Test new utilities and hooks thoroughly

## 🔧 Adding New Items

### Adding a New Hook
1. Create the hook file in `/hooks`
2. Export from `/hooks/index.ts`
3. It will be automatically available from main `@/lib` import

### Adding a New Utility
1. Add function to appropriate file in `/utils`
2. Export from file, it will be available via `/utils/index.ts`

### Adding a New Type
1. Add to `/types/common.ts` or create new file
2. Export from `/types/index.ts`

The upgraded structure maintains backward compatibility while providing a much cleaner and more organized way to work with the library.
