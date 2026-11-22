import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useSkillLoop } from '../../context/SkillLoopContext';
import { calculateSkillMatch } from '../../utils/matchingAlgorithm';
import { ReverseMatchBadge } from '../common/ReverseMatchBadge';
import { Send, ArrowLeftRight, Sparkles } from 'lucide-react';

export const ConnectModal = ({ peer, isOpen, onClose }) => {
  const { currentUser, sendConnectionRequest } = useSkillLoop();
  const [note, setNote] = useState('');

  if (!peer) return null;

  const match = calculateSkillMatch(currentUser, peer);

  const handleSend = (e) => {
    e.preventDefault();
    sendConnectionRequest(peer.id, note);
    setNote('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Send Skill Exchange Request to ${peer.name}`}>
      <form onSubmit={handleSend} className="space-y-4">
        {/* Peer Snapshot */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <img src={peer.avatar} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
          <div>
            <h4 className="text-sm font-bold text-slate-900">{peer.name}</h4>
            <p className="text-xs text-slate-500">{peer.major} · {peer.college}</p>
          </div>
        </div>

        {/* Reverse match breakdown */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Calculated Skill Synergy</label>
          <ReverseMatchBadge matchResult={match} />
        </div>

        {/* Message Note */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Personal Note (Optional)
          </label>
          <textarea
            rows="3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={`Hi ${peer.name.split(' ')[0]}! I'd love to exchange skills with you on SkillLoop...`}
            className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Tip: Suggest a day/time or specify a project you'd like to work on together.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Request</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
