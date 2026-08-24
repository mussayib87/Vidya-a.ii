import { Router } from 'express';
import profileController from '../controllers/profileController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { updateProfileSchema, onboardingSchema } from '../validators/profileValidator.js';

const router = Router();

// All profile endpoints require authentication
router.use(authenticate);

router.get('/', profileController.getProfile);
router.put('/', validate(updateProfileSchema), profileController.updateProfile);
router.put('/onboarding', validate(onboardingSchema), profileController.saveOnboarding);
router.get('/dashboard', profileController.getDashboard);

export default router;
