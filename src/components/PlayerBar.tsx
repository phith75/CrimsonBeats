import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { usePlayer } from "@/context/PlayerContext";

const PlayerBar = () => {
  const { currentTrack, isPlaying, togglePlayPause, playNext, playPrev } = usePlayer();

  if (!currentTrack) {
    return (
      <footer className="bg-secondary p-4 border-t border-border flex items-center justify-center">
        <p className="text-muted-foreground">No song is playing</p>
      </footer>
    );
  }

  return (
    <footer className="bg-secondary p-4 border-t border-border grid grid-cols-3 items-center gap-4">
      <div className="flex items-center space-x-4">
        <img src={currentTrack.thumbnail} alt={currentTrack.title} className="w-14 h-14 object-cover rounded" />
        <div>
          <p className="font-semibold truncate">{currentTrack.title}</p>
          <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-6">
          <button onClick={playPrev} className="text-muted-foreground hover:text-white disabled:opacity-50" disabled={!currentTrack}>
            <SkipBack />
          </button>
          <button onClick={togglePlayPause} className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90 disabled:opacity-50" disabled={!currentTrack}>
            {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current" />}
          </button>
          <button onClick={playNext} className="text-muted-foreground hover:text-white disabled:opacity-50" disabled={!currentTrack}>
            <SkipForward />
          </button>
        </div>
        {/* Progress bar functionality can be added later */}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Volume2 />
        <Progress value={80} className="w-24 h-1" />
      </div>
    </footer>
  );
};

export default PlayerBar;