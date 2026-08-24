import { supabaseAdmin } from '../config/supabase.js';
import { ApiError } from '../utils/response.js';
import { ERROR_CODES, USER_ROLES } from '../utils/constants.js';
import crypto from 'crypto';

/**
 * Generate unique 6-character alphanumeric classroom code
 */
const generateClassroomCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

export const classroomService = {
  /**
   * Create a new classroom (teachers only)
   */
  async createClassroom(teacherId, data) {
    const { name, subject, gradeLevel, description = '' } = data;

    let code = generateClassroomCode();
    // Check collision
    const { data: existing } = await supabaseAdmin
      .from('classrooms')
      .select('id')
      .eq('code', code)
      .single();

    if (existing) {
      code = generateClassroomCode();
    }

    const { data: classroom, error } = await supabaseAdmin
      .from('classrooms')
      .insert({
        name,
        subject,
        grade_level: String(gradeLevel),
        description,
        code,
        teacher_id: teacherId,
        is_active: true,
      })
      .select('*')
      .single();

    if (error) {
      throw new ApiError(error.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return classroom;
  },

  /**
   * Join a classroom by code (students)
   */
  async joinClassroom(studentId, code) {
    const cleanCode = code.trim().toUpperCase();

    // 1. Find classroom
    const { data: classroom, error: classError } = await supabaseAdmin
      .from('classrooms')
      .select('*')
      .eq('code', cleanCode)
      .eq('is_active', true)
      .single();

    if (classError || !classroom) {
      throw new ApiError('Invalid or inactive classroom code', 404, ERROR_CODES.NOT_FOUND);
    }

    // 2. Check if already enrolled
    const { data: existingEnrollment } = await supabaseAdmin
      .from('classroom_students')
      .select('*')
      .eq('classroom_id', classroom.id)
      .eq('student_id', studentId)
      .single();

    if (existingEnrollment) {
      if (existingEnrollment.status === 'active') {
        throw new ApiError('You are already enrolled in this classroom', 409, ERROR_CODES.CONFLICT);
      } else {
        // Reactivate
        const { data: reactivated } = await supabaseAdmin
          .from('classroom_students')
          .update({ status: 'active', joined_at: new Date().toISOString() })
          .eq('id', existingEnrollment.id)
          .select('*')
          .single();
        return { classroom, enrollment: reactivated };
      }
    }

    // 3. Enroll
    const { data: enrollment, error: enrollError } = await supabaseAdmin
      .from('classroom_students')
      .insert({
        classroom_id: classroom.id,
        student_id: studentId,
        status: 'active',
      })
      .select('*')
      .single();

    if (enrollError) {
      throw new ApiError(enrollError.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return { classroom, enrollment };
  },

  /**
   * Leave a classroom
   */
  async leaveClassroom(studentId, classroomId) {
    const { error } = await supabaseAdmin
      .from('classroom_students')
      .delete()
      .eq('classroom_id', classroomId)
      .eq('student_id', studentId);

    if (error) {
      throw new ApiError(error.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return { left: true };
  },

  /**
   * Get teacher's classrooms
   */
  async getTeacherClassrooms(teacherId) {
    const { data: classrooms, error } = await supabaseAdmin
      .from('classrooms')
      .select(`
        *,
        classroom_students (
          id,
          student_id,
          joined_at,
          status,
          profiles (id, full_name, email, avatar_url)
        )
      `)
      .eq('teacher_id', teacherId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new ApiError(error.message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    return (classrooms || []).map((c) => ({
      ...c,
      studentCount: (c.classroom_students || []).filter((s) => s.status === 'active').length,
    }));
  },

  /**
   * Get student's enrolled classrooms
   */
  async getStudentClassrooms(studentId) {
    const { data: enrollments, error } = await supabaseAdmin
      .from('classroom_students')
      .select(`
        id,
        joined_at,
        status,
        classroom:classrooms (
          id,
          name,
          subject,
          grade_level,
          description,
          code,
          teacher:profiles!classrooms_teacher_id_fkey (id, full_name, email, avatar_url)
        )
      `)
      .eq('student_id', studentId)
      .eq('status', 'active');

    if (error) {
      throw new ApiError(error.message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    return (enrollments || []).map((e) => ({
      enrollmentId: e.id,
      joinedAt: e.joined_at,
      ...e.classroom,
    }));
  },

  /**
   * Get single classroom details
   */
  async getClassroomById(classroomId, userId, userRole) {
    const { data: classroom, error } = await supabaseAdmin
      .from('classrooms')
      .select(`
        *,
        teacher:profiles!classrooms_teacher_id_fkey (id, full_name, email, avatar_url),
        classroom_students (
          id,
          student_id,
          joined_at,
          status,
          student:profiles!classroom_students_student_id_fkey (id, full_name, email, avatar_url, class_level)
        )
      `)
      .eq('id', classroomId)
      .single();

    if (error || !classroom) {
      throw new ApiError('Classroom not found', 404, ERROR_CODES.NOT_FOUND);
    }

    // Access check: must be teacher owner, admin, or enrolled student
    const isTeacherOwner = classroom.teacher_id === userId;
    const isEnrolled = (classroom.classroom_students || []).some(
      (s) => s.student_id === userId && s.status === 'active'
    );

    if (userRole !== USER_ROLES.ADMIN && !isTeacherOwner && !isEnrolled) {
      throw new ApiError('You do not have access to this classroom', 403, ERROR_CODES.FORBIDDEN);
    }

    return {
      ...classroom,
      activeStudents: (classroom.classroom_students || []).filter((s) => s.status === 'active'),
    };
  },

  /**
   * Remove student from classroom (teacher only)
   */
  async removeStudent(classroomId, studentId, teacherId, userRole) {
    // Check classroom ownership
    const { data: classroom, error: classError } = await supabaseAdmin
      .from('classrooms')
      .select('teacher_id')
      .eq('id', classroomId)
      .single();

    if (classError || !classroom) {
      throw new ApiError('Classroom not found', 404, ERROR_CODES.NOT_FOUND);
    }

    if (userRole !== USER_ROLES.ADMIN && classroom.teacher_id !== teacherId) {
      throw new ApiError('You do not have permission to remove students from this classroom', 403, ERROR_CODES.FORBIDDEN);
    }

    const { error: removeError } = await supabaseAdmin
      .from('classroom_students')
      .delete()
      .eq('classroom_id', classroomId)
      .eq('student_id', studentId);

    if (removeError) {
      throw new ApiError(removeError.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return { removed: true };
  },
};

export default classroomService;
