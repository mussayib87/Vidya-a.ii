import authService from '../services/authService.js';
import { successResponse } from '../utils/response.js';

export const authController = {
  /**
   * Register new user
   */
  async signup(req, res, next) {
    try {
      const result = await authService.signup(req.body);
      return successResponse(res, result, 'User registered successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Log in user
   */
  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);
      return successResponse(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Log out user
   */
  async logout(req, res, next) {
    try {
      const result = await authService.logout(req.token);
      return successResponse(res, result, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get current authenticated user and profile
   */
  async getMe(req, res, next) {
    try {
      return successResponse(res, {
        user: {
          id: req.user.id,
          email: req.user.email,
        },
        profile: req.profile,
      }, 'Authenticated user profile fetched');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Refresh session token
   */
  async refreshToken(req, res, next) {
    try {
      const result = await authService.refreshSession(req.body.refreshToken);
      return successResponse(res, result, 'Token refreshed successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Request password reset email
   */
  async forgotPassword(req, res, next) {
    try {
      const result = await authService.forgotPassword(req.body.email);
      return successResponse(res, result, 'Password reset instructions sent to your email');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Reset user password
   */
  async resetPassword(req, res, next) {
    try {
      const result = await authService.resetPassword(req.user.id, req.body.password);
      return successResponse(res, result, 'Password updated successfully');
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
