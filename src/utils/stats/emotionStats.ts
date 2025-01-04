import type { JournalEntry, EmotionScores } from '../../types';

export function calculateAverageEmotions(entries: JournalEntry[]): EmotionScores {
  if (entries.length === 0) {
    return {
      joy: 0,
      gratitude: 0,
      accomplishment: 0,
      peace: 0,
      sadness: 0,
      anxiety: 0,
      anger: 0,
      fear: 0
    };
  }

  const sum = entries.reduce((acc, entry) => {
    Object.keys(entry.emotion_scores).forEach(key => {
      acc[key as keyof EmotionScores] += entry.emotion_scores[key as keyof EmotionScores];
    });
    return acc;
  }, {
    joy: 0,
    gratitude: 0,
    accomplishment: 0,
    peace: 0,
    sadness: 0,
    anxiety: 0,
    anger: 0,
    fear: 0
  });

  Object.keys(sum).forEach(key => {
    sum[key as keyof EmotionScores] /= entries.length;
  });

  return sum;
}