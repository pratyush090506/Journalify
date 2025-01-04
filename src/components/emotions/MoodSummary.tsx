import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { JournalEntry } from '../../types';

interface MoodSummaryProps {
  averageMood: number;
  entries: JournalEntry[];
}

export function MoodSummary({ averageMood, entries }: MoodSummaryProps) {
  const trend = entries.length >= 2 
    ? entries[0].mood_score - entries[1].mood_score 
    : 0;

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600 mb-1">Average Mood</div>
        <div className="text-2xl font-bold text-gray-900">
          {averageMood.toFixed(1)}
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600 mb-1">Trend</div>
        <div className="flex items-center gap-2">
          {trend > 0 ? (
            <>
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-green-600">Improving</span>
            </>
          ) : trend < 0 ? (
            <>
              <TrendingDown className="w-5 h-5 text-red-500" />
              <span className="text-red-600">Declining</span>
            </>
          ) : (
            <span className="text-gray-600">Stable</span>
          )}
        </div>
      </div>
    </div>
  );
}