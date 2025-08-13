import { Brain, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="ai-card text-center space-y-6 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-ai rounded-full blur-2xl opacity-30 animate-glow"></div>
        <div className="relative bg-gradient-ai rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
          <Brain className="w-12 h-12 text-white" />
        </div>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-ai bg-clip-text text-transparent">
          AI Addiction Quiz
        </h1>
        <div className="flex items-center justify-center gap-2 text-primary">
          <Sparkles className="w-5 h-5" />
          <span className="text-lg font-medium">Are You Addicted to AI?</span>
          <Sparkles className="w-5 h-5" />
        </div>
      </div>
      
      <p className="text-muted-foreground text-base leading-relaxed">
        Discover how much AI has taken over your life! Take this fun quiz with 10 questions 
        and get your AI addiction score.
      </p>
      
      <div className="space-y-4 pt-4">
        <button
          onClick={onStart}
          className="ai-button w-full text-lg font-semibold animate-pulse-slow"
        >
          Start Test 🚀
        </button>
        
        <div className="text-sm text-muted-foreground">
          <p>✨ 10 fun questions</p>
          <p>🎯 Instant results</p>
          <p>🔓 Unlock detailed insights</p>
        </div>
      </div>
    </div>
  );
};