-- Migration: 004_lessons.sql
-- Description: Lessons curriculum content

CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    classroom_id UUID REFERENCES public.classrooms(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    subject TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    board TEXT NOT NULL DEFAULT 'Karnataka State Board',
    language TEXT NOT NULL DEFAULT 'English',
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lessons_subject_grade ON public.lessons(subject, grade_level);
CREATE INDEX IF NOT EXISTS idx_lessons_board_lang ON public.lessons(board, language);
CREATE INDEX IF NOT EXISTS idx_lessons_teacher ON public.lessons(teacher_id);
CREATE INDEX IF NOT EXISTS idx_lessons_classroom ON public.lessons(classroom_id);
CREATE INDEX IF NOT EXISTS idx_lessons_published ON public.lessons(is_published);

-- Enable Row Level Security
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. Users can view published lessons
CREATE POLICY "Anyone can view published lessons"
    ON public.lessons FOR SELECT
    TO authenticated
    USING (is_published = true);

-- 2. Teachers can view their own lessons (published or drafts)
CREATE POLICY "Teachers can view own lessons"
    ON public.lessons FOR SELECT
    TO authenticated
    USING (auth.uid() = teacher_id);

-- 3. Teachers can create lessons
CREATE POLICY "Teachers can insert lessons"
    ON public.lessons FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = teacher_id);

-- 4. Teachers can update own lessons
CREATE POLICY "Teachers can update own lessons"
    ON public.lessons FOR UPDATE
    TO authenticated
    USING (auth.uid() = teacher_id)
    WITH CHECK (auth.uid() = teacher_id);

-- 5. Teachers can delete own lessons
CREATE POLICY "Teachers can delete own lessons"
    ON public.lessons FOR DELETE
    TO authenticated
    USING (auth.uid() = teacher_id);

-- 6. Service role full access
CREATE POLICY "Service role full access on lessons"
    ON public.lessons FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
