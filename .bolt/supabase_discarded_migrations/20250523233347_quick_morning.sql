/*
  # Create users table and authentication schema

  1. New Tables
    - `public.users`
      - `id` (uuid, primary key) - References auth.users.id
      - `name` (text, required)
      - `email` (text, required, unique)
      - `phone` (text)
      - `photo_url` (text)
      - `points` (integer, default: 0)
      - `created_at` (timestamptz, default: now())
      - `updated_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on users table
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  photo_url text,
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();