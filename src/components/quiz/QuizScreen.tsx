import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export interface QuizQuestion {
  id: number;
  question: string;
  description?: string;
  emoji: string;
  options: Array<{
    text: string;
    points: number;
  }>;
}

interface QuizScreenProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string, points: number) => void;
}

export const QuizScreen = ({ question, questionNumber, totalQuestions, onAnswer }: QuizScreenProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (answer: string, points: number) => {
    setSelectedAnswer(answer);
    setIsAnimating(true);
    
    // Small delay for animation before proceeding
    setTimeout(() => {
      onAnswer(answer, points);
      setSelectedAnswer(null);
      setIsAnimating(false);
    }, 800);
  };

  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="ai-card space-y-6 animate-fade-in">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Question {questionNumber} of {totalQuestions}</span>
          <span className="text-primary font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-6xl mb-4 block">{question.emoji}</span>
          <h2 className="text-2xl font-bold text-foreground leading-tight">
            {question.question}
          </h2>
        </div>
        
        {question.description && (
          <p className="text-muted-foreground text-center text-sm">
            {question.description}
          </p>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.text, option.points)}
            disabled={isAnimating}
            className={`quiz-button ${
              selectedAnswer === option.text ? 'selected' : ''
            } ${isAnimating ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base">{option.text}</span>
              {selectedAnswer === option.text && (
                <CheckCircle className="w-5 h-5 ml-2 animate-pulse" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Fun Stats */}
      <div className="text-center text-xs text-muted-foreground pt-2">
        <p>🤖 {Math.floor(Math.random() * 1000) + 500}+ people took this quiz today</p>
      </div>
    </div>
  );
};