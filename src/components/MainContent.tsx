import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const MainContent = () => {
  return (
    <main className="bg-background p-6 overflow-y-auto">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search for songs, artists, or albums"
          className="pl-10 bg-secondary border-none"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Welcome to CrimsonBeats</h2>
        <p className="text-muted-foreground">
          Use the search bar above to find your favorite music on YouTube.
        </p>
      </div>
    </main>
  );
};

export default MainContent;