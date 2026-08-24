import { supabaseAdmin, supabaseAnon } from '../config/supabase.js';
import { ApiError } from '../utils/response.js';
import { ERROR_CODES, USER_ROLES } from '../utils/constants.js';

export const authService = {
  /**
   * Register a new user with Supabase Auth & create profile
   */
  async signup({ email, password, fullName, role = USER_ROLES.STUDENT }) {
    // 1. Sign up in Supabase Auth
    const { data: authData, error: authError } = await supabaseAnon.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    });

    if (authError) {
      throw new ApiError(authError.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    const user = authData.user;
    if (!user) {
      throw new ApiError('Registration failed to create user', 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
    }

    // 2. Ensure profile exists in profiles table
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: user.id,
          email: user.email,
          full_name: fullName,
          role,
          onboarding_completed: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select('*')
      .single();

    if (profileError) {
      console.error('Error inserting user profile:', profileError);
    }

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      profile: profile || {
        id: user.id,
        email: user.email,
        full_name: fullName,
        role,
        onboarding_completed: false,
      },
      session: authData.session || null,
    };
  },

  /**
   * Log in user with email and password
   */
  async login({ email, password }) {
    const { data: authData, error: authError } = await supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.session) {
      throw new ApiError('Invalid email or password', 401, ERROR_CODES.UNAUTHORIZED);
    }

    const { user, session } = authData;

    // Fetch profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error retrieving profile on login:', profileError);
    }

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      profile: profile || {
        id: user.id,
        email: user.email,
        role: user.user_metadata?.role || USER_ROLES.STUDENT,
        full_name: user.user_metadata?.full_name || '',
        onboarding_completed: false,
      },
      session: {
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        expiresAt: session.expires_at,
        expiresIn: session.expires_in,
      },
    };
  },

  /**
   * Log out user
   */
  async logout(token) {
    if (token) {
      const { error } = await supabaseAnon.auth.signOut();
      if (error) {
        console.warn('Sign out warning:', error.message);
      }
    }
    return { loggedOut: true };
  },

  /**
   * Refresh session token
   */
  async refreshSession(refreshToken) {
    const { data, error } = await supabaseAnon.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || !data.session) {
      throw new ApiError('Invalid or expired refresh token', 401, ERROR_CODES.UNAUTHORIZED);
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at,
      expiresIn: data.session.expires_in,
    };
  },

  /**
   * Send password reset email
   */
  async forgotPassword(email) {
    const { error } = await supabaseAnon.auth.resetPasswordForEmail(email);
    if (error) {
      throw new ApiError(error.message, 400, ERROR_CODES.BAD_REQUEST);
    }
    return { emailSent: true };
  },

  /**
   * Reset password for user
   */
  async resetPassword(userId, newPassword) {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

    if (error) {
      throw new ApiError(error.message, 400, ERROR_CODES.BAD_REQUEST);
    }

    return { passwordUpdated: true };
  },

  /**
   * Get current user profile details
   */
  async getCurrentUser(userId) {
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new ApiError('Profile not found', 404, ERROR_CODES.NOT_FOUND);
    }

    return profile;
  },
};

export default authService;
