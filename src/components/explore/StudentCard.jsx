import React from 'react';
import { useSkillLoop } from '../../context/SkillLoopContext';
import { calculateSkillMatch } from '../../utils/matchingAlgorithm';
import { ReverseMatchBadge } from '../common/ReverseMatchBadge';
import { Star, UserPlus, Check, Clock, GraduationCap, MapPin, Sparkles } from 'lucide-react';

export const StudentCard = ({ peer, onConnectClick }) => {
  const { currentUser, connections } = useSkillLoop();

  const match = calculateSkillMatch(currentUser, peer);

  // Check if connection exists
  const connection = connections.find(
    c => (c.fromStudentId === currentUser.id && c.toStudentId === peer.id) ||
         (c.fromStudentId === peer.id && c.toStudentId === currentUser.id)
  );

  return (
    <div className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between group ${
      match.isMutualLoop
        ? 'border-blue-200/90 hover:border-blue-400 shadow-soft hover:shadow-card-hover bg-gradient-to-b from-blue-50/20 via-white to-white'
        : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
    }`}>
      <div>
        
        {/* Top Header: Avatar, Name, Rating */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={peer.avatar}
                alt={peer.name}
                className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-100 shadow-xs group-hover:scale-105 transition-transform"
                style={{ width: '3.25rem', height: '3.25rem' }}
              />
              {match.isMutualLoop && (
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold" title="Direct Mutual Loop">
                  🔄
                </span>
              )}
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                {peer.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {peer.major}
              </p>
              <p className="text-[11px] text-blue-600 font-medium flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-blue-500" />
                <span className="truncate max-w-[170px]">{peer.college}</span>
              </p>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/60">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span>{peer.rating}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {peer.reviewCount} reviews
            </p>
          </div>
        </div>

        {/* Reverse Match Badge Banner */}
        <div className="mb-4">
          <ReverseMatchBadge matchResult={match} />
        </div>

        {/* Student Bio */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {peer.bio}
        </p>

        {/* Skills Being Taught */}
        <div className="space-y-2 mb-4 pt-2 border-t border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-slate-700 block mb-1">
              Can Teach You:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {peer.teachSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-100"
                >
                  {sk.name}
                  <span className="text-[10px] text-blue-500 ml-1 font-normal">({sk.level.split(' ')[0]})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Skills Looking to Learn */}
          <div>
            <span className="text-[11px] font-bold text-slate-700 block mb-1">
              Wants to Learn:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {peer.learnSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50/80 text-amber-900 border border-amber-200/60"
                >
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Footer / Connect Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
          <Clock className="w-3 h-3 text-slate-400 flex-shrink-0" />
          <span className="truncate">{peer.availability[0]}</span>
        </div>

        {connection?.status === 'accepted' ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Check className="w-3.5 h-3.5" /> Connected
          </span>
        ) : connection?.status === 'pending' ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            Pending
          </span>
        ) : (
          <button
            onClick={() => onConnectClick(peer)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              match.isMutualLoop
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                : 'bg-slate-800 hover:bg-slate-900 text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Connect</span>
          </button>
        )}
      </div>

    </div>
  );
};
