import { supabaseAdmin } from '../config/supabase.js';
import { ApiError } from '../utils/response.js';
import { ERROR_CODES } from '../utils/constants.js';

/**
 * Middleware to authenticate requests using Supabase JWT token
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError('Authorization token required in Bearer format', 401, ERROR_CODES.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new ApiError('Invalid token format', 401, ERROR_CODES.UNAUTHORIZED);
    }

    // Verify token with Supabase Auth
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      throw new ApiError('Invalid or expired authentication token', 401, ERROR_CODES.UNAUTHORIZED);
    }

    // Fetch user profile from database
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching user profile:', profileError);
    }

    req.token = token;
    req.user = user;
    req.profile = profile || {
      id: user.id,
      email: user.email,
      role: user.user_metadata?.role || 'student',
      full_name: user.user_metadata?.full_name || '',
      onboarding_completed: false,
    };

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to restrict access based on user role(s)
 * @param {string|string[]} roles
 */
export const requireRole = (roles) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return (req, res, next) => {
    if (!req.profile || !req.profile.role) {
      return next(new ApiError('User profile or role not found', 403, ERROR_CODES.FORBIDDEN));
    }

    if (!allowedRoles.includes(req.profile.role) && req.profile.role !== 'admin') {
      return next(
        new ApiError(
          `Access forbidden: requires one of [${allowedRoles.join(', ')}] role`,
          403,
          ERROR_CODES.FORBIDDEN
        )
      );
    }

    next();
  };
};

/**
 * Optional authentication middleware - attaches user if token is present, does not fail if absent
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const { data: { user } } = await supabaseAdmin.auth.getUser(token);
      if (user) {
        req.token = token;
        req.user = user;
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        req.profile = profile || null;
      }
    }
  } catch (err) {
    // Non-blocking for optional auth
    req.user = null;
    req.profile = null;
  }
  next();
};
