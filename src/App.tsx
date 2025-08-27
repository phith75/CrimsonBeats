import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { PlayerProvider } from "./context/PlayerContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import Library from "./pages/Library";
import TrackDetail from "./pages/TrackDetail";
import ArtistDetail from "./pages/ArtistDetail";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { session } = useAuth();

  return (
    <Routes>
      <Route path="/landing" element={!session ? <LandingPage /> : <Navigate to="/" />} />
      <Route path="/login" element={!session ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/signup" element={!session ? <SignUpPage /> : <Navigate to="/" />} />

      <Route path="/" element={session ? <Layout /> : <Navigate to="/landing" />} >
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="library" element={<Library />} />
        <Route path="track/:videoId" element={<TrackDetail />} />
        <Route path="channel/:channelId" element={<ArtistDetail />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <PlayerProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </PlayerProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;