import React, { useState } from 'react';
import { PenLine, Send } from 'lucide-react';
import { useJournalStore } from '../stores/journalStore';
import { getPrompt } from '../utils/prompts';

export function JournalEditor() {
  const [content, setContent] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(getPrompt());
  const addEntry = useJournalStore((state) => state.addEntry);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await addEntry(content);
    setContent('');
    setCurrentPrompt(getPrompt());
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <PenLine className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">New Journal Entry</h2>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 italic">{currentPrompt}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          placeholder="How are you feeling today?"
        />
        
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
}