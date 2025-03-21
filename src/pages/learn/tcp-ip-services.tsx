
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Server, Globe, Database, Mail, AlertCircle, CheckCircle, XCircle, HelpCircle, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import NetworkDevice from "@/components/NetworkDevice";
import NetworkLink from "@/components/NetworkLink";
import DataPacket from "@/components/DataPacket";

// Service definitions
const services = {
  dns: {
    name: "DNS (Domain Name System)",
    description: "Translates domain names to IP addresses",
    icon: <Globe className="h-6 w-6 text-blue-500" />,
    port: 53,
    protocol: "UDP/TCP",
    settings: ["Domain name server", "DNS cache", "Domain resolution"],
    configFields: ["Primary DNS Server", "Secondary DNS Server", "Local Domain"]
  },
  dhcp: {
    name: "DHCP (Dynamic Host Configuration Protocol)",
    description: "Automatically assigns IP addresses to devices",
    icon: <Database className="h-6 w-6 text-green-500" />,
    port: 67,
    protocol: "UDP",
    settings: ["IP address pool", "Lease time", "Default gateway"],
    configFields: ["Start IP Address", "End IP Address", "Subnet Mask"]
  },
  http: {
    name: "HTTP/HTTPS (Web Server)",
    description: "Serves web content to browsers",
    icon: <Globe className="h-6 w-6 text-purple-500" />,
    port: "80/443",
    protocol: "TCP",
    settings: ["Document root", "Virtual hosts", "SSL certificates"],
    configFields: ["Web Root Directory", "Server Name", "Enable HTTPS"]
  },
  ftp: {
    name: "FTP (File Transfer Protocol)",
    description: "Transfers files between client and server",
    icon: <Database className="h-6 w-6 text-orange-500" />,
    port: "20/21",
    protocol: "TCP",
    settings: ["User authentication", "File permissions", "Transfer modes"],
    configFields: ["FTP Root Directory", "Allow Anonymous", "Max Connections"]
  },
  mail: {
    name: "Mail Server (SMTP/POP3/IMAP)",
    description: "Handles sending and receiving emails",
    icon: <Mail className="h-6 w-6 text-red-500" />,
    port: "25/110/143",
    protocol: "TCP",
    settings: ["Mail domains", "Mailboxes", "Relay settings"],
    configFields: ["Mail Domain", "Max Message Size", "Require Authentication"]
  }
};

// Predefined scenarios
const scenarios = [
  {
    id: "dns-resolution",
    title: "DNS Resolution",
    description: "A client needs to access a website but only knows the domain name. Configure the DNS server to resolve the domain name to an IP address.",
    service: "dns",
    correctConfig: {
      "Primary DNS Server": "8.8.8.8",
      "Secondary DNS Server": "8.8.4.4",
      "Local Domain": "example.com"
    }
  },
  {
    id: "dhcp-network",
    title: "Automatic IP Assignment",
    description: "New devices are joining the network and need IP addresses. Configure the DHCP server to automatically assign addresses from a specific range.",
    service: "dhcp",
    correctConfig: {
      "Start IP Address": "192.168.1.100",
      "End IP Address": "192.168.1.200",
      "Subnet Mask": "255.255.255.0"
    }
  },
  {
    id: "web-hosting",
    title: "Web Server Setup",
    description: "You need to host a company website. Configure the HTTP server to serve web content and enable secure connections.",
    service: "http",
    correctConfig: {
      "Web Root Directory": "/var/www/html",
      "Server Name": "company.com",
      "Enable HTTPS": true
    }
  }
];

const TcpIpServices = () => {
  const [selectedService, setSelectedService] = useState("dns");
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [config, setConfig] = useState<Record<string, any>>({});
  const [scenarioStatus, setScenarioStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [showPacket, setShowPacket] = useState(false);
  const [packetStep, setPacketStep] = useState(0);
  
  // Reset configuration when service or scenario changes
  useEffect(() => {
    setConfig({});
    setScenarioStatus('pending');
    const newScenario = scenarios.find(s => s.service === selectedService) || scenarios[0];
    setSelectedScenario(newScenario);
    
    // Initialize config with empty values
    const initialConfig: Record<string, any> = {};
    services[selectedService as keyof typeof services].configFields.forEach(field => {
      initialConfig[field] = "";
    });
    setConfig(initialConfig);
  }, [selectedService]);
  
  // Handle configuration changes
  const handleConfigChange = (field: string, value: string | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };
  
  // Verify scenario configuration
  const verifyConfig = () => {
    const correctConfig = selectedScenario.correctConfig;
    
    // Check if all required fields match
    let isCorrect = true;
    for (const [key, correctValue] of Object.entries(correctConfig)) {
      if (config[key] !== correctValue) {
        isCorrect = false;
        break;
      }
    }
    
    setScenarioStatus(isCorrect ? 'success' : 'error');
    
    if (isCorrect) {
      toast({
        title: "Configuration Successful!",
        description: "You've correctly configured the service.",
        variant: "default",
      });
      runSimulation();
    } else {
      toast({
        title: "Configuration Error",
        description: "There's an issue with your configuration. Please check the settings and try again.",
        variant: "destructive",
      });
    }
  };
  
  // Run network simulation animation
  const runSimulation = () => {
    setSimulationRunning(true);
    setShowPacket(true);
    setPacketStep(1);
    
    // Simulate packet moving from client to server
    setTimeout(() => {
      setPacketStep(2);
      
      // Simulate server processing
      setTimeout(() => {
        setPacketStep(3);
        
        // Simulate response back to client
        setTimeout(() => {
          setPacketStep(4);
          
          // End simulation
          setTimeout(() => {
            setShowPacket(false);
            setSimulationRunning(false);
            setPacketStep(0);
          }, 1000);
        }, 1500);
      }, 1000);
    }, 1500);
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
                  <span className="ml-1 text-sm font-medium text-netsim-primary md:ml-2">TCP/IP Services</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <h1 className="section-title mb-4">Configuring TCP/IP Services</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-3xl">
          Learn how to configure common network services and understand how they work in a TCP/IP environment.
        </p>
        
        {/* Service Selection and Configuration */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Service Configuration</h2>
          
          <Tabs defaultValue="dns" value={selectedService} onValueChange={setSelectedService} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
              <TabsTrigger value="dns" className="text-xs md:text-sm">DNS</TabsTrigger>
              <TabsTrigger value="dhcp" className="text-xs md:text-sm">DHCP</TabsTrigger>
              <TabsTrigger value="http" className="text-xs md:text-sm">HTTP</TabsTrigger>
              <TabsTrigger value="ftp" className="text-xs md:text-sm">FTP</TabsTrigger>
              <TabsTrigger value="mail" className="text-xs md:text-sm">Mail</TabsTrigger>
            </TabsList>
            
            {/* Service Information - Common for all tabs */}
            <div className="bg-white/80 rounded-xl border border-slate-100 shadow-sm p-6 mb-6">
              <div className="flex items-start mb-4">
                <div className="mr-4 mt-1">
                  {services[selectedService as keyof typeof services].icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {services[selectedService as keyof typeof services].name}
                  </h3>
                  <p className="text-slate-600">
                    {services[selectedService as keyof typeof services].description}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <span className="font-medium text-slate-700 mr-2">Port:</span>
                  <span className="text-slate-600">
                    {services[selectedService as keyof typeof services].port}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-slate-700 mr-2">Protocol:</span>
                  <span className="text-slate-600">
                    {services[selectedService as keyof typeof services].protocol}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Configuration Scenario */}
            <div className="bg-netsim-primary/5 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">{selectedScenario.title}</h3>
              <p className="text-slate-600 mb-4">{selectedScenario.description}</p>
              
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <h4 className="font-medium text-slate-700 mb-3">Configuration</h4>
                
                <div className="space-y-4">
                  {services[selectedService as keyof typeof services].configFields.map(field => (
                    <div key={field}>
                      <Label htmlFor={field} className="mb-1 block">
                        {field}
                      </Label>
                      {field === "Enable HTTPS" ? (
                        <div className="flex items-center">
                          <Switch 
                            id={field}
                            checked={!!config[field]} 
                            onCheckedChange={(checked) => handleConfigChange(field, checked)}
                          />
                          <Label htmlFor={field} className="ml-2">
                            {config[field] ? "Enabled" : "Disabled"}
                          </Label>
                        </div>
                      ) : (
                        <Input
                          id={field}
                          value={config[field] || ""}
                          onChange={(e) => handleConfigChange(field, e.target.value)}
                          placeholder={`Enter ${field}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button 
                    onClick={verifyConfig}
                    className="w-full md:w-auto"
                    disabled={simulationRunning}
                  >
                    Apply Configuration
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Configuration Status */}
            {scenarioStatus !== 'pending' && (
              <Alert variant={scenarioStatus === 'success' ? "default" : "destructive"} className="mb-6">
                {scenarioStatus === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {scenarioStatus === 'success' ? "Configuration Successful!" : "Configuration Error"}
                </AlertTitle>
                <AlertDescription>
                  {scenarioStatus === 'success' 
                    ? "Your configuration is correct. Watch the simulation below to see how the service works."
                    : "There's an issue with your configuration. Please check your settings and try again."
                  }
                </AlertDescription>
              </Alert>
            )}
            
            {/* Service Simulation */}
            <div className="bg-white/80 rounded-xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Service Simulation</h3>
              
              <div className="relative h-64 border border-slate-200 rounded-lg bg-slate-50 mb-6">
                {/* Client */}
                <div className="absolute left-[10%] top-[30%]">
                  <NetworkDevice
                    type="computer"
                    name="Client"
                    description="Requests service"
                    x={0}
                    y={0}
                  />
                </div>
                
                {/* Server */}
                <div className="absolute right-[10%] top-[30%]">
                  <NetworkDevice
                    type={selectedService === "dns" || selectedService === "http" ? "server" : "database"}
                    name={`${services[selectedService as keyof typeof services].name} Server`}
                    description="Provides service"
                    x={0}
                    y={0}
                  />
                </div>
                
                {/* Optional router for some services */}
                {(selectedService === "dns" || selectedService === "http") && (
                  <div className="absolute left-[50%] top-[30%] transform -translate-x-1/2">
                    <NetworkDevice
                      type="router"
                      name="Router"
                      description="Routes packets between networks"
                      x={0}
                      y={0}
                    />
                  </div>
                )}
                
                {/* Network Links */}
                <NetworkLink
                  startX={10}
                  startY={30}
                  endX={selectedService === "dns" || selectedService === "http" ? 50 : 90}
                  endY={30}
                  status={packetStep === 1 ? "active" : "default"}
                />
                
                {(selectedService === "dns" || selectedService === "http") && (
                  <NetworkLink
                    startX={50}
                    startY={30}
                    endX={90}
                    endY={30}
                    status={packetStep === 2 ? "active" : "default"}
                  />
                )}
                
                {/* Data Packets */}
                {showPacket && packetStep === 1 && (
                  <DataPacket
                    startX={10}
                    startY={30}
                    endX={selectedService === "dns" || selectedService === "http" ? 50 : 90}
                    endY={30}
                    duration={1500}
                    color="bg-netsim-accent"
                    size={6}
                  />
                )}
                
                {showPacket && packetStep === 2 && (selectedService === "dns" || selectedService === "http") && (
                  <DataPacket
                    startX={50}
                    startY={30}
                    endX={90}
                    endY={30}
                    duration={1500}
                    color="bg-netsim-accent"
                    size={6}
                  />
                )}
                
                {showPacket && packetStep === 3 && (selectedService === "dns" || selectedService === "http") && (
                  <DataPacket
                    startX={90}
                    startY={30}
                    endX={50}
                    endY={30}
                    duration={1500}
                    color="bg-green-500"
                    size={6}
                  />
                )}
                
                {showPacket && packetStep === 4 && (
                  <DataPacket
                    startX={selectedService === "dns" || selectedService === "http" ? 50 : 90}
                    startY={30}
                    endX={10}
                    endY={30}
                    duration={1500}
                    color="bg-green-500"
                    size={6}
                  />
                )}
                
                {/* Service Description */}
                <div className="absolute left-0 bottom-0 right-0 bg-white/80 p-3 text-sm border-t border-slate-200">
                  {packetStep === 0 && scenarioStatus === 'pending' && (
                    <div className="flex items-center">
                      <HelpCircle className="text-slate-400 h-4 w-4 mr-2" />
                      <span>Configure the service to see the simulation</span>
                    </div>
                  )}
                  
                  {packetStep === 0 && scenarioStatus === 'error' && (
                    <div className="flex items-center">
                      <XCircle className="text-red-500 h-4 w-4 mr-2" />
                      <span>Incorrect configuration. Please check your settings.</span>
                    </div>
                  )}
                  
                  {packetStep === 1 && (
                    <div className="flex items-center">
                      <Info className="text-netsim-primary h-4 w-4 mr-2" />
                      <span>Client sends request to {selectedService === "dns" || selectedService === "http" ? "router" : "server"}</span>
                    </div>
                  )}
                  
                  {packetStep === 2 && (selectedService === "dns" || selectedService === "http") && (
                    <div className="flex items-center">
                      <Info className="text-netsim-primary h-4 w-4 mr-2" />
                      <span>Router forwards request to {services[selectedService as keyof typeof services].name} server</span>
                    </div>
                  )}
                  
                  {packetStep === 3 && (
                    <div className="flex items-center">
                      <Info className="text-netsim-primary h-4 w-4 mr-2" />
                      <span>Server processes request and sends response</span>
                    </div>
                  )}
                  
                  {packetStep === 4 && (
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 h-4 w-4 mr-2" />
                      <span>Client receives response from server</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Service Explanation */}
              <div className="bg-netsim-primary/5 rounded-lg p-4">
                <h4 className="font-medium text-slate-700 mb-2">How {services[selectedService as keyof typeof services].name} Works</h4>
                
                {selectedService === "dns" && (
                  <p className="text-slate-600 text-sm">
                    When you type a domain name (like example.com) in your browser, your computer needs to find its IP address. It sends a DNS query to the configured DNS server, which looks up the domain name and returns the corresponding IP address, allowing your computer to connect to the website.
                  </p>
                )}
                
                {selectedService === "dhcp" && (
                  <p className="text-slate-600 text-sm">
                    When a new device joins the network, it broadcasts a DHCP discovery message. The DHCP server responds with an IP address offer from its configured range. The device then requests the offered IP, and the server confirms the assignment, allowing the device to communicate on the network.
                  </p>
                )}
                
                {selectedService === "http" && (
                  <p className="text-slate-600 text-sm">
                    When you visit a website, your browser sends an HTTP request to the web server. The server retrieves the requested files from its configured web root directory and returns them to your browser. If HTTPS is enabled, this communication is encrypted for security.
                  </p>
                )}
                
                {selectedService === "ftp" && (
                  <p className="text-slate-600 text-sm">
                    FTP uses two channels: a control channel for commands and a data channel for file transfers. When a client connects to an FTP server, it authenticates (unless anonymous access is allowed) and can then navigate directories and transfer files to/from the configured root directory.
                  </p>
                )}
                
                {selectedService === "mail" && (
                  <p className="text-slate-600 text-sm">
                    Email servers use multiple protocols: SMTP for sending mail, and POP3 or IMAP for receiving mail. When you send an email, your mail client connects to the SMTP server, which relays the message to the recipient's mail server. The recipient then downloads the message using POP3 or IMAP.
                  </p>
                )}
              </div>
            </div>
          </Tabs>
        </div>
        
        {/* Common TCP/IP Service Ports */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Common TCP/IP Service Ports</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4 bg-slate-50 border-b border-slate-200">Service</th>
                  <th className="text-left py-2 px-4 bg-slate-50 border-b border-slate-200">Port</th>
                  <th className="text-left py-2 px-4 bg-slate-50 border-b border-slate-200">Protocol</th>
                  <th className="text-left py-2 px-4 bg-slate-50 border-b border-slate-200">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-slate-100">HTTP</td>
                  <td className="py-2 px-4 border-b border-slate-100">80</td>
                  <td className="py-2 px-4 border-b border-slate-100">TCP</td>
                  <td className="py-2 px-4 border-b border-slate-100">Web traffic</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-slate-100">HTTPS</td>
                  <td className="py-2 px-4 border-b border-slate-100">443</td>
                  <td className="py-2 px-4 border-b border-slate-100">TCP</td>
                  <td className="py-2 px-4 border-b border-slate-100">Secure web traffic</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-slate-100">DNS</td>
                  <td className="py-2 px-4 border-b border-slate-100">53</td>
                  <td className="py-2 px-4 border-b border-slate-100">UDP/TCP</td>
                  <td className="py-2 px-4 border-b border-slate-100">Domain name resolution</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-slate-100">DHCP</td>
                  <td className="py-2 px-4 border-b border-slate-100">67/68</td>
                  <td className="py-2 px-4 border-b border-slate-100">UDP</td>
                  <td className="py-2 px-4 border-b border-slate-100">Dynamic IP assignment</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-slate-100">FTP</td>
                  <td className="py-2 px-4 border-b border-slate-100">20/21</td>
                  <td className="py-2 px-4 border-b border-slate-100">TCP</td>
                  <td className="py-2 px-4 border-b border-slate-100">File transfer</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-slate-100">SMTP</td>
                  <td className="py-2 px-4 border-b border-slate-100">25</td>
                  <td className="py-2 px-4 border-b border-slate-100">TCP</td>
                  <td className="py-2 px-4 border-b border-slate-100">Email sending</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-slate-100">POP3</td>
                  <td className="py-2 px-4 border-b border-slate-100">110</td>
                  <td className="py-2 px-4 border-b border-slate-100">TCP</td>
                  <td className="py-2 px-4 border-b border-slate-100">Email retrieval</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">SSH</td>
                  <td className="py-2 px-4">22</td>
                  <td className="py-2 px-4">TCP</td>
                  <td className="py-2 px-4">Secure shell access</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="bg-netsim-primary/5 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
          <p className="text-slate-600 mb-6">
            Ready to test your knowledge?
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/learn/transmission-media">
              <Button variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous: Transmission Media
              </Button>
            </Link>
            
            <Link to="/practice">
              <Button variant="outline" className="border-netsim-primary text-netsim-primary hover:bg-netsim-primary hover:text-white">
                Next: Practice Exercises
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TcpIpServices;
