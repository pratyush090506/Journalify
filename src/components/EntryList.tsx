import React from 'react';
import { format } from 'date-fns';
import { Calendar, Smile, Meh, Frown } from 'lucide-react';
import { useJournalStore } from '../stores/journalStore';
import type { JournalEntry } from '../types';

const SentimentIcon = ({ sentiment }: { sentiment: JournalEntry['sentiment'] }) => {
  switch (sentiment) {
    case 'positive':
      return <Smile className="w-5 h-5 text-green-500" />;
    case 'negative':
      return <Frown className="w-5 h-5 text-red-500" />;
    default:
      return <Meh className="w-5 h-5 text-yellow-500" />;
  }
};

export function EntryList() {
  const entries = useJournalStore((state) => state.entries);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Entries</h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {format(new Date(entry.created_at), 'PPP')}
                </span>
              </div>
              <SentimentIcon sentiment={entry.sentiment} />
            </div>
            <p className="text-gray-800">{entry.content}</p>
            <div className="mt-2 flex gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}