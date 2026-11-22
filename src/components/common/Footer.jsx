import React from 'react';
import { Repeat, ShieldCheck, Heart, Sparkles, GraduationCap } from 'lucide-react';
import { useSkillLoop } from '../../context/SkillLoopContext';

export const Footer = () => {
  const { setCurrentPage } = useSkillLoop();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Repeat className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                SkillLoop
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The peer-to-peer college skill exchange platform. Connect, exchange complementary knowledge, and grow without expensive courses.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified College Students Only</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => { setCurrentPage('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Browse Skill Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Reverse Matching Hub
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('sessions'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Session Planner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('feedback'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Peer Endorsements & Ratings
                </button>
              </li>
            </ul>
          </div>

          {/* Peer Exchange Disciplines */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Top Exchanges
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>React.js ↔ Figma UI/UX</span>
                <span className="text-[10px] text-blue-400 font-bold bg-blue-950 px-2 py-0.5 rounded border border-blue-900">#1 Loop</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Machine Learning ↔ Web Dev</span>
                <span className="text-[10px] text-blue-400 font-bold bg-blue-950 px-2 py-0.5 rounded border border-blue-900">Hot</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Algorithms ↔ Video Editing</span>
                <span className="text-[10px] text-blue-400 font-bold bg-blue-950 px-2 py-0.5 rounded border border-blue-900">Active</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Spanish ↔ Python Basics</span>
                <span className="text-[10px] text-blue-400 font-bold bg-blue-950 px-2 py-0.5 rounded border border-blue-900">Popular</span>
              </li>
            </ul>
          </div>

          {/* Student Trust & Security */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Safe Peer Network
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              SkillLoop promotes genuine peer learning. No credit cards, no commercial ads, no sensitive student IDs displayed publicly.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
              <span className="font-semibold text-blue-300">Designed for College Life:</span> Schedule sessions on campus, in library study pods, or via secure video calls.
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SkillLoop Inc. Built with React & Vite for College Students.</p>
          <div className="flex items-center gap-1">
            <span>Powered by reciprocal peer learning</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-400 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
