import { z } from 'zod';

export const createLessonSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().optional().default(''),
  content: z.string().min(10, 'Lesson content must be at least 10 characters long'),
  subject: z.string().min(2, 'Subject is required'),
  gradeLevel: z.union([z.string(), z.number()]).transform((val) => String(val)),
  board: z.string().optional().default('Karnataka State Board'),
  language: z.string().optional().default('English'),
  classroomId: z.string().uuid('Invalid classroom ID format').optional().nullable(),
  isPublished: z.boolean().optional().default(false),
  metadata: z.record(z.any()).optional().default({}),
});

export const updateLessonSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  content: z.string().min(10).optional(),
  subject: z.string().min(2).optional(),
  gradeLevel: z.union([z.string(), z.number()]).transform((val) => String(val)).optional(),
  board: z.string().optional(),
  language: z.string().optional(),
  classroomId: z.string().uuid().optional().nullable(),
  isPublished: z.boolean().optional(),
  metadata: z.record(z.any()).optional(),
});

export const updateProgressSchema = z.object({
  completionPercentage: z.number().min(0).max(100, 'Completion percentage must be between 0 and 100'),
  timeSpentSeconds: z.number().min(0).optional().default(0),
  status: z.enum(['not_started', 'in_progress', 'completed']).optional().default('in_progress'),
});
