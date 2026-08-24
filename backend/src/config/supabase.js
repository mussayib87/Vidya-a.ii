import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️ Supabase client initialized with missing URL or service key.');
}

// Admin client with full service role privileges (bypasses RLS for secure server-side logic)
export const supabaseAdmin = createClient(
  env.SUPABASE_URL || 'https://placeholder.supabase.co',
  env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Standard client for public / anon operations
export const supabaseAnon = createClient(
  env.SUPABASE_URL || 'https://placeholder.supabase.co',
  env.SUPABASE_ANON_KEY || 'placeholder-anon-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false,
    },
  }
);

/**
 * Creates a scoped Supabase client with the authenticated user's JWT
 * @param {string} accessToken
 */
export const createUserClient = (accessToken) => {
  return createClient(
    env.SUPABASE_URL || 'https://placeholder.supabase.co',
    env.SUPABASE_ANON_KEY || 'placeholder-anon-key',
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      auth: {
        persistSession: false,
      },
    }
  );
};

export default {
  supabaseAdmin,
  supabaseAnon,
  createUserClient,
};
