import { supabaseAdmin } from '../config/supabase.js';
import { ApiError } from '../utils/response.js';
import { ERROR_CODES, USER_ROLES } from '../utils/constants.js';

export const lessonService = {
  /**
   * Create a new lesson
   */
  async createLesson(teacherId, lessonData) {
    const {
      title,
      description = '',
      content,
      subject,
      gradeLevel,
      board = 'Karnataka State Board',
      language = 'English',
      classroomId = null,
      isPublished = false,
      metadata = {},
    } = lessonData;

    const { data: lesson, error } = await supabaseAdmin
      .from('lessons')
      .insert({
        teacher_id: teacherId,
        title,
        description,
        content,
        subject,
        grade_level: gradeLevel,
        board,
        language,
        classroom_id: classroomId,
        is_published: isPublished,
        metadata,
      })
      .select('*')
      .single();

    if (error) {
      throw new ApiError(error.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return lesson;
  },

  /**
   * Get list of lessons with optional filtering
   */
  async getLessons(filters = {}) {
    let query = supabaseAdmin
      .from('lessons')
      .select('id, title, description, subject, grade_level, board, language, is_published, teacher_id, classroom_id, created_at, updated_at');

    if (filters.subject) {
      query = query.ilike('subject', `%${filters.subject}%`);
    }
    if (filters.gradeLevel) {
      query = query.eq('grade_level', String(filters.gradeLevel));
    }
    if (filters.board) {
      query = query.eq('board', filters.board);
    }
    if (filters.language) {
      query = query.eq('language', filters.language);
    }
    if (filters.classroomId) {
      query = query.eq('classroom_id', filters.classroomId);
    }
    if (filters.teacherId) {
      query = query.eq('teacher_id', filters.teacherId);
    }
    if (filters.isPublished !== undefined) {
      query = query.eq('is_published', filters.isPublished);
    }

    const { data: lessons, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw new ApiError(error.message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    return lessons || [];
  },

  /**
   * Get single lesson by ID, optionally merging student's progress
   */
  async getLessonById(lessonId, studentId = null) {
    const { data: lesson, error } = await supabaseAdmin
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single();

    if (error || !lesson) {
      throw new ApiError('Lesson not found', 404, ERROR_CODES.NOT_FOUND);
    }

    let studentProgress = null;
    if (studentId) {
      const { data: progress } = await supabaseAdmin
        .from('lesson_progress')
        .select('*')
        .eq('lesson_id', lessonId)
        .eq('student_id', studentId)
        .single();

      studentProgress = progress || null;
    }

    return {
      ...lesson,
      progress: studentProgress,
    };
  },

  /**
   * Update lesson (restricted to owner or admin)
   */
  async updateLesson(lessonId, userId, userRole, updateData) {
    // 1. Verify existence & ownership
    const { data: existingLesson, error: fetchError } = await supabaseAdmin
      .from('lessons')
      .select('teacher_id')
      .eq('id', lessonId)
      .single();

    if (fetchError || !existingLesson) {
      throw new ApiError('Lesson not found', 404, ERROR_CODES.NOT_FOUND);
    }

    if (userRole !== USER_ROLES.ADMIN && existingLesson.teacher_id !== userId) {
      throw new ApiError('You do not have permission to modify this lesson', 403, ERROR_CODES.FORBIDDEN);
    }

    const payload = {
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    const { data: updatedLesson, error: updateError } = await supabaseAdmin
      .from('lessons')
      .update(payload)
      .eq('id', lessonId)
      .select('*')
      .single();

    if (updateError) {
      throw new ApiError(updateError.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return updatedLesson;
  },

  /**
   * Delete lesson (restricted to owner or admin)
   */
  async deleteLesson(lessonId, userId, userRole) {
    const { data: existingLesson, error: fetchError } = await supabaseAdmin
      .from('lessons')
      .select('teacher_id')
      .eq('id', lessonId)
      .single();

    if (fetchError || !existingLesson) {
      throw new ApiError('Lesson not found', 404, ERROR_CODES.NOT_FOUND);
    }

    if (userRole !== USER_ROLES.ADMIN && existingLesson.teacher_id !== userId) {
      throw new ApiError('You do not have permission to delete this lesson', 403, ERROR_CODES.FORBIDDEN);
    }

    const { error: deleteError } = await supabaseAdmin
      .from('lessons')
      .delete()
      .eq('id', lessonId);

    if (deleteError) {
      throw new ApiError(deleteError.message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    return { deleted: true };
  },

  /**
   * Publish or unpublish a lesson
   */
  async publishLesson(lessonId, userId, userRole, isPublished) {
    return await this.updateLesson(lessonId, userId, userRole, { is_published: isPublished });
  },

  /**
   * Update student lesson progress
   */
  async updateProgress(lessonId, studentId, progressData) {
    const { completionPercentage, timeSpentSeconds = 0, status = 'in_progress' } = progressData;

    const { data: progress, error } = await supabaseAdmin
      .from('lesson_progress')
      .upsert(
        {
          student_id: studentId,
          lesson_id: lessonId,
          completion_percentage: completionPercentage,
          time_spent_seconds: timeSpentSeconds,
          status: completionPercentage >= 100 ? 'completed' : status,
          last_accessed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'student_id,lesson_id' }
      )
      .select('*')
      .single();

    if (error) {
      throw new ApiError(error.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return progress;
  },

  /**
   * Get progress of a specific lesson for a student
   */
  async getProgress(lessonId, studentId) {
    const { data: progress, error } = await supabaseAdmin
      .from('lesson_progress')
      .select('*')
      .eq('lesson_id', lessonId)
      .eq('student_id', studentId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new ApiError(error.message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    return progress || {
      lesson_id: lessonId,
      student_id: studentId,
      completion_percentage: 0,
      time_spent_seconds: 0,
      status: 'not_started',
    };
  },
};

export default lessonService;
