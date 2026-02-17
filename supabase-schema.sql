-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  details TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  summary TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  details TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public insert on messages" ON messages;
DROP POLICY IF EXISTS "Allow authenticated read on messages" ON messages;
DROP POLICY IF EXISTS "Allow authenticated manage projects" ON projects;
DROP POLICY IF EXISTS "Allow public read on projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated manage experiences" ON experiences;
DROP POLICY IF EXISTS "Allow public read on experiences" ON experiences;

-- Policy: Allow anyone to insert messages
CREATE POLICY "Allow public insert on messages"
  ON messages FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read messages (for admin)
-- Note: For now, we'll also allow anon to read (you can restrict this later)
CREATE POLICY "Allow authenticated read on messages"
  ON messages FOR SELECT
  TO authenticated, anon
  USING (true);

-- Policy: Allow authenticated users to manage projects
-- Note: For now, we'll allow anon to manage (you should restrict this in production)
CREATE POLICY "Allow authenticated manage projects"
  ON projects FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

-- Policy: Allow public read on projects
CREATE POLICY "Allow public read on projects"
  ON projects FOR SELECT
  TO authenticated, anon
  USING (true);

-- Policy: Allow authenticated users to manage experiences
-- Note: For now, we'll allow anon to manage (you should restrict this in production)
CREATE POLICY "Allow authenticated manage experiences"
  ON experiences FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

-- Policy: Allow public read on experiences
CREATE POLICY "Allow public read on experiences"
  ON experiences FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_experiences_updated_at ON experiences;

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
