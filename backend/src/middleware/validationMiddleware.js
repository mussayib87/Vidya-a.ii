import { ZodError } from 'zod';
import { ApiError } from '../utils/response.js';
import { ERROR_CODES } from '../utils/constants.js';

/**
 * Validates request body, query, or params using a Zod schema
 * @param {object} schemas - { body?: ZodSchema, query?: ZodSchema, params?: ZodSchema } | ZodSchema
 */
export const validate = (schemas) => {
  return async (req, res, next) => {
    try {
      // If a single Zod schema is provided, assume it's for req.body
      if (schemas && typeof schemas.parseAsync === 'function') {
        req.body = await schemas.parseAsync(req.body);
        return next();
      }

      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }

      if (schemas.query) {
        req.query = await schemas.query.parseAsync(req.query);
      }

      if (schemas.params) {
        req.params = await schemas.params.parseAsync(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        const message = details.map((d) => `${d.field}: ${d.message}`).join(', ') || 'Validation error';
        return next(new ApiError(message, 422, ERROR_CODES.VALIDATION_ERROR, details));
      }
      next(error);
    }
  };
};

export default validate;
