import { Link } from "react-router-dom";
import AnimatedPage from "@/components/AnimatedPage";

const HomePage = () => {
  return (
    <AnimatedPage>
      <div className="flex-1 bg-background p-4 md:p-6 flex flex-col items-center justify-center text-center h-full">
        <h1 className="text-5xl font-bold text-primary mb-4">Welcome to CrimsonBeats</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your next favorite song is just a search away.
        </p>
        <Link to="/search" className="bg-primary text-primary-foreground py-3 px-6 rounded-full font-bold hover:bg-primary/90 transition-colors">
          Start Searching
        </Link>
      </div>
    </AnimatedPage>
  );
};

export default HomePage;