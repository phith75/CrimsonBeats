import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlayer, Track } from '@/context/PlayerContext';
import { Button } from '@/components/ui/button';
import { Play, Pause, Heart, Clock, BarChart2, MessageCircle } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';
import { formatDuration } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

interface TrackDetails extends Track {
  description: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  publishedAt: string;
  duration: string;
  channelId: string;
}

const TrackDetail = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [details, setDetails] = useState<TrackDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(true);
  const { playSingleTrack, currentTrack, isPlaying, togglePlayPause } = usePlayer();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTrackDetails = async () => {
      if (!videoId) return;
      setLoading(true);
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${API_KEY}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const item = data.items[0];
          const snippet = item.snippet;
          const stats = item.statistics;
          const contentDetails = item.contentDetails;
          setDetails({
            id: item.id,
            title: snippet.title,
            artist: snippet.channelTitle,
            thumbnail: snippet.thumbnails.high.url,
            description: snippet.description,
            viewCount: Number(stats.viewCount).toLocaleString(),
            likeCount: Number(stats.likeCount).toLocaleString(),
            commentCount: Number(stats.commentCount).toLocaleString(),
            publishedAt: new Date(snippet.publishedAt).toLocaleDateString(),
            duration: formatDuration(contentDetails.duration),
            channelId: snippet.channelId,
          });
        }
      } catch (error) {
        console.error("Error fetching track details:", error);
        showError("Failed to fetch track details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrackDetails();
  }, [videoId]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !videoId) return;
      setLoadingFavorite(true);
      const { data } = await supabase.from('favorites').select('id').eq('user_id', user.id).eq('video_id', videoId).single();
      setIsFavorite(!!data);
      setLoadingFavorite(false);
    };
    checkFavorite();
  }, [user, videoId]);

  const toggleFavorite = async () => {
    if (!user || !details) return;
    setLoadingFavorite(true);
    if (isFavorite) {
      const { error } = await supabase.from('favorites').delete().eq('user_id', user.id).eq('video_id', details.id);
      if (!error) {
        setIsFavorite(false);
        showSuccess("Đã xóa khỏi danh sách yêu thích.");
      } else {
        showError("Không thể xóa khỏi danh sách yêu thích.");
      }
    } else {
      const { error } = await supabase.from('favorites').insert({
        user_id: user.id,
        video_id: details.id,
        title: details.title,
        artist: details.artist,
        thumbnail: details.thumbnail,
      });
      if (!error) {
        setIsFavorite(true);
        showSuccess("Đã thêm vào danh sách yêu thích.");
      } else {
        showError("Không thể thêm vào danh sách yêu thích.");
      }
    }
    setLoadingFavorite(false);
  };

  const isCurrentlyPlaying = isPlaying && currentTrack?.id === details?.id;

  const handlePlayPauseClick = () => {
    if (!details) return;
    if (isCurrentlyPlaying) {
      togglePlayPause();
    } else {
      playSingleTrack(details);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!details) {
    return <div className="p-8 text-center">Track not found. <Link to="/" className="text-primary hover:underline">Go Home</Link></div>;
  }

  return (
    <div className="p-4 md:p-8 overflow-y-auto h-full">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={details.thumbnail} alt={details.title} className="w-full md:w-1/3 aspect-square object-cover rounded-lg shadow-lg" />
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">SONG</p>
          <h1 className="text-4xl md:text-6xl font-bold my-2">{details.title}</h1>
          <Link to={`/channel/${details.channelId}`} className="text-xl text-muted-foreground hover:text-primary hover:underline">{details.artist}</Link>
          <div className="flex items-center gap-4 mt-6">
            <Button size="lg" onClick={handlePlayPauseClick}>
              {isCurrentlyPlaying ? <Pause className="mr-2 h-5 w-5 fill-current" /> : <Play className="mr-2 h-5 w-5 fill-current" />}
              {isCurrentlyPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button variant="outline" size="icon" onClick={toggleFavorite} disabled={loadingFavorite}>
              <Heart className={isFavorite ? "fill-primary text-primary" : ""} />
            </Button>
            <span className="text-muted-foreground">{details.duration}</span>
          </div>
          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2"><BarChart2 size={18} /> {details.viewCount} views</div>
            <div className="flex items-center gap-2"><Heart size={18} /> {details.likeCount} likes</div>
            <div className="flex items-center gap-2"><MessageCircle size={18} /> {details.commentCount} comments</div>
            <div className="flex items-center gap-2"><Clock size={18} /> Published on {details.publishedAt}</div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-muted-foreground whitespace-pre-wrap break-words">{details.description.substring(0, 500)}...</p>
      </div>
    </div>
  );
};

export default TrackDetail;