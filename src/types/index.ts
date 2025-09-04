export interface Player {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  position: PlayerPosition;
  confidence: number;
}

export interface PlayerPosition {
  name: string;
  abbreviation: string;
  color: string;
}

export interface DetectionResult {
  players: Player[];
  imageWidth: number;
  imageHeight: number;
}

export interface PitchPosition {
  x: number;
  y: number;
  player: Player;
}