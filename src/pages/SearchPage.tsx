import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Play } from "lucide-react";
import { usePlayer, Track } from "@/context/PlayerContext";
import { showError } from "@/utils/toast";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [order, setOrder] = useState("relevance");
  const { loadPlaylist } = usePlayer();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    if (!API_KEY) {
      showError("YouTube API key is not configured.");
      return;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchTerm}&key=${API_KEY}&type=video&videoCategoryId=10&order=${order}`);
      const data = await response.json();
      if (data.items) {
        const tracks: Track[] = data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          artist: item.snippet.channelTitle,
          thumbnail: item.snippet.thumbnails.high.url,
        }));
        setResults(tracks);
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
            placeholder="Search for songs..."
            className="pl-10 bg-secondary border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={order} onValueChange={setOrder}>
          <SelectTrigger className="w-[180px] bg-secondary border-none">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="viewCount">View Count</SelectItem>
            <SelectItem value="date">Newest</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Search</Button>
      </form>
      
      {results.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Search Results</h3>
            <Button onClick={() => loadPlaylist(results)}>
              <Play className="mr-2 h-4 w-4" /> Play All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {results.map((track) => (
              <div key={track.id} className="bg-secondary p-4 rounded-lg group relative">
                <Link to={`/track/${track.id}`}>
                  <img src={track.thumbnail} alt={track.title} className="w-full aspect-square object-cover rounded-md mb-2" />
                  <p className="font-semibold truncate hover:underline">{track.title}</p>
                </Link>
                <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-muted-foreground mt-20">
          <p>Find your favorite music by searching above.</p>
        </div>
      )}
    </main>
  );
};

export default SearchPage;