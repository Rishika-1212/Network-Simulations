
import { useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NetworkDeviceProps {
  type: 'computer' | 'router' | 'switch' | 'server' | 'cloud';
  name: string;
  description: string;
  x: number;
  y: number;
  onClick?: () => void;
}

const deviceIcons = {
  computer: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netsim-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  ),
  router: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netsim-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <line x1="6" y1="12" x2="10" y2="12"></line>
      <line x1="14" y1="12" x2="18" y2="12"></line>
    </svg>
  ),
  switch: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netsim-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 18V6H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z"></path>
      <path d="M20 6h-8v12h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"></path>
      <path d="M14 12h.01"></path>
      <path d="M17 9h.01"></path>
      <path d="M17 15h.01"></path>
    </svg>
  ),
  server: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netsim-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  ),
  cloud: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netsim-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>
  )
};

const NetworkDevice = ({ type, name, description, x, y, onClick }: NetworkDeviceProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className="device-node absolute"
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {deviceIcons[type]}
            
            {/* Pulse effect when hovered */}
            {isHovered && (
              <div className="absolute inset-0 rounded-full border-2 border-netsim-primary animate-pulse"></div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-medium">{name}</p>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NetworkDevice;
