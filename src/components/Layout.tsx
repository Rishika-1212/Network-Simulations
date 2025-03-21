
import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="text-netsim-primary font-bold text-xl">
                NetSim Explorer
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
              <NavLink to="/learn/network-communication" className={({ isActive }) => `nav-link ${isActive || location.pathname.startsWith('/learn') ? 'active' : ''}`}>
                Learn
              </NavLink>
              <NavLink to="/simulations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Simulations
              </NavLink>
            </nav>

            {/* Mobile Navigation Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-netsim-dark hover:text-netsim-primary focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm animate-slide-in">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <NavLink to="/" className={({ isActive }) => 
                `block px-3 py-3 rounded-md text-base font-medium ${isActive ? 'text-netsim-primary bg-blue-50' : 'text-netsim-dark hover:text-netsim-primary hover:bg-blue-50'}`
              }>
                Home
              </NavLink>
              <NavLink to="/learn/network-communication" className={({ isActive }) => 
                `block px-3 py-3 rounded-md text-base font-medium ${isActive || location.pathname.startsWith('/learn') ? 'text-netsim-primary bg-blue-50' : 'text-netsim-dark hover:text-netsim-primary hover:bg-blue-50'}`
              }>
                Learn
              </NavLink>
              <NavLink to="/simulations" className={({ isActive }) => 
                `block px-3 py-3 rounded-md text-base font-medium ${isActive ? 'text-netsim-primary bg-blue-50' : 'text-netsim-dark hover:text-netsim-primary hover:bg-blue-50'}`
              }>
                Simulations
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="py-6 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} NetSim Explorer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
