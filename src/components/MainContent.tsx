import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { usePlayer, Track } from "@/context/PlayerContext";
import { showError } from "@/utils/toast";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const SearchResults = ({ tracks }: { tracks: Track[] }) => {
  const { playTrack } = usePlayer();
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Search Results</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tracks.map((track, index) => (
          <div key={track.id} className="bg-secondary p-4 rounded-lg cursor-pointer hover:bg-muted/50" onClick={() => playTrack(index)}>
            <img src={track.thumbnail} alt={track.title} className="w-full aspect-square object-cover rounded-md mb-2" />
            <p className="font-semibold truncate">{track.title}</p>
            <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const MainContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const { loadPlaylist } = usePlayer();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    if (!API_KEY) {
      showError("YouTube API key is not configured. Please set VITE_YOUTUBE_API_KEY in your .env.local file.");
      return;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchTerm}&key=${API_KEY}&type=video`);
      const data = await response.json();
      if (data.items) {
        const tracks: Track[] = data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          artist: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails.high.url,
        }));
        setResults(tracks);
        loadPlaylist(tracks);
      }
    } catch (error) {
      console.error("Error searching YouTube:", error);
      showError("Failed to search. Please check the console for details.");
    }
  };

  return (
    <main className="flex-1 bg-background p-4 md:p-6 overflow-y-auto">
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search for songs, artists, or albums"
            className="pl-10 bg-secondary border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>
      
      {results.length > 0 ? (
        <SearchResults tracks={results} />
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome to CrimsonBeats</h2>
          <p className="text-muted-foreground">
            Use the search bar above to find your favorite music on YouTube.
          </p>
        </div>
      )}
    </main>
  );
};

export default MainContent;