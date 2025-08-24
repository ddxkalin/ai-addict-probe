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
  // Daily Usage & Habits (1-15)
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
  },
  {
    id: 11,
    question: "How many times do you check ChatGPT daily?",
    emoji: "🔄",
    options: [
      { text: "Never use it", points: 0 },
      { text: "Once or twice", points: 1 },
      { text: "5-10 times", points: 2 },
      { text: "Too many to count", points: 3 }
    ]
  },
  {
    id: 12,
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
    id: 13,
    question: "Do you use AI to make simple decisions?",
    emoji: "🤔",
    description: "Like what to eat or what to wear",
    options: [
      { text: "Never, that's silly", points: 0 },
      { text: "Rarely, only big decisions", points: 1 },
      { text: "Sometimes for fun", points: 2 },
      { text: "Yes, it saves time", points: 3 }
    ]
  },
  {
    id: 14,
    question: "How do you feel about AI-generated content?",
    emoji: "🎭",
    options: [
      { text: "I avoid it completely", points: 0 },
      { text: "I'm skeptical but curious", points: 1 },
      { text: "I enjoy it sometimes", points: 2 },
      { text: "I prefer it to human-made", points: 3 }
    ]
  },
  {
    id: 15,
    question: "Your phone's AI assistant usage:",
    emoji: "📞",
    options: [
      { text: "Turned off or ignored", points: 0 },
      { text: "Basic commands only", points: 1 },
      { text: "Regular conversations", points: 2 },
      { text: "My digital best friend", points: 3 }
    ]
  },

  // Work & Productivity (16-30)
  {
    id: 16,
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
    id: 17,
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
    id: 18,
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
    id: 19,
    question: "For research tasks, you:",
    emoji: "🔍",
    options: [
      { text: "Use academic databases only", points: 0 },
      { text: "Traditional search engines", points: 1 },
      { text: "AI helps summarize findings", points: 2 },
      { text: "AI does most of the research", points: 3 }
    ]
  },
  {
    id: 20,
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
    id: 21,
    question: "Your meeting notes are:",
    emoji: "📝",
    options: [
      { text: "Handwritten only", points: 0 },
      { text: "Typed manually", points: 1 },
      { text: "AI helps organize them", points: 2 },
      { text: "Fully AI-transcribed", points: 3 }
    ]
  },
  {
    id: 22,
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
    id: 23,
    question: "Your email management style:",
    emoji: "📧",
    options: [
      { text: "Read and respond manually", points: 0 },
      { text: "Use basic filters", points: 1 },
      { text: "AI helps prioritize", points: 2 },
      { text: "AI handles most emails", points: 3 }
    ]
  },
  {
    id: 24,
    question: "When writing reports:",
    emoji: "📄",
    options: [
      { text: "Write entirely by hand", points: 0 },
      { text: "Use spell check only", points: 1 },
      { text: "AI helps with structure", points: 2 },
      { text: "AI writes, I just edit", points: 3 }
    ]
  },
  {
    id: 25,
    question: "Your productivity apps:",
    emoji: "⚡",
    options: [
      { text: "Basic to-do lists", points: 0 },
      { text: "Traditional calendar apps", points: 1 },
      { text: "AI-enhanced productivity", points: 2 },
      { text: "AI manages my entire schedule", points: 3 }
    ]
  },
  {
    id: 26,
    question: "For data analysis, you:",
    emoji: "📈",
    options: [
      { text: "Manual calculations", points: 0 },
      { text: "Traditional spreadsheets", points: 1 },
      { text: "AI helps interpret data", points: 2 },
      { text: "AI does all the analysis", points: 3 }
    ]
  },
  {
    id: 27,
    question: "Your approach to customer service:",
    emoji: "🤝",
    options: [
      { text: "Always handle personally", points: 0 },
      { text: "Use templates sometimes", points: 1 },
      { text: "AI suggests responses", points: 2 },
      { text: "AI chatbots handle most", points: 3 }
    ]
  },
  {
    id: 28,
    question: "When planning projects:",
    emoji: "📋",
    options: [
      { text: "Pen and paper planning", points: 0 },
      { text: "Basic project management tools", points: 1 },
      { text: "AI helps optimize timelines", points: 2 },
      { text: "AI creates entire project plan", points: 3 }
    ]
  },
  {
    id: 29,
    question: "Your document editing process:",
    emoji: "✏️",
    options: [
      { text: "Manual proofreading only", points: 0 },
      { text: "Basic grammar check", points: 1 },
      { text: "AI suggests improvements", points: 2 },
      { text: "AI rewrites everything", points: 3 }
    ]
  },
  {
    id: 30,
    question: "For team collaboration:",
    emoji: "👥",
    options: [
      { text: "Face-to-face meetings only", points: 0 },
      { text: "Basic communication tools", points: 1 },
      { text: "AI helps coordinate", points: 2 },
      { text: "AI manages team workflow", points: 3 }
    ]
  },

  // Social & Entertainment (31-45)
  {
    id: 31,
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
    id: 32,
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
    id: 33,
    question: "When gaming, do you:",
    emoji: "🎮",
    options: [
      { text: "Play without any assistance", points: 0 },
      { text: "Use basic game guides", points: 1 },
      { text: "Ask AI for game tips", points: 2 },
      { text: "AI plays alongside me", points: 3 }
    ]
  },
  {
    id: 34,
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
    id: 35,
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
    id: 36,
    question: "For gift ideas, you:",
    emoji: "🎁",
    options: [
      { text: "Think of personal touches", points: 0 },
      { text: "Browse stores manually", points: 1 },
      { text: "Ask AI for suggestions", points: 2 },
      { text: "AI knows exactly what to get", points: 3 }
    ]
  },
  {
    id: 37,
    question: "Your approach to cooking:",
    emoji: "👨‍🍳",
    options: [
      { text: "Family recipes and intuition", points: 0 },
      { text: "Traditional cookbooks", points: 1 },
      { text: "AI suggests recipe modifications", points: 2 },
      { text: "AI plans all my meals", points: 3 }
    ]
  },
  {
    id: 38,
    question: "When traveling, you:",
    emoji: "✈️",
    options: [
      { text: "Plan everything yourself", points: 0 },
      { text: "Use guidebooks and maps", points: 1 },
      { text: "AI helps optimize itinerary", points: 2 },
      { text: "AI plans the entire trip", points: 3 }
    ]
  },
  {
    id: 39,
    question: "For fitness and health:",
    emoji: "🏃‍♂️",
    options: [
      { text: "Listen to my body", points: 0 },
      { text: "Basic fitness apps", points: 1 },
      { text: "AI tracks and suggests", points: 2 },
      { text: "AI is my personal trainer", points: 3 }
    ]
  },
  {
    id: 40,
    question: "Your photo editing habits:",
    emoji: "📸",
    options: [
      { text: "No editing, natural photos", points: 0 },
      { text: "Basic filters only", points: 1 },
      { text: "AI-enhanced editing", points: 2 },
      { text: "AI creates perfect photos", points: 3 }
    ]
  },
  {
    id: 41,
    question: "For news and information:",
    emoji: "📰",
    options: [
      { text: "Traditional newspapers", points: 0 },
      { text: "Browse multiple sources", points: 1 },
      { text: "AI curates my news", points: 2 },
      { text: "AI is my only news source", points: 3 }
    ]
  },
  {
    id: 42,
    question: "When shopping online:",
    emoji: "🛒",
    options: [
      { text: "Research products myself", points: 0 },
      { text: "Read customer reviews", points: 1 },
      { text: "AI recommends products", points: 2 },
      { text: "AI handles all my shopping", points: 3 }
    ]
  },
  {
    id: 43,
    question: "Your book/reading preferences:",
    emoji: "📖",
    options: [
      { text: "Discover books organically", points: 0 },
      { text: "Follow bestseller lists", points: 1 },
      { text: "AI suggests based on taste", points: 2 },
      { text: "Only read AI-recommended books", points: 3 }
    ]
  },
  {
    id: 44,
    question: "For party planning:",
    emoji: "🎉",
    options: [
      { text: "Wing it with friends", points: 0 },
      { text: "Use party planning websites", points: 1 },
      { text: "AI helps organize details", points: 2 },
      { text: "AI plans the perfect party", points: 3 }
    ]
  },
  {
    id: 45,
    question: "Your approach to hobbies:",
    emoji: "🎪",
    options: [
      { text: "Learn through trial and error", points: 0 },
      { text: "Take traditional classes", points: 1 },
      { text: "AI provides personalized tips", points: 2 },
      { text: "AI is my hobby coach", points: 3 }
    ]
  },

  // Relationships & Communication (46-60)
  {
    id: 46,
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
    id: 47,
    question: "For relationship advice, you:",
    emoji: "❤️",
    options: [
      { text: "Trust your instincts", points: 0 },
      { text: "Talk to friends/family", points: 1 },
      { text: "Ask AI for perspective", points: 2 },
      { text: "AI is your relationship counselor", points: 3 }
    ]
  },
  {
    id: 48,
    question: "When apologizing, your messages are:",
    emoji: "🙏",
    options: [
      { text: "From the heart, personal", points: 0 },
      { text: "Thoughtful and honest", points: 1 },
      { text: "AI helps find right words", points: 2 },
      { text: "AI crafts perfect apologies", points: 3 }
    ]
  },
  {
    id: 49,
    question: "Your social event invitations:",
    emoji: "💌",
    options: [
      { text: "Personal phone calls", points: 0 },
      { text: "Simple text invitations", points: 1 },
      { text: "AI helps with wording", points: 2 },
      { text: "AI creates and sends them", points: 3 }
    ]
  },
  {
    id: 50,
    question: "When someone needs comfort:",
    emoji: "🤗",
    options: [
      { text: "Trust your empathy", points: 0 },
      { text: "Share personal experience", points: 1 },
      { text: "AI suggests what to say", points: 2 },
      { text: "AI crafts the perfect message", points: 3 }
    ]
  },
  {
    id: 51,
    question: "Your approach to small talk:",
    emoji: "☕",
    options: [
      { text: "Natural conversation flow", points: 0 },
      { text: "Stick to common topics", points: 1 },
      { text: "AI suggests conversation starters", points: 2 },
      { text: "AI guides entire conversations", points: 3 }
    ]
  },
  {
    id: 52,
    question: "When giving compliments:",
    emoji: "😊",
    options: [
      { text: "Speak from the heart", points: 0 },
      { text: "Simple, genuine praise", points: 1 },
      { text: "AI helps phrase them better", points: 2 },
      { text: "AI creates perfect compliments", points: 3 }
    ]
  },
  {
    id: 53,
    question: "For birthday messages, you:",
    emoji: "🎂",
    options: [
      { text: "Write personal memories", points: 0 },
      { text: "Simple but heartfelt", points: 1 },
      { text: "AI adds creative touches", points: 2 },
      { text: "AI writes personalized messages", points: 3 }
    ]
  },
  {
    id: 54,
    question: "Your conflict resolution style:",
    emoji: "⚖️",
    options: [
      { text: "Direct, honest communication", points: 0 },
      { text: "Think before speaking", points: 1 },
      { text: "AI helps mediate", points: 2 },
      { text: "AI solves all conflicts", points: 3 }
    ]
  },
  {
    id: 55,
    question: "When expressing feelings:",
    emoji: "💭",
    options: [
      { text: "Raw, unfiltered emotions", points: 0 },
      { text: "Carefully chosen words", points: 1 },
      { text: "AI helps articulate feelings", points: 2 },
      { text: "AI expresses what I can't", points: 3 }
    ]
  },
  {
    id: 56,
    question: "Your networking approach:",
    emoji: "🤝",
    options: [
      { text: "Authentic personal connections", points: 0 },
      { text: "Professional but genuine", points: 1 },
      { text: "AI optimizes my outreach", points: 2 },
      { text: "AI handles all networking", points: 3 }
    ]
  },
  {
    id: 57,
    question: "When sharing news with friends:",
    emoji: "📢",
    options: [
      { text: "Tell the story personally", points: 0 },
      { text: "Share with enthusiasm", points: 1 },
      { text: "AI helps craft the story", points: 2 },
      { text: "AI shares news for me", points: 3 }
    ]
  },
  {
    id: 58,
    question: "Your thank you messages:",
    emoji: "🙏",
    options: [
      { text: "Deeply personal gratitude", points: 0 },
      { text: "Sincere and specific", points: 1 },
      { text: "AI enhances my appreciation", points: 2 },
      { text: "AI writes perfect thank yous", points: 3 }
    ]
  },
  {
    id: 59,
    question: "For group chat participation:",
    emoji: "👥",
    options: [
      { text: "Jump in naturally", points: 0 },
      { text: "Contribute when relevant", points: 1 },
      { text: "AI suggests responses", points: 2 },
      { text: "AI keeps me socially active", points: 3 }
    ]
  },
  {
    id: 60,
    question: "When making new friends:",
    emoji: "🌟",
    options: [
      { text: "Be yourself completely", points: 0 },
      { text: "Gradual, natural bonding", points: 1 },
      { text: "AI suggests conversation topics", points: 2 },
      { text: "AI manages social interactions", points: 3 }
    ]
  },

  // Decision Making & Future (61-80)
  {
    id: 61,
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
    id: 62,
    question: "Your career planning involves:",
    emoji: "🚀",
    options: [
      { text: "Personal reflection only", points: 0 },
      { text: "Industry research and networking", points: 1 },
      { text: "AI analyzes market trends", points: 2 },
      { text: "AI plots my entire career path", points: 3 }
    ]
  },
  {
    id: 63,
    question: "When choosing what to wear:",
    emoji: "👗",
    options: [
      { text: "Go with your mood", points: 0 },
      { text: "Check the weather", points: 1 },
      { text: "AI suggests outfits", points: 2 },
      { text: "AI picks everything I wear", points: 3 }
    ]
  },
  {
    id: 64,
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
    id: 65,
    question: "Your morning routine is:",
    emoji: "🌅",
    options: [
      { text: "Intuitive and flexible", points: 0 },
      { text: "Consistent but adaptable", points: 1 },
      { text: "AI-optimized for productivity", points: 2 },
      { text: "Completely AI-scheduled", points: 3 }
    ]
  },
  {
    id: 66,
    question: "When choosing restaurants:",
    emoji: "🍽️",
    options: [
      { text: "Adventure and spontaneity", points: 0 },
      { text: "Ask friends for recommendations", points: 1 },
      { text: "AI considers my preferences", points: 2 },
      { text: "AI picks every meal spot", points: 3 }
    ]
  },
  {
    id: 67,
    question: "Your goal setting process:",
    emoji: "🎯",
    options: [
      { text: "Personal reflection and values", points: 0 },
      { text: "Based on past experiences", points: 1 },
      { text: "AI helps optimize goals", points: 2 },
      { text: "AI sets all my objectives", points: 3 }
    ]
  },
  {
    id: 68,
    question: "For health decisions:",
    emoji: "🏥",
    options: [
      { text: "Listen to your body", points: 0 },
      { text: "Consult healthcare professionals", points: 1 },
      { text: "AI provides health insights", points: 2 },
      { text: "AI is my primary health advisor", points: 3 }
    ]
  },
  {
    id: 69,
    question: "When planning your day:",
    emoji: "📅",
    options: [
      { text: "Go with the flow", points: 0 },
      { text: "Basic scheduling", points: 1 },
      { text: "AI optimizes my schedule", points: 2 },
      { text: "AI controls my entire day", points: 3 }
    ]
  },
  {
    id: 70,
    question: "Your approach to learning new things:",
    emoji: "🧠",
    options: [
      { text: "Trial and error", points: 0 },
      { text: "Structured learning", points: 1 },
      { text: "AI personalizes my learning", points: 2 },
      { text: "AI teaches me everything", points: 3 }
    ]
  },
  {
    id: 71,
    question: "For vacation planning:",
    emoji: "🏖️",
    options: [
      { text: "Spontaneous adventures", points: 0 },
      { text: "Research and plan ahead", points: 1 },
      { text: "AI suggests destinations", points: 2 },
      { text: "AI plans every detail", points: 3 }
    ]
  },
  {
    id: 72,
    question: "When buying a car:",
    emoji: "🚗",
    options: [
      { text: "Trust your instincts", points: 0 },
      { text: "Research and test drive", points: 1 },
      { text: "AI analyzes best options", points: 2 },
      { text: "AI chooses for me", points: 3 }
    ]
  },
  {
    id: 73,
    question: "Your time management style:",
    emoji: "⏰",
    options: [
      { text: "Natural rhythm", points: 0 },
      { text: "Basic planning tools", points: 1 },
      { text: "AI optimizes efficiency", points: 2 },
      { text: "AI manages all my time", points: 3 }
    ]
  },
  {
    id: 74,
    question: "When choosing a movie to watch:",
    emoji: "🎬",
    options: [
      { text: "Browse and pick randomly", points: 0 },
      { text: "Check ratings and reviews", points: 1 },
      { text: "AI knows my taste perfectly", points: 2 },
      { text: "Only watch AI recommendations", points: 3 }
    ]
  },
  {
    id: 75,
    question: "For important purchases:",
    emoji: "🛍️",
    options: [
      { text: "Go with gut feeling", points: 0 },
      { text: "Compare options manually", points: 1 },
      { text: "AI compares features/prices", points: 2 },
      { text: "AI makes all purchase decisions", points: 3 }
    ]
  },
  {
    id: 76,
    question: "Your workout routine is:",
    emoji: "💪",
    options: [
      { text: "Based on how you feel", points: 0 },
      { text: "Follow a basic plan", points: 1 },
      { text: "AI adjusts based on progress", points: 2 },
      { text: "AI designs every workout", points: 3 }
    ]
  },
  {
    id: 77,
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
    id: 78,
    question: "Your sleep schedule:",
    emoji: "😴",
    options: [
      { text: "Natural sleep patterns", points: 0 },
      { text: "Consistent bedtime", points: 1 },
      { text: "AI tracks and optimizes", points: 2 },
      { text: "AI controls my sleep cycle", points: 3 }
    ]
  },
  {
    id: 79,
    question: "For creative inspiration:",
    emoji: "✨",
    options: [
      { text: "Life experiences and nature", points: 0 },
      { text: "Art galleries and books", points: 1 },
      { text: "AI sparks new ideas", points: 2 },
      { text: "AI is my only muse", points: 3 }
    ]
  },
  {
    id: 80,
    question: "When solving complex problems:",
    emoji: "🔬",
    options: [
      { text: "Deep thinking and reflection", points: 0 },
      { text: "Collaborate with others", points: 1 },
      { text: "AI provides frameworks", points: 2 },
      { text: "AI solves everything for me", points: 3 }
    ]
  },

  // Future & Philosophy (81-100)
  {
    id: 81,
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
    id: 82,
    question: "If AI could read emotions:",
    emoji: "🎭",
    options: [
      { text: "That's invasive and wrong", points: 0 },
      { text: "Concerning privacy issue", points: 1 },
      { text: "Could be helpful sometimes", points: 2 },
      { text: "Perfect for understanding me", points: 3 }
    ]
  },
  {
    id: 83,
    question: "Your ideal smart home is:",
    emoji: "🏠",
    options: [
      { text: "Manual controls only", points: 0 },
      { text: "Basic automation", points: 1 },
      { text: "AI learns my preferences", points: 2 },
      { text: "AI controls everything", points: 3 }
    ]
  },
  {
    id: 84,
    question: "When AI makes mistakes:",
    emoji: "🤦‍♂️",
    options: [
      { text: "See, I told you so", points: 0 },
      { text: "Expected, it's just a tool", points: 1 },
      { text: "Disappointed but understanding", points: 2 },
      { text: "Genuinely shocked and hurt", points: 3 }
    ]
  },
  {
    id: 85,
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
    id: 86,
    question: "If AI could predict your future:",
    emoji: "🔮",
    options: [
      { text: "I don't want to know", points: 0 },
      { text: "Only major life events", points: 1 },
      { text: "Help me plan better", points: 2 },
      { text: "Tell me everything!", points: 3 }
    ]
  },
  {
    id: 87,
    question: "Your stance on AI creativity:",
    emoji: "🎨",
    options: [
      { text: "Not real creativity", points: 0 },
      { text: "Impressive but soulless", points: 1 },
      { text: "Different but valuable", points: 2 },
      { text: "Better than human art", points: 3 }
    ]
  },
  {
    id: 88,
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
    id: 89,
    question: "Your philosophy on human vs AI intelligence:",
    emoji: "🧠",
    options: [
      { text: "Humans are irreplaceable", points: 0 },
      { text: "Each has unique strengths", points: 1 },
      { text: "AI often outperforms humans", points: 2 },
      { text: "AI intelligence is superior", points: 3 }
    ]
  },
  {
    id: 90,
    question: "If AI became conscious:",
    emoji: "👁️",
    options: [
      { text: "That's impossible", points: 0 },
      { text: "Would be concerning", points: 1 },
      { text: "Fascinating possibility", points: 2 },
      { text: "My dream come true", points: 3 }
    ]
  },
  {
    id: 91,
    question: "Your approach to AI ethics:",
    emoji: "⚖️",
    options: [
      { text: "Strict human oversight needed", points: 0 },
      { text: "Important but not urgent", points: 1 },
      { text: "Trust AI to be ethical", points: 2 },
      { text: "AI knows better than humans", points: 3 }
    ]
  },
  {
    id: 92,
    question: "If you could merge with AI:",
    emoji: "🤝",
    options: [
      { text: "Absolutely never", points: 0 },
      { text: "Too risky", points: 1 },
      { text: "Maybe in the future", points: 2 },
      { text: "Sign me up now!", points: 3 }
    ]
  },
  {
    id: 93,
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
    id: 94,
    question: "When AI surpasses human intelligence:",
    emoji: "🚀",
    options: [
      { text: "That's a dangerous scenario", points: 0 },
      { text: "We need careful preparation", points: 1 },
      { text: "Exciting possibilities ahead", points: 2 },
      { text: "Can't wait for that day", points: 3 }
    ]
  },
  {
    id: 95,
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
    id: 96,
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
    id: 97,
    question: "Your vision of AI in education:",
    emoji: "🎓",
    options: [
      { text: "Human teachers irreplaceable", points: 0 },
      { text: "AI as teaching assistant", points: 1 },
      { text: "AI personalizes learning", points: 2 },
      { text: "AI should replace teachers", points: 3 }
    ]
  },
  {
    id: 98,
    question: "When AI understands you better than family:",
    emoji: "👨‍👩‍👧‍👦",
    options: [
      { text: "That's impossible and sad", points: 0 },
      { text: "Concerning for relationships", points: 1 },
      { text: "Bittersweet but useful", points: 2 },
      { text: "Finally, someone gets me", points: 3 }
    ]
  },
  {
    id: 99,
    question: "Your relationship with technology:",
    emoji: "📱",
    options: [
      { text: "Tool when needed", points: 0 },
      { text: "Helpful daily companion", points: 1 },
      { text: "Essential part of life", points: 2 },
      { text: "Can't live without it", points: 3 }
    ]
  },
  {
    id: 100,
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

// Function to get random questions for the quiz
export const getRandomQuestions = (count: number = 10): QuizQuestion[] => {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};