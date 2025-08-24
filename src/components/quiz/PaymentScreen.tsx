import { useState, useEffect } from 'react';
import { CreditCard, Lock, ArrowLeft, TestTube, Loader2 } from 'lucide-react';

interface PaymentScreenProps {
  onSuccess: () => void;
  onBack: () => void;
  quizResultId?: string;
}

const PaymentContent = ({ onSuccess, quizResultId }: { onSuccess: () => void; quizResultId?: string }) => {
  const [showTestMode, setShowTestMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isTestMode = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.includes('pk_test_');

  useEffect(() => {
    // Listen for payment success - Stripe redirects back to our app
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const sessionId = urlParams.get('session_id');
    
    if (success === 'true' && sessionId) {
      console.log('Payment successful! Session ID:', sessionId);
      // Clear URL params
      window.history.replaceState({}, document.title, window.location.pathname);
      // Trigger success callback
      onSuccess();
    }
  }, [onSuccess]);

  // Auto-trigger payment on component mount
  useEffect(() => {
    handlePayment();
  }, []);

  const handlePayment = async () => {
    setIsLoading(true);
    setError('');

    try {
      if (quizResultId) {
        localStorage.setItem('pendingQuizResult', quizResultId);
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          quizResultId
          // No email needed - Stripe will collect it
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create checkout session');

      // Prefer server returning a Checkout URL
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      // Fallback if your API returns a sessionId
      if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/c/pay/${data.sessionId}`;
        return;
      }

      throw new Error('Checkout URL or sessionId missing from server response.');
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <CreditCard className="w-12 h-12 mx-auto text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Unlock Your AI Addiction Results</h2>
        <p className="text-muted-foreground">Complete payment to see your detailed analysis</p>
      </div>

      <div className="ai-card bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex justify-between items-center">
          <span className="text-foreground font-medium">AI Addiction Report</span>
          <span className="text-2xl font-bold text-primary">$4.99</span>
        </div>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <p>✓ Detailed addiction analysis</p>
          <p>✓ Personalized recommendations</p>
          <p>✓ Comparison with other users</p>
          <p>✓ AI optimization tips</p>
        </div>
      </div>

      {/* Loading State */}
      <div className="text-center space-y-4">
        {isLoading ? (
          <>
            <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
            <p className="text-foreground font-medium">Redirecting to secure payment...</p>
            <p className="text-muted-foreground text-sm">You'll be redirected to Stripe checkout shortly</p>
          </>
        ) : error ? (
          <>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400 mb-3">{error}</p>
              <button
                onClick={handlePayment}
                className="ai-button"
              >
                Try Again
              </button>
            </div>
          </>
        ) : (
          <>
            <CreditCard className="w-12 h-12 mx-auto text-primary" />
            <p className="text-foreground font-medium">Preparing your payment...</p>
          </>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        🔒 Secure payment powered by Stripe
      </p>
    </div>
  );
};

export const PaymentScreen = ({ onSuccess, onBack, quizResultId }: PaymentScreenProps) => {
  return (
    <div className="ai-card space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <div className="flex items-center text-primary">
          <Lock className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Secure Payment</span>
        </div>
      </div>

      <PaymentContent onSuccess={onSuccess} quizResultId={quizResultId} />
    </div>
  );
};