import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import YouTube from 'react-youtube';

export interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
}

interface PlayerContextType {
  playlist: Track[];
  currentTrack: Track | null;
  currentTrackIndex: number | null;
  isPlaying: boolean;
  volume: number;
  playTrack: (index: number) => void;
  playSingleTrack: (track: Track) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrev: () => void;
  loadPlaylist: (tracks: Track[]) => void;
  setVolume: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [volume, setVolumeState] = useState(80);

  useEffect(() => {
    const savedPlaylist = localStorage.getItem('playlist');
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    }
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume) {
      setVolumeState(Number(savedVolume));
    }
  }, []);

  const currentTrack = currentTrackIndex !== null ? playlist[currentTrackIndex] : null;

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    localStorage.setItem('volume', String(newVolume));
    if (player) {
      player.setVolume(newVolume);
    }
  };

  const loadPlaylist = (tracks: Track[]) => {
    setPlaylist(tracks);
    localStorage.setItem('playlist', JSON.stringify(tracks));
    playTrack(0, tracks);
  };

  const playSingleTrack = (track: Track) => {
    const newPlaylist = [track];
    setPlaylist(newPlaylist);
    localStorage.setItem('playlist', JSON.stringify(newPlaylist));
    playTrack(0, newPlaylist);
  };

  const playTrack = (index: number, tracks: Track[] = playlist) => {
    if (tracks[index]) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
      if (player) {
        isPlaying ? player.pauseVideo() : player.playVideo();
      }
    }
  };

  const playNext = () => {
    if (currentTrackIndex !== null) {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      playTrack(nextIndex);
    }
  };

  const playPrev = () => {
    if (currentTrackIndex !== null) {
      const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      playTrack(prevIndex);
    }
  };
  
  const onReady = (event: any) => {
    setPlayer(event.target);
    event.target.setVolume(volume);
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <PlayerContext.Provider value={{ playlist, currentTrack, currentTrackIndex, isPlaying, volume, playTrack, playSingleTrack, togglePlayPause, playNext, playPrev, loadPlaylist, setVolume }}>
      {children}
      {currentTrack && (
         <YouTube
            videoId={currentTrack.id}
            opts={opts}
            onReady={onReady}
            onEnd={playNext}
            style={{ display: 'none' }}
          />
      )}
    </PlayerContext.Provider>
  );
};