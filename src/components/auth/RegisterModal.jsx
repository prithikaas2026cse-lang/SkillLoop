import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useSkillLoop } from '../../context/SkillLoopContext';
import { SKILL_CATEGORIES } from '../../data/skillsCatalog';
import { User, Mail, GraduationCap, BookOpen, Plus, Trash2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const RegisterModal = () => {
  const { authModalState, setAuthModalState, registerUser } = useSkillLoop();
  const [step, setStep] = useState(1); // 1: profile, 2: teach skills, 3: learn skills

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('Pacific Coast University');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('Sophomore (Year 2)');
  const [bio, setBio] = useState('');

  // Skills states
  const [teachSkills, setTeachSkills] = useState([
    { name: '', category: 'coding', level: 'Intermediate' }
  ]);
  const [learnSkills, setLearnSkills] = useState([
    { name: '', category: 'design', priority: 'High', currentLevel: 'Beginner' }
  ]);

  const isOpen = authModalState === 'register';
  const onClose = () => {
    setAuthModalState(null);
    setStep(1);
  };

  const handleAddTeachRow = () => {
    setTeachSkills([...teachSkills, { name: '', category: 'coding', level: 'Intermediate' }]);
  };

  const handleRemoveTeachRow = (index) => {
    setTeachSkills(teachSkills.filter((_, i) => i !== index));
  };

  const handleUpdateTeachRow = (index, field, value) => {
    const updated = [...teachSkills];
    updated[index][field] = value;
    setTeachSkills(updated);
  };

  const handleAddLearnRow = () => {
    setLearnSkills([...learnSkills, { name: '', category: 'design', priority: 'High', currentLevel: 'Beginner' }]);
  };

  const handleRemoveLearnRow = (index) => {
    setLearnSkills(learnSkills.filter((_, i) => i !== index));
  };

  const handleUpdateLearnRow = (index, field, value) => {
    const updated = [...learnSkills];
    updated[index][field] = value;
    setLearnSkills(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTeach = teachSkills.filter(s => s.name.trim().length > 0);
    const cleanLearn = learnSkills.filter(s => s.name.trim().length > 0);

    registerUser({
      name: name || 'Jordan Taylor',
      college: college || 'State University',
      major: major || 'Computer Science & Design',
      year: year || 'Sophomore',
      bio: bio || 'Excited to exchange peer skills on SkillLoop!',
      teachSkills: cleanTeach.length > 0 ? cleanTeach : [{ name: 'Web Basics', category: 'coding', level: 'Intermediate', endorsements: 0 }],
      learnSkills: cleanLearn.length > 0 ? cleanLearn : [{ name: 'UI Design', category: 'design', priority: 'High', currentLevel: 'Beginner' }]
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Your SkillLoop Profile" maxWidth="max-w-xl">
      <div className="space-y-5">
        
        {/* Step indicator */}
        <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 text-xs">
          <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>1</span>
            <span>Student Info</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>2</span>
            <span>What You Teach</span>
          </div>
          <span className="text-slate-300">→</span>
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>3</span>
            <span>What You Learn</span>
          </div>
        </div>

        {/* STEP 1: Basic Profile */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Taylor"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">College Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@college.edu"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">College / University</label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. State University"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Major / Degree</label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option>Freshman (Year 1)</option>
                  <option>Sophomore (Year 2)</option>
                  <option>Junior (Year 3)</option>
                  <option>Senior (Year 4)</option>
                  <option>Graduate Student</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Bio</label>
              <textarea
                rows="2"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="What projects are you working on? What excites you to learn?"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                <span>Next: Skills You Can Teach</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Skills You Can Teach */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900">
              💡 <strong>Reverse Match Secret:</strong> The more specific you are with skills you know (e.g. React, Excel Macros, Spanish), the higher your reciprocal match synergy with peers!
            </div>

            <div className="space-y-3">
              {teachSkills.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Skill #{idx + 1}</span>
                    {teachSkills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTeachRow(idx)}
                        className="text-slate-400 hover:text-red-500 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="e.g. React.js, Python, Figma"
                      value={item.name}
                      onChange={(e) => handleUpdateTeachRow(idx, 'name', e.target.value)}
                      className="sm:col-span-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    />
                    <select
                      value={item.category}
                      onChange={(e) => handleUpdateTeachRow(idx, 'category', e.target.value)}
                      className="px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="coding">Software & Tech</option>
                      <option value="design">Design & Media</option>
                      <option value="data">Data & AI</option>
                      <option value="academics">Academics & Math</option>
                      <option value="business">Business & Career</option>
                      <option value="creative">Creative & Arts</option>
                    </select>
                    <select
                      value={item.level}
                      onChange={(e) => handleUpdateTeachRow(idx, 'level', e.target.value)}
                      className="px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option>Beginner Friendly</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddTeachRow}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add another skill to teach
            </button>

            <div className="pt-2 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                <span>Next: Skills You Want to Learn</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Skills You Want to Learn */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900">
              🎯 <strong>Wishlist:</strong> Tell us what you want to learn so we can calculate reverse matches immediately upon finishing registration.
            </div>

            <div className="space-y-3">
              {learnSkills.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Wishlist Skill #{idx + 1}</span>
                    {learnSkills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLearnRow(idx)}
                        className="text-slate-400 hover:text-red-500 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Figma UI/UX, Spanish, ML"
                      value={item.name}
                      onChange={(e) => handleUpdateLearnRow(idx, 'name', e.target.value)}
                      className="sm:col-span-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    />
                    <select
                      value={item.category}
                      onChange={(e) => handleUpdateLearnRow(idx, 'category', e.target.value)}
                      className="px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="design">Design & Media</option>
                      <option value="coding">Software & Tech</option>
                      <option value="data">Data & AI</option>
                      <option value="academics">Academics & Math</option>
                      <option value="business">Business & Career</option>
                      <option value="creative">Creative & Arts</option>
                    </select>
                    <select
                      value={item.priority}
                      onChange={(e) => handleUpdateLearnRow(idx, 'priority', e.target.value)}
                      className="px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="High">Priority: High</option>
                      <option value="Medium">Priority: Medium</option>
                      <option value="Low">Priority: Low</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddLearnRow}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add another skill to learn
            </button>

            <div className="pt-3 border-t border-slate-100 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/25"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finish & Launch My SkillLoop</span>
              </button>
            </div>
          </div>
        )}

        <div className="text-center pt-2 text-xs text-slate-500">
          Already registered?{' '}
          <button
            type="button"
            onClick={() => setAuthModalState('login')}
            className="font-bold text-blue-600 hover:underline"
          >
            Log In here
          </button>
        </div>

      </div>
    </Modal>
  );
};
