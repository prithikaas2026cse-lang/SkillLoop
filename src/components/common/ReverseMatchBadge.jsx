import React from 'react';
import { ArrowLeftRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const ReverseMatchBadge = ({ matchResult, compact = false }) => {
  if (!matchResult) return null;

  const { score, matchType, isMutualLoop, youTeach, youLearn, reason } = matchResult;

  if (isMutualLoop) {
    if (compact) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 shadow-sm animate-pulse-subtle">
          <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
          <span>{score}% Loop Match</span>
        </span>
      );
    }

    return (
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 rounded-xl p-3 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-blue-700 font-semibold text-xs tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Perfect 2-Way Loop Match</span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm">
            {score}% Synergy
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-700 bg-white/80 p-2 rounded-lg border border-blue-100">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">You teach:</span>
            <span className="font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              {youTeach[0] || 'Skill'}
            </span>
          </div>
          <ArrowLeftRight className="w-4 h-4 text-blue-500 mx-1 flex-shrink-0" />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">They teach:</span>
            <span className="font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              {youLearn[0] || 'Skill'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (matchType === 'they_teach_you') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Teaches what you need ({youLearn.join(', ')})</span>
        <span className="font-bold text-emerald-800 ml-0.5">· {score}%</span>
      </div>
    );
  }

  if (matchType === 'you_teach_them') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
        <Sparkles className="w-3.5 h-3.5 text-sky-600" />
        <span>Needs your skill ({youTeach.join(', ')})</span>
        <span className="font-bold text-sky-800 ml-0.5">· {score}%</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
      <span>Skill Explorer</span>
    </div>
  );
};
