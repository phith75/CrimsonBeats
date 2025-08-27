import { Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const PlayerBar = () => {
  return (
    <footer className="bg-secondary p-4 border-t border-border grid grid-cols-3 items-center">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-muted rounded"></div>
        <div>
          <p className="font-semibold">Song Title</p>
          <p className="text-sm text-muted-foreground">Artist Name</p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-6">
          <button className="text-muted-foreground hover:text-white">
            <SkipBack />
          </button>
          <button className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90">
            <Play className="fill-current" />
          </button>
          <button className="text-muted-foreground hover:text-white">
            <SkipForward />
          </button>
        </div>
        <div className="w-full max-w-md flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">0:00</span>
            <Progress value={33} className="w-full h-1" />
            <span className="text-xs text-muted-foreground">3:30</span>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Volume2 />
        <Progress value={80} className="w-24 h-1" />
      </div>
    </footer>
  );
};

export default PlayerBar;