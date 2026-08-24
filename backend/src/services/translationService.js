import { BhashiniTranslationService } from '../../../services/translation/translationService.js';
import { env } from '../config/env.js';
import { SUPPORTED_LANGUAGES, LANGUAGE_CODES } from '../utils/constants.js';

const bhashiniService = new BhashiniTranslationService({
  apiKey: env.BHASHINI_API_KEY,
  userId: env.BHASHINI_USER_ID,
  pipelineId: env.BHASHINI_PIPELINE_ID,
  baseUrl: env.BHASHINI_BASE_URL,
});

export const translationService = {
  /**
   * Translate text using Bhashini
   */
  async translate({ text, sourceLanguage, targetLanguage }) {
    return await bhashiniService.translate({
      text,
      sourceLanguage,
      targetLanguage,
    });
  },

  /**
   * Get list of supported languages
   */
  getSupportedLanguages() {
    return {
      languages: SUPPORTED_LANGUAGES,
      codes: LANGUAGE_CODES,
    };
  },
};

export default translationService;
