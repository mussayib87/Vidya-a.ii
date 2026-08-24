import storageService from '../services/storageService.js';
import { successResponse } from '../utils/response.js';

export const storageController = {
  /**
   * Upload file
   */
  async uploadFile(req, res, next) {
    try {
      const { bucket, folder } = req.body;
      const result = await storageService.uploadFile({
        file: req.file,
        bucket,
        userId: req.user.id,
        folder,
      });
      return successResponse(res, result, 'File uploaded successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get signed URL for secure download
   */
  async getSignedUrl(req, res, next) {
    try {
      const { bucket, filePath, expiresIn } = req.body;
      const result = await storageService.getSignedUrl({
        bucket,
        filePath,
        expiresIn: expiresIn ? parseInt(expiresIn, 10) : 3600,
      });
      return successResponse(res, result, 'Signed URL generated successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete file
   */
  async deleteFile(req, res, next) {
    try {
      const { bucket, filePath } = req.body;
      const result = await storageService.deleteFile({ bucket, filePath });
      return successResponse(res, result, 'File deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};

export default storageController;
