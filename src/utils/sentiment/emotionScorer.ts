import { emotionKeywords } from './keywords';
import { intensifiers } from './intensifiers';
import type { EmotionScores } from '../../types';

export function calculateEmotionScores(text: string): EmotionScores {
  const words = text.toLowerCase().split(/\s+/);
  const scores: EmotionScores = {
    joy: 0,
    gratitude: 0,
    accomplishment: 0,
    peace: 0,
    sadness: 0,
    anxiety: 0,
    anger: 0,
    fear: 0
  };

  let currentIntensity = 1;
  let negationActive = false;

  words.forEach((word, index) => {
    // Check for negations
    if (['not', 'no', "don't", 'never', "wasn't", "aren't", "isn't"].includes(word)) {
      negationActive = true;
      return;
    }

    // Update intensity based on modifiers
    if (intensifiers.high.includes(word)) {
      currentIntensity = 2.0;
      return;
    } else if (intensifiers.moderate.includes(word)) {
      currentIntensity = 1.5;
      return;
    } else if (intensifiers.low.includes(word)) {
      currentIntensity = 0.5;
      return;
    }

    // Score each emotion category
    Object.entries(emotionKeywords.positive).forEach(([category, keywords]) => {
      if (keywords.includes(word)) {
        const score = negationActive ? -currentIntensity : currentIntensity;
        scores[category as keyof EmotionScores] += score;
      }
    });

    Object.entries(emotionKeywords.negative).forEach(([category, keywords]) => {
      if (keywords.includes(word)) {
        const score = negationActive ? -currentIntensity : currentIntensity;
        scores[category as keyof EmotionScores] += score;
      }
    });

    // Reset modifiers after processing each word
    if (word.endsWith('.') || word.endsWith('!') || word.endsWith('?')) {
      currentIntensity = 1;
      negationActive = false;
    }
  });

  // Normalize scores to be between 0 and 5
  Object.keys(scores).forEach(key => {
    scores[key as keyof EmotionScores] = Math.max(0, Math.min(5, scores[key as keyof EmotionScores]));
  });

  return scores;
}