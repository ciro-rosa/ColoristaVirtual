/*
  # Enable Google Authentication Provider
  
  1. Changes
    - Enable Google OAuth provider through Supabase auth settings
    - Set default provider configurations
  
  2. Security
    - No additional security changes needed as this only affects auth settings
*/

-- Enable Google authentication through Supabase auth settings
ALTER SYSTEM SET auth.external.google.enabled = true;

-- Configure default redirect URLs (these will need to be updated in the Supabase dashboard)
ALTER SYSTEM SET auth.external.google.redirect_uri = 'https://your-project.supabase.co/auth/v1/callback';