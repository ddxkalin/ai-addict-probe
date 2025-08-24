-- Enable Row Level Security
ALTER TABLE IF EXISTS auth.users ENABLE ROW LEVEL SECURITY;

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  score INTEGER NOT NULL,
  answers JSONB NOT NULL,
  paid BOOLEAN DEFAULT false,
  stripe_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for quiz_results
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read their own quiz results
CREATE POLICY "Users can view own quiz results" ON quiz_results
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Create policy to allow anyone to insert quiz results (for anonymous users)
CREATE POLICY "Anyone can create quiz results" ON quiz_results
  FOR INSERT WITH CHECK (true);

-- Create policy to allow users to update their own quiz results
CREATE POLICY "Users can update own quiz results" ON quiz_results
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_result_id UUID REFERENCES quiz_results(id) ON DELETE CASCADE,
  stripe_session_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policy for payments
CREATE POLICY "Users can view payments for their quiz results" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM quiz_results 
      WHERE quiz_results.id = payments.quiz_result_id 
      AND (auth.uid() = quiz_results.user_id OR quiz_results.user_id IS NULL)
    )
  );