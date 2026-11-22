import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useSkillLoop } from '../../context/SkillLoopContext';
import { Mail, Lock, LogIn, Sparkles, UserCheck } from 'lucide-react';

export const LoginModal = () => {
  const { authModalState, setAuthModalState, loginUser, students, switchUser } = useSkillLoop();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isOpen = authModalState === 'login';
  const onClose = () => setAuthModalState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email || 'alex@college.edu');
  };

  const handleQuickDemoLogin = (studentId) => {
    switchUser(studentId);
    setAuthModalState(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome Back to SkillLoop">
      <div className="space-y-5">
        <p className="text-xs text-slate-500">
          Enter your college email to access your learning dashboard and peer requests.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              College Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </form>

        {/* Quick Demo Student Switcher */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Demo Logins (Click to Test):</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {students.slice(0, 4).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleQuickDemoLogin(s.id)}
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

        <div className="text-center pt-2 text-xs text-slate-500">
          Don't have an account yet?{' '}
          <button
            type="button"
            onClick={() => setAuthModalState('register')}
            className="font-bold text-blue-600 hover:underline"
          >
            Create Free Account
          </button>
        </div>
      </div>
    </Modal>
  );
};
