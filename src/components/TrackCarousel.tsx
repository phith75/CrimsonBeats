import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
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
      <Carousel
        opts={{
          align: "start",
          // Only loop if there are enough items to make scrolling meaningful
          loop: tracks.length > 5,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {tracks.map((track, index) => (
            <CarouselItem key={track.id + index} className="pl-4 basis-auto">
              <TrackCard track={track} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default TrackCarousel;