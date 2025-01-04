import { emotionKeywords } from './keywords';
import type { EmotionContext } from '../../types';

export function analyzeContext(text: string): EmotionContext {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const timeMarkers = {
    past: ['was', 'felt', 'had', 'yesterday', 'last'],
    present: ['am', 'feel', 'is', 'today', 'now'],
    future: ['will', 'tomorrow', 'soon', 'planning', 'hope']
  };

  let temporalContext = 'present';
  for (const sentence of sentences) {
    if (timeMarkers.past.some(marker => sentence.toLowerCase().includes(marker))) {
      temporalContext = 'past';
      break;
    } else if (timeMarkers.future.some(marker => sentence.toLowerCase().includes(marker))) {
      temporalContext = 'future';
      break;
    }
  }

  return {
    temporal: temporalContext as 'past' | 'present' | 'future',
    length: text.length,
    sentenceCount: sentences.length
  };
}