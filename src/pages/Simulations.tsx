
import { useState } from "react";
import { Link } from "react-router-dom";
import { Network, Wifi, Server, Router, ChevronRight, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type SimulationCard = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: "routing" | "security" | "troubleshooting" | "configuration";
  soon?: boolean;
};

const simulations: SimulationCard[] = [
  {
    id: "packet-routing",
    title: "Packet Routing Simulation",
    description: "Visualize how data packets navigate through a network with multiple routers and switches.",
    icon: <Network className="h-12 w-12 text-netsim-primary" />,
    difficulty: "beginner",
    category: "routing"
  },
  {
    id: "wifi-optimization",
    title: "Wi-Fi Coverage Optimizer",
    description: "Configure access points to maximize wireless coverage and minimize interference in a building.",
    icon: <Wifi className="h-12 w-12 text-netsim-secondary" />,
    difficulty: "intermediate",
    category: "configuration"
  },
  {
    id: "firewall-config",
    title: "Network Firewall Configuration",
    description: "Set up and test firewall rules to secure a network while allowing necessary traffic.",
    icon: <Lock className="h-12 w-12 text-netsim-accent" />,
    difficulty: "advanced",
    category: "security",
    soon: true
  },
  {
    id: "dns-troubleshoot",
    title: "DNS Troubleshooting",
    description: "Diagnose and fix issues with DNS resolution in a complex enterprise network.",
    icon: <Server className="h-12 w-12 text-netsim-primary" />,
    difficulty: "intermediate",
    category: "troubleshooting",
    soon: true
  },
  {
    id: "dhcp-failover",
    title: "DHCP Failover Setup",
    description: "Configure redundant DHCP servers to ensure continuous IP address assignment.",
    icon: <Router className="h-12 w-12 text-netsim-secondary" />,
    difficulty: "advanced",
    category: "configuration",
    soon: true
  },
  {
    id: "subnetting",
    title: "Subnet Design Workshop",
    description: "Design and implement an efficient subnetting scheme for a growing organization.",
    icon: <Network className="h-12 w-12 text-netsim-accent" />,
    difficulty: "intermediate",
    category: "configuration",
    soon: true
  }
];

const difficultyColor = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-amber-100 text-amber-800",
  advanced: "bg-red-100 text-red-800"
};

const categoryColor = {
  routing: "bg-blue-100 text-blue-800",
  security: "bg-purple-100 text-purple-800",
  troubleshooting: "bg-orange-100 text-orange-800",
  configuration: "bg-teal-100 text-teal-800"
};

const Simulations = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredSimulations = filter 
    ? simulations.filter(sim => sim.category === filter || sim.difficulty === filter)
    : simulations;
  
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-netsim-dark mb-6 tracking-tight">Network Simulations</h1>
          <p className="text-xl text-slate-600">
            Explore interactive simulations to practice network configuration, troubleshooting, and design in a virtual environment.
          </p>
        </div>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <Button 
            variant={filter === null ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter(null)}
          >
            All Simulations
          </Button>
          
          <Button 
            variant={filter === "beginner" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter("beginner")}
          >
            Beginner
          </Button>
          
          <Button 
            variant={filter === "intermediate" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter("intermediate")}
          >
            Intermediate
          </Button>
          
          <Button 
            variant={filter === "advanced" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter("advanced")}
          >
            Advanced
          </Button>
          
          <Button 
            variant={filter === "routing" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter("routing")}
          >
            Routing
          </Button>
          
          <Button 
            variant={filter === "security" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter("security")}
          >
            Security
          </Button>
          
          <Button 
            variant={filter === "troubleshooting" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter("troubleshooting")}
          >
            Troubleshooting
          </Button>
          
          <Button 
            variant={filter === "configuration" ? "default" : "outline"} 
            className="rounded-full"
            onClick={() => setFilter("configuration")}
          >
            Configuration
          </Button>
        </div>
        
        {/* Simulations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSimulations.map(simulation => (
            <Card 
              key={simulation.id} 
              className={`overflow-hidden transition-all duration-300 hover:shadow-md ${simulation.soon ? 'opacity-75' : ''}`}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-lg bg-slate-50">{simulation.icon}</div>
                  <div className="flex gap-2">
                    <Badge 
                      variant="outline" 
                      className={difficultyColor[simulation.difficulty]}
                    >
                      {simulation.difficulty}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={categoryColor[simulation.category]}
                    >
                      {simulation.category}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="mt-3">{simulation.title}</CardTitle>
                <CardDescription>{simulation.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pb-6">
                {simulation.soon ? (
                  <Button disabled className="w-full">
                    <Lock className="mr-2 h-4 w-4" />
                    Coming Soon
                  </Button>
                ) : (
                  <Link to={`/simulations/${simulation.id}`} className="w-full">
                    <Button className="w-full">
                      Start Simulation
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* No Results */}
        {filteredSimulations.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-slate-700 mb-2">No simulations match your filter</h3>
            <p className="text-slate-500 mb-6">Try changing your filter criteria or check back later for new simulations.</p>
            <Button onClick={() => setFilter(null)}>Show All Simulations</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Simulations;
