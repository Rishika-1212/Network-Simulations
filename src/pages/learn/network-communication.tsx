
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, AlertCircle, Check, Info } from "lucide-react";
import NetworkDevice from "@/components/NetworkDevice";
import NetworkLink from "@/components/NetworkLink";
import DataPacket from "@/components/DataPacket";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

// Device info for the explanation
const deviceInfo = {
  computer: {
    title: "Client Computer",
    description: "Initiates requests and receives responses from servers",
    details: "A client computer is an endpoint device that users interact with to access network resources. It sends requests to servers and processes the responses it receives."
  },
  router: {
    title: "Router",
    description: "Connects different networks and directs traffic between them",
    details: "Routers operate at the network layer (Layer 3) of the OSI model. They examine IP address information and determine the best path for forwarding packets between different networks."
  },
  switch: {
    title: "Switch",
    description: "Connects devices within the same network",
    details: "Switches operate at the data link layer (Layer 2) of the OSI model. They use MAC addresses to forward frames only to the specific device that needs to receive them, improving network efficiency."
  },
  server: {
    title: "Server",
    description: "Responds to client requests and provides services",
    details: "Servers are powerful computers that run specialized software to provide services to clients. Examples include web servers, file servers, database servers, and mail servers."
  }
};

const NetworkCommunication = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [packetStatus, setPacketStatus] = useState<'default' | 'success' | 'error'>('default');
  const [packetPosition, setPacketPosition] = useState({ step: 0, complete: false });
  const [linkStatus, setLinkStatus] = useState({
    link1: 'default',
    link2: 'default',
    link3: 'default'
  });
  
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleDeviceClick = (device: string) => {
    setSelectedDevice(device);
    
    toast({
      title: deviceInfo[device as keyof typeof deviceInfo].title,
      description: deviceInfo[device as keyof typeof deviceInfo].details,
      duration: 5000,
    });
  };
  
  const startAnimation = () => {
    if (showAnimation) return;
    
    setShowAnimation(true);
    setPacketStatus('default');
    setPacketPosition({ step: 0, complete: false });
    setLinkStatus({
      link1: 'default',
      link2: 'default',
      link3: 'default'
    });
    
    // Step 1: Client to Router
    animationRef.current = setTimeout(() => {
      setLinkStatus(prev => ({ ...prev, link1: 'active' }));
      setPacketPosition({ step: 1, complete: false });
      
      // Step 2: Router to Switch
      animationRef.current = setTimeout(() => {
        setLinkStatus(prev => ({ ...prev, link2: 'active' }));
        setPacketPosition({ step: 2, complete: false });
        
        // Step 3: Switch to Server
        animationRef.current = setTimeout(() => {
          setLinkStatus(prev => ({ ...prev, link3: 'active' }));
          setPacketPosition({ step: 3, complete: false });
          
          // Step 4: Server processes request
          animationRef.current = setTimeout(() => {
            // Simulate response
            setPacketStatus('success');
            
            // Step 5: Complete
            animationRef.current = setTimeout(() => {
              setPacketPosition({ step: 4, complete: true });
              setLinkStatus({
                link1: 'default',
                link2: 'default',
                link3: 'default'
              });
              
              // Reset after animation completes
              animationRef.current = setTimeout(() => {
                setShowAnimation(false);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 1500);
      }, 1500);
    }, 500);
  };
  
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);
  
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
                  <span className="ml-1 text-sm font-medium text-netsim-primary md:ml-2">Network Communication</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <h1 className="section-title mb-4">Understanding Network Communication</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-3xl">
          This module demonstrates how data travels through a network, from a client computer to a server, passing through various network devices.
        </p>
        
        {/* Interactive Network Diagram */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Interactive Network Diagram</h2>
          <p className="text-slate-600 mb-6">
            Click on any device to learn more about its role in the network. Use the "Animate Data Flow" button to see how data packets travel through the network.
          </p>
          
          <div className="relative h-80 border border-slate-200 rounded-xl bg-white/50 mb-6">
            {/* Network Devices */}
            <NetworkDevice 
              type="computer"
              name="Client Computer"
              description="End-user device"
              x={10}
              y={50}
              onClick={() => handleDeviceClick('computer')}
            />
            
            <NetworkDevice 
              type="router"
              name="Router"
              description="Network gateway"
              x={35}
              y={50}
              onClick={() => handleDeviceClick('router')}
            />
            
            <NetworkDevice 
              type="switch"
              name="Switch"
              description="Local network connector"
              x={65}
              y={50}
              onClick={() => handleDeviceClick('switch')}
            />
            
            <NetworkDevice 
              type="server"
              name="Server"
              description="Service provider"
              x={90}
              y={50}
              onClick={() => handleDeviceClick('server')}
            />
            
            {/* Network Links */}
            <NetworkLink 
              startX={10} 
              startY={50} 
              endX={35} 
              endY={50} 
              status={linkStatus.link1 as any} 
            />
            
            <NetworkLink 
              startX={35} 
              startY={50} 
              endX={65} 
              endY={50} 
              status={linkStatus.link2 as any} 
            />
            
            <NetworkLink 
              startX={65} 
              startY={50} 
              endX={90} 
              endY={50} 
              status={linkStatus.link3 as any} 
            />
            
            {/* Animated Data Packet */}
            {showAnimation && packetPosition.step === 1 && !packetPosition.complete && (
              <DataPacket
                startX={10}
                startY={50}
                endX={35}
                endY={50}
                duration={1500}
                color={packetStatus === 'default' ? 'bg-netsim-accent' : 
                       packetStatus === 'success' ? 'bg-green-500' : 'bg-red-500'}
              />
            )}
            
            {showAnimation && packetPosition.step === 2 && !packetPosition.complete && (
              <DataPacket
                startX={35}
                startY={50}
                endX={65}
                endY={50}
                duration={1500}
                color={packetStatus === 'default' ? 'bg-netsim-accent' : 
                       packetStatus === 'success' ? 'bg-green-500' : 'bg-red-500'}
              />
            )}
            
            {showAnimation && packetPosition.step === 3 && !packetPosition.complete && (
              <DataPacket
                startX={65}
                startY={50}
                endX={90}
                endY={50}
                duration={1500}
                color={packetStatus === 'default' ? 'bg-netsim-accent' : 
                       packetStatus === 'success' ? 'bg-green-500' : 'bg-red-500'}
              />
            )}
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={startAnimation} 
              disabled={showAnimation}
              className="bg-netsim-primary hover:bg-netsim-primary/90"
            >
              Animate Data Flow
            </Button>
          </div>
        </div>
        
        {/* Device Information */}
        {selectedDevice && (
          <Card className="mb-8 border-netsim-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">
                {deviceInfo[selectedDevice as keyof typeof deviceInfo].title}
              </h3>
              <p className="text-slate-600 mb-4">
                {deviceInfo[selectedDevice as keyof typeof deviceInfo].details}
              </p>
              <div className="bg-blue-50 rounded-lg p-4 flex items-start">
                <Info className="text-netsim-primary mr-3 mt-0.5 flex-shrink-0" size={20} />
                <p className="text-sm text-slate-700">
                  Click on other devices to learn about their roles in the network. Use the animation button to see how data flows between them.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Explanation */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How Network Communication Works</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-50 rounded-full p-2 mr-4 mt-1">
                <span className="flex items-center justify-center w-6 h-6 text-netsim-primary font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Client Request</h3>
                <p className="text-slate-600">
                  The process begins when a client computer (like your laptop or smartphone) sends a request for information or a service. This could be a web page, a file, or any other network resource.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-50 rounded-full p-2 mr-4 mt-1">
                <span className="flex items-center justify-center w-6 h-6 text-netsim-primary font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Router Forwarding</h3>
                <p className="text-slate-600">
                  The request reaches a router, which examines the destination IP address and determines the best path for the data to take. The router forwards the packet toward its destination, possibly through multiple networks.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-50 rounded-full p-2 mr-4 mt-1">
                <span className="flex items-center justify-center w-6 h-6 text-netsim-primary font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Switch Distribution</h3>
                <p className="text-slate-600">
                  Within the destination network, a switch receives the data packet and forwards it specifically to the target device based on its MAC address, rather than broadcasting it to all devices.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-50 rounded-full p-2 mr-4 mt-1">
                <span className="flex items-center justify-center w-6 h-6 text-netsim-primary font-bold">4</span>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Server Response</h3>
                <p className="text-slate-600">
                  The server receives the request, processes it, and sends a response back through the network. This response follows a similar path back to the client, often through the same network devices.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Concepts */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Concepts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 rounded-xl p-5 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-netsim-primary">Data Packets</h3>
              <p className="text-slate-600">
                Information is broken down into small chunks called packets. Each packet contains the data being sent, along with source and destination addresses.
              </p>
            </div>
            
            <div className="bg-white/80 rounded-xl p-5 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-netsim-primary">IP Addressing</h3>
              <p className="text-slate-600">
                Every device on a network is assigned an IP address, which serves as its unique identifier for receiving and sending data.
              </p>
            </div>
            
            <div className="bg-white/80 rounded-xl p-5 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-netsim-primary">Routing</h3>
              <p className="text-slate-600">
                Routers determine the optimal path for data packets to reach their destination, often using routing protocols to adapt to network conditions.
              </p>
            </div>
            
            <div className="bg-white/80 rounded-xl p-5 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-netsim-primary">Protocols</h3>
              <p className="text-slate-600">
                Network communication follows established rules called protocols. Common protocols include TCP/IP, HTTP, and FTP, each serving different purposes.
              </p>
            </div>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="bg-netsim-primary/5 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
          <p className="text-slate-600 mb-6">
            Ready to learn more about networks? Continue to the next module or explore other topics.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/learn/transmission-media">
              <Button variant="outline" className="border-netsim-primary text-netsim-primary hover:bg-netsim-primary hover:text-white">
                Next: Transmission Media
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/simulations">
              <Button variant="outline">
                Try Simulations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkCommunication;
