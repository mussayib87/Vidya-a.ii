import lessonService from '../services/lessonService.js';
import { successResponse } from '../utils/response.js';

export const lessonController = {
  /**
   * Create a new lesson
   */
  async createLesson(req, res, next) {
    try {
      const lesson = await lessonService.createLesson(req.user.id, req.body);
      return successResponse(res, lesson, 'Lesson created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  /**
   * List lessons with query filters
   */
  async getLessons(req, res, next) {
    try {
      const { subject, gradeLevel, board, language, classroomId, teacherId, isPublished } = req.query;
      const filters = {
        subject,
        gradeLevel,
        board,
        language,
        classroomId,
        teacherId,
        isPublished: isPublished !== undefined ? isPublished === 'true' : undefined,
      };

      const lessons = await lessonService.getLessons(filters);
      return successResponse(res, lessons, 'Lessons retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get single lesson details with student's progress
   */
  async getLessonById(req, res, next) {
    try {
      const lessonId = req.params.id;
      const studentId = req.user ? req.user.id : null;
      const lesson = await lessonService.getLessonById(lessonId, studentId);
      return successResponse(res, lesson, 'Lesson retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update lesson
   */
  async updateLesson(req, res, next) {
    try {
      const lessonId = req.params.id;
      const updatedLesson = await lessonService.updateLesson(
        lessonId,
        req.user.id,
        req.profile.role,
        req.body
      );
      return successResponse(res, updatedLesson, 'Lesson updated successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete lesson
   */
  async deleteLesson(req, res, next) {
    try {
      const lessonId = req.params.id;
      const result = await lessonService.deleteLesson(lessonId, req.user.id, req.profile.role);
      return successResponse(res, result, 'Lesson deleted successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Toggle lesson publication status
   */
  async publishLesson(req, res, next) {
    try {
      const lessonId = req.params.id;
      const isPublished = req.body.isPublished !== undefined ? req.body.isPublished : true;
      const updatedLesson = await lessonService.publishLesson(
        lessonId,
        req.user.id,
        req.profile.role,
        isPublished
      );
      return successResponse(res, updatedLesson, `Lesson ${isPublished ? 'published' : 'unpublished'} successfully`);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update student lesson completion progress
   */
  async updateProgress(req, res, next) {
    try {
      const lessonId = req.params.id;
      const progress = await lessonService.updateProgress(lessonId, req.user.id, req.body);
      return successResponse(res, progress, 'Lesson progress updated successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get student lesson progress
   */
  async getProgress(req, res, next) {
    try {
      const lessonId = req.params.id;
      const progress = await lessonService.getProgress(lessonId, req.user.id);
      return successResponse(res, progress, 'Lesson progress fetched');
    } catch (error) {
      next(error);
    }
  },
};

export default lessonController;
