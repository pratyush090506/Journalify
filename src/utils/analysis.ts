import { calculateEmotionScores } from './sentiment/emotionScorer';
import { calculateMoodScore } from './sentiment/moodCalculator';
import { analyzeContext } from './sentiment/contextAnalyzer';
import type { JournalEntry } from '../types';

export function analyzeSentiment(text: string): JournalEntry['sentiment'] {
  const emotionScores = calculateEmotionScores(text);
  const positiveSum = 
    emotionScores.joy + 
    emotionScores.gratitude + 
    emotionScores.accomplishment + 
    emotionScores.peace;
  
  const negativeSum = 
    emotionScores.sadness + 
    emotionScores.anxiety + 
    emotionScores.anger + 
    emotionScores.fear;

  if (positiveSum > negativeSum) {
    return 'positive';
  } else if (negativeSum > positiveSum) {
    return 'negative';
  }
  return 'neutral';
}

export { calculateEmotionScores, calculateMoodScore, analyzeContext };