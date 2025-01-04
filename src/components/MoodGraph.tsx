import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import { useJournalStore } from '../stores/journalStore';
import { EmotionBreakdown } from './emotions/EmotionBreakdown';
import { MoodSummary } from './emotions/MoodSummary';
import { GraphControls } from './emotions/GraphControls';
import { calculateAverageMood } from '../utils/stats/moodStats';

export function MoodGraph() {
  const entries = useJournalStore((state) => state.entries);
  const [timeRange, setTimeRange] = useState('week');
  const [showEmotions, setShowEmotions] = useState(false);

  const filteredEntries = entries.slice(0, timeRange === 'week' ? 7 : 30);
  const averageMood = calculateAverageMood(filteredEntries);

  const data = filteredEntries.map(entry => ({
    date: format(new Date(entry.created_at), 'MMM d'),
    mood: entry.mood_score,
    joy: entry.emotion_scores.joy,
    peace: entry.emotion_scores.peace,
    anxiety: entry.emotion_scores.anxiety,
    sadness: entry.emotion_scores.sadness
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Mood Trends</h2>
        <GraphControls 
          timeRange={timeRange} 
          showEmotions={showEmotions}
          onTimeRangeChange={setTimeRange}
          onToggleEmotions={setShowEmotions}
        />
      </div>

      <MoodSummary averageMood={averageMood} entries={filteredEntries} />
      
      <div className="h-64 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              domain={[0, 10]} 
              stroke="#6b7280"
              fontSize={12}
              tickCount={6}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem'
              }} 
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ fill: '#6366f1' }}
              name="Overall Mood"
            />
            {showEmotions && (
              <>
                <Line
                  type="monotone"
                  dataKey="joy"
                  stroke="#22c55e"
                  strokeWidth={1.5}
                  dot={false}
                  name="Joy"
                />
                <Line
                  type="monotone"
                  dataKey="peace"
                  stroke="#3b82f6"
                  strokeWidth={1.5}
                  dot={false}
                  name="Peace"
                />
                <Line
                  type="monotone"
                  dataKey="anxiety"
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                  dot={false}
                  name="Anxiety"
                />
                <Line
                  type="monotone"
                  dataKey="sadness"
                  stroke="#ef4444"
                  strokeWidth={1.5}
                  dot={false}
                  name="Sadness"
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <EmotionBreakdown entries={filteredEntries} />
    </div>
  );
}