import { z } from 'zod';
import { USER_ROLES } from '../utils/constants.js';

export const signupSchema = z.object({
  email: z.string().email('Valid email address is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters long'),
  role: z.enum([USER_ROLES.STUDENT, USER_ROLES.TEACHER, USER_ROLES.ADMIN]).default(USER_ROLES.STUDENT),
});

export const loginSchema = z.object({
  email: z.string().email('Valid email address is required'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Valid email address is required'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'New password must be at least 6 characters long'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});
