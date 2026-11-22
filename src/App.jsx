import React from 'react';
import { useSkillLoop } from './context/SkillLoopContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { LoginModal } from './components/auth/LoginModal';
import { RegisterModal } from './components/auth/RegisterModal';

// Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { ExplorePage } from './pages/ExplorePage';
import { ProfilePage } from './pages/ProfilePage';
import { ConnectionsPage } from './pages/ConnectionsPage';
import { SessionsPage } from './pages/SessionsPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { AuthPage } from './pages/AuthPage';

export function AppContent() {
  const { currentPage } = useSkillLoop();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'explore':
        return <ExplorePage />;
      case 'profile':
        return <ProfilePage />;
      case 'connections':
        return <ConnectionsPage />;
      case 'sessions':
        return <SessionsPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'auth':
        return <AuthPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      
      {/* Global Modals & Notifications */}
      <Toast />
      <LoginModal />
      <RegisterModal />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
