
import React, { useState, useEffect } from "react";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import NetworkDevice from "@/components/NetworkDevice";
import NetworkLink from "@/components/NetworkLink";
import DataPacket from "@/components/DataPacket";

const PacketRouting = () => {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [packetPosition, setPacketPosition] = useState({ x: 15, y: 40 });
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [packetVisible, setPacketVisible] = useState(false);
  
  // Simulation steps
  const simulationSteps = [
    "Client wants to access server and creates a data packet",
    "Packet travels to the local router",
    "Router checks routing table and forwards to ISP router",
    "ISP router passes to internet backbone router",
    "Backbone router finds optimal path to destination network",
    "Destination network router receives the packet",
    "Router delivers packet to the destination server",
    "Server processes the request and sends response"
  ];
  
  // Network device positions
  const devices = [
    { id: 'client', type: 'computer' as const, name: 'Client', x: 15, y: 40 },
    { id: 'router1', type: 'router' as const, name: 'Local Router', x: 30, y: 40 },
    { id: 'router2', type: 'router' as const, name: 'ISP Router', x: 45, y: 40 },
    { id: 'router3', type: 'router' as const, name: 'Backbone Router', x: 60, y: 40 },
    { id: 'router4', type: 'router' as const, name: 'Dest. Router', x: 75, y: 40 },
    { id: 'server', type: 'server' as const, name: 'Server', x: 90, y: 40 }
  ];
  
  // Links between devices
  const links = [
    { id: 0, startX: 15, startY: 40, endX: 30, endY: 40 },
    { id: 1, startX: 30, startY: 40, endX: 45, endY: 40 },
    { id: 2, startX: 45, startY: 40, endX: 60, endY: 40 },
    { id: 3, startX: 60, startY: 40, endX: 75, endY: 40 },
    { id: 4, startX: 75, startY: 40, endX: 90, endY: 40 }
  ];
  
  // Position map for each step
  const stepPositions = [
    { x: 15, y: 40 }, // Initial position at client
    { x: 22.5, y: 40 }, // Between client and router1
    { x: 30, y: 40 }, // At router1
    { x: 37.5, y: 40 }, // Between router1 and router2
    { x: 45, y: 40 }, // At router2
    { x: 52.5, y: 40 }, // Between router2 and router3
    { x: 60, y: 40 }, // At router3
    { x: 67.5, y: 40 }, // Between router3 and router4
    { x: 75, y: 40 }, // At router4
    { x: 82.5, y: 40 }, // Between router4 and server
    { x: 90, y: 40 } // At server
  ];
  
  // Reset simulation
  const resetSimulation = () => {
    setIsSimulationRunning(false);
    setCurrentStep(0);
    setPacketPosition(stepPositions[0]);
    setActiveLink(null);
    setPacketVisible(false);
  };
  
  // Start/pause simulation
  const toggleSimulation = () => {
    setIsSimulationRunning(!isSimulationRunning);
    if (!packetVisible && !isSimulationRunning) {
      setPacketVisible(true);
    }
  };
  
  // Progress simulation
  useEffect(() => {
    if (!isSimulationRunning) return;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const newStep = prev + 1;
        
        // End of simulation
        if (newStep >= simulationSteps.length) {
          setIsSimulationRunning(false);
          return prev;
        }
        
        // Update packet position
        const positionIndex = Math.min(newStep + 1, stepPositions.length - 1);
        setPacketPosition(stepPositions[positionIndex]);
        
        // Update active link
        if (newStep % 2 === 1) { // If moving between devices
          setActiveLink(Math.floor(newStep / 2));
        } else {
          setActiveLink(null);
        }
        
        return newStep;
      });
    }, 2000); // Step every 2 seconds
    
    return () => clearInterval(interval);
  }, [isSimulationRunning]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/simulations" className="inline-flex items-center text-netsim-primary hover:underline mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Simulations
        </Link>
        <h1 className="text-3xl font-bold mb-2">Packet Routing Simulation</h1>
        <p className="text-slate-600 mb-4">
          Visualize how data packets navigate through a network with multiple routers to reach their destination.
        </p>
      </div>
      
      {/* Simulation Tabs */}
      <Tabs defaultValue="simulator" className="w-full mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="simulator">Interactive Simulator</TabsTrigger>
          <TabsTrigger value="information">Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simulator" className="space-y-4">
          {/* Simulation Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-xl font-medium">
              Step {currentStep + 1}/{simulationSteps.length}: 
              <span className="ml-2 text-slate-600">{simulationSteps[currentStep]}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline" 
                size="icon"
                onClick={resetSimulation}
                title="Reset Simulation"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                onClick={toggleSimulation}
                title={isSimulationRunning ? "Pause Simulation" : "Start Simulation"}
              >
                {isSimulationRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isSimulationRunning ? "Pause" : "Start"}
              </Button>
            </div>
          </div>
          
          {/* Simulation Canvas */}
          <div className="relative w-full h-[300px] bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
            {/* Network Links */}
            {links.map((link) => (
              <NetworkLink
                key={link.id}
                startX={link.startX}
                startY={link.startY}
                endX={link.endX}
                endY={link.endY}
                status={activeLink === link.id ? 'active' : 'default'}
                thickness={3}
              />
            ))}
            
            {/* Network Devices */}
            {devices.map((device) => (
              <NetworkDevice
                key={device.id}
                type={device.type}
                name={device.name}
                x={device.x}
                y={device.y}
                isActive={
                  (currentStep === 0 && device.id === 'client') ||
                  (currentStep === 2 && device.id === 'router1') ||
                  (currentStep === 4 && device.id === 'router2') ||
                  (currentStep === 6 && device.id === 'router3') ||
                  (currentStep === 8 && device.id === 'router4') ||
                  (currentStep === 10 && device.id === 'server')
                }
              />
            ))}
            
            {/* Data Packet */}
            {packetVisible && (
              <DataPacket
                x={packetPosition.x}
                y={packetPosition.y}
                size={6}
                color="rgb(0, 112, 243)"
              />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="information">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h3>How Packet Routing Works</h3>
                <p>
                  Packet routing is the process of directing data packets from a source device to a destination 
                  device across a network. This simulation demonstrates the journey of a packet through multiple 
                  routers across different network segments.
                </p>
                
                <h4>Key Concepts Demonstrated:</h4>
                <ul>
                  <li><strong>Data Packets:</strong> Self-contained units of data that include addressing information</li>
                  <li><strong>Routers:</strong> Devices that forward packets based on destination IP addresses</li>
                  <li><strong>Routing Tables:</strong> Information that routers use to determine the best path for forwarding packets</li>
                  <li><strong>Hop-by-Hop Routing:</strong> Each router makes an independent forwarding decision</li>
                </ul>
                
                <h4>Real-World Applications:</h4>
                <p>
                  Understanding packet routing is essential for network administrators, security professionals, 
                  and anyone involved in network design. It helps explain why some connections may be faster than 
                  others, how traffic congestion occurs, and how data travels across the global internet.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PacketRouting;
