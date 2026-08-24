import { Router } from 'express';
import quizController from '../controllers/quizController.js';
import { authenticate, optionalAuth, requireRole } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { USER_ROLES } from '../utils/constants.js';
import {
  createQuizSchema,
  updateQuizSchema,
  submitQuizAttemptSchema,
} from '../validators/quizValidator.js';

const router = Router();

router.get('/', optionalAuth, quizController.getQuizzes);

router.post(
  '/',
  authenticate,
  requireRole([USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  validate(createQuizSchema),
  quizController.createQuiz
);

router.get('/attempts/my', authenticate, quizController.getMyAttempts);

router.get('/:id', optionalAuth, quizController.getQuizById);

router.put(
  '/:id',
  authenticate,
  requireRole([USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  validate(updateQuizSchema),
  quizController.updateQuiz
);

router.delete(
  '/:id',
  authenticate,
  requireRole([USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  quizController.deleteQuiz
);

router.post(
  '/:id/attempt',
  authenticate,
  validate(submitQuizAttemptSchema),
  quizController.submitQuizAttempt
);

router.get('/:id/attempts', authenticate, quizController.getQuizAttempts);

export default router;
