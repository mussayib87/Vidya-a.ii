import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').optional(),
  avatarUrl: z.string().url('Avatar URL must be a valid URL').optional().or(z.literal('')),
  phoneNumber: z.string().optional(),
  bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
});

export const onboardingSchema = z.object({
  classLevel: z.union([z.string(), z.number()]).transform((val) => String(val)),
  board: z.string().min(2, 'Board name is required'),
  preferredLanguage: z.string().min(2, 'Preferred language is required'),
  subjects: z.array(z.string()).min(1, 'At least one subject must be selected'),
  learningGoal: z.string().min(2, 'Learning goal is required'),
  learningStyle: z.string().min(2, 'Learning style is required'),
  learningPace: z.string().min(2, 'Learning pace is required'),
  fullName: z.string().optional(),
});
