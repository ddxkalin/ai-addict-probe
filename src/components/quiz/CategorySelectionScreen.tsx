import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Timer, Users } from 'lucide-react';
import { quizCategories, QuizCategory } from './categoryQuizData';

interface CategorySelectionScreenProps {
  onStartQuiz: () => void;
}

export const CategorySelectionScreen = ({ onStartQuiz }: CategorySelectionScreenProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-select all categories by default for the ultimate experience
  useEffect(() => {
    const allCategoryIds = new Set(quizCategories.map(cat => cat.id));
    setSelectedCategories(allCategoryIds);
  }, []);

  const handleCategoryToggle = (categoryId: string) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId);
    } else {
      newSelected.add(categoryId);
    }
    setSelectedCategories(newSelected);
  };

  const handleStartQuiz = () => {
    if (selectedCategories.size === 0) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      onStartQuiz();
    }, 800);
  };

  const selectedCount = selectedCategories.size;
  const totalQuestions = selectedCount * 5;

  return (
    <div className="ai-card space-y-8 animate-fade-in">
      {/* Header with Epic Animation */}
      <div className="text-center space-y-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl blur-3xl animate-pulse"></div>
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="text-6xl animate-float">🎯</div>
              <div className="absolute -inset-2 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
            Choose Your AI<br />Addiction Categories
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Discover exactly how AI has taken over different areas of your life
          </p>
        </div>
      </div>

      {/* Epic Stats Bar */}
      <div className="bg-gradient-to-r from-muted/20 to-muted/30 rounded-2xl p-4 border border-border/30 backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <Timer className="w-4 h-4 text-primary animate-spin" />
              <span className="text-lg font-bold text-primary">{Math.ceil(totalQuestions * 0.5)}min</span>
            </div>
            <p className="text-xs text-muted-foreground">Estimated Time</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-lg font-bold text-yellow-400">{totalQuestions}</span>
            </div>
            <p className="text-xs text-muted-foreground">Questions</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1">
              <Users className="w-4 h-4 text-green-400" />
              <span className="text-lg font-bold text-green-400">1M+</span>
            </div>
            <p className="text-xs text-muted-foreground">People Tested</p>
          </div>
        </div>
      </div>

      {/* Category Grid - THE MAIN ATTRACTION */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground flex items-center justify-center space-x-2">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span>Select Categories to Explore</span>
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </h3>
        
        <div className="grid gap-4">
          {quizCategories.map((category, index) => {
            const isSelected = selectedCategories.has(category.id);
            const isHovered = hoveredCategory === category.id;
            
            return (
              <div
                key={category.id}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-500 transform relative overflow-hidden
                    ${isSelected 
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-2xl shadow-primary/25 scale-105' 
                      : 'border-border/30 bg-muted/20 hover:border-primary/50 hover:scale-102'
                    }
                    ${isHovered ? 'shadow-2xl' : ''}
                    hover:shadow-xl
                  `}
                >
                  {/* Background Pattern */}
                  <div className={`absolute inset-0 ${category.gradient} opacity-0 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'group-hover:opacity-50'}`}></div>
                  
                  {/* Animated Border */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary opacity-30 animate-pulse"></div>
                  )}
                  
                  <div className="relative z-10 flex items-center space-x-4">
                    {/* Category Icon */}
                    <div className={`text-5xl transition-transform duration-300 ${isSelected ? 'animate-bounce-slow' : ''} ${isHovered ? 'scale-125' : ''}`}>
                      {category.emoji}
                    </div>
                    
                    {/* Category Info */}
                    <div className="flex-1 text-left space-y-2">
                      <h4 className={`text-lg font-bold transition-colors duration-300 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                        {category.name}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                          5 Questions
                        </span>
                        <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          ~2.5 min
                        </span>
                      </div>
                    </div>
                    
                    {/* Selection Indicator */}
                    <div className={`transition-all duration-300 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements for Visual Appeal */}
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-4 h-4 text-primary animate-spin" />
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Section */}
      <div className="space-y-4 pt-4">
        {selectedCount === 0 && (
          <div className="text-center p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <p className="text-amber-400 text-sm">
              ⚠️ Select at least one category to begin your AI addiction assessment
            </p>
          </div>
        )}
        
        <button
          onClick={handleStartQuiz}
          disabled={selectedCount === 0 || isAnimating}
          className={`ai-button w-full text-lg font-bold py-4 relative overflow-hidden group
            ${selectedCount === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl'}
            ${isAnimating ? 'animate-pulse' : ''}
          `}
        >
          <div className="relative z-10 flex items-center justify-center space-x-3">
            {isAnimating ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Preparing Your Quiz...</span>
              </>
            ) : (
              <>
                <span>Start My AI Addiction Test</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="bg-white/20 px-2 py-1 rounded-full text-sm">
                  {totalQuestions} Questions
                </div>
              </>
            )}
          </div>
          
          {/* Button Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-secondary/80 to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Quick Select Options */}
        <div className="flex justify-center space-x-2 text-xs">
          <button
            onClick={() => setSelectedCategories(new Set(quizCategories.map(cat => cat.id)))}
            className="text-primary hover:text-primary/80 underline transition-colors"
          >
            Select All
          </button>
          <span className="text-muted-foreground">•</span>
          <button
            onClick={() => setSelectedCategories(new Set())}
            className="text-muted-foreground hover:text-foreground underline transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="text-center pt-4 border-t border-border/30">
        <div className="bg-muted/10 rounded-xl p-3 inline-block">
          <p className="text-xs text-muted-foreground flex items-center justify-center space-x-2">
            <span className="animate-pulse">🔥</span>
            <span>Join {Math.floor(Math.random() * 500) + 1000}+ people who discovered their AI addiction level today</span>
            <span className="animate-bounce">✨</span>
          </p>
        </div>
      </div>
    </div>
  );
};