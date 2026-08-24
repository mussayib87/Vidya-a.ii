import { supabaseAdmin } from '../config/supabase.js';
import { ApiError } from '../utils/response.js';
import { ERROR_CODES, USER_ROLES } from '../utils/constants.js';

export const profileService = {
  /**
   * Fetch profile by user ID
   */
  async getProfile(userId) {
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new ApiError('User profile not found', 404, ERROR_CODES.NOT_FOUND);
      }
      throw new ApiError(error.message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    return profile;
  },

  /**
   * Update generic profile information
   */
  async updateProfile(userId, data) {
    const updatePayload = {
      updated_at: new Date().toISOString(),
    };

    if (data.fullName !== undefined) updatePayload.full_name = data.fullName;
    if (data.avatarUrl !== undefined) updatePayload.avatar_url = data.avatarUrl;
    if (data.phoneNumber !== undefined) updatePayload.phone_number = data.phoneNumber;
    if (data.bio !== undefined) updatePayload.bio = data.bio;

    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .update(updatePayload)
      .eq('id', userId)
      .select('*')
      .single();

    if (error) {
      throw new ApiError(error.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return profile;
  },

  /**
   * Save onboarding configuration
   */
  async saveOnboarding(userId, onboardingData) {
    const {
      classLevel,
      board,
      preferredLanguage,
      subjects,
      learningGoal,
      learningStyle,
      learningPace,
      fullName,
    } = onboardingData;

    const updatePayload = {
      class_level: classLevel,
      board,
      preferred_language: preferredLanguage,
      subjects,
      learning_goal: learningGoal,
      learning_style: learningStyle,
      learning_pace: learningPace,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    };

    if (fullName) {
      updatePayload.full_name = fullName;
    }

    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .update(updatePayload)
      .eq('id', userId)
      .select('*')
      .single();

    if (error) {
      throw new ApiError(error.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return profile;
  },

  /**
   * Get user dashboard overview & aggregated statistics
   */
  async getDashboardStats(userId, role) {
    if (role === USER_ROLES.TEACHER) {
      // Teacher statistics
      const [classroomsCount, lessonsCount, quizzesCount] = await Promise.all([
        supabaseAdmin
          .from('classrooms')
          .select('id', { count: 'exact', head: true })
          .eq('teacher_id', userId),
        supabaseAdmin
          .from('lessons')
          .select('id', { count: 'exact', head: true })
          .eq('teacher_id', userId),
        supabaseAdmin
          .from('quizzes')
          .select('id', { count: 'exact', head: true })
          .eq('teacher_id', userId),
      ]);

      return {
        role: USER_ROLES.TEACHER,
        totalClassrooms: classroomsCount.count || 0,
        totalLessons: lessonsCount.count || 0,
        totalQuizzes: quizzesCount.count || 0,
      };
    }

    // Student statistics
    const [enrolledClassrooms, completedLessons, quizAttempts] = await Promise.all([
      supabaseAdmin
        .from('classroom_students')
        .select('id', { count: 'exact', head: true })
        .eq('student_id', userId)
        .eq('status', 'active'),
      supabaseAdmin
        .from('lesson_progress')
        .select('id, completion_percentage, time_spent_seconds')
        .eq('student_id', userId),
      supabaseAdmin
        .from('quiz_attempts')
        .select('score, total_questions, correct_answers, passed, created_at')
        .eq('student_id', userId)
        .order('created_at', { ascending: false }),
    ]);

    const lessonsData = completedLessons.data || [];
    const attemptsData = quizAttempts.data || [];

    const totalLessonsStarted = lessonsData.length;
    const fullyCompletedLessons = lessonsData.filter((l) => l.completion_percentage >= 100).length;
    const totalTimeSpentSeconds = lessonsData.reduce((acc, curr) => acc + (curr.time_spent_seconds || 0), 0);

    const totalQuizzesAttempted = attemptsData.length;
    const averageScore = totalQuizzesAttempted > 0
      ? Math.round(attemptsData.reduce((acc, curr) => acc + curr.score, 0) / totalQuizzesAttempted)
      : 0;

    return {
      role: USER_ROLES.STUDENT,
      enrolledClassrooms: enrolledClassrooms.count || 0,
      totalLessonsStarted,
      fullyCompletedLessons,
      totalTimeSpentSeconds,
      totalQuizzesAttempted,
      averageScore,
      recentQuizAttempts: attemptsData.slice(0, 5),
    };
  },
};

export default profileService;
