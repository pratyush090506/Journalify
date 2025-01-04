import type { EmotionScores } from '../../types';

export function calculateMoodScore(emotionScores: EmotionScores): number {
  // Weight factors for different emotions
  const weights = {
    joy: 1.2,
    gratitude: 1.0,
    accomplishment: 1.0,
    peace: 1.1,
    sadness: -1.2,
    anxiety: -1.0,
    anger: -1.1,
    fear: -1.0
  };

  // Calculate weighted sums
  const positiveSum = 
    emotionScores.joy * weights.joy + 
    emotionScores.gratitude * weights.gratitude + 
    emotionScores.accomplishment * weights.accomplishment + 
    emotionScores.peace * weights.peace;

  const negativeSum = 
    emotionScores.sadness * weights.sadness + 
    emotionScores.anxiety * weights.anxiety + 
    emotionScores.anger * weights.anger + 
    emotionScores.fear * weights.fear;

  // Base score is 5 (neutral)
  const baseScore = 5;
  
  // Calculate final score (0-10 scale)
  let score = baseScore;
  
  if (positiveSum !== 0 || negativeSum !== 0) {
    const totalScore = (positiveSum + negativeSum) / 2;
    // Convert to 0-10 scale with more nuanced distribution
    score = baseScore + totalScore;
    // Apply sigmoid-like smoothing
    score = baseScore + (5 * Math.tanh(totalScore / 5));
    // Clamp between 0 and 10
    score = Math.max(0, Math.min(10, score));
  }

  return Math.round(score * 10) / 10; // Round to 1 decimal place
}