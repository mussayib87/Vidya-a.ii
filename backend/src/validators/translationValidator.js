import { z } from 'zod';

export const translateSchema = z.object({
  text: z.string().min(1, 'Text to translate cannot be empty'),
  sourceLanguage: z.string().optional().default('en'),
  targetLanguage: z.string().min(2, 'Target language is required'),
});
