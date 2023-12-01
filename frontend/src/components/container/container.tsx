import React from 'react';

interface ContainerFillVisualizerProps {
  fillPercentage: number;
  customIconUrl: string;
}

const ContainerFillVisualizer: React.FC<ContainerFillVisualizerProps> = ({ fillPercentage, customIconUrl }) => {
  const normalizedFillPercentage = (Math.min(100, Math.max(0, fillPercentage)))*0.90;

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 70%)' }}>
      <div
        style={{
          position: 'absolute',
          bottom: 15,  // Fixed bottom position
          left: 180,
          width: '30%',
          height: `${normalizedFillPercentage}%`,  // Proportional to normalizedFillPercentage
          background: 'grey',
          opacity: 0.4,
        }}
      />
      <img
        src={customIconUrl}
        alt="Container"
        style={{ width: '50%', height: '50%', objectFit: 'contain', filter: 'invert(100%)', zIndex: 1 }}
      />
    </div>
  );
};

export default ContainerFillVisualizer;