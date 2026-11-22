import React, { useState } from 'react';
import { useSkillLoop } from '../../context/SkillLoopContext';
import { ReverseMatchBadge } from '../common/ReverseMatchBadge';
import { Sparkles, ArrowRight, UserPlus, Check, Star, ArrowLeftRight, MessageSquare } from 'lucide-react';

export const SuggestedMatches = ({ onOpenConnectModal }) => {
  const { currentUser, rankedPeers, connections, sendConnectionRequest, setCurrentPage } = useSkillLoop();

  // Find connection status for a peer
  const getConnectionStatus = (peerId) => {
    const conn = connections.find(
      c => (c.fromStudentId === currentUser.id && c.toStudentId === peerId) ||
           (c.fromStudentId === peerId && c.toStudentId === currentUser.id)
    );
    return conn ? conn.status : null;
  };

  // Filter top matches (excluding self)
  const topMatches = rankedPeers.slice(0, 4);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Reverse Skill Matches for You
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Calculated based on what you teach ({currentUser.teachSkills.map(s => s.name).join(', ')}) vs. what peers teach and need.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentPage('explore');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline self-start sm:self-auto"
        >
          <span>View All Campus Peers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Suggested Peers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topMatches.map((peer) => {
          const match = peer.matchResult;
          const status = getConnectionStatus(peer.id);

          return (
            <div
              key={peer.id}
              className={`p-5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                match.isMutualLoop 
                  ? 'border-blue-200 bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/20 hover:border-blue-400 hover:shadow-card-hover' 
                  : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Peer Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={peer.avatar}
                      alt={peer.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-xs"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        {peer.name}
                        {peer.rating >= 4.9 && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                            ★ Top Mentor
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {peer.major} · {peer.year.split(' ')[0]}
                      </p>
                      <p className="text-[11px] text-blue-600 font-medium">
                        {peer.college}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-0.5 justify-end">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      {peer.rating}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {peer.reviewCount} reviews
                    </span>
                  </div>
                </div>

                {/* Match Synergy Box */}
                <div className="mb-4">
                  <ReverseMatchBadge matchResult={match} />
                </div>

                {/* Bio Snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {peer.bio}
                </p>

                {/* Skills tags preview */}
                <div className="space-y-1.5 mb-4 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-400">Teaches:</span>
                    {peer.teachSkills.map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 text-slate-700">
                        {sk.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-400">Wants:</span>
                    {peer.learnSkills.map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-100">
                        {sk.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500">
                  {peer.availability[0]}
                </span>

                {status === 'accepted' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    <Check className="w-3.5 h-3.5" /> Connected
                  </span>
                ) : status === 'pending' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                    Request Pending
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      if (onOpenConnectModal) {
                        onOpenConnectModal(peer);
                      } else {
                        sendConnectionRequest(peer.id);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      match.isMutualLoop
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                        : 'bg-slate-800 hover:bg-slate-900 text-white'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Connect & Swap</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
