import translationService from '../services/translationService.js';
import { successResponse } from '../utils/response.js';

export const translationController = {
  /**
   * Translate text
   */
  async translate(req, res, next) {
    try {
      const result = await translationService.translate(req.body);
      return successResponse(res, result, 'Text translated successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get supported languages
   */
  async getLanguages(req, res, next) {
    try {
      const data = translationService.getSupportedLanguages();
      return successResponse(res, data, 'Supported languages fetched');
    } catch (error) {
      next(error);
    }
  },
};

export default translationController;
