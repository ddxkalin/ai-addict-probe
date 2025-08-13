import { RefreshCw, Lock, Unlock } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  hasPaid: boolean;
  onPayment: () => void;
  onRestart: () => void;
}

export const ResultsScreen = ({ score, hasPaid, onPayment, onRestart }: ResultsScreenProps) => {
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
          <div className="blur-result p-6 space-y-4 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/50 to-muted/80 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-3">
                <Lock className="w-8 h-8 mx-auto text-primary" />
                <p className="text-foreground font-semibold">Unlock your results!</p>
              </div>
            </div>
            
            {/* Blurred content */}
            <div className="blur-sm">
              <div className="text-6xl font-bold text-primary">{score}%</div>
              <p className={`text-lg font-semibold ${description.color}`}>
                {description.text}
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🎯 Detailed analysis of your AI habits</p>
                <p>📊 Personalized recommendations</p>
                <p>🚀 Tips to optimize your AI usage</p>
                <p>🔥 Comparison with other users</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Complete payment to unlock your detailed AI addiction analysis!
            </p>
            <button
              onClick={onPayment}
              className="ai-button w-full text-lg font-semibold"
            >
              Pay Now - $4.99 💳
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