-- Migration: 011_storage.sql
-- Description: Supabase Storage bucket configurations and security policies

-- 1. Create Storage Buckets if they don't already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('educational-files', 'educational-files', true, 26214400, ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'audio/mpeg', 'audio/wav', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
    ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- 2. Storage Policies for 'educational-files'
CREATE POLICY "Public can view educational files"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'educational-files');

CREATE POLICY "Authenticated users can upload educational files"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'educational-files');

CREATE POLICY "Users can update their own educational files"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'educational-files' AND auth.uid()::text = (storage.foldername(name))[2]);

CREATE POLICY "Users can delete their own educational files"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'educational-files' AND auth.uid()::text = (storage.foldername(name))[2]);

-- 3. Storage Policies for 'avatars'
CREATE POLICY "Public can view avatars"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatar"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[2]);

CREATE POLICY "Users can delete their own avatar"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[2]);
