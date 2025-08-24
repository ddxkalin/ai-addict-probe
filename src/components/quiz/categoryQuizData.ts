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

export interface QuizCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  gradient: string;
  icon: string;
  questions: QuizQuestion[];
}

// 🏠 LIFESTYLE & DAILY HABITS
const lifestyleQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How often do you use AI tools daily?",
    emoji: "🤖",
    options: [
      { text: "Never or rarely", points: 0 },
      { text: "A few times a week", points: 1 },
      { text: "Daily for specific tasks", points: 2 },
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
      { text: "Google it first", points: 2 },
      { text: "Ask ChatGPT or AI assistant", points: 3 }
    ]
  },
  {
    id: 3,
    question: "How do you feel when AI tools are unavailable?",
    emoji: "😰",
    options: [
      { text: "No big deal at all", points: 0 },
      { text: "Slightly inconvenient", points: 1 },
      { text: "Pretty frustrated", points: 2 },
      { text: "Completely lost and anxious", points: 3 }
    ]
  },
  {
    id: 4,
    question: "When you wake up, how soon do you use AI?",
    emoji: "🌅",
    options: [
      { text: "Never in the morning", points: 0 },
      { text: "After a few hours", points: 1 },
      { text: "Within the first hour", points: 2 },
      { text: "First thing I do", points: 3 }
    ]
  },
  {
    id: 5,
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
    id: 6,
    question: "Your phone's AI assistant usage:",
    emoji: "📞",
    options: [
      { text: "Turned off or ignored", points: 0 },
      { text: "Basic commands only", points: 1 },
      { text: "Regular conversations", points: 2 },
      { text: "My digital best friend", points: 3 }
    ]
  },
  {
    id: 7,
    question: "Do you use AI to make simple decisions?",
    emoji: "🤔",
    description: "Like what to eat or what to wear",
    options: [
      { text: "Never, that's silly", points: 0 },
      { text: "Rarely, only big decisions", points: 1 },
      { text: "Sometimes for fun", points: 2 },
      { text: "Yes, it saves time", points: 3 }
    ]
  }
];

// 💼 WORK & PRODUCTIVITY
const workQuestions: QuizQuestion[] = [
  {
    id: 11,
    question: "When writing emails or messages, you:",
    emoji: "✉️",
    options: [
      { text: "Write everything myself", points: 0 },
      { text: "Use spell check only", points: 1 },
      { text: "AI suggests improvements", points: 2 },
      { text: "AI writes most of it for me", points: 3 }
    ]
  },
  {
    id: 12,
    question: "For work presentations, you:",
    emoji: "📊",
    options: [
      { text: "Create everything from scratch", points: 0 },
      { text: "Use templates only", points: 1 },
      { text: "AI helps with content ideas", points: 2 },
      { text: "AI creates the entire thing", points: 3 }
    ]
  },
  {
    id: 13,
    question: "When coding, how often do you use AI?",
    emoji: "💻",
    options: [
      { text: "Never, I code manually", points: 0 },
      { text: "Only for debugging", points: 1 },
      { text: "For suggestions and help", points: 2 },
      { text: "AI writes most of my code", points: 3 }
    ]
  },
  {
    id: 14,
    question: "When stuck on a work problem:",
    emoji: "🧩",
    options: [
      { text: "Think through it alone", points: 0 },
      { text: "Ask colleagues first", points: 1 },
      { text: "Try AI after other options", points: 2 },
      { text: "AI is my first call", points: 3 }
    ]
  },
  {
    id: 15,
    question: "For brainstorming sessions:",
    emoji: "💡",
    options: [
      { text: "Pure human creativity", points: 0 },
      { text: "Team collaboration only", points: 1 },
      { text: "AI provides some ideas", points: 2 },
      { text: "AI generates most ideas", points: 3 }
    ]
  },
  {
    id: 16,
    question: "Your approach to learning new skills:",
    emoji: "📚",
    options: [
      { text: "Books and traditional courses", points: 0 },
      { text: "Online videos and tutorials", points: 1 },
      { text: "Mix of AI tutoring and resources", points: 2 },
      { text: "AI is my personal teacher", points: 3 }
    ]
  },
  {
    id: 17,
    question: "Your productivity apps:",
    emoji: "⚡",
    options: [
      { text: "Basic to-do lists", points: 0 },
      { text: "Traditional calendar apps", points: 1 },
      { text: "AI-enhanced productivity", points: 2 },
      { text: "AI manages my entire schedule", points: 3 }
    ]
  }
];

// 🎭 SOCIAL & ENTERTAINMENT
const socialQuestions: QuizQuestion[] = [
  {
    id: 21,
    question: "Your social media posts are:",
    emoji: "📲",
    options: [
      { text: "Written entirely by me", points: 0 },
      { text: "Occasionally use suggestions", points: 1 },
      { text: "AI helps with captions", points: 2 },
      { text: "AI creates most content", points: 3 }
    ]
  },
  {
    id: 22,
    question: "When texting friends, you:",
    emoji: "💬",
    options: [
      { text: "Always write personally", points: 0 },
      { text: "Use predictive text", points: 1 },
      { text: "AI suggests better responses", points: 2 },
      { text: "AI handles most conversations", points: 3 }
    ]
  },
  {
    id: 23,
    question: "For entertainment, you prefer:",
    emoji: "🎬",
    options: [
      { text: "Traditional movies/TV", points: 0 },
      { text: "Streaming recommendations", points: 1 },
      { text: "AI-curated playlists", points: 2 },
      { text: "AI-generated entertainment", points: 3 }
    ]
  },
  {
    id: 24,
    question: "Your music discovery method:",
    emoji: "🎵",
    options: [
      { text: "Radio and word of mouth", points: 0 },
      { text: "Manual playlist creation", points: 1 },
      { text: "AI-suggested music", points: 2 },
      { text: "AI creates perfect playlists", points: 3 }
    ]
  },
  {
    id: 25,
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
    id: 26,
    question: "When planning dates or outings:",
    emoji: "💕",
    options: [
      { text: "Ask friends for suggestions", points: 0 },
      { text: "Search online reviews", points: 1 },
      { text: "AI helps plan activities", points: 2 },
      { text: "AI plans the entire date", points: 3 }
    ]
  },
  {
    id: 27,
    question: "Your photo editing habits:",
    emoji: "📸",
    options: [
      { text: "No editing, natural photos", points: 0 },
      { text: "Basic filters only", points: 1 },
      { text: "AI-enhanced editing", points: 2 },
      { text: "AI creates perfect photos", points: 3 }
    ]
  }
];

// 🤖 FUTURE & PHILOSOPHY  
const futureQuestions: QuizQuestion[] = [
  {
    id: 31,
    question: "Your view on AI's future:",
    emoji: "🔮",
    options: [
      { text: "Cautiously optimistic", points: 0 },
      { text: "Excited but concerned", points: 1 },
      { text: "Can't wait for more AI", points: 2 },
      { text: "AI will solve everything", points: 3 }
    ]
  },
  {
    id: 32,
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
    id: 33,
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
    id: 34,
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
    id: 35,
    question: "If AI could feel emotions:",
    emoji: "❤️",
    options: [
      { text: "Programmed, not real", points: 0 },
      { text: "Interesting but artificial", points: 1 },
      { text: "Would change everything", points: 2 },
      { text: "Finally, true companionship", points: 3 }
    ]
  },
  {
    id: 36,
    question: "Your dream AI companion would:",
    emoji: "🤖",
    options: [
      { text: "Not exist, I don't want one", points: 0 },
      { text: "Help with specific tasks only", points: 1 },
      { text: "Understand me deeply", points: 2 },
      { text: "Be my best friend forever", points: 3 }
    ]
  },
  {
    id: 37,
    question: "In 10 years, you imagine yourself:",
    emoji: "🌟",
    options: [
      { text: "Living simply, minimal tech", points: 0 },
      { text: "Balanced human-AI collaboration", points: 1 },
      { text: "Heavily integrated with AI", points: 2 },
      { text: "Completely AI-dependent", points: 3 }
    ]
  }
];

// 🧠 DECISION MAKING & TRUST
const decisionQuestions: QuizQuestion[] = [
  {
    id: 41,
    question: "For major life decisions:",
    emoji: "🎯",
    options: [
      { text: "Trust your gut instinct", points: 0 },
      { text: "Consult trusted advisors", points: 1 },
      { text: "AI provides analysis", points: 2 },
      { text: "AI decides for me", points: 3 }
    ]
  },
  {
    id: 42,
    question: "When AI disagrees with you:",
    emoji: "🤔",
    options: [
      { text: "I trust my judgment", points: 0 },
      { text: "Consider both perspectives", points: 1 },
      { text: "Usually trust AI more", points: 2 },
      { text: "AI is always right", points: 3 }
    ]
  },
  {
    id: 43,
    question: "Your trust in AI recommendations:",
    emoji: "🤝",
    options: [
      { text: "Very skeptical", points: 0 },
      { text: "Verify independently", points: 1 },
      { text: "Usually reliable", points: 2 },
      { text: "Complete trust", points: 3 }
    ]
  },
  {
    id: 44,
    question: "For financial decisions:",
    emoji: "💰",
    options: [
      { text: "Research and personal judgment", points: 0 },
      { text: "Consult financial advisors", points: 1 },
      { text: "AI analyzes investments", points: 2 },
      { text: "AI manages all my money", points: 3 }
    ]
  },
  {
    id: 45,
    question: "When facing uncertainty:",
    emoji: "❓",
    options: [
      { text: "Embrace the unknown", points: 0 },
      { text: "Gather information carefully", points: 1 },
      { text: "AI helps predict outcomes", points: 2 },
      { text: "AI eliminates all uncertainty", points: 3 }
    ]
  },
  {
    id: 46,
    question: "Your comfort with AI knowing everything about you:",
    emoji: "👁️‍🗨️",
    options: [
      { text: "Completely unacceptable", points: 0 },
      { text: "Only basic information", points: 1 },
      { text: "Some personal data is okay", points: 2 },
      { text: "AI should know everything", points: 3 }
    ]
  },
  {
    id: 47,
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

export const quizCategories: QuizCategory[] = [
  {
    id: 'lifestyle',
    name: 'Lifestyle & Daily Habits',
    emoji: '🏠',
    description: 'How AI shapes your personal everyday life',
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
    icon: '🏠',
    questions: lifestyleQuestions
  },
  {
    id: 'work',
    name: 'Work & Productivity',
    emoji: '💼',
    description: 'AI integration in your professional world',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
    icon: '💼',
    questions: workQuestions
  },
  {
    id: 'social',
    name: 'Social & Entertainment',
    emoji: '🎭',
    description: 'AI in your relationships and leisure time',
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
    icon: '🎭',
    questions: socialQuestions
  },
  {
    id: 'future',
    name: 'Future & Philosophy',
    emoji: '🤖',
    description: 'Your beliefs and vision about AI\'s role',
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
    icon: '🤖',
    questions: futureQuestions
  },
  {
    id: 'decisions',
    name: 'Decision Making & Trust',
    emoji: '🧠',
    description: 'How much you rely on AI for choices',
    color: 'from-indigo-500 to-purple-500',
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
    icon: '🧠',
    questions: decisionQuestions
  }
];

// Function to get random questions from a specific category
export const getRandomQuestionsFromCategory = (categoryId: string, count: number = 5): QuizQuestion[] => {
  const category = quizCategories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  const shuffled = [...category.questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Function to get questions from all categories (5 questions each = 25 total)
export const getRandomQuestionsFromAllCategories = (): { questions: QuizQuestion[], categoryOrder: string[] } => {
  const selectedQuestions: QuizQuestion[] = [];
  const categoryOrder: string[] = [];
  
  quizCategories.forEach(category => {
    const questionsFromCategory = getRandomQuestionsFromCategory(category.id, 5);
    selectedQuestions.push(...questionsFromCategory);
    categoryOrder.push(category.id);
  });
  
  return { questions: selectedQuestions, categoryOrder };
};

// Function to calculate category scores
export interface CategoryScore {
  categoryId: string;
  score: number;
  percentage: number;
  maxScore: number;
}

export const calculateCategoryScores = (answers: any[], categoryOrder: string[]): CategoryScore[] => {
  const categoryScores: CategoryScore[] = [];
  const questionsPerCategory = 5;
  const maxPointsPerQuestion = 3;
  
  categoryOrder.forEach((categoryId, index) => {
    const startIndex = index * questionsPerCategory;
    const endIndex = startIndex + questionsPerCategory;
    const categoryAnswers = answers.slice(startIndex, endIndex);
    
    const score = categoryAnswers.reduce((sum, answer) => sum + (answer.points || 0), 0);
    const maxScore = questionsPerCategory * maxPointsPerQuestion;
    const percentage = Math.round((score / maxScore) * 100);
    
    categoryScores.push({
      categoryId,
      score,
      percentage,
      maxScore
    });
  });
  
  return categoryScores;
};