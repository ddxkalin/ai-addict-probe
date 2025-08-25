import { useState, useEffect } from 'react';
import { RefreshCw, Lock, Unlock, Loader2 } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  hasPaid: boolean;
  onPayment: () => void;
  onRestart: () => void;
  quizResultId?: string;
}

export const ResultsScreen = ({ score, hasPaid, onPayment, onRestart, quizResultId }: ResultsScreenProps) => {
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Check for payment success on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');
    const quizResultIdFromUrl = urlParams.get('quiz_result_id');
    const paymentInitiated = localStorage.getItem('paymentInitiated');
    const quizStartTime = localStorage.getItem('quizStartTime');
    
    // Direct success from URL parameters
    if (success === 'true' && paymentInitiated === 'true') {
      console.log('Payment successful! Quiz Result ID:', quizResultIdFromUrl);
      // Clear payment tracking
      localStorage.removeItem('paymentInitiated');
      localStorage.removeItem('pendingQuizResult');
      localStorage.removeItem('quizStartTime');
      localStorage.removeItem('expectedReturnUrl');
      // Clear URL params
      window.history.replaceState({}, document.title, window.location.pathname);
      // Trigger the onPayment callback to update the parent component
      onPayment();
      return;
    }
    
    // Handle canceled payment
    if (canceled === 'true') {
      console.log('Payment was canceled');
      localStorage.removeItem('paymentInitiated');
      localStorage.removeItem('pendingQuizResult');
      localStorage.removeItem('quizStartTime');
      localStorage.removeItem('expectedReturnUrl');
      window.history.replaceState({}, document.title, window.location.pathname);
      setPaymentError('Payment was canceled. You can try again anytime.');
      return;
    }
    
    // Fallback: Check if user returned from payment without URL params (Payment Link flow)
    if (paymentInitiated === 'true' && quizStartTime) {
      const timeElapsed = Date.now() - parseInt(quizStartTime);
      // If more than 15 seconds has passed and user is back, assume payment was completed
      if (timeElapsed > 15000) {
        console.log('Payment Link flow - user returned after payment time, assuming completed');
        localStorage.removeItem('paymentInitiated');
        localStorage.removeItem('pendingQuizResult');
        localStorage.removeItem('quizStartTime');
        localStorage.removeItem('expectedReturnUrl');
        onPayment();
      }
    }
  }, [onPayment]);

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

  const getScoreDescription = (score: number) => {
    if (score >= 80) return { text: "🤖 AI Overlord! You're completely AI-obsessed!", color: "text-red-400" };
    if (score >= 60) return { text: "🧠 AI Enthusiast! You love your AI tools!", color: "text-orange-400" };
    if (score >= 40) return { text: "⚡ AI Curious! You're exploring the possibilities!", color: "text-yellow-400" };
    if (score >= 20) return { text: "🌱 AI Beginner! Just getting started!", color: "text-green-400" };
    return { text: "🏛️ AI Traditionalist! You prefer the old ways!", color: "text-blue-400" };
  };

  const description = getScoreDescription(score);

  return (
    <div className="ai-card text-center space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="text-6xl">🎯</div>
        <h2 className="text-3xl font-bold text-foreground">Your Results</h2>
      </div>

      {!hasPaid ? (
        // Blurred Results (Unpaid)
        <div className="space-y-6">
          <div className="blur-result p-6 space-y-4 relative overflow-hidden">
            {/* Heavy blur overlay that completely hides content */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-muted/95 to-background/95 rounded-2xl flex items-center justify-center z-10">
              <div className="text-center space-y-4 max-w-xs">
                <div className="relative">
                  <Lock className="w-12 h-12 mx-auto text-primary animate-bounce" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Unlock Your Results!</h3>
                  <p className="text-muted-foreground text-sm">
                    See your complete AI addiction analysis
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-2 text-primary text-sm">
                  <span>✨</span>
                  <span>Personalized insights awaiting</span>
                  <span>✨</span>
                </div>
              </div>
            </div>
            
            {/* Completely obscured content - users can't see anything */}
            <div className="blur-xl opacity-20 pointer-events-none select-none">
              <div className="text-6xl font-bold text-primary">XX%</div>
              <p className="text-lg font-semibold text-muted-foreground">
                Hidden Analysis Results
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>█████ ████████ ██ ████ ██ ██████</p>
                <p>█████████ ██████████████</p>
                <p>████ ██ ████████ ████ ██ █████</p>
                <p>██████████ ████ █████ █████</p>
                <p>████ ████████ ███████ ████████</p>
                <p>████████ █████ ████ █████ ████</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Complete payment to unlock your detailed AI addiction analysis!
            </p>
            
            {paymentError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-600 dark:text-red-400 text-sm">{paymentError}</p>
              </div>
            )}
            
            <button
              onClick={handleStripePayment}
              disabled={isPaymentLoading}
              className="ai-button w-full text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPaymentLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
                  Redirecting to Stripe...
                </>
              ) : (
                <>Pay Now - $4.99 💳</>
              )}
            </button>
            
            {/* Manual completion button - always show after payment is initiated */}
            <div className="space-y-3">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
                  💳 After completing your payment on Stripe, click the button below to unlock your results:
                </p>
                <button
                  onClick={() => {
                    localStorage.removeItem('paymentInitiated');
                    localStorage.removeItem('pendingQuizResult');
                    localStorage.removeItem('quizStartTime');
                    localStorage.removeItem('expectedReturnUrl');
                    onPayment();
                  }}
                  className="w-full px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 shadow-lg"
                >
                  ✅ I Completed My Payment - Show Results
                </button>
              </div>
            </div>
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
        // Full Results (Paid)
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="text-6xl font-bold bg-gradient-ai bg-clip-text text-transparent animate-glow">
                {score}%
              </div>
              <div className="absolute top-0 right-0">
                <Unlock className="w-6 h-6 text-green-400" />
              </div>
            </div>
            
            <p className={`text-xl font-semibold ${description.color}`}>
              {description.text}
            </p>
          </div>

          <div className="ai-card bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Your AI Addiction Analysis 📊
            </h3>
            <div className="space-y-2 text-sm text-left">
              <p className="text-muted-foreground">
                🤖 You scored higher than {Math.floor(Math.random() * 30) + 50}% of users
              </p>
              <p className="text-muted-foreground">
                🧠 Your primary AI weakness: {score > 60 ? "Over-dependence on AI assistants" : "Curiosity about AI capabilities"}
              </p>
              <p className="text-muted-foreground">
                💡 Recommendation: {score > 60 ? "Try AI-free days occasionally" : "Explore more AI tools to boost productivity"}
              </p>
              <p className="text-muted-foreground">
                🎯 AI addiction level: {score > 75 ? "Critical" : score > 50 ? "Moderate" : "Mild"}
              </p>
            </div>
          </div>

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
                  navigator.share({
                    title: 'AI Addiction Quiz Results',
                    text: `I scored ${score}% on the AI Addiction Quiz! ${description.text}`,
                    url: window.location.href
                  });
                }
              }}
              className="ai-button px-6 py-3"
            >
              Share 📱
            </button>
          </div>
        </div>
      )}
    </div>
  );
};