const prompts = [
  "How are you feeling right now? What's on your mind?",
  "What's one thing that made you smile today?",
  "What's challenging you at the moment?",
  "What are you grateful for today?",
  "What would you like to achieve tomorrow?",
  "How did you take care of yourself today?",
  "What's one thing you learned recently?",
  "Describe a moment that stood out to you today.",
  "What's something you're looking forward to?",
  "How has your mood been throughout the day?",
];

export function getPrompt(): string {
  return prompts[Math.floor(Math.random() * prompts.length)];
}