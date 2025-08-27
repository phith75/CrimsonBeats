import { Home, Search, Library, ListMusic } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="bg-black p-6 flex flex-col space-y-8 w-64 h-full">
      <h1 className="text-3xl font-bold text-primary">CrimsonBeats</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center space-x-3 text-white hover:text-primary transition-colors">
              <Home />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-3 text-white hover:text-primary transition-colors">
              <Search />
              <span>Search</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-3 text-white hover:text-primary transition-colors">
              <Library />
              <span>My Library</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-4">Playlists</h2>
        <ul className="space-y-2">
            <li>
                <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-primary transition-colors">
                    <ListMusic size={20} />
                    <span>My Awesome Mix</span>
                </a>
            </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;