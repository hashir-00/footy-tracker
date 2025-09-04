import React from 'react';
import { Target, Github } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Target className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">FootballAI Analytics</h1>
            <p className="text-sm text-gray-600">AI-Powered Player Position Prediction</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Github className="w-4 h-4" />
            <span className="hidden md:inline">View on GitHub</span>
          </button>
        </div>
      </div>
    </header>
  );
};