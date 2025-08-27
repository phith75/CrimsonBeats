import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/context/PlayerContext";
import { formatTime } from "@/lib/utils";

const PlayerBar = () => {
  const { currentTrack, isPlaying, togglePlayPause, playNext, playPrev, volume, setVolume, progress, duration, seekTo } = usePlayer();

  if (!currentTrack) {
    return null;
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
    <footer className="bg-secondary p-2 border-t border-border md:grid md:grid-cols-3 md:items-center md:gap-4 md:p-4 h-[72px] md:h-[80px]">
      {/* --- Left Section (Track Info) --- */}
      <div className="flex items-center space-x-3 md:space-x-4 overflow-hidden">
        <img src={currentTrack.thumbnail} alt={currentTrack.title} className="w-12 h-12 md:w-14 md:h-14 object-cover rounded flex-shrink-0" />
        <div className="truncate flex-1">
          <p className="font-semibold truncate text-sm md:text-base">{currentTrack.title}</p>
          <p className="text-xs md:text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
        {/* Mobile Controls */}
        <div className="flex items-center pr-2 md:hidden">
          <button onClick={togglePlayPause} className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 disabled:opacity-50" disabled={!currentTrack}>
            {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current" />}
          </button>
        </div>
      </div>

      {/* --- Center Section (Controls & Progress) --- */}
      <div className="flex flex-col items-center space-y-1 md:space-y-2">
        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-6">
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
        {/* Progress Bar (Mobile & Desktop) */}
        <div className="w-full flex items-center space-x-2 px-1 md:px-0">
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

      {/* --- Right Section (Volume - Desktop Only) --- */}
      <div className="hidden md:flex items-center justify-end space-x-2">
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