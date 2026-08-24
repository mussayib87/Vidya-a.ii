-- Migration: 002_classrooms.sql
-- Description: Classrooms managed by Teachers

CREATE TABLE IF NOT EXISTS public.classrooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code VARCHAR(12) UNIQUE NOT NULL,
    subject TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_classrooms_teacher ON public.classrooms(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classrooms_code ON public.classrooms(code);

-- Enable Row Level Security
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. Anyone authenticated can look up active classrooms (needed to check join code)
CREATE POLICY "Authenticated users can view active classrooms"
    ON public.classrooms FOR SELECT
    TO authenticated
    USING (is_active = true);

-- 2. Teachers can create classrooms
CREATE POLICY "Teachers can insert classrooms"
    ON public.classrooms FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = teacher_id);

-- 3. Teachers can update own classrooms
CREATE POLICY "Teachers can update own classrooms"
    ON public.classrooms FOR UPDATE
    TO authenticated
    USING (auth.uid() = teacher_id)
    WITH CHECK (auth.uid() = teacher_id);

-- 4. Teachers can delete own classrooms
CREATE POLICY "Teachers can delete own classrooms"
    ON public.classrooms FOR DELETE
    TO authenticated
    USING (auth.uid() = teacher_id);

-- 5. Service role full access
CREATE POLICY "Service role full access on classrooms"
    ON public.classrooms FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
