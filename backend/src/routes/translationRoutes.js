import { Router } from 'express';
import translationController from '../controllers/translationController.js';
import { validate } from '../middleware/validationMiddleware.js';
import { translateSchema } from '../validators/translationValidator.js';

const router = Router();

router.post('/', validate(translateSchema), translationController.translate);
router.get('/languages', translationController.getLanguages);

export default router;
