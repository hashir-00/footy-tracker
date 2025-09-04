import React, { useCallback } from 'react';
import { Play, Zap } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { mockPlayerDetection, convertToPitchPositions } from '../utils/playerDetection';

export const PlayerDetection: React.FC = () => {
  const { 
    uploadedImage, 
    detectionResult, 
    isProcessing, 
    setDetectionResult, 
    setPitchPositions, 
    setIsProcessing 
  } = useAppStore();

  const handleDetection = useCallback(async () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    try {
      const result = await mockPlayerDetection(uploadedImage);
      setDetectionResult(result);
      setPitchPositions(convertToPitchPositions(result.players));
    } catch (error) {
      console.error('Detection failed:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedImage, setDetectionResult, setPitchPositions, setIsProcessing]);

  if (!uploadedImage) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <Zap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Upload an image to start player detection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5" />
        Player Detection & Position Prediction
      </h2>
      
      <div className="space-y-4">
        {!detectionResult && !isProcessing && (
          <button
            onClick={handleDetection}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Play className="w-5 h-5" />
            Detect Players & Predict Positions
          </button>
        )}
        
        {isProcessing && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-600">Analyzing image and predicting positions...</p>
          </div>
        )}
        
        {detectionResult && (
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Football analysis"
              className="w-full h-auto max-h-96 object-contain rounded-lg"
            />
            
            {/* Bounding boxes overlay */}
            <div className="absolute inset-0">
              {detectionResult.players.map((player) => (
                <div
                  key={player.id}
                  className="absolute border-2 border-blue-400 bg-blue-400/10 rounded"
                  style={{
                    left: `${player.x * 100}%`,
                    top: `${player.y * 100}%`,
                    width: `${player.width * 100}%`,
                    height: `${player.height * 100}%`,
                  }}
                >
                  <div className="absolute -top-8 left-0 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                    {player.position.abbreviation} ({(player.confidence * 100).toFixed(0)}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {detectionResult && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">
              Detected {detectionResult.players.length} players
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(
                detectionResult.players.reduce((acc, player) => {
                  acc[player.position.name] = (acc[player.position.name] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([position, count]) => (
                <div key={position} className="text-sm">
                  <span className="font-medium">{position}:</span> {count}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};