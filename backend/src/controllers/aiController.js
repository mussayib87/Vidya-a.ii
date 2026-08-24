import aiService from '../services/aiService.js';
import { successResponse } from '../utils/response.js';

export const aiController = {
  /**
   * Generate structured lesson content
   */
  async generateLesson(req, res, next) {
    try {
      const payload = {
        ...req.body,
        board: req.body.board || req.profile?.board || 'Karnataka State Board',
        language: req.body.language || req.profile?.preferred_language || 'English',
        learningGoal: req.body.learningGoal || req.profile?.learning_goal,
        learningStyle: req.body.learningStyle || req.profile?.learning_style || 'visual',
        pace: req.body.pace || req.profile?.learning_pace || 'medium',
      };

      const lessonContent = await aiService.generateLesson(payload);
      return successResponse(res, lessonContent, 'Lesson generated successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Generate personalized tutor explanation
   */
  async generateExplanation(req, res, next) {
    try {
      const payload = {
        ...req.body,
        classLevel: req.body.classLevel || req.profile?.class_level || '10',
        board: req.body.board || req.profile?.board || 'Karnataka State Board',
        language: req.body.language || req.profile?.preferred_language || 'English',
        learningGoal: req.body.learningGoal || req.profile?.learning_goal || 'Concept mastery',
        learningStyle: req.body.learningStyle || req.profile?.learning_style || 'interactive',
        pace: req.body.pace || req.profile?.learning_pace || 'medium',
      };

      const explanation = await aiService.generateExplanation(payload);
      return successResponse(res, explanation, 'Explanation generated successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Generate interactive quiz questions
   */
  async generateQuiz(req, res, next) {
    try {
      const payload = {
        ...req.body,
        classLevel: req.body.classLevel || req.profile?.class_level || '10',
        language: req.body.language || req.profile?.preferred_language || 'English',
      };

      const quiz = await aiService.generateQuiz(payload);
      return successResponse(res, quiz, 'Quiz questions generated successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Generate practice worksheet
   */
  async generateWorksheet(req, res, next) {
    try {
      const payload = {
        ...req.body,
        classLevel: req.body.classLevel || req.profile?.class_level || '10',
        language: req.body.language || req.profile?.preferred_language || 'English',
      };

      const worksheet = await aiService.generateWorksheet(payload);
      return successResponse(res, worksheet, 'Worksheet generated successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Generate flashcards
   */
  async generateFlashcards(req, res, next) {
    try {
      const payload = {
        ...req.body,
        classLevel: req.body.classLevel || req.profile?.class_level || '10',
        language: req.body.language || req.profile?.preferred_language || 'English',
      };

      const flashcards = await aiService.generateFlashcards(payload);
      return successResponse(res, flashcards, 'Flashcards generated successfully');
    } catch (error) {
      next(error);
    }
  },
};

export default aiController;
