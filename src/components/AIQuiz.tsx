import { useState } from 'react';
import { WelcomeScreen } from './quiz/WelcomeScreen';
import { QuizScreen } from './quiz/QuizScreen';
import { ResultsScreen } from './quiz/ResultsScreen';
import { PaymentScreen } from './quiz/PaymentScreen';
import { quizQuestions } from './quiz/quizData';

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

  const handleStartQuiz = () => {
    setCurrentState('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswerQuestion = (answer: string, points: number) => {
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
      setCurrentState('results');
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
          />
        )}
      </div>
    </div>
  );
};

export default AIQuiz;