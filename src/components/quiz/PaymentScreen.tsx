import { useState } from 'react';
import { CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';

interface PaymentScreenProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const PaymentScreen = ({ onSuccess, onBack }: PaymentScreenProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  const isFormValid = formData.email && formData.cardNumber && formData.expiryDate && formData.cvv && formData.name;

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
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))}
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Expiry</label>
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              placeholder="MM/YY"
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">CVV</label>
            <input
              type="text"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
              placeholder="123"
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
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
            Complete Payment - $4.99
          </div>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        🔒 Your payment is secured with SSL encryption
      </p>
    </div>
  );
};