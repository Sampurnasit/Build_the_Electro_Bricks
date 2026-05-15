
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://myuevmckqkpisnjnsqfo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15dWV2bWNrcWtwaXNuam5zcWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MTEzNDksImV4cCI6MjA4OTk4NzM0OX0.toA1fWzEJiuyaJswm8SdExN_h-CqKFF4iBL0drzNj4E';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function clearStaleTokens() {
  console.log("Fetching stale records...");
  const { data, error } = await supabase
    .from('team_assignments')
    .delete()
    .is('submitted_at', null);

  if (error) {
    console.error("Error clearing tokens:", error);
  } else {
    console.log("Cleared stale tokens successfully.");
  }
}

clearStaleTokens();
