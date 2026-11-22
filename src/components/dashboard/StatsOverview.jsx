import React from 'react';
import { useSkillLoop } from '../../context/SkillLoopContext';
import { Award, BookOpen, CheckCircle, Flame, Star, Users, ArrowUpRight } from 'lucide-react';

export const StatsOverview = () => {
  const { currentUser, sessions, connections } = useSkillLoop();

  const activeConnectionsCount = connections.filter(
    c => (c.fromStudentId === currentUser.id || c.toStudentId === currentUser.id) && c.status === 'accepted'
  ).length;

  const completedSessionsCount = sessions.filter(
    s => (s.peerId === currentUser.id || s.peerId) && s.status === 'completed'
  ).length;

  const stats = [
    {
      label: 'Peer Exchange Rating',
      value: `${currentUser.rating || 5.0}`,
      subtext: `From ${currentUser.reviewCount || 0} peer reviews`,
      icon: Star,
      color: 'amber',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    {
      label: 'Sessions Completed',
      value: completedSessionsCount || currentUser.sessionsCompleted || 0,
      subtext: '1-on-1 swaps finished',
      icon: CheckCircle,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      label: 'Active Peer Network',
      value: activeConnectionsCount,
      subtext: 'Learning partners',
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'SkillLoop Karma',
      value: `${currentUser.karmaPoints || 450} pts`,
      subtext: 'Earned through reciprocity',
      icon: Flame,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card-hover transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
              <div className={`w-8 h-8 rounded-xl ${stat.bgColor} ${stat.textColor} flex items-center justify-center`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              {stat.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};
