import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root or current directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Supabase
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',

  // AI
  AI_PROVIDER: process.env.AI_PROVIDER || 'openai',
  AI_API_KEY: process.env.AI_API_KEY || '',
  AI_MODEL: process.env.AI_MODEL || 'gpt-4o-mini',

  // Bhashini Translation
  BHASHINI_API_KEY: process.env.BHASHINI_API_KEY || '',
  BHASHINI_USER_ID: process.env.BHASHINI_USER_ID || '',
  BHASHINI_PIPELINE_ID: process.env.BHASHINI_PIPELINE_ID || '64392f96daac500b55c543d6',
  BHASHINI_BASE_URL: process.env.BHASHINI_BASE_URL || 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline',

  // Helper check
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV !== 'production',
};

// Validate critical Supabase credentials warning in dev
if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  if (env.isProduction) {
    console.error('FATAL: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in production environment!');
  } else {
    console.warn('⚠️ WARNING: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not defined in .env. Configure them for Supabase database operations.');
  }
}

export default env;
