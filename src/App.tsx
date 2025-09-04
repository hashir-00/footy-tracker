import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ImageUpload } from './components/ImageUpload';
import { PlayerDetection } from './components/PlayerDetection';
import { PitchVisualization } from './components/PitchVisualization';
import { StatsPanel } from './components/StatsPanel';

function App() {
  const [activeSection, setActiveSection] = useState('upload');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'upload':
        return (
          <div className="space-y-6">
            <ImageUpload />
            <StatsPanel />
          </div>
        );
      case 'detection':
        return (
          <div className="space-y-6">
            <PlayerDetection />
            <StatsPanel />
          </div>
        );
      case 'pitch':
        return (
          <div className="space-y-6">
            <PitchVisualization />
            <StatsPanel />
          </div>
        );
      default:
        return <ImageUpload />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;