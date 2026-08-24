import { Router } from 'express';
import lessonController from '../controllers/lessonController.js';
import { authenticate, optionalAuth, requireRole } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { USER_ROLES } from '../utils/constants.js';
import {
  createLessonSchema,
  updateLessonSchema,
  updateProgressSchema,
} from '../validators/lessonValidator.js';

const router = Router();

router.get('/', optionalAuth, lessonController.getLessons);
router.post(
  '/',
  authenticate,
  requireRole([USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  validate(createLessonSchema),
  lessonController.createLesson
);
router.get('/:id', optionalAuth, lessonController.getLessonById);
router.put(
  '/:id',
  authenticate,
  requireRole([USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  validate(updateLessonSchema),
  lessonController.updateLesson
);
router.delete(
  '/:id',
  authenticate,
  requireRole([USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  lessonController.deleteLesson
);
router.post(
  '/:id/publish',
  authenticate,
  requireRole([USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  lessonController.publishLesson
);

// Progress endpoints
router.post(
  '/:id/progress',
  authenticate,
  validate(updateProgressSchema),
  lessonController.updateProgress
);
router.get('/:id/progress', authenticate, lessonController.getProgress);

export default router;
