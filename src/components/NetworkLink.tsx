
import { useState, useEffect } from "react";

interface NetworkLinkProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  status?: 'default' | 'active' | 'error' | 'slow';
  thickness?: number;
}

const statusColors = {
  default: 'bg-slate-300',
  active: 'bg-netsim-primary',
  error: 'bg-red-500',
  slow: 'bg-amber-500'
};

const NetworkLink = ({ 
  startX, 
  startY, 
  endX, 
  endY, 
  status = 'default',
  thickness = 2
}: NetworkLinkProps) => {
  const [color, setColor] = useState(statusColors[status]);
  
  // Calculate the angle and length of the link
  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  useEffect(() => {
    setColor(statusColors[status]);
  }, [status]);
  
  return (
    <div
      className={`absolute rounded-full ${color} transition-colors duration-300`}
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        width: `${length}%`,
        height: `${thickness}px`,
        transformOrigin: 'left center',
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
};

export default NetworkLink;
