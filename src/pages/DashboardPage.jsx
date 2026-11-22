import React, { useState } from 'react';
import { useSkillLoop } from '../context/SkillLoopContext';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { SuggestedMatches } from '../components/dashboard/SuggestedMatches';
import { QuickSchedule } from '../components/dashboard/QuickSchedule';
import { ConnectModal } from '../components/explore/ConnectModal';
import { BookSessionModal } from '../components/sessions/BookSessionModal';
import { Repeat, Sparkles, Plus, Calendar, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

export const DashboardPage = () => {
  const { currentUser, setCurrentPage } = useSkillLoop();
  const [selectedPeerForConnect, setSelectedPeerForConnect] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-soft relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-200 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>Active SkillLoop Member</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome back, {currentUser.name}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/90 max-w-xl font-normal">
                {currentUser.college} · {currentUser.major} ({currentUser.year})
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>Book Peer Session</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2.5 bg-blue-600/60 hover:bg-blue-600 border border-blue-400/40 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Skills</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. Learning Progress & Stats Overview */}
        <StatsOverview />

        {/* 2. Main Grid: Suggested Reverse Matches & Quick Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Reverse Matching Suggestions (8 cols) */}
          <div className="lg:col-span-8">
            <SuggestedMatches onOpenConnectModal={(peer) => setSelectedPeerForConnect(peer)} />
          </div>

          {/* Right Column: Upcoming Sessions & Tips (4 cols) */}
          <div className="lg:col-span-4">
            <QuickSchedule onBookSessionClick={() => setIsBookModalOpen(true)} />
          </div>

        </div>

      </div>

      {/* Modals */}
      <ConnectModal
        peer={selectedPeerForConnect}
        isOpen={Boolean(selectedPeerForConnect)}
        onClose={() => setSelectedPeerForConnect(null)}
      />

      <BookSessionModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </div>
  );
};
