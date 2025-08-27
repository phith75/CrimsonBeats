import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import PlayerBar from "@/components/PlayerBar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col bg-black text-white">
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden absolute top-4 left-4 z-20">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Sidebar */}
        <div className={`
          fixed md:relative z-10
          h-full md:h-auto
          transition-transform transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}>
          <Sidebar />
        </div>
        
        <div className="flex flex-col flex-1">
          <MainContent />
        </div>
      </div>
      <PlayerBar />
    </div>
  );
};

export default Index;