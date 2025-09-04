import { create } from 'zustand';
import type { Player, DetectionResult, PitchPosition } from '../types';

interface AppState {
  uploadedImage: string | null;
  detectionResult: DetectionResult | null;
  pitchPositions: PitchPosition[];
  isProcessing: boolean;
  setUploadedImage: (image: string | null) => void;
  setDetectionResult: (result: DetectionResult | null) => void;
  setPitchPositions: (positions: PitchPosition[]) => void;
  setIsProcessing: (processing: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  uploadedImage: null,
  detectionResult: null,
  pitchPositions: [],
  isProcessing: false,
  setUploadedImage: (image) => set({ uploadedImage: image }),
  setDetectionResult: (result) => set({ detectionResult: result }),
  setPitchPositions: (positions) => set({ pitchPositions: positions }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
}));