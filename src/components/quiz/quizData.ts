export interface QuizOption {
  text: string;
  points: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  description?: string;
  emoji: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How often do you use AI tools daily?",
    emoji: "🤖",
    options: [
      { text: "Never or rarely", points: 0 },
      { text: "A few times a week", points: 1 },
      { text: "Daily for work/study", points: 2 },
      { text: "Multiple times every day", points: 3 }
    ]
  },
  {
    id: 2,
    question: "What's your first thought when facing a problem?",
    emoji: "💭",
    options: [
      { text: "Think it through myself", points: 0 },
      { text: "Ask friends or colleagues", points: 1 },
      { text: "Google it", points: 2 },
      { text: "Ask ChatGPT or AI assistant", points: 3 }
    ]
  },
  {
    id: 3,
    question: "How do you feel when AI tools are unavailable?",
    emoji: "😰",
    options: [
      { text: "No big deal", points: 0 },
      { text: "Slightly inconvenient", points: 1 },
      { text: "Pretty frustrated", points: 2 },
      { text: "Completely lost and anxious", points: 3 }
    ]
  },
  {
    id: 4,
    question: "How many AI apps/tools do you have installed?",
    emoji: "📱",
    options: [
      { text: "None", points: 0 },
      { text: "1-2 apps", points: 1 },
      { text: "3-5 apps", points: 2 },
      { text: "6+ apps or I've lost count", points: 3 }
    ]
  },
  {
    id: 5,
    question: "When writing emails or messages, you:",
    emoji: "✉️",
    options: [
      { text: "Write everything myself", points: 0 },
      { text: "Use spell check only", points: 1 },
      { text: "Use AI for suggestions sometimes", points: 2 },
      { text: "AI writes most of it for me", points: 3 }
    ]
  },
  {
    id: 6,
    question: "Your reaction to new AI features:",
    emoji: "🚀",
    options: [
      { text: "Skeptical and cautious", points: 0 },
      { text: "Wait and see approach", points: 1 },
      { text: "Interested but not rushing", points: 2 },
      { text: "Must try immediately!", points: 3 }
    ]
  },
  {
    id: 7,
    question: "How often do you talk about AI?",
    emoji: "💬",
    options: [
      { text: "Never really", points: 0 },
      { text: "Occasionally if it comes up", points: 1 },
      { text: "Often with tech-savvy friends", points: 2 },
      { text: "It's my favorite topic", points: 3 }
    ]
  },
  {
    id: 8,
    question: "For creative tasks (art, writing, music), you:",
    emoji: "🎨",
    options: [
      { text: "Do everything manually", points: 0 },
      { text: "Use traditional tools only", points: 1 },
      { text: "Mix AI with manual work", points: 2 },
      { text: "Rely heavily on AI generation", points: 3 }
    ]
  },
  {
    id: 9,
    question: "Your biggest fear about AI:",
    emoji: "😱",
    options: [
      { text: "AI taking over the world", points: 0 },
      { text: "Privacy and data concerns", points: 1 },
      { text: "Becoming too dependent", points: 2 },
      { text: "AI becoming unavailable", points: 3 }
    ]
  },
  {
    id: 10,
    question: "If AI assistants had feelings, yours would be:",
    emoji: "💝",
    description: "Based on how much you use them",
    options: [
      { text: "Lonely and neglected", points: 0 },
      { text: "Content with occasional chats", points: 1 },
      { text: "Happy with regular interaction", points: 2 },
      { text: "Exhausted from overwork", points: 3 }
    ]
  }
];