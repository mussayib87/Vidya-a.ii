import { z } from 'zod';

export const quizQuestionSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  question: z.string().min(3, 'Question text is required'),
  options: z.array(z.string()).min(2, 'At least 2 options are required'),
  correctAnswer: z.union([z.string(), z.number()]),
  explanation: z.string().optional().default(''),
});

export const createQuizSchema = z.object({
  title: z.string().min(3, 'Quiz title must be at least 3 characters long'),
  description: z.string().optional().default(''),
  subject: z.string().min(2, 'Subject is required'),
  gradeLevel: z.union([z.string(), z.number()]).transform((val) => String(val)),
  questions: z.array(quizQuestionSchema).min(1, 'At least one question is required'),
  timeLimitMinutes: z.number().int().min(1).max(180).optional().default(15),
  passingScore: z.number().min(0).max(100).optional().default(60),
  classroomId: z.string().uuid('Invalid classroom ID format').optional().nullable(),
  isPublished: z.boolean().optional().default(true),
});

export const updateQuizSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  subject: z.string().min(2).optional(),
  gradeLevel: z.union([z.string(), z.number()]).transform((val) => String(val)).optional(),
  questions: z.array(quizQuestionSchema).min(1).optional(),
  timeLimitMinutes: z.number().int().min(1).max(180).optional(),
  passingScore: z.number().min(0).max(100).optional(),
  classroomId: z.string().uuid().optional().nullable(),
  isPublished: z.boolean().optional(),
});

export const submitQuizAttemptSchema = z.object({
  answers: z.record(z.any()).or(z.array(z.any())),
  timeSpentSeconds: z.number().min(0).optional().default(0),
});
