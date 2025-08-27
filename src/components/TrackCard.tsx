import { Link } from 'react-router-dom';
import { Track } from '@/context/PlayerContext';

interface TrackCardProps {
  track: Track;
}

const TrackCard = ({ track }: TrackCardProps) => {
  return (
    <Link to={`/track/${track.id}`} className="bg-secondary p-4 rounded-lg group w-48 flex-shrink-0">
      <img src={track.thumbnail} alt={track.title} className="w-full aspect-square object-cover rounded-md mb-2" />
      <p className="font-semibold truncate group-hover:underline">{track.title}</p>
      <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
    </Link>
  );
};

export default TrackCard;