-- Migration: 009_progress.sql
-- Description: Student curriculum and lesson progress tracking

CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    completion_percentage NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    last_accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(student_id, lesson_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lesson_progress_student ON public.lesson_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON public.lesson_progress(lesson_id);

-- Enable Row Level Security
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. Students can view their own progress
CREATE POLICY "Students can view own progress"
    ON public.lesson_progress FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

-- 2. Students can insert and update their own progress
CREATE POLICY "Students can upsert own progress"
    ON public.lesson_progress FOR ALL
    TO authenticated
    USING (auth.uid() = student_id)
    WITH CHECK (auth.uid() = student_id);

-- 3. Teachers can view progress of students enrolled in their classrooms
CREATE POLICY "Teachers can view student progress"
    ON public.lesson_progress FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.lessons
            WHERE lessons.id = lesson_progress.lesson_id
            AND lessons.teacher_id = auth.uid()
        )
    );

-- 4. Service role full access
CREATE POLICY "Service role full access on lesson_progress"
    ON public.lesson_progress FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
