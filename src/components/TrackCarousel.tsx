import TrackCard from './TrackCard';
import { Track } from '@/context/PlayerContext';

interface TrackCarouselProps {
  title: string;
  tracks: Track[];
}

const TrackCarousel = ({ title, tracks }: TrackCarouselProps) => {
  if (!tracks || tracks.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {tracks.map((track, index) => (
          <TrackCard key={track.id + index} track={track} />
        ))}
      </div>
    </section>
  );
};

export default TrackCarousel;