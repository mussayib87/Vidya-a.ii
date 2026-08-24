import { ERROR_CODES } from './constants.js';

export class ApiError extends Error {
  constructor(message, statusCode = 500, code = ERROR_CODES.INTERNAL_SERVER_ERROR, details = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad request', details = null) {
    return new ApiError(message, 400, ERROR_CODES.BAD_REQUEST, details);
  }

  static unauthorized(message = 'Unauthorized access') {
    return new ApiError(message, 401, ERROR_CODES.UNAUTHORIZED);
  }

  static forbidden(message = 'Forbidden action') {
    return new ApiError(message, 403, ERROR_CODES.FORBIDDEN);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(message, 404, ERROR_CODES.NOT_FOUND);
  }

  static conflict(message = 'Resource conflict') {
    return new ApiError(message, 409, ERROR_CODES.CONFLICT);
  }

  static validation(message = 'Validation failed', details = null) {
    return new ApiError(message, 422, ERROR_CODES.VALIDATION_ERROR, details);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
  }

  static external(message = 'External service failed', details = null) {
    return new ApiError(message, 502, ERROR_CODES.EXTERNAL_SERVICE_ERROR, details);
  }
}

/**
 * Standard success response helper
 */
export const successResponse = (res, data = {}, message = 'Operation successful', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

/**
 * Standard error response helper
 */
export const errorResponse = (
  res,
  message = 'An unexpected error occurred',
  code = ERROR_CODES.INTERNAL_SERVER_ERROR,
  statusCode = 500,
  details = null
) => {
  const payload = {
    success: false,
    error: {
      code,
      message,
    },
  };

  if (details && process.env.NODE_ENV !== 'production') {
    payload.error.details = details;
  }

  return res.status(statusCode).json(payload);
};
