import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useSkillLoop } from '../../context/SkillLoopContext';
import { Calendar, Clock, MapPin, Video, BookOpen, User, CheckCircle2 } from 'lucide-react';

export const BookSessionModal = ({ isOpen, onClose, preselectedPeerId }) => {
  const { students, currentUser, connections, bookSession } = useSkillLoop();

  // Connected peers or all peers
  const connectedPeerIds = connections
    .filter(c => (c.fromStudentId === currentUser.id || c.toStudentId === currentUser.id) && c.status === 'accepted')
    .map(c => c.fromStudentId === currentUser.id ? c.toStudentId : c.fromStudentId);

  const availablePeers = students.filter(
    s => s.id !== currentUser.id && (connectedPeerIds.includes(s.id) || connectedPeerIds.length === 0)
  );

  const [peerId, setPeerId] = useState(preselectedPeerId || availablePeers[0]?.id || 'student-2');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-11-25');
  const [time, setTime] = useState('15:00');
  const [durationMinutes, setDurationMinutes] = useState('60');
  const [format, setFormat] = useState('Hybrid (Campus Library & Video)');
  const [location, setLocation] = useState('Campus Library 3rd Floor / Google Meet');
  const [teachSkill, setTeachSkill] = useState(currentUser.teachSkills[0]?.name || 'React.js');
  const [learnSkill, setLearnSkill] = useState('');
  const [notes, setNotes] = useState('');

  const selectedPeer = students.find(s => s.id === peerId) || availablePeers[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    bookSession({
      peerId,
      title: title || `Skill Swap: ${teachSkill} ↔ ${learnSkill || selectedPeer?.teachSkills[0]?.name}`,
      date,
      time,
      durationMinutes,
      format,
      location,
      teachSkill,
      learnSkill: learnSkill || selectedPeer?.teachSkills[0]?.name || 'Skill Learning',
      notes
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Peer Learning Session" maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {/* Peer Selection */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Select Peer Student</label>
          <select
            value={peerId}
            onChange={(e) => setPeerId(e.target.value)}
            className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            {students.filter(s => s.id !== currentUser.id).map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.major}) — Teaches: {s.teachSkills[0]?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Session Title */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Session Topic / Goal</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`e.g. Exploring ${selectedPeer?.teachSkills[0]?.name || 'Figma'} & ${teachSkill}`}
            className="w-full p-2.5 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Skills Being Exchanged */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-blue-50/60 p-3 rounded-2xl border border-blue-200/80">
          <div>
            <label className="block font-bold text-blue-900 mb-1">You Will Teach:</label>
            <select
              value={teachSkill}
              onChange={(e) => setTeachSkill(e.target.value)}
              className="w-full p-2 text-xs border border-blue-200 rounded-lg bg-white"
            >
              {currentUser.teachSkills.map((sk, idx) => (
                <option key={idx} value={sk.name}>{sk.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-indigo-900 mb-1">Peer Will Teach You:</label>
            <select
              value={learnSkill}
              onChange={(e) => setLearnSkill(e.target.value)}
              className="w-full p-2 text-xs border border-indigo-200 rounded-lg bg-white"
            >
              {selectedPeer?.teachSkills.map((sk, idx) => (
                <option key={idx} value={sk.name}>{sk.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date, Time, Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 text-xs border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Start Time</label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 text-xs border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Duration</label>
            <select
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              className="w-full p-2 text-xs border border-slate-200 rounded-xl bg-white"
            >
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes (Recommended)</option>
              <option value="90">90 minutes</option>
            </select>
          </div>
        </div>

        {/* Format & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full p-2 text-xs border border-slate-200 rounded-xl bg-white"
            >
              <option>Online Video Call (Google Meet)</option>
              <option>Campus Library Study Room</option>
              <option>Campus Student Union / Cafe</option>
              <option>Hybrid (Campus Library & Video)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Location Details / Room</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Science Library Room 302"
              className="w-full p-2 text-xs border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Prep Notes / Agenda</label>
          <textarea
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Please bring your laptop with Figma or VS Code installed."
            className="w-full p-2.5 text-xs border border-slate-200 rounded-xl"
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
            <span>Confirm & Add to Planner</span>
          </button>
        </div>

      </form>
    </Modal>
  );
};
