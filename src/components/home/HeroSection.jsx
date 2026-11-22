import React from 'react';
import { ArrowRight, Sparkles, Repeat, ShieldCheck, CheckCircle2, ArrowLeftRight, Code, Palette, Zap } from 'lucide-react';
import { useSkillLoop } from '../../context/SkillLoopContext';

export const HeroSection = () => {
  const { setCurrentPage, setAuthModalState } = useSkillLoop();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/70 via-white to-slate-50">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-300/20 to-indigo-300/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call-to-Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100/80 text-blue-800 border border-blue-200/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Smart Reverse Skill Matching for College Students</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Teach What You Know.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Learn What You Love.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              SkillLoop connects college peers with complementary talents. Trade your coding knowledge for UI/UX design, or math tutoring for language practice—<strong className="text-slate-800 font-semibold">100% free, reciprocal peer exchange</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => {
                  setAuthModalState('register');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-500/25 transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm transition-all"
              >
                <span>Explore Peer Skills</span>
                <Repeat className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Subscription Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified .edu Peers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Reciprocal 2-Way Matching</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Reverse Match Demo Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative background shadow cards */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-xl opacity-20 transform -rotate-1" />

              {/* Main Card */}
              <div className="relative bg-white/95 rounded-2xl shadow-xl border border-blue-100 p-6 sm:p-7 space-y-5">
                
                {/* Header of Demo Card */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live Reverse Match Preview</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                    98% Synergy
                  </span>
                </div>

                {/* Student A (You) */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                        AR
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Alex Rivera (You)</p>
                        <p className="text-[10px] text-slate-500">CS Junior · Bay State Univ</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      You Teach React.js
                    </span>
                  </div>
                </div>

                {/* Reverse Connection Flow Indicator */}
                <div className="flex items-center justify-center my-1 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed border-blue-200"></div>
                  </div>
                  <div className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3.5 py-1.5 rounded-full shadow-md text-xs font-bold animate-pulse-subtle">
                    <ArrowLeftRight className="w-4 h-4 text-white" />
                    <span>Reciprocal Skill Loop</span>
                  </div>
                </div>

                {/* Student B (Maya) */}
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                        MP
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Maya Patel</p>
                        <p className="text-[10px] text-slate-500">Design Sophomore · Pacific Coast</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Maya Teaches Figma UI
                    </span>
                  </div>
                </div>

                {/* Outcome Benefit Box */}
                <div className="p-3 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-blue-50 rounded-xl border border-blue-200/60 text-xs text-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-blue-800">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Mutual Win-Win Loop</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Alex learns auto-layout & UI design systems, while Maya masters React hooks & component props. No money spent!
                  </p>
                </div>

                {/* Button inside demo card */}
                <button
                  onClick={() => {
                    setCurrentPage('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 text-xs font-bold text-blue-700 bg-blue-100/70 hover:bg-blue-100 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>See How Your Skills Match Peers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
