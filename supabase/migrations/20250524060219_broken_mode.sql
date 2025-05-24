/*
  # Enable Google Authentication Provider

  1. Changes
    - Enable Google OAuth provider
    - Add required configuration
*/

-- Enable Google OAuth provider
INSERT INTO auth.providers (provider_id, enabled)
VALUES ('google', true)
ON CONFLICT (provider_id) 
DO UPDATE SET enabled = true;