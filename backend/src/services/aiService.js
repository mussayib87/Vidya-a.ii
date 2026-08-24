import { AiService } from '../../../ai/aiService.js';
import { env } from '../config/env.js';

const aiServiceInstance = new AiService({
  provider: env.AI_PROVIDER,
  apiKey: env.AI_API_KEY,
  model: env.AI_MODEL,
});

export const aiService = {
  /**
   * Generate structured lesson content
   */
  async generateLesson(params) {
    return await aiServiceInstance.generateLesson(params);
  },

  /**
   * Generate personalized tutor explanation
   */
  async generateExplanation(params) {
    return await aiServiceInstance.generateExplanation(params);
  },

  /**
   * Generate interactive quiz
   */
  async generateQuiz(params) {
    return await aiServiceInstance.generateQuiz(params);
  },

  /**
   * Generate practice worksheet
   */
  async generateWorksheet(params) {
    return await aiServiceInstance.generateWorksheet(params);
  },

  /**
   * Generate flashcard set
   */
  async generateFlashcards(params) {
    return await aiServiceInstance.generateFlashcards(params);
  },
};

export default aiService;
