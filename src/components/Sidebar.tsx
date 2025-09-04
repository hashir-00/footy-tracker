import React from 'react';
import { Target, Zap, MapPin, Upload } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'detection', label: 'Detection', icon: Zap },
    { id: 'pitch', label: 'Pitch Map', icon: MapPin },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-8 h-8 text-green-600" />
          <h1 className="text-xl font-bold text-gray-800">FootballAI</h1>
        </div>
        <p className="text-sm text-gray-600">Player Position Prediction</p>
      </div>
      
      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};