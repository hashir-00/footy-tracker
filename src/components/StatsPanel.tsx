import React from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const StatsPanel: React.FC = () => {
  const { detectionResult } = useAppStore();

  const stats = React.useMemo(() => {
    if (!detectionResult) return null;

    const positionCounts = detectionResult.players.reduce((acc, player) => {
      acc[player.position.name] = (acc[player.position.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgConfidence = detectionResult.players.reduce((sum, player) => 
      sum + player.confidence, 0) / detectionResult.players.length;

    return {
      totalPlayers: detectionResult.players.length,
      positionCounts,
      avgConfidence,
    };
  }, [detectionResult]);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium text-gray-800">Total Players</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">{stats.totalPlayers}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-5 h-5 text-green-600" />
          <h3 className="font-medium text-gray-800">Avg Confidence</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {(stats.avgConfidence * 100).toFixed(1)}%
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-5 h-5 text-orange-600" />
          <h3 className="font-medium text-gray-800">Formation</h3>
        </div>
        <p className="text-lg font-bold text-gray-900">
          {stats.positionCounts['Defender'] || 0}-{stats.positionCounts['Midfielder'] || 0}-{stats.positionCounts['Forward'] || 0}
        </p>
      </div>
    </div>
  );
};