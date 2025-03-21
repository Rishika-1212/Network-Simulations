
import { useState, useEffect } from "react";

interface DataPacketProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
}

const DataPacket = ({ 
  x, 
  y,
  size = 3,
  color = "rgb(0, 112, 243)"
}: DataPacketProps) => {
  return (
    <div 
      className="absolute rounded-full shadow-md"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: 'translate(-50%, -50%)',
        backgroundColor: color
      }}
    />
  );
};

export default DataPacket;
