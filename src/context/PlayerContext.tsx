import React, { createContext, useContext, useState, ReactNode, useEffect, useRef, useCallback } from 'react';
import YouTube from 'react-youtube';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabaseClient';

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
  progress: number;
  duration: number;
  playTrack: (index: number) => void;
  playSingleTrack: (track: Track) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrev: () => void;
  loadPlaylist: (tracks: Track[]) => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
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
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();

  const currentTrack = currentTrackIndex !== null ? playlist[currentTrackIndex] : null;

  useEffect(() => {
    const logHistory = async () => {
      if (currentTrack && user) {
        await supabase.from('history').insert({
          user_id: user.id,
          video_id: currentTrack.id,
          title: currentTrack.title,
          artist: currentTrack.artist,
          thumbnail: currentTrack.thumbnail,
        });
      }
    };
    if (currentTrack) {
      logHistory();
    }
  }, [currentTrack, user]);

  useEffect(() => {
    const savedPlaylist = localStorage.getItem('playlist');
    if (savedPlaylist) setPlaylist(JSON.parse(savedPlaylist));
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume) setVolumeState(Number(savedVolume));
  }, []);

  const clearProgressInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startProgressInterval = useCallback(() => {
    clearProgressInterval();
    intervalRef.current = setInterval(() => {
      if (player && typeof player.getCurrentTime === 'function') {
        setProgress(player.getCurrentTime());
      }
    }, 1000);
  }, [player, clearProgressInterval]);

  useEffect(() => {
    if (isPlaying && player) {
      startProgressInterval();
    } else {
      clearProgressInterval();
    }
    return clearProgressInterval;
  }, [isPlaying, player, startProgressInterval, clearProgressInterval]);

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    localStorage.setItem('volume', String(newVolume));
    if (player) player.setVolume(newVolume);
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
      setProgress(0);
      setDuration(0);
    }
  };

  const togglePlayPause = () => {
    if (currentTrack) {
      const newIsPlaying = !isPlaying;
      setIsPlaying(newIsPlaying);
      if (player) {
        newIsPlaying ? player.playVideo() : player.pauseVideo();
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

  const seekTo = (time: number) => {
    if (player) {
      player.seekTo(time, true);
      setProgress(time);
    }
  };
  
  const onReady = (event: any) => {
    setPlayer(event.target);
    event.target.setVolume(volume);
  };

  const onStateChange = (event: any) => {
    if (event.data === 1) { // Playing
      setIsPlaying(true);
      setDuration(event.target.getDuration());
    } else { // Paused, Buffering, Ended, etc.
      setIsPlaying(false);
    }
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: { autoplay: 1 },
  };

  return (
    <PlayerContext.Provider value={{ playlist, currentTrack, currentTrackIndex, isPlaying, volume, progress, duration, playTrack, playSingleTrack, togglePlayPause, playNext, playPrev, loadPlaylist, setVolume, seekTo }}>
      {children}
      {currentTrack && (
         <YouTube
            videoId={currentTrack.id}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
            onEnd={playNext}
            style={{ display: 'none' }}
          />
      )}
    </PlayerContext.Provider>
  );
};