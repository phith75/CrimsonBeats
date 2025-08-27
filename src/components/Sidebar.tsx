import { Home, Search, Library, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";
import { showSuccess } from "@/utils/toast";

const SidebarLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink
    to={to}
    end
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
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showSuccess("Đã đăng xuất.");
    navigate('/landing');
  };

  return (
    <aside className="bg-black p-6 flex flex-col space-y-8 w-64 h-full">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-8">CrimsonBeats</h1>
        <nav>
          <ul className="space-y-4">
            <li><SidebarLink to="/" icon={<Home />} label="Home" /></li>
            <li><SidebarLink to="/search" icon={<Search />} label="Search" /></li>
            <li><SidebarLink to="/library" icon={<Library />} label="My Library" /></li>
          </ul>
        </nav>
      </div>
      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-3" />
          Đăng xuất
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;