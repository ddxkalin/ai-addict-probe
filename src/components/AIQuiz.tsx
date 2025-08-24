import { useState, useEffect } from 'react';
import { WelcomeScreen } from './quiz/WelcomeScreen';
import { CategorySelectionScreen } from './quiz/CategorySelectionScreen';
import { CategoryQuizScreen } from './quiz/CategoryQuizScreen';
import { CategoryResultsScreen } from './quiz/CategoryResultsScreen';
import { PaymentScreen } from './quiz/PaymentScreen';
import { 
  getRandomQuestionsFromAllCategories, 
  calculateCategoryScores,
  quizCategories,
  QuizQuestion,
  CategoryScore 
} from './quiz/categoryQuizData';

export type QuizState = 'welcome' | 'categories' | 'quiz' | 'results' | 'payment';

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
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [categoryOrder, setCategoryOrder] = useState<string[]>([]);
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([]);

  // Generate random questions when component mounts
  useEffect(() => {
    const { questions: newQuestions, categoryOrder: newCategoryOrder } = getRandomQuestionsFromAllCategories();
    setQuestions(newQuestions);
    setCategoryOrder(newCategoryOrder);
  }, []);

  // Check URL parameters for payment success
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    
    if (success === 'true') {
      setHasPaid(true);
      setCurrentState('results');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleStartWelcome = () => {
    setCurrentState('categories');
  };

  const handleStartQuiz = () => {
    if (questions.length === 0) {
      alert('No questions available. Please try again.');
      return;
    }
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

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed - calculate category scores
      const scores = calculateCategoryScores(updatedAnswers, categoryOrder);
      setCategoryScores(scores);
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
    setQuizResultId(null);
    setCategoryScores([]);
    // Generate new random questions for the next quiz
    const { questions: newQuestions, categoryOrder: newCategoryOrder } = getRandomQuestionsFromAllCategories();
    setQuestions(newQuestions);
    setCategoryOrder(newCategoryOrder);
  };

  const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
  const maxScore = questions.length * 3; // Assuming max 3 points per question
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  // Show loading state if questions aren't loaded yet
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-[hsl(260_15%_8%)] flex items-center justify-center p-4">
        <div className="ai-card text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Preparing your personalized quiz...</p>
        </div>
      </div>
    );
  }

  // Helper functions for category context
  const getCurrentCategory = () => {
    if (questions.length === 0 || categoryOrder.length === 0) return null;
    const questionsPerCategory = 5;
    const categoryIndex = Math.floor(currentQuestion / questionsPerCategory);
    const categoryId = categoryOrder[categoryIndex];
    return quizCategories.find(cat => cat.id === categoryId) || null;
  };

  const getCategoryProgress = () => {
    const questionsPerCategory = 5;
    const categoryIndex = Math.floor(currentQuestion / questionsPerCategory);
    const questionInCategory = (currentQuestion % questionsPerCategory) + 1;
    return {
      current: questionInCategory,
      total: questionsPerCategory
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[hsl(260_15%_8%)] flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {currentState === 'welcome' && (
          <WelcomeScreen onStart={handleStartWelcome} />
        )}

        {currentState === 'categories' && (
          <CategorySelectionScreen onStartQuiz={handleStartQuiz} />
        )}
        
        {currentState === 'quiz' && questions[currentQuestion] && getCurrentCategory() && (
          <CategoryQuizScreen
            question={questions[currentQuestion]}
            currentCategory={getCurrentCategory()!}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            categoryProgress={getCategoryProgress()}
            onAnswer={handleAnswerQuestion}
          />
        )}
        
        {currentState === 'results' && (
          <CategoryResultsScreen
            overallScore={scorePercentage}
            categoryScores={categoryScores}
            hasPaid={hasPaid}
            onPayment={handlePayment}
            onRestart={handleRestart}
            quizResultId={quizResultId}
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