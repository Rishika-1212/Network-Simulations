
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NetworkCommunication from "./pages/learn/network-communication";
import TransmissionMedia from "./pages/learn/transmission-media";
import TcpIpServices from "./pages/learn/tcp-ip-services";
import Simulations from "./pages/Simulations";
import PacketRouting from "./pages/simulations/PacketRouting";
import WifiOptimization from "./pages/simulations/WifiOptimization";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="learn/network-communication" element={<NetworkCommunication />} />
            <Route path="learn/transmission-media" element={<TransmissionMedia />} />
            <Route path="learn/tcp-ip-services" element={<TcpIpServices />} />
            <Route path="simulations" element={<Simulations />} />
            <Route path="simulations/packet-routing" element={<PacketRouting />} />
            <Route path="simulations/wifi-optimization" element={<WifiOptimization />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
