import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/context/PlayerContext";
import { formatTime } from "@/lib/utils";

const PlayerBar = () => {
  const { currentTrack, isPlaying, togglePlayPause, playNext, playPrev, volume, setVolume, progress, duration, seekTo } = usePlayer();

  if (!currentTrack) {
    return (
      <footer className="bg-secondary p-4 border-t border-border flex items-center justify-center">
        <p className="text-muted-foreground">No song is playing</p>
      </footer>
    );
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleProgressChange = (value: number[]) => {
    seekTo(value[0]);
  };

  const toggleMute = () => {
    setVolume(volume > 0 ? 0 : 80);
  };

  return (
    <footer className="bg-secondary p-4 border-t border-border grid grid-cols-3 items-center gap-4">
      <div className="flex items-center space-x-4 overflow-hidden">
        <img src={currentTrack.thumbnail} alt={currentTrack.title} className="w-14 h-14 object-cover rounded flex-shrink-0" />
        <div className="truncate">
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
        <div className="w-full max-w-md flex items-center space-x-2">
          <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(progress)}</span>
          <Slider
            value={[progress]}
            max={duration || 1}
            step={1}
            onValueChange={handleProgressChange}
            className="w-full"
          />
          <span className="text-xs text-muted-foreground w-10 text-left">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <button onClick={toggleMute} className="text-muted-foreground hover:text-white">
          {volume === 0 ? <VolumeX /> : <Volume2 />}
        </button>
        <Slider
          value={[volume]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="w-24"
        />
      </div>
    </footer>
  );
};

export default PlayerBar;