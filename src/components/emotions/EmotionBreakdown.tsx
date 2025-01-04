import React from 'react';
import type { JournalEntry } from '../../types';
import { calculateAverageEmotions } from '../../utils/stats/emotionStats';

interface EmotionBreakdownProps {
  entries: JournalEntry[];
}

export function EmotionBreakdown({ entries }: EmotionBreakdownProps) {
  const averageEmotions = calculateAverageEmotions(entries);
  
  const emotions = [
    { name: 'Joy', score: averageEmotions.joy, color: 'bg-green-500' },
    { name: 'Peace', score: averageEmotions.peace, color: 'bg-blue-500' },
    { name: 'Gratitude', score: averageEmotions.gratitude, color: 'bg-purple-500' },
    { name: 'Accomplishment', score: averageEmotions.accomplishment, color: 'bg-yellow-500' },
    { name: 'Anxiety', score: averageEmotions.anxiety, color: 'bg-orange-500' },
    { name: 'Sadness', score: averageEmotions.sadness, color: 'bg-red-500' },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Emotion Breakdown</h3>
      <div className="space-y-3">
        {emotions.map(emotion => (
          <div key={emotion.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{emotion.name}</span>
              <span className="text-gray-900">{emotion.score.toFixed(1)}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${emotion.color}`}
                style={{ width: `${Math.min(100, emotion.score * 20)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}