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
          loop: tracks.length > 5,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {tracks.map((track, index) => (
            <CarouselItem 
              key={track.id + index} 
              className="pl-4 basis-2/5 sm:basis-1/3 md:basis-1/4 xl:basis-1/5"
            >
              <TrackCard track={track} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
};

export default TrackCarousel;