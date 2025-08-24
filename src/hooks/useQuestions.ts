import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface DatabaseQuestion {
  id: number;
  question: string;
  description?: string;
  emoji: string;
  options: Array<{
    text: string;
    points: number;
  }>;
  sort_order: number;
}

export const useQuestions = (count: number = 10) => {
  const [questions, setQuestions] = useState<DatabaseQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRandomQuestions();
  }, [count]);

  const fetchRandomQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get random questions from database
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('active', true)
        .limit(100); // Get all questions first

      if (error) throw error;

      if (data && data.length > 0) {
        // Shuffle and take the requested number of questions
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count);
        
        // Sort by a consistent order for the quiz
        const sortedQuestions = selected.sort((a, b) => a.id - b.id);
        
        setQuestions(sortedQuestions);
      } else {
        // Fallback to empty array if no questions
        setQuestions([]);
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load questions');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const refetchQuestions = () => {
    fetchRandomQuestions();
  };

  return {
    questions,
    loading,
    error,
    refetchQuestions
  };
};