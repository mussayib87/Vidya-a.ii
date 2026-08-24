import { supabaseAdmin } from '../config/supabase.js';
import { ApiError } from '../utils/response.js';
import { ERROR_CODES, USER_ROLES } from '../utils/constants.js';

export const quizService = {
  /**
   * Create a new quiz
   */
  async createQuiz(teacherId, quizData) {
    const {
      title,
      description = '',
      subject,
      gradeLevel,
      questions,
      timeLimitMinutes = 15,
      passingScore = 60,
      classroomId = null,
      isPublished = true,
    } = quizData;

    const { data: quiz, error } = await supabaseAdmin
      .from('quizzes')
      .insert({
        teacher_id: teacherId,
        title,
        description,
        subject,
        grade_level: String(gradeLevel),
        questions,
        time_limit_minutes: timeLimitMinutes,
        passing_score: passingScore,
        classroom_id: classroomId,
        is_published: isPublished,
      })
      .select('*')
      .single();

    if (error) {
      throw new ApiError(error.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return quiz;
  },

  /**
   * Get list of quizzes
   */
  async getQuizzes(filters = {}) {
    let query = supabaseAdmin
      .from('quizzes')
      .select('id, title, description, subject, grade_level, time_limit_minutes, passing_score, is_published, teacher_id, classroom_id, created_at');

    if (filters.subject) {
      query = query.ilike('subject', `%${filters.subject}%`);
    }
    if (filters.gradeLevel) {
      query = query.eq('grade_level', String(filters.gradeLevel));
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

    const { data: quizzes, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw new ApiError(error.message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    return quizzes || [];
  },

  /**
   * Get single quiz by ID (sanitizing correct answers for students before submission)
   */
  async getQuizById(quizId, userRole = USER_ROLES.STUDENT) {
    const { data: quiz, error } = await supabaseAdmin
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .single();

    if (error || !quiz) {
      throw new ApiError('Quiz not found', 404, ERROR_CODES.NOT_FOUND);
    }

    // If user is a student, sanitize correct answers to prevent inspecting payload
    if (userRole === USER_ROLES.STUDENT) {
      const sanitizedQuestions = (quiz.questions || []).map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options,
      }));

      return {
        ...quiz,
        questions: sanitizedQuestions,
      };
    }

    return quiz;
  },

  /**
   * Update quiz
   */
  async updateQuiz(quizId, userId, userRole, updateData) {
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('quizzes')
      .select('teacher_id')
      .eq('id', quizId)
      .single();

    if (fetchError || !existing) {
      throw new ApiError('Quiz not found', 404, ERROR_CODES.NOT_FOUND);
    }

    if (userRole !== USER_ROLES.ADMIN && existing.teacher_id !== userId) {
      throw new ApiError('You do not have permission to modify this quiz', 403, ERROR_CODES.FORBIDDEN);
    }

    const payload = {
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    const { data: updatedQuiz, error } = await supabaseAdmin
      .from('quizzes')
      .update(payload)
      .eq('id', quizId)
      .select('*')
      .single();

    if (error) {
      throw new ApiError(error.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return updatedQuiz;
  },

  /**
   * Delete quiz
   */
  async deleteQuiz(quizId, userId, userRole) {
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('quizzes')
      .select('teacher_id')
      .eq('id', quizId)
      .single();

    if (fetchError || !existing) {
      throw new ApiError('Quiz not found', 404, ERROR_CODES.NOT_FOUND);
    }

    if (userRole !== USER_ROLES.ADMIN && existing.teacher_id !== userId) {
      throw new ApiError('You do not have permission to delete this quiz', 403, ERROR_CODES.FORBIDDEN);
    }

    const { error } = await supabaseAdmin
      .from('quizzes')
      .delete()
      .eq('id', quizId);

    if (error) {
      throw new ApiError(error.message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    return { deleted: true };
  },

  /**
   * Submit quiz attempt, auto-grade, record attempt and return results
   */
  async submitQuizAttempt(quizId, studentId, { answers, timeSpentSeconds = 0 }) {
    // 1. Fetch full quiz with answers
    const { data: quiz, error: quizError } = await supabaseAdmin
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .single();

    if (quizError || !quiz) {
      throw new ApiError('Quiz not found', 404, ERROR_CODES.NOT_FOUND);
    }

    const questions = quiz.questions || [];
    const totalQuestions = questions.length;

    if (totalQuestions === 0) {
      throw new ApiError('Quiz contains no questions to evaluate', 400, ERROR_CODES.BAD_REQUEST);
    }

    let correctAnswersCount = 0;
    const detailedReview = [];

    questions.forEach((q, index) => {
      const questionKey = q.id !== undefined ? String(q.id) : String(index);
      const studentAnswer = Array.isArray(answers) ? answers[index] : answers[questionKey];

      const isCorrect =
        String(studentAnswer).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();

      if (isCorrect) {
        correctAnswersCount++;
      }

      detailedReview.push({
        questionId: q.id || index + 1,
        question: q.question,
        studentAnswer: studentAnswer !== undefined ? studentAnswer : null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation || '',
      });
    });

    const scorePercentage = Math.round((correctAnswersCount / totalQuestions) * 100);
    const passed = scorePercentage >= (quiz.passing_score || 60);

    // 2. Insert into quiz_attempts
    const { data: attempt, error: attemptError } = await supabaseAdmin
      .from('quiz_attempts')
      .insert({
        quiz_id: quizId,
        student_id: studentId,
        answers,
        score: scorePercentage,
        total_questions: totalQuestions,
        correct_answers: correctAnswersCount,
        passed,
        completed_at: new Date().toISOString(),
      })
      .select('*')
      .single();

    if (attemptError) {
      throw new ApiError(attemptError.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return {
      attemptId: attempt.id,
      quizId,
      score: scorePercentage,
      totalQuestions,
      correctAnswers: correctAnswersCount,
      passed,
      passingScore: quiz.passing_score,
      timeSpentSeconds,
      review: detailedReview,
    };
  },

  /**
   * Get all attempts for a quiz (teachers see all students; student sees their own)
   */
  async getQuizAttempts(quizId, userId, userRole) {
    let query = supabaseAdmin
      .from('quiz_attempts')
      .select(`
        *,
        student:profiles!quiz_attempts_student_id_fkey (id, full_name, email, avatar_url)
      `)
      .eq('quiz_id', quizId);

    if (userRole === USER_ROLES.STUDENT) {
      query = query.eq('student_id', userId);
    }

    const { data: attempts, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw new ApiError(error.message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    return attempts || [];
  },

  /**
   * Get all attempts of current student across all quizzes
   */
  async getStudentAttempts(studentId) {
    const { data: attempts, error } = await supabaseAdmin
      .from('quiz_attempts')
      .select(`
        *,
        quiz:quizzes!quiz_attempts_quiz_id_fkey (id, title, subject, grade_level, passing_score)
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new ApiError(error.message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    return attempts || [];
  },
};

export default quizService;
