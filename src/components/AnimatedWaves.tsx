
import { useEffect, useState } from "react";

interface AnimatedWavesProps {
  x: number;
  y: number;
  color?: string;
  count?: number;
  duration?: number;
}

const AnimatedWaves = ({ 
  x, 
  y, 
  color = 'border-netsim-secondary', 
  count = 3,
  duration = 2000 
}: AnimatedWavesProps) => {
  const [waves, setWaves] = useState<Array<{ id: number, scale: number, opacity: number }>>([]);
  
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setWaves(prev => {
        // Update existing waves
        const updated = prev.map(wave => ({
          ...wave,
          scale: wave.scale + 0.05,
          opacity: Math.max(0, wave.opacity - 0.02)
        })).filter(wave => wave.opacity > 0);
        
        // Add new wave if count allows
        if (updated.length < count) {
          updated.push({
            id: Date.now(),
            scale: 0,
            opacity: 1
          });
        }
        
        return updated;
      });
    }, duration / (count * 5));
    
    return () => clearInterval(waveInterval);
  }, [count, duration]);
  
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {waves.map(wave => (
        <div 
          key={wave.id}
          className={`wave-animation ${color} absolute rounded-full`}
          style={{
            width: '40px',
            height: '40px',
            transform: `translate(-50%, -50%) scale(${wave.scale})`,
            opacity: wave.opacity,
            left: 0,
            top: 0
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedWaves;
