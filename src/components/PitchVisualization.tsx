import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { MapPin } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const PitchVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { pitchPositions } = useAppStore();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 500;
    const margin = 40;

    // Set up SVG dimensions
    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('max-width', '100%')
      .style('height', 'auto');

    // Draw pitch background
    const pitchGroup = svg.append('g');
    
    // Outer pitch rectangle
    pitchGroup
      .append('rect')
      .attr('x', margin)
      .attr('y', margin)
      .attr('width', width - 2 * margin)
      .attr('height', height - 2 * margin)
      .attr('fill', '#22C55E')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 3)
      .attr('rx', 8);

    // Center circle
    const centerX = width / 2;
    const centerY = height / 2;
    
    pitchGroup
      .append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', 60)
      .attr('fill', 'none')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Center spot
    pitchGroup
      .append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', 3)
      .attr('fill', '#ffffff');

    // Center line
    pitchGroup
      .append('line')
      .attr('x1', centerX)
      .attr('y1', margin)
      .attr('x2', centerX)
      .attr('y2', height - margin)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Goal areas
    const goalWidth = 80;
    const goalHeight = 20;
    const penaltyWidth = 120;
    const penaltyHeight = 80;

    // Left goal area
    pitchGroup
      .append('rect')
      .attr('x', margin)
      .attr('y', centerY - penaltyHeight / 2)
      .attr('width', penaltyWidth)
      .attr('height', penaltyHeight)
      .attr('fill', 'none')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    pitchGroup
      .append('rect')
      .attr('x', margin)
      .attr('y', centerY - goalWidth / 2)
      .attr('width', goalHeight)
      .attr('height', goalWidth)
      .attr('fill', 'none')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Right goal area
    pitchGroup
      .append('rect')
      .attr('x', width - margin - penaltyWidth)
      .attr('y', centerY - penaltyHeight / 2)
      .attr('width', penaltyWidth)
      .attr('height', penaltyHeight)
      .attr('fill', 'none')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    pitchGroup
      .append('rect')
      .attr('x', width - margin - goalHeight)
      .attr('y', centerY - goalWidth / 2)
      .attr('width', goalHeight)
      .attr('height', goalWidth)
      .attr('fill', 'none')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Draw players
    if (pitchPositions.length > 0) {
      const playerGroup = svg.append('g').attr('class', 'players');

      pitchPositions.forEach((position) => {
        const x = margin + (position.x / 100) * (width - 2 * margin);
        const y = margin + (position.y / 100) * (height - 2 * margin);

        // Player circle
        playerGroup
          .append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 12)
          .attr('fill', position.player.position.color)
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 2)
          .style('cursor', 'pointer')
          .on('mouseover', function() {
            d3.select(this).transition().duration(150).attr('r', 15);
          })
          .on('mouseout', function() {
            d3.select(this).transition().duration(150).attr('r', 12);
          });

        // Position label
        playerGroup
          .append('text')
          .attr('x', x)
          .attr('y', y + 4)
          .attr('text-anchor', 'middle')
          .attr('fill', '#ffffff')
          .attr('font-size', '10px')
          .attr('font-weight', 'bold')
          .style('pointer-events', 'none')
          .text(position.player.position.abbreviation);
      });
    }
  }, [pitchPositions]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Interactive Pitch Map
      </h2>
      
      {pitchPositions.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Detect players to see their positions on the pitch</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg ref={svgRef} className="border border-gray-200 rounded-lg"></svg>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Position Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Goalkeeper', abbreviation: 'GK', color: '#EF4444' },
                { name: 'Defender', abbreviation: 'DEF', color: '#3B82F6' },
                { name: 'Midfielder', abbreviation: 'MID', color: '#22C55E' },
                { name: 'Forward', abbreviation: 'FWD', color: '#F97316' },
              ].map((position) => (
                <div key={position.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border border-white"
                    style={{ backgroundColor: position.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{position.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};