import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useSkillLoop } from '../../context/SkillLoopContext';
import { Star, CheckCircle2, Award, ThumbsUp, Sparkles } from 'lucide-react';

export const ReviewModal = ({ session, isOpen, onClose }) => {
  const { students, submitReview } = useSkillLoop();
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState(['Clear Explanations', 'Super Patient']);
  const [comment, setComment] = useState('');

  if (!session) return null;

  const peer = students.find(s => s.id === session.peerId) || students[1];

  const availableTags = [
    'Clear Explanations',
    'Super Patient',
    'Punctual & Prepared',
    'Great Practical Examples',
    'Encouraging Mentor',
    'Design Wizard',
    'Deep Code Knowledge'
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitReview({
      targetId: peer.id,
      sessionId: session.id,
      rating,
      skillReviewed: session.skillExchange?.learn || peer.teachSkills[0]?.name || 'Skill Exchange',
      tags: selectedTags,
      comment: comment || 'Awesome peer session! Really helped me understand the concepts quickly.'
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Rate Peer Session with ${peer.name}`}>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {/* Peer Info Snapshot */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
          <img src={peer.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
          <div>
            <h4 className="text-xs font-bold text-slate-900">{peer.name}</h4>
            <p className="text-[11px] text-slate-500">Session: {session.title}</p>
          </div>
        </div>

        {/* 5-Star Rating Picker */}
        <div>
          <label className="block font-bold text-slate-700 mb-2">Overall Experience Rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 text-slate-300 hover:text-amber-400 focus:outline-none transition-colors"
              >
                <Star className={`w-7 h-7 ${star <= rating ? 'text-amber-400 fill-current' : ''}`} />
              </button>
            ))}
            <span className="ml-2 font-extrabold text-slate-800 text-sm">{rating}.0 / 5.0</span>
          </div>
        </div>

        {/* Quick Praise Tags */}
        <div>
          <label className="block font-bold text-slate-700 mb-1.5">Endorsement Tags</label>
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '}{tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Written Review */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Peer Feedback & Takeaway</label>
          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share what went well during this exchange or how your peer helped you..."
            className="w-full p-2.5 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
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
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Submit Feedback (+20 Karma)</span>
          </button>
        </div>

      </form>
    </Modal>
  );
};
