import { useState, useEffect } from 'react';
import { RefreshCw, Lock, Unlock, Loader2, TrendingUp, Award, Target } from 'lucide-react';
import { quizCategories, CategoryScore } from './categoryQuizData';

interface CategoryResultsScreenProps {
  overallScore: number;
  categoryScores: CategoryScore[];
  hasPaid: boolean;
  onPayment: () => void;
  onRestart: () => void;
  quizResultId?: string;
}

export const CategoryResultsScreen = ({ 
  overallScore, 
  categoryScores, 
  hasPaid, 
  onPayment, 
  onRestart, 
  quizResultId 
}: CategoryResultsScreenProps) => {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [visibleCategories, setVisibleCategories] = useState(0);

  // Check for payment success on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const quizResultIdFromUrl = urlParams.get('quiz_result_id');
    const paymentInitiated = localStorage.getItem('paymentInitiated');
    const quizStartTime = localStorage.getItem('quizStartTime');
    
    if (success === 'true' && paymentInitiated === 'true') {
      console.log('Payment successful! Quiz Result ID:', quizResultIdFromUrl);
      // Clear payment tracking
      localStorage.removeItem('paymentInitiated');
      localStorage.removeItem('pendingQuizResult');
      localStorage.removeItem('quizStartTime');
      window.history.replaceState({}, document.title, window.location.pathname);
      onPayment();
      return;
    }

    // Fallback: Check if user returned from payment without URL params (Payment Link flow)
    if (paymentInitiated === 'true' && quizStartTime) {
      const timeElapsed = Date.now() - parseInt(quizStartTime);
      // If more than 30 seconds has passed and user is back, assume payment was completed
      if (timeElapsed > 30000) {
        console.log('Payment Link flow - user returned after payment time, assuming completed');
        localStorage.removeItem('paymentInitiated');
        localStorage.removeItem('pendingQuizResult');
        localStorage.removeItem('quizStartTime');
        onPayment();
      }
    }
  }, [onPayment]);

  // Animate category reveals
  useEffect(() => {
    if (hasPaid) {
      const timer = setInterval(() => {
        setVisibleCategories(prev => {
          if (prev < categoryScores.length) {
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 300);
      return () => clearInterval(timer);
    }
  }, [hasPaid, categoryScores.length]);

  const handleStripePayment = async () => {
    setIsPaymentLoading(true);
    setPaymentError('');

    try {
      // Generate a clean quiz result ID for tracking
      const cleanQuizResultId = quizResultId 
        ? quizResultId.toString().replace(/[^a-zA-Z0-9-_]/g, '')
        : `quiz-${Date.now()}`;
      
      // Store quiz result info for after payment
      localStorage.setItem('pendingQuizResult', cleanQuizResultId);
      localStorage.setItem('paymentInitiated', 'true');
      localStorage.setItem('quizStartTime', Date.now().toString());

      // Use Stripe Payment Link with client reference ID
      const paymentUrl = `https://buy.stripe.com/test_7sYaEX2yEbai9PjfaiaVa00?client_reference_id=${cleanQuizResultId}`;
      
      // Redirect to Stripe Payment Link
      window.location.href = paymentUrl;
      
    } catch (err) {
      console.error('Payment error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Payment failed. Please try again.';
      setPaymentError(errorMessage);
      setIsPaymentLoading(false);
    }
  };

  const getOverallDescription = (score: number) => {
    if (score >= 80) return { text: "🤖 AI Overlord! You're completely AI-obsessed!", color: "text-red-400", level: "CRITICAL" };
    if (score >= 60) return { text: "🧠 AI Enthusiast! You love your AI tools!", color: "text-orange-400", level: "HIGH" };
    if (score >= 40) return { text: "⚡ AI Curious! You're exploring the possibilities!", color: "text-yellow-400", level: "MODERATE" };
    if (score >= 20) return { text: "🌱 AI Beginner! Just getting started!", color: "text-green-400", level: "LOW" };
    return { text: "🏛️ AI Traditionalist! You prefer the old ways!", color: "text-blue-400", level: "MINIMAL" };
  };

  const getCategoryDescription = (categoryId: string, percentage: number) => {
    const descriptions = {
      lifestyle: {
        high: "AI is deeply woven into your daily routine",
        medium: "You're selectively using AI in your personal life",
        low: "You keep AI at arm's length in daily activities"
      },
      work: {
        high: "AI is revolutionizing your professional workflow",
        medium: "You're strategically adopting AI for work tasks",
        low: "You prefer traditional work methods"
      },
      social: {
        high: "AI shapes most of your social interactions",
        medium: "You balance AI with authentic connections",
        low: "You prioritize human-to-human communication"
      },
      future: {
        high: "You're a true AI optimist and early adopter",
        medium: "You're cautiously excited about AI's future",
        low: "You're skeptical about AI advancement"
      },
      decisions: {
        high: "You heavily rely on AI for decision-making",
        medium: "You use AI as a decision support tool",
        low: "You trust your own judgment over AI"
      }
    };

    const category = descriptions[categoryId as keyof typeof descriptions];
    if (!category) return "AI usage analysis";

    if (percentage >= 70) return category.high;
    if (percentage >= 35) return category.medium;
    return category.low;
  };

  const description = getOverallDescription(overallScore);

  return (
    <div className="ai-card text-center space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="relative">
          <div className="text-6xl animate-float">🎯</div>
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        <h2 className="text-3xl font-bold text-foreground">Your AI Addiction Profile</h2>
      </div>

      {!hasPaid ? (
        /* Blurred Results (Unpaid) */
        <div className="space-y-6">
          <div className="blur-result p-6 space-y-4 relative overflow-hidden">
            {/* Heavy blur overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-muted/95 to-background/95 rounded-2xl flex items-center justify-center z-10">
              <div className="text-center space-y-4 max-w-sm">
                <div className="relative">
                  <Lock className="w-16 h-16 mx-auto text-primary animate-bounce" />
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">Unlock Your Complete AI Profile!</h3>
                  <p className="text-muted-foreground">
                    See your detailed breakdown across all 5 AI usage categories
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <div className="font-semibold text-primary">Overall Score</div>
                      <div className="text-xs text-muted-foreground">XX%</div>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-2">
                      <div className="font-semibold text-secondary">Addiction Level</div>
                      <div className="text-xs text-muted-foreground">HIDDEN</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 text-primary text-sm">
                  <Award className="w-4 h-4" />
                  <span>Professional AI analysis awaiting</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            {/* Completely obscured content */}
            <div className="blur-xl opacity-10 pointer-events-none select-none">
              <div className="space-y-4">
                <div className="text-6xl font-bold text-primary">XX%</div>
                <div className="grid gap-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-muted rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 border border-primary/20">
              <h4 className="font-bold text-foreground mb-2">What You'll Discover:</h4>
              <div className="grid grid-cols-1 gap-2 text-sm text-left">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span>Your addiction level in each category</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Personalized AI optimization tips</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-primary" />
                  <span>How you compare to other users</span>
                </div>
              </div>
            </div>
            
            {paymentError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-600 dark:text-red-400 text-sm">{paymentError}</p>
              </div>
            )}
            
            <button
              onClick={handleStripePayment}
              disabled={isPaymentLoading}
              className="ai-button w-full text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed py-4"
            >
              {isPaymentLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
                  Redirecting to Stripe...
                </>
              ) : (
                <>Unlock Complete Analysis - $4.99 🔓</>
              )}
            </button>
            
            <button
              onClick={onRestart}
              className="w-full px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4 mr-2 inline" />
              Retake Quiz
            </button>
          </div>
        </div>
      ) : (
        /* Full Results (Paid) */
        <div className="space-y-8">
          {/* Overall Score Display */}
          <div className="space-y-4">
            <div className="relative">
              <div className="text-8xl font-bold bg-gradient-ai bg-clip-text text-transparent animate-glow">
                {overallScore}%
              </div>
              <div className="absolute top-0 right-0">
                <Unlock className="w-8 h-8 text-green-400" />
              </div>
              <div className={`mt-2 px-4 py-2 rounded-full text-sm font-bold ${
                description.level === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                description.level === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                description.level === 'MODERATE' ? 'bg-yellow-500/20 text-yellow-400' :
                description.level === 'LOW' ? 'bg-green-500/20 text-green-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {description.level} AI ADDICTION
              </div>
            </div>
            
            <p className={`text-xl font-semibold ${description.color}`}>
              {description.text}
            </p>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground flex items-center justify-center space-x-2">
              <Award className="w-5 h-5 text-primary" />
              <span>Category Breakdown</span>
            </h3>
            
            <div className="space-y-4">
              {categoryScores.map((categoryScore, index) => {
                const category = quizCategories.find(c => c.id === categoryScore.categoryId);
                if (!category) return null;
                
                const isVisible = index < visibleCategories;
                const description = getCategoryDescription(category.id, categoryScore.percentage);
                
                return (
                  <div 
                    key={category.id}
                    className={`transform transition-all duration-500 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`${category.gradient} rounded-2xl p-4 border border-border/30 relative overflow-hidden`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{category.emoji}</div>
                          <div className="text-left">
                            <div className="font-bold text-foreground">{category.name}</div>
                            <div className="text-xs text-muted-foreground">{description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">{categoryScore.percentage}%</div>
                          <div className="text-xs text-muted-foreground">
                            {categoryScore.score}/{categoryScore.maxScore} pts
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-2 bg-background/30 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${category.color} transform transition-all duration-1000 ease-out`}
                          style={{ 
                            width: isVisible ? `${categoryScore.percentage}%` : '0%',
                            transitionDelay: `${index * 100 + 200}ms`
                          }}
                        />
                      </div>
                      
                      {/* Floating decoration */}
                      <div className="absolute top-2 right-2 opacity-20">
                        <TrendingUp className="w-4 h-4 text-foreground animate-pulse" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional Analysis */}
          <div className="ai-card bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-primary" />
              <span>Your Professional AI Analysis 📊</span>
            </h3>
            <div className="space-y-3 text-sm text-left">
              <p className="text-muted-foreground">
                🤖 You scored higher than {Math.floor(Math.random() * 30) + 50}% of users overall
              </p>
              <p className="text-muted-foreground">
                🎯 Highest addiction: {categoryScores.sort((a, b) => b.percentage - a.percentage)[0] && 
                  quizCategories.find(c => c.id === categoryScores.sort((a, b) => b.percentage - a.percentage)[0].categoryId)?.name} 
                ({categoryScores.sort((a, b) => b.percentage - a.percentage)[0]?.percentage}%)
              </p>
              <p className="text-muted-foreground">
                💡 Recommendation: {overallScore > 60 ? "Consider implementing AI-free hours to maintain balance" : "Explore more AI tools to boost your productivity"}
              </p>
              <p className="text-muted-foreground">
                🔮 Future outlook: {overallScore > 75 ? "You're ready for advanced AI integration" : "Steady AI adoption path ahead"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onRestart}
              className="flex-1 px-6 py-3 rounded-xl border border-border text-foreground hover:border-primary transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4 mr-2 inline" />
              Retake Quiz
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  const topCategory = categoryScores.sort((a, b) => b.percentage - a.percentage)[0];
                  const topCategoryName = quizCategories.find(c => c.id === topCategory.categoryId)?.name;
                  navigator.share({
                    title: 'AI Addiction Quiz Results',
                    text: `I scored ${overallScore}% on the AI Addiction Quiz! My highest category was ${topCategoryName} at ${topCategory.percentage}%. ${description.text}`,
                    url: window.location.href
                  });
                }
              }}
              className="ai-button px-6 py-3"
            >
              Share Results 📱
            </button>
          </div>
        </div>
      )}
    </div>
  );
};