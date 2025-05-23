/*
  # Initial Schema Setup

  1. Tables
    - users
      - id (bigint, primary key)
      - created_at (timestamptz)
      - name (text)
      - phone (text, nullable)
      - last_login (timestamptz, nullable)
      - auth_provider (text, default 'email')
      - total_points (integer, default 0)
      - total_tokens_used (integer, default 0)
    
    - consultations
      - id (bigint, primary key)
      - user_id (bigint, references users)
      - tool_used (text)
      - input_data (jsonb)
      - result_data (jsonb)
      - tokens_used (integer, default 0)
      - created_at (timestamptz)
    
    - gallery_posts
      - id (bigint, primary key)
      - user_id (bigint, references users)
      - before_image_url (text)
      - after_image_url (text)
      - description (text)
      - likes_count (integer, default 0)
      - points_awarded (integer, default 10)
      - created_at (timestamptz)
      - is_approved (boolean, default false)
    
    - user_interactions
      - id (bigint, primary key)
      - user_id (bigint, references users)
      - post_id (bigint, references gallery_posts)
      - interaction_type (text)
      - comment_text (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Consultations table
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own consultations"
  ON consultations
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create own consultations"
  ON consultations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

-- Gallery posts table
ALTER TABLE gallery_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved posts"
  ON gallery_posts
  FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Users can read own posts"
  ON gallery_posts
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create own posts"
  ON gallery_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own posts"
  ON gallery_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id::text);

-- User interactions table
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read interactions"
  ON user_interactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own interactions"
  ON user_interactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own interactions"
  ON user_interactions
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id::text);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, name, email, created_at)
  VALUES (
    new.id::bigint,
    new.raw_user_meta_data->>'name',
    new.email,
    new.created_at
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();