/*
  # Stagewise Virtual Staging Database Schema

  ## Overview
  This migration creates the database schema for the Stagewise virtual staging website,
  including transformations gallery and admin authentication.

  ## New Tables
  
  ### `transformations`
  Stores before and after images for the virtual staging gallery
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Title/description of the transformation
  - `before_image_url` (text) - URL to the before image
  - `after_image_url` (text) - URL to the after image
  - `room_type` (text) - Type of room (e.g., Living Room, Bedroom)
  - `display_order` (integer) - Order in which to display on the site
  - `is_active` (boolean) - Whether to show on public site
  - `created_at` (timestamptz) - When the record was created
  - `updated_at` (timestamptz) - When the record was last updated

  ### `admin_users`
  Stores admin user information linked to Supabase auth
  - `id` (uuid, primary key, references auth.users)
  - `email` (text) - Admin email
  - `created_at` (timestamptz) - When the admin was created

  ## Security
  - Enable RLS on all tables
  - Public users can only SELECT active transformations
  - Only authenticated admins can INSERT, UPDATE, DELETE transformations
  - Only authenticated admins can access admin_users table
*/

-- Create transformations table
CREATE TABLE IF NOT EXISTS transformations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  before_image_url text NOT NULL,
  after_image_url text NOT NULL,
  room_type text DEFAULT 'Living Room',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE transformations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Transformations policies
CREATE POLICY "Public users can view active transformations"
  ON transformations
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all transformations"
  ON transformations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert transformations"
  ON transformations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update transformations"
  ON transformations
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete transformations"
  ON transformations
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Admin users policies
CREATE POLICY "Admins can view admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users AS au
      WHERE au.id = auth.uid()
    )
  );

-- Insert sample transformation data
INSERT INTO transformations (title, before_image_url, after_image_url, room_type, display_order, is_active)
VALUES 
  (
    'Modern Living Room Transformation',
    'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
    'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
    'Living Room',
    1,
    true
  ),
  (
    'Contemporary Bedroom Staging',
    'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg',
    'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
    'Bedroom',
    2,
    true
  )
ON CONFLICT DO NOTHING;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_transformations_active_order 
  ON transformations(is_active, display_order);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for transformations
DROP TRIGGER IF EXISTS update_transformations_updated_at ON transformations;
CREATE TRIGGER update_transformations_updated_at
  BEFORE UPDATE ON transformations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();