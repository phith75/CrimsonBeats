import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import PlayerBar from "@/components/PlayerBar";

const Index = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-black text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>
      <PlayerBar />
    </div>
  );
};

export default Index;