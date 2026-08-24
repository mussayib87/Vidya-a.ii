import { Router } from 'express';
import classroomController from '../controllers/classroomController.js';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { USER_ROLES } from '../utils/constants.js';
import {
  createClassroomSchema,
  joinClassroomSchema,
} from '../validators/classroomValidator.js';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  requireRole([USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  validate(createClassroomSchema),
  classroomController.createClassroom
);

router.get(
  '/teacher',
  requireRole([USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  classroomController.getTeacherClassrooms
);

router.get('/student', classroomController.getStudentClassrooms);

router.post('/join', validate(joinClassroomSchema), classroomController.joinClassroom);

router.get('/:id', classroomController.getClassroomById);

router.post('/:id/leave', classroomController.leaveClassroom);

router.delete(
  '/:id/students/:studentId',
  requireRole([USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  classroomController.removeStudent
);

export default router;
