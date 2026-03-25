// Supabase Configuration
const SUPABASE_URL = 'https://myuevmckqkpisnjnsqfo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15dWV2bWNrcWtwaXNuam5zcWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MTEzNDksImV4cCI6MjA4OTk4NzM0OX0.toA1fWzEJiuyaJswm8SdExN_h-CqKFF4iBL0drzNj4E';

// Initialize the Supabase client safely
window.supabaseClient = null;
if (typeof window.supabase !== 'undefined') {
  try {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.error("Supabase initialization failed:", err);
  }
} else {
  console.warn("Supabase library not loaded. Networking error may have occurred.");
}
