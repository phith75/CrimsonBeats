import { usePlayer, Track } from '@/context/PlayerContext';
import { Link } from 'react-router-dom';
import { ListMusic } from 'lucide-react';

const Library = () => {
  const { playlist, playTrack } = usePlayer();

  return (
    <div className="p-4 md:p-8 overflow-y-auto h-full">
      <h1 className="text-3xl font-bold mb-6">My Library</h1>
      
      {playlist.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Current Playlist</h2>
          <div className="flex flex-col gap-2">
            {playlist.map((track, index) => (
              <div 
                key={track.id + index} 
                className="flex items-center gap-4 p-2 rounded-md hover:bg-secondary cursor-pointer"
                onClick={() => playTrack(index)}
              >
                <img src={track.thumbnail} alt={track.title} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1 truncate">
                  <Link to={`/track/${track.id}`} className="font-semibold hover:underline truncate block">{track.title}</Link>
                  <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-muted-foreground mt-20">
          <ListMusic className="mx-auto mb-4" size={48} />
          <p>Your library is empty.</p>
          <p>Search for songs to add them to your playlist.</p>
        </div>
      )}
    </div>
  );
};

export default Library;