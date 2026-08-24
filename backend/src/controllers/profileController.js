import profileService from '../services/profileService.js';
import { successResponse } from '../utils/response.js';

export const profileController = {
  /**
   * Get user's profile
   */
  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfile(req.user.id);
      return successResponse(res, profile, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update profile details
   */
  async updateProfile(req, res, next) {
    try {
      const updatedProfile = await profileService.updateProfile(req.user.id, req.body);
      return successResponse(res, updatedProfile, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Save student onboarding preferences
   */
  async saveOnboarding(req, res, next) {
    try {
      const updatedProfile = await profileService.saveOnboarding(req.user.id, req.body);
      return successResponse(res, updatedProfile, 'Onboarding information saved successfully');
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get role-tailored dashboard analytics & summary
   */
  async getDashboard(req, res, next) {
    try {
      const dashboardStats = await profileService.getDashboardStats(req.user.id, req.profile.role);
      return successResponse(res, dashboardStats, 'Dashboard stats retrieved successfully');
    } catch (error) {
      next(error);
    }
  },
};

export default profileController;
