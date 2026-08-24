import { Router } from 'express';
import aiController from '../controllers/aiController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import {
  generateLessonAiSchema,
  generateExplanationAiSchema,
  generateQuizAiSchema,
  generateWorksheetAiSchema,
  generateFlashcardsAiSchema,
} from '../validators/aiValidator.js';

const router = Router();

router.use(optionalAuth);

router.post('/lesson', validate(generateLessonAiSchema), aiController.generateLesson);
router.post('/explanation', validate(generateExplanationAiSchema), aiController.generateExplanation);
router.post('/quiz', validate(generateQuizAiSchema), aiController.generateQuiz);
router.post('/worksheet', validate(generateWorksheetAiSchema), aiController.generateWorksheet);
router.post('/flashcards', validate(generateFlashcardsAiSchema), aiController.generateFlashcards);

export default router;
