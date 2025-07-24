# Data Fetching Architecture

This document explains how to use the new data fetching structure implemented in the project.

## Architecture Overview

```
lib/supabase/repositories/  # Data access layer
app/actions/                # Server actions (business logic)
lib/hooks/                  # Client-side hooks
```

## How to Use

### 1. Server Components (Recommended for SEO and performance)

```tsx
import { getTitles } from '@/app/actions/titles.actions';

export default async function TitlesPage() {
  const result = await getTitles();
  
  if (!result.success) {
    return <div>Error: {result.error}</div>;
  }

  return (
    <div>
      {result.data?.map(title => (
        <div key={title.id}>{title.title}</div>
      ))}
    </div>
  );
}
```

### 2. Client Components (For interactive features)

```tsx
'use client';
import { useTitles } from '@/lib/hooks';

export function TitlesList() {
  const { titles, loading, error } = useTitles();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {titles.map(title => (
        <div key={title.id}>{title.title}</div>
      ))}
    </div>
  );
}
```

## Available Actions

### Titles
- `getTitles()` - Get all titles
- `getTitleById(id)` - Get single title
- `getTitlesPaginated(page, limit)` - Get paginated titles
- `getTitlesByStatus(status)` - Get titles by status
- `searchTitles(query)` - Search titles
- `createTitle(data)` - Create new title
- `updateTitle(id, data)` - Update title
- `deleteTitle(id)` - Delete title

### Chapters
- `getChaptersByTitleVersion(titleVersionId)` - Get chapters for a title version
- `getChapterById(id)` - Get single chapter
- `getChapterWithPages(id)` - Get chapter with its pages
- `getNextChapter(titleVersionId, currentNumber)` - Get next chapter
- `getPreviousChapter(titleVersionId, currentNumber)` - Get previous chapter
- `getLatestChapters(limit)` - Get latest chapters
- `createChapter(data)` - Create new chapter
- `updateChapter(id, data)` - Update chapter
- `deleteChapter(id)` - Delete chapter

### Users
- `getUsers()` - Get all users
- `getUserById(id)` - Get single user
- `getUserByUsername(username)` - Get user by username
- `getUsersByRole(role)` - Get users by role
- `searchUsers(query)` - Search users
- `createUserProfile(data)` - Create user profile
- `updateUserProfile(id, data)` - Update user profile
- `updateUserRole(userId, role)` - Update user role
- `deactivateUser(userId)` - Deactivate user

## Available Hooks

### Titles
- `useTitles()` - Fetch all titles
- `useTitle(id)` - Fetch single title
- `usePaginatedTitles(page, limit)` - Paginated titles with controls
- `useTitlesByStatus(status)` - Titles by status
- `useSearchTitles()` - Search functionality
- `useCreateTitle()` - Create title mutation
- `useUpdateTitle()` - Update title mutation
- `useDeleteTitle()` - Delete title mutation

### Chapters
- `useChaptersByTitleVersion(titleVersionId)` - Chapters for title version
- `useChapter(id)` - Single chapter
- `useChapterWithPages(id)` - Chapter with pages
- `useChapterNavigation(titleVersionId, chapterNumber)` - Next/prev navigation
- `useLatestChapters(limit)` - Latest chapters
- `useCreateChapter()` - Create chapter mutation
- `useUpdateChapter()` - Update chapter mutation
- `useDeleteChapter()` - Delete chapter mutation

## Security Benefits

1. **Server-side only database access** - No database credentials exposed to client
2. **Built-in CSRF protection** - Next.js server actions include CSRF protection
3. **Input validation** - All validation happens server-side
4. **Type safety** - Full TypeScript support
5. **Error handling** - Consistent error handling across all operations

## Best Practices

1. **Use Server Components when possible** - Better for SEO and performance
2. **Use Client Components for interactive features** - Forms, real-time updates, etc.
3. **Handle loading and error states** - Always show appropriate UI states
4. **Validate input on both client and server** - Client for UX, server for security
5. **Use proper error messages** - Don't expose internal errors to users

## Examples

See `/lib/examples/data-fetching-examples.tsx` for complete working examples.
