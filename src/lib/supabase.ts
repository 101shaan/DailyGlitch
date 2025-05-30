import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import { mysteries } from '../data/mockData';

// Try to get environment variables
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

// Check if we have both required environment variables
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Create a mock supabase client if environment variables are missing
const mockSupabaseClient = {
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: mysteries.find(m => m.id === '1'), error: null }),
      }),
      neq: () => ({
        async single() { return { data: mysteries.find(m => m.id === '1'), error: null }; }
      }),
      lte: () => ({
        order: () => ({
          limit: () => ({
            single: async () => {
              // Find the mystery with the latest date that's before or equal to today
              const today = new Date().toISOString().split('T')[0];
              const availableMysteries = mysteries.filter(m => m.date <= today);
              const latestMystery = availableMysteries.sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
              )[0] || null;
              return { data: latestMystery, error: null };
            }
          })
        })
      }),
      or: () => ({
        order: () => ({ data: mysteries, error: null })
      }),
      order: () => ({ data: mysteries, error: null }),
    }),
    delete: () => ({
      neq: () => ({ error: null })
    }),
    insert: () => ({ error: null })
  })
} as unknown as ReturnType<typeof createClient<Database>>;

// Export either the real Supabase client or a mock client
export const supabase = isSupabaseConfigured 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : mockSupabaseClient;

// Log which mode we're in
console.log(`Using ${isSupabaseConfigured ? 'real' : 'mock'} Supabase client`);