
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Network, Wifi, Server } from "lucide-react";

const Home = () => {
  const packetRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const animatePackets = () => {
      const container = packetRef.current;
      if (!container) return;
      
      // Create a new packet
      const packet = document.createElement('div');
      packet.className = 'absolute w-3 h-3 rounded-full bg-netsim-accent shadow-md animate-packet-move';
      packet.style.top = `${Math.random() * 80 + 10}%`;
      packet.style.animationDuration = `${Math.random() * 2 + 2}s`;
      
      container.appendChild(packet);
      
      // Remove packet after animation completes
      setTimeout(() => {
        packet.remove();
      }, 4000);
    };
    
    // Create packets at intervals
    const interval = setInterval(animatePackets, 600);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-netsim-dark mb-6 tracking-tight animate-fade-in">
              Explore the World of Networks
            </h1>
            <p className="text-xl text-slate-600 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Learn, Configure, and Simulate Computer Networks with Interactive Visualizations
            </p>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/learn/network-communication" 
                className="cta-button group"
              >
                Start Learning
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated Network Visualization */}
        <div className="relative h-64 mt-16 overflow-hidden" ref={packetRef}>
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-8 md:px-16">
            <div className="device-node bg-white border border-slate-100 z-10 animate-float">
              <Cpu className="text-netsim-primary" size={24} />
            </div>
            
            <div className="device-node bg-white border border-slate-100 z-10 animate-float" style={{ animationDelay: '0.5s' }}>
              <Network className="text-netsim-secondary" size={24} />
            </div>
            
            <div className="device-node bg-white border border-slate-100 z-10 animate-float" style={{ animationDelay: '1s' }}>
              <Wifi className="text-netsim-accent" size={24} />
            </div>
            
            <div className="device-node bg-white border border-slate-100 z-10 animate-float" style={{ animationDelay: '1.5s' }}>
              <Server className="text-netsim-primary" size={24} />
            </div>
          </div>
          
          {/* Network Links */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-8 md:px-16">
            <div className="flex-1 network-link mx-8"></div>
            <div className="flex-1 network-link mx-8"></div>
            <div className="flex-1 network-link mx-8"></div>
          </div>
        </div>
      </section>

      {/* Learning Modules Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Learning Modules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Module 1 */}
            <div className="learning-card">
              <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                <Network className="text-netsim-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Network Communication</h3>
              <p className="text-slate-600 mb-4">Understand how data travels across networks with visual simulations of packet transmission.</p>
              <Link 
                to="/learn/network-communication" 
                className="inline-flex items-center text-netsim-primary hover:text-netsim-primary/80 font-medium"
              >
                Start Learning <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
            
            {/* Module 2 */}
            <div className="learning-card">
              <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                <Wifi className="text-netsim-secondary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transmission Media</h3>
              <p className="text-slate-600 mb-4">Explore different types of transmission media and understand their characteristics.</p>
              <Link 
                to="/learn/transmission-media" 
                className="inline-flex items-center text-netsim-primary hover:text-netsim-primary/80 font-medium"
              >
                Start Learning <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
            
            {/* Module 3 */}
            <div className="learning-card">
              <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                <Server className="text-netsim-accent" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">TCP/IP Services</h3>
              <p className="text-slate-600 mb-4">Configure network services like DNS, DHCP, FTP and HTTP in an interactive environment.</p>
              <Link 
                to="/learn/tcp-ip-services" 
                className="inline-flex items-center text-netsim-primary hover:text-netsim-primary/80 font-medium"
              >
                Start Learning <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Why NetSim Explorer?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netsim-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Learning</h3>
              <p className="text-slate-600">See and interact with network components instead of just reading about them.</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netsim-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Visual Explanations</h3>
              <p className="text-slate-600">Complex concepts explained through animations and visual simulations.</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netsim-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 9.5V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5.5"></path>
                  <path d="M2 14.5V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.5"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Hands-on Practice</h3>
              <p className="text-slate-600">Configure and troubleshoot networks in a safe, virtual environment.</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-netsim-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                  <path d="M10 2c1 .5 2 2 2 5"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-world Scenarios</h3>
              <p className="text-slate-600">Simulations based on real-world network configurations and challenges.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
