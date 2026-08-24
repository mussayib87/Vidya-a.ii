import classroomService from '../services/classroomService.js';
import { successResponse } from '../utils/response.js';

export const classroomController = {
  /**
   * Create classroom (teachers)
   */
  async createClassroom(req, res, next) {
    try {
      const classroom = await classroomService.createClassroom(req.user.id, req.body);
      return successResponse(res, classroom, 'Classroom created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Join classroom using code (students)
   */
  async joinClassroom(req, res, next) {
    try {
      const result = await classroomService.joinClassroom(req.user.id, req.body.code);
      return successResponse(res, result, 'Enrolled in classroom successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Leave classroom (students)
   */
  async leaveClassroom(req, res, next) {
    try {
      const classroomId = req.params.id;
      const result = await classroomService.leaveClassroom(req.user.id, classroomId);
      return successResponse(res, result, 'Left classroom successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get teacher's classrooms
   */
  async getTeacherClassrooms(req, res, next) {
    try {
      const classrooms = await classroomService.getTeacherClassrooms(req.user.id);
      return successResponse(res, classrooms, 'Teacher classrooms retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get student's enrolled classrooms
   */
  async getStudentClassrooms(req, res, next) {
    try {
      const classrooms = await classroomService.getStudentClassrooms(req.user.id);
      return successResponse(res, classrooms, 'Student classrooms retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get single classroom details
   */
  async getClassroomById(req, res, next) {
    try {
      const classroomId = req.params.id;
      const classroom = await classroomService.getClassroomById(
        classroomId,
        req.user.id,
        req.profile.role
      );
      return successResponse(res, classroom, 'Classroom details retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Remove a student from a classroom
   */
  async removeStudent(req, res, next) {
    try {
      const { id: classroomId, studentId } = req.params;
      const result = await classroomService.removeStudent(
        classroomId,
        studentId,
        req.user.id,
        req.profile.role
      );
      return successResponse(res, result, 'Student removed from classroom');
    } catch (error) {
      next(error);
    }
  },
};

export default classroomController;
