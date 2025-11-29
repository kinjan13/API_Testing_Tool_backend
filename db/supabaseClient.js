import { createClient } from "@supabase/supabase-js";

let supabaseInstance = null;

export function getSupabase() {
  if (!supabaseInstance) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;
    
    if (!url || !key) {
      throw new Error("Supabase credentials not configured in .env");
    }
    
    supabaseInstance = createClient(url, key);
  }
  return supabaseInstance;
}

// For backward compatibility, export a getter
export const supabase = { 
  get auth() { return getSupabase().auth; },
  from(...args) { return getSupabase().from(...args); }
};
