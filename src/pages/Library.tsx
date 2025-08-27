import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { usePlayer, Track } from '@/context/PlayerContext';
import { Link } from 'react-router-dom';
import { Heart, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedPage from '@/components/AnimatedPage';

const Library = () => {
  const { user } = useAuth();
  const { loadPlaylist } = usePlayer();
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      setLoading(true);
      const { data } = await supabase.from('favorites').select('video_id, title, artist, thumbnail').eq('user_id', user.id).order('added_at', { ascending: false });
      if (data) {
        const tracks = data.map(item => ({
          id: item.video_id,
          title: item.title,
          artist: item.artist || 'Unknown Artist',
          thumbnail: item.thumbnail,
        }));
        setFavorites(tracks);
      }
      setLoading(false);
    };
    fetchFavorites();
  }, [user]);

  return (
    <AnimatedPage>
      <div className="p-4 md:p-8 overflow-y-auto h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Library</h1>
          {favorites.length > 0 && (
            <Button onClick={() => loadPlaylist(favorites)}>
              <Play className="mr-2 h-4 w-4" /> Play All
            </Button>
          )}
        </div>
        
        {loading ? (
          <p>Loading favorites...</p>
        ) : favorites.length > 0 ? (
          <div className="flex flex-col gap-2">
            {favorites.map((track, index) => (
              <div key={track.id + index} className="flex items-center gap-4 p-2 rounded-md hover:bg-secondary">
                <img src={track.thumbnail} alt={track.title} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1 truncate">
                  <Link to={`/track/${track.id}`} className="font-semibold hover:underline truncate block">{track.title}</Link>
                  <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground mt-20">
            <Heart className="mx-auto mb-4" size={48} />
            <p>You haven't favorited any songs yet.</p>
            <p>Click the heart icon on a song to add it here.</p>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Library;