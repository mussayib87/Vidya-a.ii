import { LANGUAGE_CODES } from '../../backend/src/utils/constants.js';

export class BhashiniTranslationService {
  constructor(config = {}) {
    this.apiKey = config.apiKey || process.env.BHASHINI_API_KEY || '';
    this.userId = config.userId || process.env.BHASHINI_USER_ID || '';
    this.pipelineId = config.pipelineId || process.env.BHASHINI_PIPELINE_ID || '64392f96daac500b55c543d6';
    this.baseUrl = config.baseUrl || process.env.BHASHINI_BASE_URL || 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline';
  }

  /**
   * Normalize human language names or codes to standard 2-letter ISO code
   */
  normalizeLangCode(lang) {
    if (!lang) return 'en';
    const trimmed = lang.trim();
    if (trimmed.length === 2) return trimmed.toLowerCase();
    
    const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    return LANGUAGE_CODES[capitalized] || trimmed.toLowerCase();
  }

  /**
   * Translate text between Indian languages using Bhashini ULCA API
   */
  async translate({ text, sourceLanguage = 'en', targetLanguage = 'kn' }) {
    const src = this.normalizeLangCode(sourceLanguage);
    const tgt = this.normalizeLangCode(targetLanguage);

    if (src === tgt) {
      return {
        sourceText: text,
        translatedText: text,
        sourceLanguage: src,
        targetLanguage: tgt,
        provider: 'bhashini',
      };
    }

    if (!this.apiKey || !this.userId) {
      console.warn('⚠️ BHASHINI API credentials missing. Running in passthrough/fallback mode.');
      return {
        sourceText: text,
        translatedText: `[Translated (${tgt})]: ${text}`,
        sourceLanguage: src,
        targetLanguage: tgt,
        provider: 'bhashini-fallback',
        warning: 'Bhashini credentials not set in environment.',
      };
    }

    try {
      const payload = {
        pipelineTasks: [
          {
            taskType: 'translation',
            config: {
              language: {
                sourceLanguage: src,
                targetLanguage: tgt,
              },
            },
          },
        ],
        inputData: {
          input: [
            {
              source: text,
            },
          ],
        },
      };

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.apiKey,
          'userID': this.userId,
          'ulcaApiKey': this.apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      const pipelineResponse = responseData?.pipelineResponse;
      const translationTask = pipelineResponse?.find((t) => t.taskType === 'translation');
      const translatedText = translationTask?.output?.[0]?.target || text;

      return {
        sourceText: text,
        translatedText,
        sourceLanguage: src,
        targetLanguage: tgt,
        provider: 'bhashini',
      };
    } catch (error) {
      console.error('Bhashini Translation Error:', error.message);
      
      // Return structured response with fallback instead of crashing
      return {
        sourceText: text,
        translatedText: text,
        sourceLanguage: src,
        targetLanguage: tgt,
        provider: 'bhashini',
        error: error.message,
      };
    }
  }
}

export default new BhashiniTranslationService();
