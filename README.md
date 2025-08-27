# 🎵 Crystal Shiba Flip - Music Streaming App

A modern, responsive music streaming application built with React, TypeScript, and Supabase. This project provides a YouTube-based music streaming experience with user authentication, playlist management, and a beautiful UI.

## 👨‍💻 Developer

**Trần Hoàng Phi** - Full Stack Developer

## ✨ Features

### 🎧 Music Streaming
- **YouTube Integration**: Stream music directly from YouTube videos
- **Playlist Management**: Create and manage custom playlists
- **Audio Controls**: Play, pause, skip, volume control, and seek functionality
- **Progress Tracking**: Real-time progress bar with time display

### 👤 User Experience
- **User Authentication**: Secure login/signup with Supabase Auth
- **Personal Library**: Save favorite tracks and view listening history
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Modern dark UI with smooth animations

### 🔍 Content Discovery
- **Smart Recommendations**: AI-powered music suggestions
- **Search Functionality**: Find tracks, artists, and albums
- **Recently Played**: Quick access to your listening history
- **Favorites**: Save and organize your favorite tracks

### 🎨 Modern UI/UX
- **Shadcn/ui Components**: Beautiful, accessible UI components
- **Framer Motion**: Smooth page transitions and animations
- **Tailwind CSS**: Utility-first styling approach
- **Mobile-First**: Responsive design that works on all devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **TanStack Query** - Data fetching and caching

### UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Headless UI primitives
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon library

### Backend & Services
- **Supabase** - Backend-as-a-Service (Auth, Database)
- **YouTube Data API** - Music content and metadata
- **React YouTube** - YouTube player integration

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **SWC** - Fast JavaScript/TypeScript compiler

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm
- Supabase account
- YouTube Data API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crystal-shiba-flip
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_YOUTUBE_API_KEY=your_youtube_api_key
   ```

4. **Database Setup**
   Set up the following tables in your Supabase database:
   
   **history table:**
   ```sql
   CREATE TABLE history (
     id SERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     video_id TEXT NOT NULL,
     title TEXT NOT NULL,
     artist TEXT NOT NULL,
     thumbnail TEXT NOT NULL,
     played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
   
   **favorites table:**
   ```sql
   CREATE TABLE favorites (
     id SERIAL PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     video_id TEXT NOT NULL,
     title TEXT NOT NULL,
     artist TEXT NOT NULL,
     thumbnail TEXT NOT NULL,
     added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:8080`

## 📁 Project Structure

```
crystal-shiba-flip/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── Layout.tsx      # Main layout component
│   │   ├── PlayerBar.tsx   # Music player controls
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── ...
│   ├── context/            # React context providers
│   │   ├── AuthContext.tsx # Authentication state
│   │   └── PlayerContext.tsx # Music player state
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx    # Main dashboard
│   │   ├── SearchPage.tsx  # Search functionality
│   │   ├── Library.tsx     # User library
│   │   └── ...
│   ├── lib/                # Utility libraries
│   │   ├── supabaseClient.ts # Supabase configuration
│   │   └── utils.ts        # Helper functions
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🎯 Key Features Implementation

### Music Player
- **YouTube Integration**: Uses `react-youtube` for video playback
- **State Management**: Centralized player state with React Context
- **Playlist Support**: Queue management and track navigation
- **Audio Controls**: Volume, progress, and playback controls

### Authentication
- **Supabase Auth**: Secure user authentication
- **Session Management**: Automatic session persistence
- **Protected Routes**: Route guards for authenticated users

### Data Management
- **TanStack Query**: Efficient data fetching and caching
- **Supabase Database**: User data, history, and favorites
- **Local Storage**: Playlist persistence

## 🎨 UI Components

The application uses a comprehensive set of UI components from Shadcn/ui:
- **Navigation**: Sidebar, breadcrumbs, navigation menu
- **Forms**: Input fields, buttons, checkboxes, selects
- **Feedback**: Toasts, alerts, progress bars
- **Layout**: Cards, modals, sheets, drawers
- **Data Display**: Tables, lists, carousels

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-First Approach**: Optimized for mobile devices
- **Breakpoint System**: Tailwind CSS responsive utilities
- **Touch-Friendly**: Optimized touch targets and gestures
- **Adaptive Layout**: Flexible layouts that work on all screen sizes

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm build:dev` - Build for development
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🌐 Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `pnpm build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

### Other Platforms
The application can be deployed to any static hosting service that supports React applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Trần Hoàng Phi** - Lead developer and project architect
- **Shadcn/ui** - Beautiful component library
- **Supabase** - Backend services
- **YouTube Data API** - Music content
- **React Community** - Amazing ecosystem and tools

---

**Built with ❤️ by Trần Hoàng Phi**
