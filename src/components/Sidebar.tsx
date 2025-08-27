import { Home, Search, Library } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const SidebarLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center space-x-3 text-white hover:text-primary transition-colors",
        isActive && "text-primary"
      )
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const Sidebar = () => {
  return (
    <aside className="bg-black p-6 flex flex-col space-y-8 w-64 h-full">
      <h1 className="text-3xl font-bold text-primary">CrimsonBeats</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <SidebarLink to="/" icon={<Home />} label="Home" />
          </li>
          <li>
            <SidebarLink to="/library" icon={<Library />} label="My Library" />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;