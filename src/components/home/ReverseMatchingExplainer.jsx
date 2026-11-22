import React, { useState } from 'react';
import { ArrowLeftRight, Check, X, Sparkles, HelpCircle, Layers, Users, Zap } from 'lucide-react';

export const ReverseMatchingExplainer = () => {
  const [activeTab, setActiveTab] = useState('reverse'); // 'reverse' | 'traditional'

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Core Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Magic of <span className="text-blue-600">Reverse Skill Matching</span>
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Unlike one-way tutoring marketplaces where students must pay exorbitant hourly fees, SkillLoop pairs you with peers whose learning wishlists mirror your teaching superpowers.
          </p>
        </div>

        {/* Comparison Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab('reverse')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'reverse'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              SkillLoop Reverse Matching (Reciprocal)
            </button>
            <button
              onClick={() => setActiveTab('traditional')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'traditional'
                  ? 'bg-white text-slate-900 shadow-md border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Traditional 1-Way Tutoring
            </button>
          </div>
        </div>

        {/* Visual Comparison Stage */}
        {activeTab === 'reverse' ? (
          <div className="bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/40 rounded-3xl border border-blue-200/80 p-6 sm:p-10 shadow-sm animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              
              {/* Student 1 Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 font-extrabold text-lg flex items-center justify-center">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Student A (Coder)</h4>
                    <p className="text-xs text-slate-500">CS Junior</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs">
                    <span className="text-emerald-700 font-bold block mb-0.5">Teaches:</span>
                    <span className="font-semibold text-slate-800">React.js & JavaScript</span>
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100 text-xs">
                    <span className="text-amber-700 font-bold block mb-0.5">Wants to Learn:</span>
                    <span className="font-semibold text-slate-800">Figma UI/UX & Design Systems</span>
                  </div>
                </div>
              </div>

              {/* Reciprocal Loop Center Engine */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse">
                  <ArrowLeftRight className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                    100% Reciprocal Synergy
                  </span>
                  <p className="text-xs text-slate-600 px-4">
                    The SkillLoop algorithm identifies overlapping teaching and learning vectors to create an instant 2-way match.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <Check className="w-4 h-4" />
                  <span>Cost: $0.00 (Skill-for-Skill)</span>
                </div>
              </div>

              {/* Student 2 Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-extrabold text-lg flex items-center justify-center">
                    B
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Student B (Designer)</h4>
                    <p className="text-xs text-slate-500">Design Sophomore</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs">
                    <span className="text-emerald-700 font-bold block mb-0.5">Teaches:</span>
                    <span className="font-semibold text-slate-800">Figma UI/UX & Design Systems</span>
                  </div>
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100 text-xs">
                    <span className="text-amber-700 font-bold block mb-0.5">Wants to Learn:</span>
                    <span className="font-semibold text-slate-800">React.js & JavaScript</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center opacity-85">
              
              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800">Student</h4>
                <p className="text-xs text-slate-500">Wants to learn React</p>
                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-semibold">
                  Pays \$45 - \$80 / hour
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-xs font-semibold text-slate-700">1-Way Transactional Barrier</p>
                <p className="text-[11px] text-slate-500">High financial friction, students cannot afford consistent weekly tutoring.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800">Commercial Tutor</h4>
                <p className="text-xs text-slate-500">Only teaches for cash</p>
                <div className="p-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-medium">
                  No reciprocal learning or peer bonding
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Declare Teach & Learn Skills</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tag skills you have mastered and topics you are currently struggling with in your university courses.
            </p>
          </div>

          <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Complementary Match Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our algorithm computes intersection vectors, scoring each peer connection by mutual compatibility percentage.
            </p>
          </div>

          <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Split-Session Peer Exchanging</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Schedule 1-hour sessions: 30 minutes teaching your peer, and 30 minutes learning from them!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
