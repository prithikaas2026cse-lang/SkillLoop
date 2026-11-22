import React, { useState } from 'react';
import { useSkillLoop } from '../context/SkillLoopContext';
import { BookSessionModal } from '../components/sessions/BookSessionModal';
import { ReviewModal } from '../components/feedback/ReviewModal';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2, 
  Plus, 
  ArrowLeftRight, 
  Star, 
  ExternalLink,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const SessionsPage = () => {
  const { sessions, students, completeSession } = useSkillLoop();
  const [filter, setFilter] = useState('upcoming'); // 'upcoming' | 'completed' | 'all'
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [reviewSession, setReviewSession] = useState(null);

  const filteredSessions = sessions.filter(s => {
    if (filter === 'upcoming') return s.status === 'confirmed';
    if (filter === 'completed') return s.status === 'completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 mb-2">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Peer Learning Planner</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Study & Swap Sessions
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Organize 1-on-1 reciprocal exchanges, set agendas, and track learning milestones.
            </p>
          </div>

          <button
            onClick={() => setIsBookModalOpen(true)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Book Peer Session</span>
          </button>
        </div>

        {/* Filter Navigation */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => setFilter('upcoming')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              filter === 'upcoming'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Upcoming Sessions ({sessions.filter(s => s.status === 'confirmed').length})</span>
          </button>

          <button
            onClick={() => setFilter('completed')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              filter === 'completed'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed Swaps ({sessions.filter(s => s.status === 'completed').length})</span>
          </button>

          <button
            onClick={() => setFilter('all')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              filter === 'all'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>All History</span>
          </button>
        </div>

        {/* Sessions List */}
        {filteredSessions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No sessions in this view</h3>
            <p className="text-xs text-slate-500">
              Schedule a reciprocal swap with one of your connected peer mentors.
            </p>
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl"
            >
              Schedule a Session Now
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSessions.map((sess) => {
              const peer = students.find(s => s.id === sess.peerId) || students[1];
              const isUpcoming = sess.status === 'confirmed';

              return (
                <div
                  key={sess.id}
                  className={`bg-white rounded-3xl p-6 border transition-all duration-300 ${
                    isUpcoming
                      ? 'border-blue-200/90 shadow-soft hover:shadow-card-hover'
                      : 'border-slate-200/80 bg-slate-50/50'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    {/* Session Details */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          isUpcoming ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {isUpcoming ? 'Upcoming Swap' : 'Completed Swap'}
                        </span>
                        
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span>{sess.date} at {sess.time}</span>
                          <span className="text-slate-400 font-normal">({sess.durationMinutes} min)</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900">
                        {sess.title}
                      </h3>

                      {/* Peer info & Agreed skill swap */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <img src={peer.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-semibold text-slate-800">{peer.name}</span>
                          <span className="text-slate-400">({peer.major})</span>
                        </div>

                        <div className="hidden sm:block text-slate-300">|</div>

                        <div className="flex items-center gap-1.5 bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-100 text-blue-900 font-medium">
                          <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
                          <span>Swap: <strong>{sess.skillExchange?.teach}</strong> ↔ <strong>{sess.skillExchange?.learn}</strong></span>
                        </div>
                      </div>

                      {/* Format and Location */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                        <div className="flex items-center gap-1">
                          {sess.meetingLink ? <Video className="w-3.5 h-3.5 text-indigo-500" /> : <MapPin className="w-3.5 h-3.5 text-emerald-500" />}
                          <span className="font-medium">{sess.location || sess.format}</span>
                        </div>
                      </div>

                      {sess.notes && (
                        <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <strong>Agenda:</strong> {sess.notes}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons Column */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0 lg:min-w-[170px]">
                      {isUpcoming ? (
                        <>
                          {sess.meetingLink && (
                            <a
                              href={sess.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Join Video Call</span>
                            </a>
                          )}
                          <button
                            onClick={() => completeSession(sess.id)}
                            className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark Complete (+30 Karma)</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setReviewSession(sess)}
                          className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                          <span>{sess.feedbackGiven ? 'Update Feedback' : 'Rate Peer (+20 pts)'}</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Book Session Modal */}
      <BookSessionModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />

      {/* Review Modal */}
      <ReviewModal
        session={reviewSession}
        isOpen={Boolean(reviewSession)}
        onClose={() => setReviewSession(null)}
      />
    </div>
  );
};
