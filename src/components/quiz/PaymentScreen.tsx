import { useState } from 'react';
import { CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';
import { stripePromise } from '../../lib/stripe';

interface PaymentScreenProps {
  onSuccess: () => void;
  onBack: () => void;
  quizResultId?: string;
}

export const PaymentScreen = ({ onSuccess, onBack, quizResultId }: PaymentScreenProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');

  const handlePayment = async () => {
    if (!email) return;
    
    setIsProcessing(true);
    
    try {
      console.log('Initiating payment for:', { quizResultId, email });
      
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizResultId: quizResultId || 'temp-' + Date.now(),
          email,
        }),
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API Error: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      const { sessionId } = data;
      if (!sessionId) {
        throw new Error('No session ID received from server');
      }

      const stripe = await stripePromise;
      
      if (!stripe) throw new Error('Stripe failed to load');

      console.log('Redirecting to Stripe checkout...');
      
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Payment failed: ${errorMessage}. Please try again.`);
      setIsProcessing(false);
    }
  };

  const isFormValid = email.includes('@') && email.includes('.');

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

      <div className="text-center space-y-2">
        <CreditCard className="w-12 h-12 mx-auto text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Unlock Full Results</h2>
        <p className="text-muted-foreground">Get your detailed AI addiction analysis</p>
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

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <p className="text-xs text-muted-foreground mt-1">
            We'll send your results to this email address
          </p>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={!isFormValid || isProcessing}
        className="ai-button w-full text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Check className="w-5 h-5 mr-2" />
            Continue to Checkout - $4.99
          </div>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        🔒 Secure payment powered by Stripe
      </p>
    </div>
  );
};