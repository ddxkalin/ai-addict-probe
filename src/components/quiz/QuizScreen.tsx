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
    
    // Longer delay for better visual feedback
    setTimeout(() => {
      onAnswer(answer, points);
      setSelectedAnswer(null);
      setIsAnimating(false);
    }, 1200);
  };

  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="ai-card space-y-8 animate-fade-in">
      {/* Enhanced Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium text-sm">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-primary font-bold text-lg">{Math.round(progressPercentage)}%</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="progress-bar relative">
          <div 
            className="progress-fill transform transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        </div>
        {/* Progress Steps */}
        <div className="flex justify-between">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < questionNumber - 1
                  ? 'bg-primary shadow-[0_0_10px_hsl(280_100%_70%/0.5)]'
                  : i === questionNumber - 1
                  ? 'bg-primary animate-pulse scale-125'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Question Display */}
      <div className="space-y-6">
        <div className="text-center">
          <div className="relative inline-block">
            <span className="text-8xl mb-6 block animate-bounce-slow filter drop-shadow-lg">
              {question.emoji}
            </span>
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-50 animate-pulse"></div>
          </div>
          <h2 className="text-3xl font-bold text-foreground leading-tight max-w-md mx-auto">
            {question.question}
          </h2>
        </div>
        
        {question.description && (
          <div className="bg-muted/30 rounded-2xl p-4 border border-border/30">
            <p className="text-muted-foreground text-center text-sm italic">
              {question.description}
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Answer Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <div key={index} className="relative group">
            <button
              onClick={() => handleAnswer(option.text, option.points)}
              disabled={isAnimating}
              className={`quiz-button group-hover:shadow-xl relative overflow-hidden ${
                selectedAnswer === option.text ? 'selected animate-glow' : ''
              } ${isAnimating && selectedAnswer !== option.text ? 'opacity-30 scale-95' : ''}
              transition-all duration-300 transform hover:translate-y-[-2px]`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center justify-between relative z-10">
                <span className="text-base font-medium">{option.text}</span>
                <div className="flex items-center space-x-2">
                  {selectedAnswer === option.text && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-5 h-5 animate-spin" />
                      <span className="text-xs">✨</span>
                    </div>
                  )}
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedAnswer === option.text ? 'bg-white animate-pulse' : 'bg-primary/30'
                  }`} />
                </div>
              </div>
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </button>
          </div>
        ))}
      </div>

      {/* Enhanced Fun Stats */}
      <div className="text-center pt-4">
        <div className="bg-muted/20 rounded-full px-4 py-2 border border-border/20 inline-block">
          <p className="text-xs text-muted-foreground flex items-center justify-center space-x-2">
            <span className="animate-pulse">🤖</span>
            <span>{Math.floor(Math.random() * 1000) + 500}+ people took this quiz today</span>
            <span className="animate-bounce text-primary">✨</span>
          </p>
        </div>
      </div>
    </div>
  );
};