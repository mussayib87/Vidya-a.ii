-- Migration: 008_quiz_attempts.sql
-- Description: Student Quiz submissions and scoring records

CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    score NUMERIC(5,2) NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    passed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student ON public.quiz_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz ON public.quiz_attempts(quiz_id);

-- Enable Row Level Security
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. Students can view their own attempts
CREATE POLICY "Students can view own attempts"
    ON public.quiz_attempts FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

-- 2. Teachers can view attempts for quizzes they created
CREATE POLICY "Teachers can view attempts on their quizzes"
    ON public.quiz_attempts FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.quizzes
            WHERE quizzes.id = quiz_attempts.quiz_id
            AND quizzes.teacher_id = auth.uid()
        )
    );

-- 3. Students can submit attempts
CREATE POLICY "Students can insert own attempts"
    ON public.quiz_attempts FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = student_id);

-- 4. Service role full access
CREATE POLICY "Service role full access on quiz_attempts"
    ON public.quiz_attempts FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
