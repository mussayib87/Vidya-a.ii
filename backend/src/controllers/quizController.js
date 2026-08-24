import quizService from '../services/quizService.js';
import { successResponse } from '../utils/response.js';

export const quizController = {
  /**
   * Create a new quiz
   */
  async createQuiz(req, res, next) {
    try {
      const quiz = await quizService.createQuiz(req.user.id, req.body);
      return successResponse(res, quiz, 'Quiz created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get list of quizzes
   */
  async getQuizzes(req, res, next) {
    try {
      const { subject, gradeLevel, classroomId, teacherId, isPublished } = req.query;
      const filters = {
        subject,
        gradeLevel,
        classroomId,
        teacherId,
        isPublished: isPublished !== undefined ? isPublished === 'true' : undefined,
      };

      const quizzes = await quizService.getQuizzes(filters);
      return successResponse(res, quizzes, 'Quizzes retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get single quiz by ID
   */
  async getQuizById(req, res, next) {
    try {
      const quizId = req.params.id;
      const userRole = req.profile ? req.profile.role : 'student';
      const quiz = await quizService.getQuizById(quizId, userRole);
      return successResponse(res, quiz, 'Quiz retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update quiz
   */
  async updateQuiz(req, res, next) {
    try {
      const quizId = req.params.id;
      const updatedQuiz = await quizService.updateQuiz(
        quizId,
        req.user.id,
        req.profile.role,
        req.body
      );
      return successResponse(res, updatedQuiz, 'Quiz updated successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete quiz
   */
  async deleteQuiz(req, res, next) {
    try {
      const quizId = req.params.id;
      const result = await quizService.deleteQuiz(quizId, req.user.id, req.profile.role);
      return successResponse(res, result, 'Quiz deleted successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Submit quiz attempt
   */
  async submitQuizAttempt(req, res, next) {
    try {
      const quizId = req.params.id;
      const result = await quizService.submitQuizAttempt(quizId, req.user.id, req.body);
      return successResponse(res, result, 'Quiz submitted and evaluated successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all attempts for a quiz
   */
  async getQuizAttempts(req, res, next) {
    try {
      const quizId = req.params.id;
      const attempts = await quizService.getQuizAttempts(
        quizId,
        req.user.id,
        req.profile.role
      );
      return successResponse(res, attempts, 'Quiz attempts retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get logged-in student's attempts
   */
  async getMyAttempts(req, res, next) {
    try {
      const attempts = await quizService.getStudentAttempts(req.user.id);
      return successResponse(res, attempts, 'Student quiz history retrieved successfully');
    } catch (error) {
      next(error);
    }
  },
};

export default quizController;
