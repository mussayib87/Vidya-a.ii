import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import classroomRoutes from './routes/classroomRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import translationRoutes from './routes/translationRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import storageRoutes from './routes/storageRoutes.js';

const app = express();

// Security Middleware
app.use(helmet());

// Cross-Origin Resource Sharing
const allowedOrigins = [
  env.FRONTEND_URL,
  env.FRONTEND_URL?.replace(/\/+$/, ''),
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes(origin.replace(/\/+$/, ''))) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging
app.use(morgan(env.isProduction ? 'combined' : 'dev'));

// Body parsing with safe size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Vidya AI API is running',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// API Routes Mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/lessons', lessonRoutes);
app.use('/api/v1/classrooms', classroomRoutes);
app.use('/api/v1/quizzes', quizRoutes);
app.use('/api/v1/translation', translationRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/storage', storageRoutes);

// Catch 404
app.use(notFoundHandler);

// Centralized Error Handling
app.use(errorHandler);

export default app;
