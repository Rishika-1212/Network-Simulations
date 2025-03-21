
import React, { useState, useEffect } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, Plus, Minus, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import NetworkDevice from "@/components/NetworkDevice";
import { toast } from "@/components/ui/use-toast";

// Wi-Fi coverage simulation
const WifiOptimization = () => {
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [accessPoints, setAccessPoints] = useState([
    { id: 1, x: 25, y: 30, power: 50, channel: 1 },
    { id: 2, x: 75, y: 30, power: 50, channel: 6 }
  ]);
  const [selectedAP, setSelectedAP] = useState<number | null>(null);
  const [showCoverage, setShowCoverage] = useState(true);
  
  // Select an access point for configuration
  const selectAccessPoint = (id: number) => {
    setSelectedAP(id);
  };
  
  // Update access point power
  const updateAPPower = (power: number) => {
    if (selectedAP === null) return;
    
    setAccessPoints(prev => prev.map(ap => 
      ap.id === selectedAP ? { ...ap, power } : ap
    ));
  };
  
  // Update access point channel
  const updateAPChannel = (channelNum: number) => {
    if (selectedAP === null) return;
    
    // Check for channel conflicts
    const nearbyAPs = accessPoints.filter(ap => 
      ap.id !== selectedAP && 
      Math.abs(ap.channel - channelNum) < 5
    );
    
    if (nearbyAPs.length > 0) {
      toast({
        title: "Channel Conflict Detected",
        description: "This channel may cause interference with other access points.",
        variant: "destructive",
      });
    }
    
    setAccessPoints(prev => prev.map(ap => 
      ap.id === selectedAP ? { ...ap, channel: channelNum } : ap
    ));
  };
  
  // Add new access point
  const addAccessPoint = () => {
    const newId = Math.max(...accessPoints.map(ap => ap.id)) + 1;
    const newChannel = [1, 6, 11].find(ch => 
      !accessPoints.some(ap => ap.channel === ch)
    ) || 1;
    
    setAccessPoints([
      ...accessPoints, 
      { id: newId, x: 50, y: 50, power: 50, channel: newChannel }
    ]);
    
    setSelectedAP(newId);
    
    toast({
      title: "Access Point Added",
      description: "Drag to position the new access point.",
    });
  };
  
  // Remove selected access point
  const removeAccessPoint = () => {
    if (selectedAP === null) return;
    if (accessPoints.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "At least one access point is required.",
        variant: "destructive",
      });
      return;
    }
    
    setAccessPoints(prev => prev.filter(ap => ap.id !== selectedAP));
    setSelectedAP(null);
    
    toast({
      title: "Access Point Removed",
      description: "The access point has been removed from the network.",
    });
  };
  
  // Run coverage optimization
  const optimizeNetwork = () => {
    setIsSimulationRunning(true);
    
    // Simulate optimization process
    toast({
      title: "Optimization Started",
      description: "Analyzing network coverage and interference...",
    });
    
    setTimeout(() => {
      // Calculate "optimized" positions and settings
      const optimizedAPs = accessPoints.map(ap => {
        // Simple optimization algorithm (in a real app this would be more sophisticated)
        const optimizedChannel = [1, 6, 11][ap.id % 3];
        const powerAdjustment = ap.power > 70 ? -10 : ap.power < 30 ? 10 : 0;
        
        return {
          ...ap,
          power: Math.min(Math.max(ap.power + powerAdjustment, 20), 80),
          channel: optimizedChannel
        };
      });
      
      setAccessPoints(optimizedAPs);
      setIsSimulationRunning(false);
      
      toast({
        title: "Optimization Complete",
        description: "Network settings have been optimized to reduce interference and improve coverage.",
      });
    }, 3000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/simulations" className="inline-flex items-center text-netsim-primary hover:underline mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Simulations
        </Link>
        <h1 className="text-3xl font-bold mb-2">Wi-Fi Coverage Optimizer</h1>
        <p className="text-slate-600 mb-4">
          Configure access points to maximize wireless coverage and minimize interference in a building.
        </p>
      </div>
      
      {/* Simulation Tabs */}
      <Tabs defaultValue="simulator" className="w-full mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="simulator">Interactive Simulator</TabsTrigger>
          <TabsTrigger value="information">Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simulator" className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button
              onClick={() => setShowCoverage(!showCoverage)}
              variant="outline"
            >
              {showCoverage ? "Hide Coverage" : "Show Coverage"}
            </Button>
            
            <Button
              onClick={addAccessPoint}
              variant="outline"
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Access Point
            </Button>
            
            <Button
              onClick={removeAccessPoint}
              variant="outline"
              disabled={selectedAP === null}
              className="flex items-center"
            >
              <Minus className="mr-2 h-4 w-4" />
              Remove Access Point
            </Button>
            
            <Button
              onClick={optimizeNetwork}
              disabled={isSimulationRunning}
              className="flex items-center ml-auto"
            >
              {isSimulationRunning ? <RotateCcw className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
              {isSimulationRunning ? "Optimizing..." : "Auto-Optimize"}
            </Button>
          </div>
          
          {/* Simulator */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Floor Plan */}
            <div className="md:col-span-2">
              <div className="relative w-full h-[400px] bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                {/* Building outline */}
                <div className="absolute inset-4 border-2 border-slate-300 rounded-lg bg-white">
                  {/* Interior walls */}
                  <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-slate-300"></div>
                  <div className="absolute top-0 bottom-0 right-1/3 w-0.5 bg-slate-300"></div>
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-300"></div>
                  
                  {/* Room labels */}
                  <div className="absolute top-2 left-2 text-xs text-slate-400">Room 1</div>
                  <div className="absolute top-2 left-[calc(33%+8px)] text-xs text-slate-400">Room 2</div>
                  <div className="absolute top-2 right-2 text-xs text-slate-400">Room 3</div>
                  <div className="absolute bottom-2 left-2 text-xs text-slate-400">Room 4</div>
                  <div className="absolute bottom-2 left-[calc(33%+8px)] text-xs text-slate-400">Room 5</div>
                  <div className="absolute bottom-2 right-2 text-xs text-slate-400">Room 6</div>
                </div>
                
                {/* Coverage visualization */}
                {showCoverage && accessPoints.map(ap => (
                  <div
                    key={`coverage-${ap.id}`}
                    className="absolute rounded-full opacity-30 pointer-events-none transition-all duration-500"
                    style={{
                      left: `${ap.x}%`,
                      top: `${ap.y}%`,
                      width: `${ap.power * 2}%`,
                      height: `${ap.power * 2}%`,
                      backgroundColor: ap.channel === 1 ? 'rgba(59, 130, 246, 0.5)' : 
                                       ap.channel === 6 ? 'rgba(16, 185, 129, 0.5)' : 
                                       'rgba(249, 115, 22, 0.5)',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
                
                {/* Access Points */}
                {accessPoints.map(ap => (
                  <div
                    key={`ap-${ap.id}`}
                    className={`absolute cursor-pointer transition-all duration-300 ${selectedAP === ap.id ? 'z-10' : 'z-0'}`}
                    style={{
                      left: `${ap.x}%`,
                      top: `${ap.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onClick={() => selectAccessPoint(ap.id)}
                  >
                    <NetworkDevice
                      type="cloud"
                      name={`AP-${ap.id} (CH: ${ap.channel})`}
                      x={0}
                      y={0}
                      isActive={selectedAP === ap.id}
                    />
                  </div>
                ))}
                
                {/* Interference zones (where coverage overlaps) */}
                {showCoverage && accessPoints.flatMap((ap1, i) => 
                  accessPoints.slice(i + 1).map(ap2 => {
                    // Calculate distance between APs
                    const distance = Math.sqrt(
                      Math.pow(ap1.x - ap2.x, 2) + 
                      Math.pow(ap1.y - ap2.y, 2)
                    );
                    
                    // If APs are on same or adjacent channels and coverage overlaps
                    if (Math.abs(ap1.channel - ap2.channel) <= 4 && 
                        distance < (ap1.power + ap2.power) / 2) {
                      
                      // Calculate the center point of interference
                      const centerX = (ap1.x + ap2.x) / 2;
                      const centerY = (ap1.y + ap2.y) / 2;
                      
                      // Size based on channel proximity and signal overlap
                      const size = (20 - Math.abs(ap1.channel - ap2.channel)) * 
                                 (ap1.power + ap2.power) / 20;
                      
                      return (
                        <div
                          key={`interference-${ap1.id}-${ap2.id}`}
                          className="absolute rounded-full bg-red-500 opacity-30 pointer-events-none"
                          style={{
                            left: `${centerX}%`,
                            top: `${centerY}%`,
                            width: `${size}%`,
                            height: `${size}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        />
                      );
                    }
                    return null;
                  })
                ).filter(Boolean)}
              </div>
            </div>
            
            {/* Configuration Panel */}
            <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Wifi className="mr-2 h-5 w-5 text-netsim-secondary" />
                {selectedAP !== null 
                  ? `Access Point ${accessPoints.find(ap => ap.id === selectedAP)?.id}` 
                  : "Select an Access Point"}
              </h3>
              
              {selectedAP !== null ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Transmit Power</h4>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[accessPoints.find(ap => ap.id === selectedAP)?.power || 50]}
                        min={10}
                        max={100}
                        step={5}
                        onValueChange={(value) => updateAPPower(value[0])}
                      />
                      <span className="text-sm w-10 text-right">
                        {accessPoints.find(ap => ap.id === selectedAP)?.power}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Wi-Fi Channel</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 6, 11].map(channel => (
                        <Button
                          key={channel}
                          variant={accessPoints.find(ap => ap.id === selectedAP)?.channel === channel 
                            ? "default" 
                            : "outline"}
                          className="text-xs"
                          onClick={() => updateAPChannel(channel)}
                        >
                          CH {channel}
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Channels 1, 6, and 11 don't overlap and provide optimal performance.
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-medium mb-2">Coverage Statistics</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Estimated Coverage:</span>
                        <span className="font-medium">
                          {Math.round(accessPoints.find(ap => ap.id === selectedAP)?.power || 0) * 0.6} m²
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Signal Strength:</span>
                        <span className="font-medium">
                          {accessPoints.find(ap => ap.id === selectedAP)?.power || 0 > 70 ? "Excellent" :
                           accessPoints.find(ap => ap.id === selectedAP)?.power || 0 > 40 ? "Good" : "Fair"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Channel Utilization:</span>
                        <span className="font-medium">
                          {accessPoints.filter(ap => 
                            ap.id !== selectedAP && 
                            Math.abs(ap.channel - (accessPoints.find(ap2 => ap2.id === selectedAP)?.channel || 0)) < 5
                          ).length > 0 ? "Congested" : "Optimal"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center text-slate-500">
                  <Wifi className="h-8 w-8 mb-2 text-slate-300" />
                  <p>Click on an access point to configure its settings</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="information">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h3>Wi-Fi Network Planning Principles</h3>
                <p>
                  Designing an effective Wi-Fi network requires balancing coverage, capacity, and performance factors.
                  This simulation helps you understand the key considerations in wireless network planning.
                </p>
                
                <h4>Key Concepts Demonstrated:</h4>
                <ul>
                  <li><strong>Access Point Placement:</strong> Strategic positioning to maximize coverage</li>
                  <li><strong>Channel Planning:</strong> Using non-overlapping channels (1, 6, 11) to minimize interference</li>
                  <li><strong>Power Adjustment:</strong> Balancing signal strength with potential interference</li>
                  <li><strong>Co-Channel Interference:</strong> Managing overlap between access points on the same channel</li>
                </ul>
                
                <h4>Best Practices:</h4>
                <p>
                  For optimal Wi-Fi performance, follow these guidelines:
                </p>
                <ul>
                  <li>Maintain adequate separation between access points on the same channel</li>
                  <li>Use channels 1, 6, and 11 for 2.4 GHz networks to avoid overlap</li>
                  <li>Adjust transmit power to minimize interference while maintaining coverage</li>
                  <li>Place access points near the center of intended coverage areas</li>
                  <li>Account for physical barriers (walls, furniture) that attenuate signal</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WifiOptimization;
