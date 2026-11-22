import React, { useState } from 'react';
import { useSkillLoop } from '../context/SkillLoopContext';
import { calculateSkillMatch } from '../utils/matchingAlgorithm';
import { ReverseMatchBadge } from '../components/common/ReverseMatchBadge';
import { BookSessionModal } from '../components/sessions/BookSessionModal';
import { 
  Users, 
  UserCheck, 
  Clock, 
  ArrowLeftRight, 
  Calendar, 
  Check, 
  X, 
  MessageSquare, 
  Star,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ConnectionsPage = () => {
  const { 
    currentUser, 
    connections, 
    students, 
    acceptConnectionRequest, 
    declineConnectionRequest,
    setCurrentPage 
  } = useSkillLoop();

  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'pending'
  const [bookModalPeerId, setBookModalPeerId] = useState(null);

  // Incoming pending requests (others asking currentUser)
  const incomingRequests = connections.filter(
    c => c.toStudentId === currentUser.id && c.status === 'pending'
  );

  // Outgoing pending requests (currentUser asked others)
  const outgoingRequests = connections.filter(
    c => c.fromStudentId === currentUser.id && c.status === 'pending'
  );

  // Accepted connections
  const acceptedConnections = connections.filter(
    c => (c.fromStudentId === currentUser.id || c.toStudentId === currentUser.id) && c.status === 'accepted'
  );

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 mb-2">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Peer Network</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Skill Exchange Connections
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Manage your reciprocal learning partners and respond to incoming swap invites.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover More Peers</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'active'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Active Partners ({acceptedConnections.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all relative ${
              activeTab === 'pending'
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pending Requests</span>
            {incomingRequests.length > 0 && (
              <span className="px-2 py-0.5 text-xs font-extrabold bg-blue-600 text-white rounded-full">
                {incomingRequests.length} new
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: ACTIVE PARTNERS */}
        {activeTab === 'active' && (
          <div>
            {acceptedConnections.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
                <Users className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No active connections yet</h3>
                <p className="text-xs text-slate-500">
                  Head over to the Explore page or check your Suggested Matches to send your first exchange request!
                </p>
                <button
                  onClick={() => setCurrentPage('explore')}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl"
                >
                  Explore Peers Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {acceptedConnections.map((conn) => {
                  const peerId = conn.fromStudentId === currentUser.id ? conn.toStudentId : conn.fromStudentId;
                  const peer = students.find(s => s.id === peerId) || students[1];
                  const match = calculateSkillMatch(currentUser, peer);

                  return (
                    <div
                      key={conn.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Peer Top */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={peer.avatar}
                              alt={peer.name}
                              className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                            />
                            <div>
                              <h4 className="text-sm font-extrabold text-slate-900">{peer.name}</h4>
                              <p className="text-xs text-slate-500">{peer.major} · {peer.college}</p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <Check className="w-3.5 h-3.5" /> Connected
                          </span>
                        </div>

                        {/* Reverse Match Badge */}
                        <div className="mb-4">
                          <ReverseMatchBadge matchResult={match} />
                        </div>

                        {/* Reciprocal Loop Agreement */}
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 space-y-1 mb-4">
                          <div className="flex items-center justify-between font-semibold">
                            <span className="text-slate-500">Agreed Skill Swap:</span>
                            <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                              Balanced 1-for-1
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-800">
                            You teach: <span className="text-blue-700 font-extrabold">{conn.mutualSkills?.youTeach}</span> ↔ They teach: <span className="text-indigo-700 font-extrabold">{conn.mutualSkills?.theyTeach}</span>
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-slate-500">
                          Availability: {peer.availability[0]}
                        </span>
                        <button
                          onClick={() => setBookModalPeerId(peer.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Schedule Session</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PENDING REQUESTS */}
        {activeTab === 'pending' && (
          <div className="space-y-8">
            {/* Incoming Requests */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>Received Requests</span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  {incomingRequests.length}
                </span>
              </h3>

              {incomingRequests.length === 0 ? (
                <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                  No pending incoming requests right now.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {incomingRequests.map((req) => {
                    const peer = students.find(s => s.id === req.fromStudentId) || students[0];
                    const match = calculateSkillMatch(currentUser, peer);

                    return (
                      <div key={req.id} className="bg-white rounded-3xl p-5 border border-blue-200 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={peer.avatar} alt="" className="w-11 h-11 rounded-2xl object-cover border border-slate-200" />
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">{peer.name}</h4>
                              <p className="text-xs text-slate-500">{peer.major} · {peer.college}</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400">Needs Response</span>
                        </div>

                        <ReverseMatchBadge matchResult={match} />

                        {req.note && (
                          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-slate-700 italic">
                            "{req.note}"
                          </div>
                        )}

                        <div className="flex gap-2 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => declineConnectionRequest(req.id)}
                            className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => acceptConnectionRequest(req.id)}
                            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept & Connect</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Outgoing Requests */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>Sent Requests (Waiting for Peer Response)</span>
                <span className="text-xs font-semibold text-slate-500">
                  {outgoingRequests.length}
                </span>
              </h3>

              {outgoingRequests.length === 0 ? (
                <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                  You have no pending outgoing requests.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {outgoingRequests.map((req) => {
                    const peer = students.find(s => s.id === req.toStudentId) || students[0];
                    return (
                      <div key={req.id} className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={peer.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{peer.name}</h4>
                            <p className="text-[11px] text-slate-500">{peer.major}</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          Invited · Pending
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Book Session Modal */}
      <BookSessionModal
        isOpen={Boolean(bookModalPeerId)}
        onClose={() => setBookModalPeerId(null)}
        preselectedPeerId={bookModalPeerId}
      />
    </div>
  );
};
