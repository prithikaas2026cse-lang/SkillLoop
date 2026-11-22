import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSkillLoop } from '../../context/SkillLoopContext';

export const CTASection = () => {
  const { setAuthModalState } = useSkillLoop();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-blue-200 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-blue-300" />
          <span>Join Your Campus Peer Network</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Ready to Start Your First Skill Loop?
        </h2>

        <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
          Sign up with your college email, list what you know and what you want to learn, and get matched with peer partners immediately.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setAuthModalState('register')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-blue-900 bg-white hover:bg-blue-50 active:scale-95 shadow-xl transition-all"
          >
            <span>Create Your Free Account</span>
            <ArrowRight className="w-4 h-4 text-blue-700" />
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-blue-200/80">
          <span>✓ Instant Reverse Matching</span>
          <span>✓ Zero Cash Exchanged</span>
          <span>✓ Campus & Remote Formats</span>
        </div>
      </div>
    </section>
  );
};
