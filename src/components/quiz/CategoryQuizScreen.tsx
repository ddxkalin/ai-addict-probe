import { useState, useEffect } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { QuizQuestion, QuizCategory } from './categoryQuizData';

interface CategoryQuizScreenProps {
  question: QuizQuestion;
  currentCategory: QuizCategory;
  questionNumber: number;
  totalQuestions: number;
  categoryProgress: {
    current: number;
    total: number;
  };
  onAnswer: (answer: string, points: number) => void;
}

export const CategoryQuizScreen = ({ 
  question, 
  currentCategory, 
  questionNumber, 
  totalQuestions,
  categoryProgress,
  onAnswer 
}: CategoryQuizScreenProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (answer: string, points: number) => {
    setSelectedAnswer(answer);
    setIsAnimating(true);
    
    setTimeout(() => {
      onAnswer(answer, points);
      setSelectedAnswer(null);
      setIsAnimating(false);
    }, 1200);
  };

  const overallProgress = (questionNumber / totalQuestions) * 100;
  const categoryProgressPercent = (categoryProgress.current / categoryProgress.total) * 100;

  return (
    <div className="ai-card space-y-8 animate-fade-in">
      {/* Category Header with Stunning Design */}
      <div className="space-y-4">
        {/* Category Badge */}
        <div className="flex justify-center">
          <div className={`${currentCategory.gradient} rounded-2xl p-4 border border-primary/20 relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="relative z-10 flex items-center space-x-3">
              <div className="text-3xl animate-float">
                {currentCategory.emoji}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {currentCategory.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Question {categoryProgress.current} of {categoryProgress.total}
                </p>
              </div>
            </div>
            <Sparkles className="absolute top-2 right-2 w-4 h-4 text-primary animate-spin" />
          </div>
        </div>

        {/* Dual Progress System */}
        <div className="space-y-3">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">
                Overall Progress
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-primary font-bold text-sm">{questionNumber}/{totalQuestions}</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="progress-bar relative h-2">
              <div 
                className="progress-fill transform transition-all duration-700 ease-out"
                style={{ width: `${overallProgress}%` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Category Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">
                {currentCategory.name}
              </span>
              <span className="text-primary font-bold text-sm">
                {Math.round(categoryProgressPercent)}%
              </span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${currentCategory.color} transform transition-all duration-700 ease-out`}
                style={{ width: `${categoryProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Display with Enhanced Animation */}
      <div className="space-y-6">
        <div className="text-center relative">
          {/* Background Glow Effect */}
          <div className={`absolute -inset-8 ${currentCategory.gradient} rounded-full blur-3xl opacity-20 animate-pulse`}></div>
          
          <div className="relative z-10">
            <div className="relative inline-block mb-6">
              <span className="text-8xl block animate-bounce-slow filter drop-shadow-lg">
                {question.emoji}
              </span>
              <div className={`absolute -inset-3 bg-gradient-to-r ${currentCategory.color} rounded-full blur-xl opacity-30 animate-pulse`}></div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground leading-tight max-w-md mx-auto mb-4">
              {question.question}
            </h2>
          </div>
        </div>
        
        {question.description && (
          <div className={`${currentCategory.gradient} rounded-2xl p-4 border border-border/30 backdrop-blur-sm`}>
            <p className="text-muted-foreground text-center text-sm italic flex items-center justify-center space-x-2">
              <span className="text-primary">💡</span>
              <span>{question.description}</span>
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
              className={`quiz-button group-hover:shadow-2xl relative overflow-hidden transition-all duration-300 transform hover:translate-y-[-2px] hover:scale-[1.02]
                ${selectedAnswer === option.text ? 'selected animate-glow scale-105' : ''}
                ${isAnimating && selectedAnswer !== option.text ? 'opacity-20 scale-95' : ''}
              `}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-center justify-between relative z-10">
                <span className="text-base font-medium text-left flex-1 pr-4">
                  {option.text}
                </span>
                <div className="flex items-center space-x-2">
                  {selectedAnswer === option.text && (
                    <div className="flex items-center space-x-1 animate-fade-in">
                      <CheckCircle className="w-5 h-5 text-white animate-pulse" />
                      <span className="text-xs animate-bounce">✨</span>
                    </div>
                  )}
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center
                    ${selectedAnswer === option.text 
                      ? 'bg-white animate-pulse scale-125' 
                      : 'bg-primary/30 group-hover:bg-primary/50'
                    }
                  `}>
                    {selectedAnswer === option.text && (
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Dynamic Hover Effect Based on Category */}
              <div className={`absolute inset-0 bg-gradient-to-r ${currentCategory.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
              
              {/* Selection Effect */}
              {selectedAnswer === option.text && (
                <div className={`absolute inset-0 bg-gradient-to-r ${currentCategory.color} opacity-20 animate-pulse`} />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Enhanced Category-Themed Stats */}
      <div className="text-center pt-4">
        <div className={`${currentCategory.gradient} rounded-2xl px-4 py-3 border border-border/20 inline-block backdrop-blur-sm`}>
          <p className="text-xs text-muted-foreground flex items-center justify-center space-x-3">
            <span className="flex items-center space-x-1">
              <span className="animate-pulse">{currentCategory.emoji}</span>
              <span className="font-medium">{currentCategory.name}</span>
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center space-x-1">
              <span className="animate-bounce text-primary">✨</span>
              <span>{Math.floor(Math.random() * 200) + 800}+ tested today</span>
            </span>
          </p>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
        <div className="animate-float text-2xl">
          {currentCategory.emoji}
        </div>
      </div>
      <div className="absolute bottom-4 left-4 opacity-10 pointer-events-none">
        <Sparkles className="w-6 h-6 text-primary animate-spin" />
      </div>
    </div>
  );
};