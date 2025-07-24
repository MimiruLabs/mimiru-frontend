import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');
export const usernameSchema = z.string()
  .min(3, 'Username must be at least 3 characters')
  .max(50, 'Username must be less than 50 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens');

// Title validation schemas
export const titleSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title must be less than 255 characters'),
  description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
  status: z.enum(['ongoing', 'completed', 'hiatus']).optional(),
  cover_url: z.string().url().optional().or(z.literal('')),
  original_language: z.string().max(10).optional(),
});

export const titleUpdateSchema = titleSchema.partial();

// Chapter validation schemas
export const chapterSchema = z.object({
  title_version_id: z.number().positive('Invalid title version ID'),
  chapter_number: z.number().positive('Chapter number must be greater than 0'),
  title: z.string()
    .max(255, 'Chapter title must be less than 255 characters')
    .optional(),
});

export const chapterUpdateSchema = chapterSchema.partial().omit({ title_version_id: true });

// User validation schemas
export const userProfileSchema = z.object({
  id: z.string().uuid('Invalid user ID'),
  username: usernameSchema,
  display_name: z.string()
    .max(100, 'Display name must be less than 100 characters')
    .optional(),
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  avatar_url: z.string().url().optional().or(z.literal('')),
  role: z.enum(['reader', 'author', 'translator', 'admin']).optional(),
  is_active: z.boolean().optional(),
});

export const userProfileUpdateSchema = userProfileSchema
  .partial()
  .omit({ id: true });

// Genre validation schemas
export const genreSchema = z.object({
  name: z.string()
    .min(1, 'Genre name is required')
    .max(50, 'Genre name must be less than 50 characters'),
  description: z.string()
    .max(500, 'Genre description must be less than 500 characters')
    .optional(),
});

// Page validation schemas
export const pageSchema = z.object({
  chapter_id: z.number().positive('Invalid chapter ID'),
  page_number: z.number().positive('Page number must be greater than 0'),
  image_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

// Search and pagination schemas
export const paginationSchema = z.object({
  page: z.number().positive().default(1),
  limit: z.number().positive().max(100).default(10),
});

export const searchSchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters'),
});

// Auth validation schemas
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Validation helper functions
export function validateTitle(data: unknown) {
  return titleSchema.safeParse(data);
}

export function validateTitleUpdate(data: unknown) {
  return titleUpdateSchema.safeParse(data);
}

export function validateChapter(data: unknown) {
  return chapterSchema.safeParse(data);
}

export function validateChapterUpdate(data: unknown) {
  return chapterUpdateSchema.safeParse(data);
}

export function validateUserProfile(data: unknown) {
  return userProfileSchema.safeParse(data);
}

export function validateUserProfileUpdate(data: unknown) {
  return userProfileUpdateSchema.safeParse(data);
}

export function validateGenre(data: unknown) {
  return genreSchema.safeParse(data);
}

export function validatePage(data: unknown) {
  return pageSchema.safeParse(data);
}

export function validatePagination(data: unknown) {
  return paginationSchema.safeParse(data);
}

export function validateSearch(data: unknown) {
  return searchSchema.safeParse(data);
}

export function validateSignIn(data: unknown) {
  return signInSchema.safeParse(data);
}

export function validateSignUp(data: unknown) {
  return signUpSchema.safeParse(data);
}

// Generic validation error formatter
export function formatValidationErrors(errors: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {};
  
  errors.issues.forEach((error) => {
    const path = error.path.join('.');
    formattedErrors[path] = error.message;
  });
  
  return formattedErrors;
}
