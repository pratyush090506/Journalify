import { create } from 'zustand';
import type { JournalEntry } from '../types';
import { 
  analyzeSentiment, 
  calculateEmotionScores, 
  calculateMoodScore,
  analyzeContext
} from '../utils/analysis';
import { extractTags } from '../utils/tags';

interface JournalStore {
  entries: JournalEntry[];
  addEntry: (content: string) => Promise<void>;
}

export const useJournalStore = create<JournalStore>((set) => ({
  entries: [],
  addEntry: async (content: string) => {
    const emotionScores = calculateEmotionScores(content);
    const sentiment = analyzeSentiment(content);
    const tags = extractTags(content);
    const moodScore = calculateMoodScore(emotionScores);
    const context = analyzeContext(content);

    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      user_id: 'demo-user',
      content,
      mood_score: moodScore,
      sentiment,
      created_at: new Date().toISOString(),
      tags,
      emotion_scores: emotionScores,
      context
    };

    set((state) => ({
      entries: [newEntry, ...state.entries],
    }));
  },
}));