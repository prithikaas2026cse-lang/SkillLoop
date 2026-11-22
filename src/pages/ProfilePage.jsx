import React, { useState } from 'react';
import { useSkillLoop } from '../context/SkillLoopContext';
import { SKILL_CATEGORIES } from '../data/skillsCatalog';
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  Star, 
  Flame, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Award,
  Calendar
} from 'lucide-react';

export const ProfilePage = () => {
  const { 
    currentUser, 
    updateProfile, 
    addTeachSkill, 
    removeTeachSkill, 
    addLearnSkill, 
    removeLearnSkill,
    reviews,
    sessions
  } = useSkillLoop();

  // Profile Edit State
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(currentUser.bio || '');
  const [majorText, setMajorText] = useState(currentUser.major || '');
  const [collegeText, setCollegeText] = useState(currentUser.college || '');

  // Add Teach Skill Form
  const [newTeachName, setNewTeachName] = useState('');
  const [newTeachCategory, setNewTeachCategory] = useState('coding');
  const [newTeachLevel, setNewTeachLevel] = useState('Intermediate');
  const [showAddTeach, setShowAddTeach] = useState(false);

  // Add Learn Skill Form
  const [newLearnName, setNewLearnName] = useState('');
  const [newLearnCategory, setNewLearnCategory] = useState('design');
  const [newLearnPriority, setNewLearnPriority] = useState('High');
  const [showAddLearn, setShowAddLearn] = useState(false);

  // Save Bio/Profile
  const handleSaveProfile = () => {
    updateProfile({
      bio: bioText,
      major: majorText,
      college: collegeText
    });
    setIsEditingBio(false);
  };

  // Submit new teach skill
  const handleAddTeach = (e) => {
    e.preventDefault();
    if (!newTeachName.trim()) return;
    addTeachSkill({
      name: newTeachName.trim(),
      category: newTeachCategory,
      level: newTeachLevel
    });
    setNewTeachName('');
    setShowAddTeach(false);
  };

  // Submit new learn skill
  const handleAddLearn = (e) => {
    e.preventDefault();
    if (!newLearnName.trim()) return;
    addLearnSkill({
      name: newLearnName.trim(),
      category: newLearnCategory,
      priority: newLearnPriority,
      currentLevel: 'Beginner'
    });
    setNewLearnName('');
    setShowAddLearn(false);
  };

  // Reviews for this user
  const userReviews = reviews.filter(r => r.targetId === currentUser.id);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-slate-50 shadow-md"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {currentUser.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Student
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>{currentUser.major}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500 font-normal">{currentUser.year}</span>
                </p>

                <p className="text-xs text-blue-600 font-medium">
                  {currentUser.college}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-stretch sm:self-auto justify-end">
              <div className="text-center bg-slate-50 p-3 rounded-2xl border border-slate-200/80 min-w-[80px]">
                <div className="flex items-center justify-center gap-1 text-amber-500 font-extrabold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{currentUser.rating}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{currentUser.reviewCount} reviews</div>
              </div>

              <div className="text-center bg-blue-50 p-3 rounded-2xl border border-blue-200/80 min-w-[80px]">
                <div className="flex items-center justify-center gap-1 text-blue-600 font-extrabold text-sm">
                  <Flame className="w-4 h-4 fill-current" />
                  <span>{currentUser.karmaPoints || 450}</span>
                </div>
                <div className="text-[10px] text-blue-500 mt-0.5">Karma pts</div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About Me & Academic Interests</h3>
              {!isEditingBio ? (
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Info
                </button>
              ) : (
                <button
                  onClick={handleSaveProfile}
                  className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" /> Save Changes
                </button>
              )}
            </div>

            {isEditingBio ? (
              <div className="space-y-3">
                <textarea
                  rows="3"
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  className="w-full p-3 text-xs border border-blue-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">Major</label>
                    <input
                      type="text"
                      value={majorText}
                      onChange={(e) => setMajorText(e.target.value)}
                      className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600">College / University</label>
                    <input
                      type="text"
                      value={collegeText}
                      onChange={(e) => setCollegeText(e.target.value)}
                      className="w-full p-2 text-xs border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {currentUser.bio}
              </p>
            )}
          </div>
        </div>

        {/* 2-Column Skills Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* LEFT: Skills I Can Teach */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Skills I Can Teach</h3>
                  <p className="text-[11px] text-slate-500">Your expertise offered to peers</p>
                </div>
              </div>

              <button
                onClick={() => setShowAddTeach(!showAddTeach)}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border border-blue-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Add Skill Form Drawer */}
            {showAddTeach && (
              <form onSubmit={handleAddTeach} className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-3 animate-fadeIn">
                <h4 className="text-xs font-bold text-blue-900">Add Teaching Skill</h4>
                <input
                  type="text"
                  placeholder="e.g. React.js, Python, Figma"
                  value={newTeachName}
                  onChange={(e) => setNewTeachName(e.target.value)}
                  className="w-full p-2 text-xs border border-blue-200 rounded-lg bg-white"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newTeachCategory}
                    onChange={(e) => setNewTeachCategory(e.target.value)}
                    className="p-1.5 text-xs border border-blue-200 rounded-lg bg-white"
                  >
                    <option value="coding">Software & Tech</option>
                    <option value="design">Design & Media</option>
                    <option value="data">Data & AI</option>
                    <option value="academics">Academics</option>
                    <option value="business">Business</option>
                    <option value="creative">Creative</option>
                  </select>
                  <select
                    value={newTeachLevel}
                    onChange={(e) => setNewTeachLevel(e.target.value)}
                    className="p-1.5 text-xs border border-blue-200 rounded-lg bg-white"
                  >
                    <option>Beginner Friendly</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddTeach(false)}
                    className="px-3 py-1 text-xs text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs font-bold bg-blue-600 text-white rounded-lg shadow-xs"
                  >
                    Save Skill
                  </button>
                </div>
              </form>
            )}

            {/* Teaching Skills List */}
            <div className="space-y-2.5">
              {currentUser.teachSkills.map((sk, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between gap-3 group hover:border-blue-300 transition-all"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{sk.name}</span>
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.2 rounded border border-blue-100">
                        {sk.level}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {sk.endorsements || 0} peer endorsements received
                    </p>
                  </div>

                  <button
                    onClick={() => removeTeachSkill(sk.name)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1 transition-all"
                    title="Remove skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Skills I Want to Learn */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Skills I Want to Learn</h3>
                  <p className="text-[11px] text-slate-500">Your wishlist for reverse matching</p>
                </div>
              </div>

              <button
                onClick={() => setShowAddLearn(!showAddLearn)}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border border-amber-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Goal</span>
              </button>
            </div>

            {/* Add Learn Form Drawer */}
            {showAddLearn && (
              <form onSubmit={handleAddLearn} className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3 animate-fadeIn">
                <h4 className="text-xs font-bold text-amber-900">Add Wishlist Goal</h4>
                <input
                  type="text"
                  placeholder="e.g. Machine Learning, Figma UI, French"
                  value={newLearnName}
                  onChange={(e) => setNewLearnName(e.target.value)}
                  className="w-full p-2 text-xs border border-amber-200 rounded-lg bg-white"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newLearnCategory}
                    onChange={(e) => setNewLearnCategory(e.target.value)}
                    className="p-1.5 text-xs border border-amber-200 rounded-lg bg-white"
                  >
                    <option value="design">Design & Media</option>
                    <option value="coding">Software & Tech</option>
                    <option value="data">Data & AI</option>
                    <option value="academics">Academics</option>
                    <option value="business">Business</option>
                    <option value="creative">Creative</option>
                  </select>
                  <select
                    value={newLearnPriority}
                    onChange={(e) => setNewLearnPriority(e.target.value)}
                    className="p-1.5 text-xs border border-amber-200 rounded-lg bg-white"
                  >
                    <option value="High">Priority: High</option>
                    <option value="Medium">Priority: Medium</option>
                    <option value="Low">Priority: Low</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddLearn(false)}
                    className="px-3 py-1 text-xs text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs font-bold bg-amber-600 text-white rounded-lg shadow-xs"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </form>
            )}

            {/* Wishlist List */}
            <div className="space-y-2.5">
              {currentUser.learnSkills.map((sk, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between gap-3 group hover:border-amber-300 transition-all"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{sk.name}</span>
                      <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.2 rounded border border-amber-100">
                        {sk.priority} Priority
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Target Level: {sk.currentLevel || 'Beginner'}
                    </p>
                  </div>

                  <button
                    onClick={() => removeLearnSkill(sk.name)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1 transition-all"
                    title="Remove goal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Peer Reviews on My Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Endorsements & Peer Reviews</h3>
              <p className="text-xs text-slate-500">Constructive feedback from your 1-on-1 skill exchanges</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
              {userReviews.length} Reviews
            </span>
          </div>

          {userReviews.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No reviews received yet. Complete a session to earn endorsements!</p>
          ) : (
            <div className="space-y-3.5">
              {userReviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-1">· Skill: {rev.skillReviewed}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rev.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
