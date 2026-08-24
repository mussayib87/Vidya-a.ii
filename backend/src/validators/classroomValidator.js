import { z } from 'zod';

export const createClassroomSchema = z.object({
  name: z.string().min(2, 'Classroom name must be at least 2 characters long'),
  subject: z.string().min(2, 'Subject is required'),
  gradeLevel: z.union([z.string(), z.number()]).transform((val) => String(val)),
  description: z.string().optional().default(''),
});

export const updateClassroomSchema = z.object({
  name: z.string().min(2).optional(),
  subject: z.string().min(2).optional(),
  gradeLevel: z.union([z.string(), z.number()]).transform((val) => String(val)).optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const joinClassroomSchema = z.object({
  code: z.string().min(4, 'Classroom code must be at least 4 characters long').max(12),
});
