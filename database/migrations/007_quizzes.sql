-- Migration: 007_quizzes.sql
-- Description: Quizzes and MCQ assessments

CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    classroom_id UUID REFERENCES public.classrooms(id) ON DELETE SET NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    subject TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    time_limit_minutes INTEGER NOT NULL DEFAULT 15,
    passing_score INTEGER NOT NULL DEFAULT 60,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_quizzes_subject_grade ON public.quizzes(subject, grade_level);
CREATE INDEX IF NOT EXISTS idx_quizzes_teacher ON public.quizzes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_classroom ON public.quizzes(classroom_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_published ON public.quizzes(is_published);

-- Enable Row Level Security
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. Anyone authenticated can view published quizzes
CREATE POLICY "Anyone can view published quizzes"
    ON public.quizzes FOR SELECT
    TO authenticated
    USING (is_published = true);

-- 2. Teachers can view their own quizzes
CREATE POLICY "Teachers can view own quizzes"
    ON public.quizzes FOR SELECT
    TO authenticated
    USING (auth.uid() = teacher_id);

-- 3. Teachers can manage their own quizzes
CREATE POLICY "Teachers can manage own quizzes"
    ON public.quizzes FOR ALL
    TO authenticated
    USING (auth.uid() = teacher_id)
    WITH CHECK (auth.uid() = teacher_id);

-- 4. Service role full access
CREATE POLICY "Service role full access on quizzes"
    ON public.quizzes FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
