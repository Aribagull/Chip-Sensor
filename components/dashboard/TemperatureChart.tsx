import React from 'react';

const TemperatureChart: React.FC = () => {
  // Mock data points for a simple SVG line chart
  const data = [0, 2, -1, -2, -3, -1, 1, 3, 2, 0, -2, -4];
  const max = 5;
  const min = -5;
  const width = 600;
  const height = 200;
  
  // Normalize data to fit height
  const range = max - min;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const zeroY = height - ((0 - min) / range) * height;

  return (
    <div className="w-full h-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48">
            {/* Background Grid Lines */}
            <line x1="0" y1="0" x2={width} y2="0" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1={height} x2={width} y2={height} stroke="#e5e7eb" strokeWidth="1" />

            {/* Threshold Areas */}
            <rect x="0" y="0" width={width} height={height * 0.2} fill="red" opacity="0.1" />
            <rect x="0" y={height * 0.8} width={width} height={height * 0.2} fill="blue" opacity="0.1" />

            {/* Zero Line */}
            <line x1="0" y1={zeroY} x2={width} y2={zeroY} stroke="#9ca3af" strokeDasharray="4" />

            {/* The Data Line */}
            <polyline
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>24h ago</span>
            <span>12h ago</span>
            <span>Now</span>
        </div>
    </div>
  );
};

export default TemperatureChart;