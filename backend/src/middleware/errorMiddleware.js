import { ApiError, errorResponse } from '../utils/response.js';
import { ERROR_CODES } from '../utils/constants.js';

/**
 * Handle 404 - Not Found routes
 */
export const notFoundHandler = (req, res, next) => {
  next(new ApiError(`Cannot ${req.method} ${req.originalUrl} - Route not found`, 404, ERROR_CODES.NOT_FOUND));
};

/**
 * Centralized error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  // Log server errors in development or if status >= 500
  if (!err.statusCode || err.statusCode >= 500) {
    console.error('💥 Unhandled Server Error:', {
      message: err.message,
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
    });
  }

  // If already an ApiError
  if (err instanceof ApiError) {
    return errorResponse(res, err.message, err.code, err.statusCode, err.details);
  }

  // Handle Multer upload errors
  if (err.name === 'MulterError') {
    return errorResponse(res, `File upload error: ${err.message}`, ERROR_CODES.BAD_REQUEST, 400);
  }

  // Handle Supabase/PostgreSQL known error codes
  if (err.code === '23505') {
    // Unique violation
    return errorResponse(res, 'A record with this unique identifier already exists.', ERROR_CODES.CONFLICT, 409);
  }
  if (err.code === '23503') {
    // Foreign key violation
    return errorResponse(res, 'Referenced record does not exist.', ERROR_CODES.BAD_REQUEST, 400);
  }
  if (err.code === 'PGRST116') {
    // Single row query returned 0 rows
    return errorResponse(res, 'Requested resource was not found.', ERROR_CODES.NOT_FOUND, 404);
  }

  // Handle generic error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const code = err.code || ERROR_CODES.INTERNAL_SERVER_ERROR;

  return errorResponse(res, message, code, statusCode, err.stack);
};
