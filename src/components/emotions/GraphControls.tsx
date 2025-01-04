import React from 'react';
import { BarChart3, Calendar } from 'lucide-react';

interface GraphControlsProps {
  timeRange: string;
  showEmotions: boolean;
  onTimeRangeChange: (range: string) => void;
  onToggleEmotions: (show: boolean) => void;
}

export function GraphControls({ 
  timeRange, 
  showEmotions, 
  onTimeRangeChange, 
  onToggleEmotions 
}: GraphControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <select
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
          className="text-sm border border-gray-200 rounded-md px-2 py-1"
        >
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
        </select>
      </div>
      
      <button
        onClick={() => onToggleEmotions(!showEmotions)}
        className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm ${
          showEmotions 
            ? 'bg-indigo-100 text-indigo-700' 
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        <BarChart3 className="w-4 h-4" />
        Emotions
      </button>
    </div>
  );
}