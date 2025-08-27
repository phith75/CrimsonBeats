import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlayer, Track } from '@/context/PlayerContext';
import { Button } from '@/components/ui/button';
import { Play, Heart, Clock, BarChart2 } from 'lucide-react';
import { showError } from '@/utils/toast';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

interface TrackDetails extends Track {
  description: string;
  viewCount: string;
  likeCount: string;
  publishedAt: string;
}

const TrackDetail = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [details, setDetails] = useState<TrackDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { playSingleTrack } = usePlayer();

  useEffect(() => {
    const fetchTrackDetails = async () => {
      if (!videoId) return;
      if (!API_KEY) {
        showError("YouTube API key is not configured.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const item = data.items[0];
          const snippet = item.snippet;
          const stats = item.statistics;
          setDetails({
            id: item.id,
            title: snippet.title,
            artist: snippet.channelTitle,
            thumbnail: snippet.thumbnails.high.url,
            description: snippet.description,
            viewCount: Number(stats.viewCount).toLocaleString(),
            likeCount: Number(stats.likeCount).toLocaleString(),
            publishedAt: new Date(snippet.publishedAt).toLocaleDateString(),
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
          <p className="text-xl text-muted-foreground">{details.artist}</p>
          <div className="flex items-center gap-4 mt-6">
            <Button size="lg" onClick={() => playSingleTrack(details)}>
              <Play className="mr-2 h-5 w-5 fill-current" /> Play
            </Button>
            <Button variant="outline" size="icon">
              <Heart />
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2"><BarChart2 size={18} /> {details.viewCount} views</div>
            <div className="flex items-center gap-2"><Heart size={18} /> {details.likeCount} likes</div>
            <div className="flex items-center gap-2"><Clock size={18} /> Published on {details.publishedAt}</div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-muted-foreground whitespace-pre-wrap">{details.description.substring(0, 500)}...</p>
      </div>
    </div>
  );
};

export default TrackDetail;