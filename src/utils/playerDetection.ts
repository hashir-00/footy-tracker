import type { Player, DetectionResult, PlayerPosition } from '../types';

const POSITIONS: PlayerPosition[] = [
  { name: 'Goalkeeper', abbreviation: 'GK', color: '#EF4444' },
  { name: 'Defender', abbreviation: 'DEF', color: '#3B82F6' },
  { name: 'Midfielder', abbreviation: 'MID', color: '#22C55E' },
  { name: 'Forward', abbreviation: 'FWD', color: '#F97316' },
];

export const mockPlayerDetection = async (imageUrl: string): Promise<DetectionResult> => {
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock detected players with random positions
  const players: Player[] = [];
  const numPlayers = Math.floor(Math.random() * 8) + 6; // 6-13 players
  
  for (let i = 0; i < numPlayers; i++) {
    players.push({
      id: `player-${i}`,
      x: Math.random() * 0.8 + 0.1, // 10-90% of image width
      y: Math.random() * 0.8 + 0.1, // 10-90% of image height
      width: 0.08 + Math.random() * 0.04, // 8-12% of image width
      height: 0.12 + Math.random() * 0.06, // 12-18% of image height
      position: POSITIONS[Math.floor(Math.random() * POSITIONS.length)],
      confidence: 0.7 + Math.random() * 0.3, // 70-100% confidence
    });
  }
  
  return {
    players,
    imageWidth: 800,
    imageHeight: 600,
  };
};

export const convertToPitchPositions = (players: Player[]) => {
  return players.map(player => ({
    x: player.x * 100, // Convert to percentage of pitch
    y: player.y * 100,
    player,
  }));
};