
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Wifi, Cable, Cpu, Server, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import NetworkLink from "@/components/NetworkLink";
import AnimatedWaves from "@/components/AnimatedWaves";

// Media types and their properties
const mediaTypes = {
  fiber: {
    name: "Fiber Optic",
    color: "bg-blue-500",
    speedFactor: 1, // Full speed (reference)
    distanceFactor: 1, // No degradation with distance
    interferenceFactor: 0, // Not affected by interference
    description: "Transmits data as light pulses through thin strands of glass or plastic fiber.",
    pros: ["Highest bandwidth capacity", "Immune to electromagnetic interference", "Low signal attenuation over long distances", "Enhanced security"],
    cons: ["More expensive than copper media", "Complex installation and specialized equipment", "More fragile than other media types"]
  },
  copper: {
    name: "Copper (Twisted Pair)",
    color: "bg-amber-500",
    speedFactor: 0.5, // Medium speed
    distanceFactor: 0.6, // Some degradation with distance
    interferenceFactor: 0.4, // Some susceptibility to interference
    description: "Uses insulated copper wires twisted together to reduce interference.",
    pros: ["Cost-effective for short distances", "Easy to install and terminate", "Compatible with many network technologies", "Lower equipment costs"],
    cons: ["Limited bandwidth compared to fiber", "Signal degradation over longer distances", "Susceptible to electromagnetic interference", "Security concerns (signal can be tapped)"]
  },
  coaxial: {
    name: "Coaxial Cable",
    color: "bg-orange-500",
    speedFactor: 0.7, // Better than twisted pair
    distanceFactor: 0.8, // Better distance than twisted pair
    interferenceFactor: 0.2, // Better shielding than twisted pair
    description: "Features a central copper conductor surrounded by insulation and a conductive shield.",
    pros: ["Better shielding against interference than twisted pair", "Higher bandwidth than twisted pair", "Can transmit both analog and digital signals", "Relatively durable"],
    cons: ["More expensive than twisted pair", "More difficult to install than twisted pair", "Bulkier and less flexible", "Lower bandwidth than fiber optic"]
  },
  wireless: {
    name: "Wireless (Wi-Fi)",
    color: "bg-purple-500",
    speedFactor: 0.4, // Slower than wired options
    distanceFactor: 0.3, // Significant degradation with distance
    interferenceFactor: 0.8, // Highly susceptible to interference
    description: "Transmits data using radio frequency signals through the air.",
    pros: ["No physical cabling required", "Mobility and flexibility for users", "Easy to add new devices", "Reduced installation complexity"],
    cons: ["Lower reliability than wired connections", "Susceptible to interference", "Security concerns (signal broadcast in all directions)", "Speed decreases with distance and obstacles"]
  }
};

const TransmissionMedia = () => {
  const [selectedMedia, setSelectedMedia] = useState("fiber");
  const [distance, setDistance] = useState(50);
  const [obstacles, setObstacles] = useState(0);
  const [showWaves, setShowWaves] = useState(false);
  
  // Calculate data transmission metrics based on selected media and conditions
  const calculateMetrics = () => {
    const media = mediaTypes[selectedMedia as keyof typeof mediaTypes];
    
    // Base speed in Mbps (adjusted by media type)
    let baseSpeed = 1000 * media.speedFactor;
    
    // Distance impact
    const distanceImpact = distance > 50 
      ? (distance - 50) * (1 - media.distanceFactor) * 0.01 * baseSpeed
      : 0;
    
    // Obstacle impact (only significant for wireless)
    const obstacleImpact = obstacles * media.interferenceFactor * 0.2 * baseSpeed;
    
    // Calculate final speed
    const actualSpeed = Math.max(baseSpeed - distanceImpact - obstacleImpact, 10);
    
    // Calculate latency (in ms)
    const latency = 1 + (distance * (1 - media.distanceFactor) * 0.1) + (obstacles * media.interferenceFactor * 2);
    
    // Calculate reliability percentage
    const reliability = 100 - (distance * (1 - media.distanceFactor) * 0.1) - (obstacles * media.interferenceFactor * 5);
    
    return {
      speed: Math.round(actualSpeed),
      latency: Math.round(latency * 10) / 10,
      reliability: Math.max(Math.round(reliability), 0)
    };
  };
  
  const metrics = calculateMetrics();
  
  const handleStartSimulation = () => {
    setShowWaves(true);
    setTimeout(() => setShowWaves(false), 5000);
  };
  
  const getLinkStatus = () => {
    const reliability = metrics.reliability;
    if (reliability > 80) return 'active';
    if (reliability > 40) return 'slow';
    return 'error';
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-netsim-primary">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                  <span className="ml-1 text-sm font-medium text-slate-500 md:ml-2">Learn</span>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                  <span className="ml-1 text-sm font-medium text-netsim-primary md:ml-2">Transmission Media</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <h1 className="section-title mb-4">Transmission Media Lab</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-3xl">
          This interactive lab lets you explore different types of transmission media and see how they perform under various conditions.
        </p>
        
        {/* Media Selection Tabs */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Select Transmission Media</h2>
          
          <Tabs defaultValue="fiber" value={selectedMedia} onValueChange={setSelectedMedia} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="fiber" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">Fiber Optic</TabsTrigger>
              <TabsTrigger value="copper" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700">Twisted Pair</TabsTrigger>
              <TabsTrigger value="coaxial" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700">Coaxial</TabsTrigger>
              <TabsTrigger value="wireless" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">Wireless</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fiber" className="mt-0">
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-slate-700">{mediaTypes.fiber.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="copper" className="mt-0">
              <div className="bg-amber-50 rounded-lg p-4 mb-6">
                <p className="text-slate-700">{mediaTypes.copper.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="coaxial" className="mt-0">
              <div className="bg-orange-50 rounded-lg p-4 mb-6">
                <p className="text-slate-700">{mediaTypes.coaxial.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="wireless" className="mt-0">
              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <p className="text-slate-700">{mediaTypes.wireless.description}</p>
              </div>
            </TabsContent>
            
            {/* Simulation Area (common for all tabs) */}
            <div className="bg-white/80 rounded-xl border border-slate-100 shadow-sm p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Simulation Parameters</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Distance (meters)</label>
                      <span className="text-sm text-slate-500">{distance}m</span>
                    </div>
                    <Slider
                      value={[distance]}
                      min={10}
                      max={100}
                      step={1}
                      onValueChange={(values) => setDistance(values[0])}
                    />
                  </div>
                  
                  {selectedMedia === "wireless" && (
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700">Obstacles</label>
                        <span className="text-sm text-slate-500">{obstacles}</span>
                      </div>
                      <Slider
                        value={[obstacles]}
                        min={0}
                        max={5}
                        step={1}
                        onValueChange={(values) => setObstacles(values[0])}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Visual Simulation */}
              <div className="relative h-60 bg-slate-50 rounded-lg mb-6 overflow-hidden">
                {/* Devices */}
                <div className="absolute left-[10%] top-1/2 transform -translate-y-1/2 device-node">
                  <Cpu className="text-netsim-primary" size={24} />
                </div>
                
                <div className="absolute right-[10%] top-1/2 transform -translate-y-1/2 device-node">
                  <Server className="text-netsim-primary" size={24} />
                </div>
                
                {/* Connection Link */}
                {selectedMedia !== "wireless" ? (
                  <NetworkLink
                    startX={10}
                    startY={50}
                    endX={90}
                    endY={50}
                    status={getLinkStatus() as any}
                    thickness={selectedMedia === "fiber" ? 3 : selectedMedia === "coaxial" ? 4 : 2}
                  />
                ) : (
                  <>
                    {/* Wireless Waves */}
                    {showWaves && (
                      <AnimatedWaves
                        x={10}
                        y={50}
                        color="border-purple-400"
                        count={3}
                        duration={3000}
                      />
                    )}
                    
                    {/* Obstacles for wireless */}
                    {Array.from({ length: obstacles }).map((_, i) => (
                      <div 
                        key={i}
                        className="absolute bg-slate-300 rounded"
                        style={{
                          left: `${30 + (i * 10)}%`,
                          top: '30%',
                          width: '8px',
                          height: '40%',
                          opacity: 0.7
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
              
              <div className="flex justify-center mb-6">
                <Button 
                  onClick={handleStartSimulation} 
                  className={
                    selectedMedia === "fiber" ? "bg-blue-600 hover:bg-blue-700" :
                    selectedMedia === "copper" ? "bg-amber-600 hover:bg-amber-700" :
                    selectedMedia === "coaxial" ? "bg-orange-600 hover:bg-orange-700" :
                    "bg-purple-600 hover:bg-purple-700"
                  }
                >
                  {selectedMedia === "wireless" ? "Transmit Signal" : "Send Data"}
                </Button>
              </div>
              
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-slate-100 shadow-sm text-center">
                  <p className="text-sm font-medium text-slate-500 mb-1">Speed</p>
                  <p className="text-2xl font-bold text-netsim-primary">{metrics.speed} Mbps</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-slate-100 shadow-sm text-center">
                  <p className="text-sm font-medium text-slate-500 mb-1">Latency</p>
                  <p className="text-2xl font-bold text-netsim-primary">{metrics.latency} ms</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-slate-100 shadow-sm text-center">
                  <p className="text-sm font-medium text-slate-500 mb-1">Reliability</p>
                  <p className="text-2xl font-bold text-netsim-primary">{metrics.reliability}%</p>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
        
        {/* Pros & Cons Comparison */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Media Comparison</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600">Advantages</h3>
                <ul className="space-y-2">
                  {mediaTypes[selectedMedia as keyof typeof mediaTypes].pros.map((pro, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4 text-red-600">Limitations</h3>
                <ul className="space-y-2">
                  {mediaTypes[selectedMedia as keyof typeof mediaTypes].cons.map((con, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">✕</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Key Takeaways */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Takeaways</h2>
          
          <div className="bg-netsim-primary/5 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="text-netsim-primary mr-3 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <p className="text-slate-700 mb-2">
                <span className="font-medium">Choosing the right transmission media</span> is crucial for network performance and reliability.
              </p>
              <p className="text-slate-600 text-sm">
                The best choice depends on factors like required bandwidth, distance, budget, installation environment, and security needs.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 rounded-xl p-5 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-netsim-primary">Distance Considerations</h3>
              <p className="text-slate-600">
                As distance increases, signal degradation becomes a factor for all media types. Fiber optic cables maintain signal quality over much longer distances than copper or wireless.
              </p>
            </div>
            
            <div className="bg-white/80 rounded-xl p-5 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-netsim-primary">Interference Impact</h3>
              <p className="text-slate-600">
                Electromagnetic interference affects copper cables and wireless signals but has virtually no impact on fiber optic cables, which use light instead of electrical signals.
              </p>
            </div>
            
            <div className="bg-white/80 rounded-xl p-5 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-netsim-primary">Cost vs. Performance</h3>
              <p className="text-slate-600">
                Higher performance typically comes with increased costs. Twisted pair is cost-effective for short distances, while fiber optic may be necessary for high bandwidth over long distances.
              </p>
            </div>
            
            <div className="bg-white/80 rounded-xl p-5 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-netsim-primary">Installation Complexity</h3>
              <p className="text-slate-600">
                Wireless eliminates cabling but introduces security and reliability challenges. Fiber optic offers superior performance but requires specialized installation skills and equipment.
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="bg-netsim-primary/5 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
          <p className="text-slate-600 mb-6">
            Ready to explore more network concepts?
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/learn/network-communication">
              <Button variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous: Network Communication
              </Button>
            </Link>
            
            <Link to="/learn/tcp-ip-services">
              <Button variant="outline" className="border-netsim-primary text-netsim-primary hover:bg-netsim-primary hover:text-white">
                Next: TCP/IP Services
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransmissionMedia;
