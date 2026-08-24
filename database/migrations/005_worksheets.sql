-- Migration: 005_worksheets.sql
-- Description: Practice worksheets for students

CREATE TABLE IF NOT EXISTS public.worksheets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    classroom_id UUID REFERENCES public.classrooms(id) ON DELETE SET NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    subject TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'English',
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_worksheets_subject ON public.worksheets(subject, grade_level);
CREATE INDEX IF NOT EXISTS idx_worksheets_teacher ON public.worksheets(teacher_id);
CREATE INDEX IF NOT EXISTS idx_worksheets_classroom ON public.worksheets(classroom_id);

-- Enable Row Level Security
ALTER TABLE public.worksheets ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Authenticated users can view worksheets"
    ON public.worksheets FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Teachers can manage own worksheets"
    ON public.worksheets FOR ALL
    TO authenticated
    USING (auth.uid() = teacher_id)
    WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Service role full access on worksheets"
    ON public.worksheets FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
