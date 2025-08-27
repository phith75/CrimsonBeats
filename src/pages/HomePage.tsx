import { useEffect, useState } from 'react';
import AnimatedPage from "@/components/AnimatedPage";
import TrackCarousel from '@/components/TrackCarousel';
import { Track } from '@/context/PlayerContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { showError } from '@/utils/toast';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const HomePage = () => {
  const { user } = useAuth();
  const [suggested, setSuggested] = useState<Track[]>([]);
  const [history, setHistory] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<Track[]>([]);

  useEffect(() => {
    // Fetch Suggested Songs
    const fetchSuggested = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=top%20hits%202024&key=${API_KEY}&type=video&videoCategoryId=10`);
        const data = await response.json();
        if (data.items) {
          const tracks: Track[] = data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            artist: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails.high.url,
          }));
          setSuggested(tracks);
        }
      } catch (error) {
        showError("Could not fetch suggested songs.");
      }
    };
    fetchSuggested();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Fetch History
    const fetchHistory = async () => {
      const { data } = await supabase.from('history').select('*').eq('user_id', user.id).order('played_at', { ascending: false }).limit(10);
      if (data) {
        const uniqueTracks = Array.from(new Map(data.map(item => [item.video_id, item])).values());
        setHistory(uniqueTracks.map(item => ({ id: item.video_id, title: item.title, artist: item.artist, thumbnail: item.thumbnail })));
      }
    };

    // Fetch Favorites
    const fetchFavorites = async () => {
      const { data } = await supabase.from('favorites').select('*').eq('user_id', user.id).order('added_at', { ascending: false }).limit(10);
      if (data) {
        setFavorites(data.map(item => ({ id: item.video_id, title: item.title, artist: item.artist, thumbnail: item.thumbnail })));
      }
    };

    fetchHistory();
    fetchFavorites();
  }, [user]);

  return (
    <AnimatedPage>
      <div className="space-y-12 overflow-y-auto h-full py-4 md:py-8 px-4 sm:px-14">
        <TrackCarousel title="Suggested For You" tracks={suggested} />
        <TrackCarousel title="Recently Played" tracks={history} />
        <TrackCarousel title="Your Favorites" tracks={favorites} />
      </div>
    </AnimatedPage>
  );
};

export default HomePage;