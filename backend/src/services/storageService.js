import { supabaseAdmin } from '../config/supabase.js';
import { ApiError } from '../utils/response.js';
import { ERROR_CODES, STORAGE_BUCKETS } from '../utils/constants.js';
import path from 'path';
import crypto from 'crypto';

export const storageService = {
  /**
   * Upload file buffer to specified Supabase Storage bucket
   */
  async uploadFile({ file, bucket = STORAGE_BUCKETS.EDUCATIONAL_FILES, userId, folder = 'uploads' }) {
    if (!file) {
      throw new ApiError('No file provided for upload', 400, ERROR_CODES.BAD_REQUEST);
    }

    // Size limit check (max 25MB for educational materials, 5MB for avatars)
    const maxSizeBytes = bucket === STORAGE_BUCKETS.AVATARS ? 5 * 1024 * 1024 : 25 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      throw new ApiError(`File exceeds maximum allowed size of ${maxSizeBytes / (1024 * 1024)}MB`, 400, ERROR_CODES.BAD_REQUEST);
    }

    const fileExt = path.extname(file.originalname);
    const uniqueFileName = `${folder}/${userId || 'system'}/${Date.now()}-${crypto.randomBytes(6).toString('hex')}${fileExt}`;

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(uniqueFileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new ApiError(`Storage upload failed: ${error.message}`, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    // Generate public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(uniqueFileName);

    return {
      filePath: uniqueFileName,
      bucket,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      publicUrl: publicUrlData?.publicUrl || '',
    };
  },

  /**
   * Create a temporary signed URL for private file access
   */
  async getSignedUrl({ bucket = STORAGE_BUCKETS.EDUCATIONAL_FILES, filePath, expiresIn = 3600 }) {
    if (!filePath) {
      throw new ApiError('File path is required', 400, ERROR_CODES.BAD_REQUEST);
    }

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      throw new ApiError(`Error generating signed URL: ${error.message}`, 400, ERROR_CODES.BAD_REQUEST);
    }

    return {
      signedUrl: data.signedUrl,
      expiresIn,
    };
  },

  /**
   * Delete file from storage
   */
  async deleteFile({ bucket = STORAGE_BUCKETS.EDUCATIONAL_FILES, filePath }) {
    if (!filePath) {
      throw new ApiError('File path is required', 400, ERROR_CODES.BAD_REQUEST);
    }

    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw new ApiError(`Failed to delete file from storage: ${error.message}`, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    return { deleted: true, filePath };
  },
};

export default storageService;
