-- Migration: 003_classroom_students.sql
-- Description: Student enrollments in classrooms

CREATE TABLE IF NOT EXISTS public.classroom_students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    classroom_id UUID NOT NULL REFERENCES public.classrooms(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
    UNIQUE(classroom_id, student_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_class_students_student ON public.classroom_students(student_id);
CREATE INDEX IF NOT EXISTS idx_class_students_classroom ON public.classroom_students(classroom_id);

-- Enable Row Level Security
ALTER TABLE public.classroom_students ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- 1. Students can view their enrollments
CREATE POLICY "Students can view their own enrollments"
    ON public.classroom_students FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

-- 2. Teachers can view students in their classrooms
CREATE POLICY "Teachers can view students in their classrooms"
    ON public.classroom_students FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.classrooms
            WHERE classrooms.id = classroom_students.classroom_id
            AND classrooms.teacher_id = auth.uid()
        )
    );

-- 3. Students can enroll themselves
CREATE POLICY "Students can join classrooms"
    ON public.classroom_students FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = student_id);

-- 4. Students can update/leave their enrollment
CREATE POLICY "Students can leave classroom"
    ON public.classroom_students FOR DELETE
    TO authenticated
    USING (auth.uid() = student_id);

-- 5. Teachers can remove students from their classrooms
CREATE POLICY "Teachers can remove students from their classrooms"
    ON public.classroom_students FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.classrooms
            WHERE classrooms.id = classroom_students.classroom_id
            AND classrooms.teacher_id = auth.uid()
        )
    );

-- 6. Service role full access
CREATE POLICY "Service role full access on classroom_students"
    ON public.classroom_students FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
