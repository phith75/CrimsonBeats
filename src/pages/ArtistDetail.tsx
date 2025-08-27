import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { showError } from '@/utils/toast';
import { Users } from 'lucide-react';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

interface ChannelDetails {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  banner: string;
  subscriberCount: string;
}

const ArtistDetail = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [details, setDetails] = useState<ChannelDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannelDetails = async () => {
      if (!channelId) return;
      setLoading(true);
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${API_KEY}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const item = data.items[0];
          setDetails({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
            banner: item.brandingSettings.image?.bannerExternalUrl,
            subscriberCount: Number(item.statistics.subscriberCount).toLocaleString(),
          });
        }
      } catch (error) {
        console.error("Error fetching channel details:", error);
        showError("Failed to fetch channel details.");
      } finally {
        setLoading(false);
      }
    };
    fetchChannelDetails();
  }, [channelId]);

  if (loading) {
    return <div className="p-8 text-center">Loading artist...</div>;
  }

  if (!details) {
    return <div className="p-8 text-center">Artist not found.</div>;
  }

  return (
    <div>
      <div className="relative h-48 md:h-64">
        {details.banner && <img src={details.banner} alt={details.title} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="p-4 md:p-8 -mt-24 relative">
        <div className="flex items-end gap-6">
          <img src={details.thumbnail} alt={details.title} className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-background shadow-lg" />
          <div>
            <h1 className="text-4xl md:text-6xl font-bold">{details.title}</h1>
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <Users size={18} />
              <span>{details.subscriberCount} subscribers</span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-muted-foreground whitespace-pre-wrap max-w-4xl">{details.description.substring(0, 500)}...</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;