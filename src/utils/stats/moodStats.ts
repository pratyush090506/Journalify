import type { JournalEntry } from '../../types';

export function calculateAverageMood(entries: JournalEntry[]): number {
  if (entries.length === 0) return 5;
  
  const sum = entries.reduce((acc, entry) => acc + entry.mood_score, 0);
  return sum / entries.length;
}