/* ════════════════════════════════════════════════════════════════
   EAR CANDY — Supabase Auth Helper
   Loaded on any page that needs accounts:
     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
     <script src="auth.js"></script>

   All Supabase config lives HERE only. To rotate keys later,
   change the two constants below — nothing else needs editing.
═══════════════════════════════════════════════════════════════ */

const SUPABASE_URL = 'https://mwvmojatfnmubrtumoge.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dm1vamF0Zm5tdWJydHVtb2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMDI4MzEsImV4cCI6MjA5Njc3ODgzMX0.N5lsraeT_0f6uVn7KG6jVivnPmWCigE8667nZRJnxhw';

// Create the client (supabase-js must be loaded before this file)
const ecSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ── AUTH FUNCTIONS ─────────────────────────────────────────── */

// Check if a username is already taken (case-insensitive)
async function ecUsernameTaken(username) {
  const { data, error } = await ecSupabase
    .from('profiles')
    .select('username')
    .ilike('username', username) // case-insensitive match
    .limit(1);
  if (error) return { ok: false, error: error.message };
  return { ok: true, taken: data && data.length > 0 };
}

// Sign up with email, password, and chosen username
async function ecSignUp(email, password, username) {
  // 1. Create the auth account
  const { data, error } = await ecSupabase.auth.signUp({
    email,
    password,
    options: { data: { username } } // stash username in user metadata too
  });
  if (error) return { ok: false, error: error.message };

  // 2. Create their profile row (username for leaderboards)
  //    Only works if a session exists; if email confirmation is on,
  //    the profile is created on first login instead (see ecEnsureProfile).
  if (data.user) {
    await ecSupabase.from('profiles')
      .insert({ id: data.user.id, username })
      .then(() => {}, () => {}); // ignore if not yet allowed
  }
  return { ok: true, needsConfirmation: !data.session };
}

// Log in with email + password
async function ecLogIn(email, password) {
  const { data, error } = await ecSupabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  await ecEnsureProfile(); // make sure their profile row exists
  return { ok: true };
}

// Log out
async function ecLogOut() {
  await ecSupabase.auth.signOut();
}

// Get current logged-in user (or null)
async function ecCurrentUser() {
  const { data } = await ecSupabase.auth.getUser();
  return data ? data.user : null;
}

// Get the current user's username (or null)
async function ecCurrentUsername() {
  const user = await ecCurrentUser();
  if (!user) return null;
  const { data } = await ecSupabase
    .from('profiles').select('username').eq('id', user.id).single();
  return data ? data.username : (user.user_metadata?.username || null);
}

// Ensure a profile row exists (called after login in case signup couldn't create it)
async function ecEnsureProfile() {
  const user = await ecCurrentUser();
  if (!user) return;
  const username = user.user_metadata?.username;
  if (!username) return;
  // upsert: insert if missing, do nothing if already there
  await ecSupabase.from('profiles')
    .upsert({ id: user.id, username }, { onConflict: 'id', ignoreDuplicates: true })
    .then(() => {}, () => {});
}

// Resend the confirmation email
async function ecResendConfirmation(email) {
  const { error } = await ecSupabase.auth.resend({ type: 'signup', email });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

// Quick boolean check
async function ecIsLoggedIn() {
  const user = await ecCurrentUser();
  return !!user;
}
