import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a client if credentials are available, otherwise create a dummy client
// This allows the app to run even without Supabase credentials (landing page works)
// Admin features will require proper credentials
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : createClient<Database>('https://placeholder.supabase.co', 'placeholder-key');
