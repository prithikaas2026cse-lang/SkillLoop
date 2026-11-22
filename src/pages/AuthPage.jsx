import React, { useState } from 'react';
import { useSkillLoop } from '../context/SkillLoopContext';
import { Repeat, Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthPage = () => {
  const { loginUser, registerUser, students, switchUser } = useSkillLoop();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      loginUser(email || 'student@university.edu');
    } else {
      registerUser({
        name: name || 'New Peer Learner',
        college: 'State University',
        major: 'Computer Science',
        year: 'Sophomore',
        teachSkills: [{ name: 'Python Basics', category: 'coding', level: 'Intermediate', endorsements: 0 }],
        learnSkills: [{ name: 'React.js', category: 'coding', priority: 'High', currentLevel: 'Beginner' }]
      });
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-blue-50/60 via-white to-slate-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft">
        
        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <Repeat className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {mode === 'login' ? 'Sign In to SkillLoop' : 'Create Free Student Account'}
          </h2>
          <p className="text-xs text-slate-500">
            Connect with peer students on campus for reciprocal skill swaps.
          </p>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Taylor Smith"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">College Email (.edu)</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Join SkillLoop'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Demo Profile Switcher:</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {students.slice(0, 4).map(s => (
              <button
                key={s.id}
                onClick={() => switchUser(s.id)}
                className="p-2 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50 text-left transition-all flex items-center gap-2"
              >
                <img src={s.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-800 truncate">{s.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{s.teachSkills[0]?.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <span>
              New to SkillLoop?{' '}
              <button onClick={() => setMode('register')} className="font-bold text-blue-600 hover:underline">
                Create an account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="font-bold text-blue-600 hover:underline">
                Sign in
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
