import { useState, useEffect } from 'react';
import { WelcomeScreen } from './quiz/WelcomeScreen';
import { QuizScreen } from './quiz/QuizScreen';
import { ResultsScreen } from './quiz/ResultsScreen';
import { PaymentScreen } from './quiz/PaymentScreen';
import { quizQuestions } from './quiz/quizData';
import { supabase } from '../lib/supabase';

export type QuizState = 'welcome' | 'quiz' | 'results' | 'payment';

export interface QuizAnswer {
  questionId: number;
  answer: string;
  points: number;
}

const AIQuiz = () => {
  const [currentState, setCurrentState] = useState<QuizState>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [hasPaid, setHasPaid] = useState(false);
  const [quizResultId, setQuizResultId] = useState<string | null>(null);

  // Check URL parameters for payment success
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const quizId = urlParams.get('quiz_result_id');
    
    if (success === 'true' && quizId) {
      // Mark quiz as paid and show results
      updateQuizResultPayment(quizId);
      setHasPaid(true);
      setCurrentState('results');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const updateQuizResultPayment = async (quizId: string) => {
    try {
      await supabase
        .from('quiz_results')
        .update({ paid: true })
        .eq('id', quizId);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleStartQuiz = () => {
    setCurrentState('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswerQuestion = async (answer: string, points: number) => {
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion,
      answer,
      points
    };
    
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, save to database
      await saveQuizResult(updatedAnswers);
      setCurrentState('results');
    }
  };

  const saveQuizResult = async (finalAnswers: QuizAnswer[]) => {
    try {
      const totalScore = finalAnswers.reduce((sum, answer) => sum + answer.points, 0);
      const maxScore = quizQuestions.length * 3;
      const scorePercentage = Math.round((totalScore / maxScore) * 100);

      const { data, error } = await supabase
        .from('quiz_results')
        .insert({
          email: '', // Will be updated when user pays
          score: scorePercentage,
          answers: finalAnswers,
          paid: false,
        })
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setQuizResultId(data.id);
      }
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  const handlePayment = () => {
    setCurrentState('payment');
  };

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    setCurrentState('results');
  };

  const handleRestart = () => {
    setCurrentState('welcome');
    setCurrentQuestion(0);
    setAnswers([]);
    setHasPaid(false);
    setQuizResultId(null);
  };

  const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
  const maxScore = quizQuestions.length * 3; // Assuming max 3 points per question
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[hsl(260_15%_8%)] flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {currentState === 'welcome' && (
          <WelcomeScreen onStart={handleStartQuiz} />
        )}
        
        {currentState === 'quiz' && (
          <QuizScreen
            question={quizQuestions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={quizQuestions.length}
            onAnswer={handleAnswerQuestion}
          />
        )}
        
        {currentState === 'results' && (
          <ResultsScreen
            score={scorePercentage}
            hasPaid={hasPaid}
            onPayment={handlePayment}
            onRestart={handleRestart}
          />
        )}
        
        {currentState === 'payment' && (
          <PaymentScreen
            onSuccess={handlePaymentSuccess}
            onBack={() => setCurrentState('results')}
            quizResultId={quizResultId}
          />
        )}
      </div>
    </div>
  );
};

export default AIQuiz;