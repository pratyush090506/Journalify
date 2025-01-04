export interface JournalEntry {
  id: string;
  user_id: string;
  content: string;
  mood_score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  created_at: string;
  tags: string[];
  emotion_scores: EmotionScores;
  context: EmotionContext;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface EmotionScores {
  joy: number;
  gratitude: number;
  accomplishment: number;
  peace: number;
  sadness: number;
  anxiety: number;
  anger: number;
  fear: number;
}

export interface EmotionContext {
  temporal: 'past' | 'present' | 'future';
  length: number;
  sentenceCount: number;
}