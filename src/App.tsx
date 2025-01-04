import React from 'react';
import { JournalEditor } from './components/JournalEditor';
import { MoodGraph } from './components/MoodGraph';
import { EntryList } from './components/EntryList';
import { BookHeart } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <BookHeart className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Mental Wellness Journal</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <JournalEditor />
            <MoodGraph />
          </div>
          <EntryList />
        </div>
      </main>
    </div>
  );
}

export default App;