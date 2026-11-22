import React from 'react';
import { useSkillLoop } from '../../context/SkillLoopContext';
import { Calendar, Clock, MapPin, Video, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const QuickSchedule = ({ onBookSessionClick }) => {
  const { sessions, students, currentUser, completeSession, setCurrentPage } = useSkillLoop();

  // Find upcoming sessions for current student
  const upcomingSessions = sessions.filter(
    s => s.status === 'confirmed'
  ).slice(0, 2);

  return (
    <div className="space-y-6">
      
      {/* Upcoming Sessions Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Upcoming Sessions</h3>
          </div>
          <button
            onClick={() => {
              setCurrentPage('sessions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            View All ({sessions.length})
          </button>
        </div>

        {upcomingSessions.length === 0 ? (
          <div className="text-center py-8 text-slate-400 space-y-2">
            <Clock className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs">No upcoming sessions scheduled yet.</p>
            <button
              onClick={onBookSessionClick}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              + Schedule your first exchange
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {upcomingSessions.map((sess) => {
              const peer = students.find(s => s.id === sess.peerId) || students[1];
              return (
                <div
                  key={sess.id}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-200 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={peer.avatar}
                        alt={peer.name}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{sess.title}</h4>
                        <p className="text-[11px] text-slate-500">With {peer.name}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded-full">
                      Confirmed
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{sess.date} at {sess.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      {sess.meetingLink ? (
                        <Video className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      )}
                      <span className="truncate">{sess.format}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[10px] text-slate-500">
                      Swap: <span className="font-semibold text-blue-700">{sess.skillExchange?.teach}</span> ↔ <span className="font-semibold text-indigo-700">{sess.skillExchange?.learn}</span>
                    </div>
                    <button
                      onClick={() => completeSession(sess.id)}
                      className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Done
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Schedule button */}
        <button
          onClick={onBookSessionClick}
          className="w-full mt-4 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Schedule New Peer Session</span>
        </button>
      </div>

      {/* Reciprocal Loop Tips */}
      <div className="bg-gradient-to-br from-indigo-900 to-blue-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-blue-100">
              Pro Peer Tip
            </span>
          </div>
          <h4 className="text-base font-bold text-white leading-snug">
            Split-Time Sessions Work Best!
          </h4>
          <p className="text-xs text-blue-100/80 leading-relaxed">
            Dedicate the first 30 minutes to teaching your peer, and the remaining 30 minutes to learning from them. Both partners stay engaged and motivated.
          </p>
        </div>
      </div>

    </div>
  );
};
