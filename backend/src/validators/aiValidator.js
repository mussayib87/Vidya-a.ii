import { z } from 'zod';

export const generateLessonAiSchema = z.object({
  topic: z.string().min(2, 'Topic is required'),
  subject: z.string().min(2, 'Subject is required'),
  classLevel: z.union([z.string(), z.number()]).transform((val) => String(val)),
  board: z.string().optional().default('Karnataka State Board'),
  language: z.string().optional().default('English'),
  learningGoal: z.string().optional().default('Master key concepts and excel in exams'),
  learningStyle: z.string().optional().default('visual'),
  pace: z.string().optional().default('medium'),
});

export const generateExplanationAiSchema = z
  .object({
    topic: z.string().optional(),
    question: z.string().optional(),
    studentQuery: z.string().optional(),
    subject: z.string().optional().default('General Science'),
    classLevel: z.union([z.string(), z.number()]).transform((val) => String(val)).optional().default('10'),
    board: z.string().optional().default('Karnataka State Board'),
    language: z.string().optional().default('English'),
    learningGoal: z.string().optional().default('Concept clarity'),
    learningStyle: z.string().optional().default('interactive'),
    pace: z.string().optional().default('medium'),
  })
  .transform((val) => ({
    ...val,
    topic: val.topic || val.question || val.studentQuery || 'General Concept',
    studentQuery: val.studentQuery || val.question || val.topic || '',
  }));

export const generateQuizAiSchema = z.object({
  topic: z.string().min(2, 'Topic is required'),
  subject: z.string().min(2, 'Subject is required'),
  classLevel: z.union([z.string(), z.number()]).transform((val) => String(val)),
  language: z.string().optional().default('English'),
  count: z.number().int().min(1).max(20).optional().default(5),
  difficulty: z.enum(['easy', 'medium', 'hard', 'adaptive']).optional().default('medium'),
});

export const generateWorksheetAiSchema = z.object({
  topic: z.string().min(2, 'Topic is required'),
  subject: z.string().min(2, 'Subject is required'),
  classLevel: z.union([z.string(), z.number()]).transform((val) => String(val)),
  language: z.string().optional().default('English'),
  count: z.number().int().min(1).max(25).optional().default(5),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional().default('medium'),
});

export const generateFlashcardsAiSchema = z.object({
  topic: z.string().min(2, 'Topic is required'),
  subject: z.string().min(2, 'Subject is required'),
  classLevel: z.union([z.string(), z.number()]).transform((val) => String(val)),
  language: z.string().optional().default('English'),
  count: z.number().int().min(1).max(30).optional().default(6),
});
