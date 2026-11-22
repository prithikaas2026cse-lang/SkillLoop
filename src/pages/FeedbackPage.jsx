import React, { useState } from 'react';
import { useSkillLoop } from '../context/SkillLoopContext';
import { ReviewModal } from '../components/feedback/ReviewModal';
import { Star, Award, MessageSquare, CheckCircle2, User, Sparkles, Calendar } from 'lucide-react';

export const FeedbackPage = () => {
  const { reviews, students, currentUser, sessions } = useSkillLoop();
  const [activeTab, setActiveTab] = useState('received'); // 'received' | 'given' | 'all'
  const [sessionToReview, setSessionToReview] = useState(null);

  // Unreviewed completed sessions
  const pendingReviewSessions = sessions.filter(
    s => s.status === 'completed' && !s.feedbackGiven
  );

  const receivedReviews = reviews.filter(r => r.targetId === currentUser.id);
  const givenReviews = reviews.filter(r => r.authorId === currentUser.id);

  const displayReviews = activeTab === 'received' 
    ? receivedReviews 
    : activeTab === 'given' 
    ? givenReviews 
    : reviews;

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-2">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span>Campus Trust & Reputation</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Peer Feedback & Endorsements
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Transparent peer ratings help maintain a respectful, high-quality skill-sharing community.
            </p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800">Your Average Rating</p>
              <p className="text-[11px] text-slate-500">{receivedReviews.length} peer reviews</p>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200 font-extrabold text-base">
              <Star className="w-4 h-4 fill-current text-amber-500" />
              <span>{currentUser.rating}</span>
            </div>
          </div>
        </div>

        {/* Action Prompt if there are unreviewed sessions */}
        {pendingReviewSessions.length > 0 && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  You have {pendingReviewSessions.length} recently completed session waiting for feedback!
                </h4>
                <p className="text-[11px] text-slate-600">
                  Earn +20 SkillLoop Karma points by rating your peer partner.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSessionToReview(pendingReviewSessions[0])}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs self-start sm:self-auto"
            >
              Rate Now
            </button>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => setActiveTab('received')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'received'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>Reviews for You ({receivedReviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('given')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'given'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>Reviews You've Given ({givenReviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'all'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>Campus Community Feed ({reviews.length})</span>
          </button>
        </div>

        {/* Review Cards Grid */}
        {displayReviews.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
            <Star className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No reviews in this category</h3>
            <p className="text-xs text-slate-500">
              Complete more peer sessions to generate endorsements and feedback.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayReviews.map((rev) => {
              const author = students.find(s => s.id === rev.authorId) || { name: 'Student Peer', avatar: '' };
              const target = students.find(s => s.id === rev.targetId) || { name: 'Student Peer', avatar: '' };

              return (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft space-y-4 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Author & Target */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={author.avatar}
                          alt={author.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{author.name}</h4>
                          <p className="text-[10px] text-slate-500">
                            reviewed <strong className="text-slate-700">{target.name}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>

                    {/* Skill Tag */}
                    <div className="inline-block px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 mb-2">
                      Topic: {rev.skillReviewed}
                    </div>

                    {/* Comment */}
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Endorsement Tags */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {rev.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Review Modal */}
      <ReviewModal
        session={sessionToReview}
        isOpen={Boolean(sessionToReview)}
        onClose={() => setSessionToReview(null)}
      />
    </div>
  );
};
